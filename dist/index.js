"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var AntCore_1 = require("./core/AntCore");
var AntMessenger = (function (_super) {
    __extends(AntMessenger, _super);
    function AntMessenger(token, config) {
        return _super.call(this, token, config) || this;
    }
    AntMessenger.prototype.add = function (type, status, method) {
        if (!this.botListeners[type])
            this.botListeners[type] = {};
        this.botListeners[type][status.toString()] = method;
    };
    return AntMessenger;
}(AntCore_1.AntCore));
exports.AntMessenger = AntMessenger;
