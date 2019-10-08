import { IQuickReply as IQuickReply1, IMessageTemplate, IButton as IButton1 } from 'fb-messenger-bot-api';
import { IQuickReply as IQuickReply2, IGenericTemplate, IButton as IButton2 } from './types';
export interface AntMessengerConfig {
    getStatus: (id: string) => Promise<string>;
    setStatus: (id: string, status: String) => Promise<any>;
    maskSeparator?: string;
    getStartedToken?: string;
}
export interface Listeners {
    [key: string]: {
        [key in string]: Function;
    };
}
export interface Commands {
    [key: string]: Function;
}
export interface ListenerCallback {
    (id: string, data: any, mask?: String): void;
}
export interface CommandCallback {
    (id: string, params: {
        [index: string]: string;
    }): void;
}
export declare type AntListenerType = 'text_message' | 'delivery' | 'quick_reply' | 'postback' | 'image' | 'sticker' | 'audio' | 'location' | 'echo';
export interface ImagePayload {
    url: string;
}
export interface StickerPayload {
    url: string;
    sticker_id: number;
}
export interface AudioPayload {
    url: string;
}
export interface LocationPayload {
    title: string;
    url: string;
    latitude: string;
    longitude: string;
}
export interface QuickReplyPayload {
    payload?: string;
}
export interface AntAPI {
    sendTextMessage: (id: string, text: string) => Promise<any>;
    sendQuickReplyMessage: (id: string, text: string, replies: IQuickReply1[] | IQuickReply2[]) => Promise<any>;
    sendTemplateMessage: (id: string, template: IMessageTemplate | IGenericTemplate) => Promise<any>;
    sendButtonsMessage: (id: string, text: string, buttons: IButton1[] | IButton2[]) => Promise<any>;
    sendAudioMessage: (id: string, url: string) => Promise<any>;
    sendFileMessage: (id: string, url: string) => Promise<any>;
    sendImageMessage: (id: string, url: string) => Promise<any>;
    sendVideoMessage: (id: string, url: string) => Promise<any>;
    getUserProfile: (id: string, fields: string[]) => Promise<any>;
    toggleTyping: (id: string, state: boolean) => Promise<any>;
    markSeen: (id: string) => Promise<any>;
}
