"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const FacebookMessanger = require("fb-messenger-bot-api");
const CommandParser_1 = require("../utils/CommandParser");
const AntTypes = require("./types");
class AntCore extends events_1.EventEmitter {
    constructor(token, config) {
        super();
        this.Types = AntTypes;
        this.botListeners = {};
        this.commands = {};
        this.onStartListeners = [];
        if (!config.getStatus)
            throw new Error('Ant: config.getStatus not provided! This field is mandatory.');
        if (!config.setStatus)
            throw new Error('Ant: config.setStatus not provided! This field is mandatory.');
        config.maskSeparator = config.maskSeparator || ':';
        config.getStartedToken = config.getStartedToken || 'GET_STARTED';
        this.config = config;
        this.token = token;
        this._api = new FacebookMessanger.FacebookMessagingAPIClient(token);
        this.cilent = new FacebookMessanger.FacebookProfileAPIClient(token);
        this.cilent.setGetStartedAction(this.config.getStartedToken).catch((err) => this.emit('error', err));
        this.validateServer = this.validateServer.bind(this);
    }
    command(command, method) {
        this.commands[command] = method;
    }
    status(id, status) {
        return this.config.setStatus(id, status);
    }
    onStart(callback) {
        this.onStartListeners.push(callback);
    }
    checkStatus(id, type, data, extra) {
        if (type === 'text_message') {
            const text = data;
            const command = text.indexOf('?') !== -1 ? text.slice(0, text.indexOf('?')) : text;
            if (Object.keys(this.commands).includes(command)) {
                this.commands[command](id, CommandParser_1.CommandParser.parse(text));
                return;
            }
        }
        this.config.getStatus(id).then(status => {
            if (!status)
                return;
            this.botListeners[type] = this.botListeners[type] || {};
            if (Object.keys(this.botListeners[type]).includes(status)) {
                return this.botListeners[type][status](id, data, extra);
            }
            else {
                for (let i in Object.keys(this.botListeners[type])) {
                    const listener = Object.keys(this.botListeners[type])[i];
                    if (this.isMask(listener) && this.isMatch(status, listener)) {
                        return this.botListeners[type][listener](id, data, this.isMatch(status, listener));
                    }
                }
            }
        }).catch((err) => this.onError(id, err));
    }
    isMask(mask) {
        return mask.split(this.config.maskSeparator).includes('*');
    }
    isMatch(status, mask) {
        if (mask === '*')
            return status;
        const statusLevels = status.split(this.config.maskSeparator);
        const maskLevels = mask.split(this.config.maskSeparator);
        let maskMatch;
        if (maskLevels.length !== statusLevels.length) {
            return null;
        }
        for (let i = 0; i < maskLevels.length; i++) {
            if (maskLevels[i] !== '*') {
                if (maskLevels[i] !== statusLevels[i]) {
                    return null;
                }
            }
            else {
                maskMatch = statusLevels[i];
            }
        }
        return maskMatch;
    }
    onError(id, err) {
        this.emit('error', Object.assign(err, { sender_id: id }));
    }
    validateServer(req, res) {
        FacebookMessanger.ValidateWebhook.validateServer(req, res, this.token);
    }
    parsePayload(data) {
        return data ? FacebookMessanger.FacebookMessageParser.parsePayload(data) : null;
    }
    inspect(data) {
        const payload = this.parsePayload(data);
        if (Array.isArray(payload)) {
            const f = payload[0];
            console.log(f, 'u');
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
                const attachments = f.message.attachments;
                attachments.forEach((attachment) => {
                    if (attachment.type === 'image' && attachment.payload.sticker_id) {
                        this.checkStatus(f.sender.id, 'sticker', attachment.payload);
                    }
                    if (attachment.type === 'image' && !attachment.payload.sticker_id) {
                        this.checkStatus(f.sender.id, 'image', attachment.payload);
                    }
                    if (attachment.type === 'audio') {
                        this.checkStatus(f.sender.id, 'audio', attachment.payload);
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
exports.AntCore = AntCore;
