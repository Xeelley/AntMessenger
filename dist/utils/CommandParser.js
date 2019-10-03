"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CommandParser {
    static parse(text) {
        if (text.indexOf('?') === -1)
            return {};
        const query = text.slice(text.indexOf('?') + 1);
        const result = {};
        query.split('&').forEach(part => {
            const item = part.split('=');
            result[item[0]] = decodeURIComponent(item[1]);
        }, this);
        return result;
    }
}
exports.CommandParser = CommandParser;
