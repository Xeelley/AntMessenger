import { EventEmitter } from 'events';
import * as FacebookMessanger from 'fb-messenger-bot-api';

import { CommandParser } from '../utils/CommandParser';

import * as T from './t';
import * as AntTypes from './types';


export class AntCore extends EventEmitter {

    protected _api: FacebookMessanger.FacebookMessagingAPIClient;
    public cilent: FacebookMessanger.FacebookProfileAPIClient;
    public Types = AntTypes;

    private token: string;
    private config: T.AntMessengerConfig;

    protected botListeners: T.Listeners = {};
    protected commands: T.Commands = {};
    protected onStartListeners: T.OnStartCallback[] = [];

    constructor(token: string, config: T.AntMessengerConfig) {
        super();

        if (!config.getStatus) throw new Error('Ant: config.getStatus not provided! This field is mandatory.');
        if (!config.setStatus) throw new Error('Ant: config.setStatus not provided! This field is mandatory.');
        config.maskSeparator   = config.maskSeparator || ':'; 
        config.getStartedToken = config.getStartedToken || 'GET_STARTED';
        this.config = config;

        this.token = token;

        this._api   = new FacebookMessanger.FacebookMessagingAPIClient(token);
        this.cilent = new FacebookMessanger.FacebookProfileAPIClient(token);

        // @ts-ignore
        this.cilent.setGetStartedAction(this.config.getStartedToken).catch((err: Error) => this.emit('error', err));

        this.validateServer = this.validateServer.bind(this);
    }


    public command(command: string, method: T.CommandCallback) {
        this.commands[command] = method;
    }

    public status(id: string, status: String): Promise<any> {
        return this.config.setStatus(id, status);
    }

    /**
     * Unreleased yet
     * @param callback 
     */
    private onStart(callback: T.OnStartCallback) {
        this.onStartListeners.push(callback);
    }

    private checkStatus(id: string, type: T.AntListenerType, data: any, extra?: any) { 
        if (type === 'text_message') {
            const text: string = data;
            const command = text.indexOf('?') !== -1 ? text.slice(0, text.indexOf('?')) : text;
    
            if (Object.keys(this.commands).includes(command)) {
                this.commands[command](id, CommandParser.parse(text));
                return;
            }
        }
   
        this.config.getStatus(id).then(status => {
            if (!status) return;

            this.botListeners[type] = this.botListeners[type] || {}; 
            if (Object.keys(this.botListeners[type]).includes(status)) {
                return this.botListeners[type][status](id, data, extra);
            } else {
                for (let i in Object.keys(this.botListeners[type])) {
                    const listener = Object.keys(this.botListeners[type])[i];
                    if (this.isMask(listener) && this.isMatch(status, listener)) {
                        return this.botListeners[type][listener](id, data, this.isMatch(status, listener));
                    }
                }
            }
        }).catch((err: Error) => this.onError(id, err));
    }

    private isMask(mask: String): Boolean {
        return mask.split(this.config.maskSeparator).includes('*');
    }

    private isMatch(status: String, mask: String) {
        if (mask === '*') return status;

        const statusLevels = status.split(this.config.maskSeparator);
        const maskLevels   = mask.split(this.config.maskSeparator);
        let   maskMatch;
        if (maskLevels.length !== statusLevels.length) {
            return null;
        }
        for (let i = 0; i < maskLevels.length; i++) {
            if (maskLevels[i] !== '*') {
                if (maskLevels[i] !== statusLevels[i]) {
                    return null;
                }
            } else {
                maskMatch = statusLevels[i];
            }
        }
        return maskMatch;
    }

    private onError(id: string, err: Error) {
        this.emit('error', Object.assign(err, { sender_id: id }));
    }


    public validateServer(req: any, res: any): void {
        FacebookMessanger.ValidateWebhook.validateServer(req, res, this.token);
    }

    public parsePayload(data: FacebookMessanger.FacebookMessagePayload): FacebookMessanger.FacebookMessagePayloadMessagingEntry[] {
        return data ? FacebookMessanger.FacebookMessageParser.parsePayload(data) : null;
    }

    public inspect(data: FacebookMessanger.FacebookMessagePayload) {
        const payload: FacebookMessanger.FacebookMessagePayloadMessagingEntry[] = this.parsePayload(data);
    
        if (Array.isArray(payload)) {
    
            const f: FacebookMessanger.FacebookMessagePayloadMessagingEntry = payload[0];

            if (f.message && f.message.text && !f.message.quick_reply) {
                return this.checkStatus(f.sender.id, 'text_message', f.message.text, f);
            } 
            if (f.message && f.message.is_echo) {
                this.checkStatus(f.recipient.id, 'echo', f);
            } 
            if (f.message && f.message.text && f.message.quick_reply) {
                return this.checkStatus(f.sender.id, 'quick_reply', f.message.text, f.message.quick_reply);
            }
            if (f.delivery) {
                return this.checkStatus(f.sender.id, 'delivery', f.delivery);
            }
            if (f.postback && f.postback.referral && f.postback.payload === this.config.getStartedToken 
            && f.postback.referral.source === 'SHORTLINK') {
                return this.checkStatus(f.sender.id, 'text_message', '/start?ref=' + f.postback.referral.ref);
            }
            if (f.postback && f.postback.payload && f.postback.payload === this.config.getStartedToken) {
                return this.checkStatus(f.sender.id, 'text_message', '/start');
            }
            if (f.referral && f.referral.ref && f.referral.source === 'SHORTLINK') {
                return this.checkStatus(f.sender.id, 'text_message', '/start?ref=' + f.referral.ref);
            }
            if (f.postback) {
                return this.checkStatus(f.sender.id, 'postback', f.postback.payload);
            }
            if (f.message && f.message.attachments) {
                const attachments: (FacebookMessanger.FacebookMessagePayloadAttachments | 
                    FacebookMessanger.FacebookMessagePayloadAttachmentsFallback)[] = f.message.attachments;

                attachments.forEach((attachment: any) => {

                    if (attachment.type === 'image' && attachment.payload.sticker_id) {
                        this.checkStatus(f.sender.id, 'sticker', attachment.payload);
                    }
                    if (attachment.type === 'image' && !attachment.payload.sticker_id) {
                        this.checkStatus(f.sender.id, 'image', attachment.payload);
                    }
                    if (attachment.type === 'audio') {
                        this.checkStatus(f.sender.id, 'audio', attachment.payload);
                    }
                    if (attachment.type === 'file') {
                        this.checkStatus(f.sender.id, 'file', attachment.payload);
                    }
                    if (attachment.type === 'location') {
                        this.checkStatus(f.sender.id, 'location', {
                            title: attachment.title,
                            url: attachment.url,
                            latitude: attachment.payload.coordinates.lat,
                            longitude: attachment.payload.coordinates.long,
                        });
                    }

                }, this);
                return;
            }
    
        }
    }

}