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