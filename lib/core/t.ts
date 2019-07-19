export interface AntMessengerConfig {
    getStatus: (id: string) => Promise<string>;
    setStatus: (id: string, status: String) => Promise<any>;
    maskSeparator?: string;
    getStartedToken?: string;
}

export interface Listeners {
    [key: string]: { [key in string]: Function };
}

export interface Commands {
    [key: string]: Function;
}

export interface ListenerCallback {
    (id: string, data: any, mask?: String): void;
}

export interface CommandCallback {
    (id: string, params: { [index: string]: string }): void;
}

export type AntListenerType = 
'text_message' | 
'delivery' | 
'quick_reply' |
'postback' |
'image' |
'sticker' |
'audio' |
'location' |
'echo'; 

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