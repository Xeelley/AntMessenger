/// <reference types="node" />
import { EventEmitter } from 'events';
import * as FacebookMessanger from 'fb-messenger-bot-api';
import * as T from './t';
export declare class AntCore extends EventEmitter {
    api: FacebookMessanger.FacebookMessagingAPIClient;
    cilent: FacebookMessanger.FacebookProfileAPIClient;
    private token;
    private config;
    protected botListeners: T.Listeners;
    protected commands: T.Commands;
    constructor(token: string, config: T.AntMessengerConfig);
    command(command: string, method: T.CommandCallback): void;
    status(id: string, status: String): Promise<any>;
    private checkStatus;
    private checkStatusPostback;
    private isMask;
    private isMatch;
    private onError;
    validateServer(req: any, res: any): void;
    parsePayload(data: FacebookMessanger.FacebookMessagePayload): FacebookMessanger.FacebookMessagePayloadMessagingEntry[];
    inspect(data: FacebookMessanger.FacebookMessagePayload): any;
}
