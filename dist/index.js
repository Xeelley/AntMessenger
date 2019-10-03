"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AntCore_1 = require("./core/AntCore");
class AntMessenger extends AntCore_1.AntCore {
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
