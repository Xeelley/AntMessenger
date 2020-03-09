import * as T from './core/t';
import { AntApi } from './core/AntApi';
import * as FacebookMessanger from 'fb-messenger-bot-api';
export declare class AntMessenger extends AntApi {
    constructor(token: string, config: T.AntMessengerConfig);
    add(type: 'text_message', status: string, listener: (id: string, text: string, payload: FacebookMessanger.FacebookMessagePayloadMessagingEntry) => any): void;
    add(type: 'text_message', status: string, listener: (id: string, text: string, mask?: string) => any): void;
    add(type: 'echo', status: string, listener: (id: string, payload: FacebookMessanger.FacebookMessagePayloadMessagingEntry, mask?: string) => any): void;
    add(type: 'quick_reply', status: string, listener: (id: string, text: string, reply: T.QuickReplyPayload) => any): void;
    add(type: 'quick_reply', status: string, listener: (id: string, text: string, mask?: string) => any): void;
    add(type: 'delivery', status: string, listener: (id: string, delivery: FacebookMessanger.FacebookMessagePayloadDelivery, mask?: string) => any): void;
    add(type: 'sticker', status: string, listener: (id: string, sticker: T.StickerPayload, mask?: string) => any): void;
    add(type: 'image', status: string, listener: (id: string, image: T.ImagePayload, mask?: string) => any): void;
    add(type: 'audio', status: string, listener: (id: string, audio: T.AudioPayload, mask?: string) => any): void;
    add(type: 'file', status: string, listener: (id: string, file: T.FilePayload, mask?: string) => any): void;
    add(type: 'location', status: string, listener: (id: string, location: T.LocationPayload, mask?: string) => any): void;
    add(type: 'postback', status: string, listener: (id: string, payload: string) => any, mask?: string): void;
}
