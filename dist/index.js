"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AntApi_1 = require("./core/AntApi");
class AntMessenger extends AntApi_1.AntApi {
    constructor(token, config) {
        super(token, config);
    }
    add(type, status, method) {
        if (!this.botListeners[type])
            this.botListeners[type] = {};
        this.botListeners[type][status.toString()] = method;
    }
}
exports.AntMessenger = AntMessenger;
