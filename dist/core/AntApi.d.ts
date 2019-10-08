import { AntCore } from './AntCore';
import * as T from './t';
export declare class AntApi extends AntCore {
    api: T.AntAPI;
    constructor(token: string, config: T.AntMessengerConfig);
}
