import { EventEmitter } from 'events';
import * as FacebookMessanger from 'fb-messenger-bot-api';
import * as T from './t';
import * as AntTypes from './types';
export declare class AntCore extends EventEmitter {
    protected _api: FacebookMessanger.FacebookMessagingAPIClient;
    cilent: FacebookMessanger.FacebookProfileAPIClient;
    Types: typeof AntTypes;
    private token;
    private config;
    protected botListeners: T.Listeners;
    protected commands: T.Commands;
    protected onStartListeners: T.OnStartCallback[];
    constructor(token: string, config: T.AntMessengerConfig);
    command(command: string, method: T.CommandCallback): void;
    status(id: string, status: String): Promise<any>;
    private onStart;
    private checkStatus;
    private isMask;
    private isMatch;
    private onError;
    validateServer(req: any, res: any): void;
    parsePayload(data: FacebookMessanger.FacebookMessagePayload): FacebookMessanger.FacebookMessagePayloadMessagingEntry[];
    inspect(data: FacebookMessanger.FacebookMessagePayload): void;
}
