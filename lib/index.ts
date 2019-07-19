import * as AntTypes from './core/types';
import * as T from './core/t';
import { AntCore } from './core/AntCore';

import * as FacebookMessanger from 'fb-messenger-bot-api';


export class AntMessenger extends AntCore {

    constructor(token: string, config: T.AntMessengerConfig) {
        super(token, config);
    }


    public add(type: 'text_message', status: string, listener: (id: string, text: string, payload: FacebookMessanger.FacebookMessagePayloadMessagingEntry) => any): void;
    public add(type: 'echo', status: string, listener: (id: string, payload: FacebookMessanger.FacebookMessagePayloadMessagingEntry) => any): void;
    public add(type: 'quick_reply', status: string, listener: (id: string, text: string, reply: AntTypes.QuickReplyPayload) => any): void;
    public add(type: 'delivery', status: string, listener: (id: string, delivery: FacebookMessanger.FacebookMessagePayloadDelivery) => any): void;
    public add(type: 'sticker', status: string, listener: (id: string, sticker: AntTypes.StickerPayload) => any): void;
    public add(type: 'image', status: string, listener: (id: string, image: AntTypes.ImagePayload) => any): void;
    public add(type: 'audio', status: string, listener: (id: string, audio: AntTypes.AudioPayload) => any): void;
    public add(type: 'location', status: string, listener: (id: string, location: AntTypes.LocationPayload) => any): void;
    
    public add(type: T.AntListenerType, status: any, method?: any) {
        if (!this.botListeners[type]) this.botListeners[type] = {};
        this.botListeners[type][status.toString()] = method;
    }
}