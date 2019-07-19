"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CommandParser = (function () {
    function CommandParser() {
    }
    CommandParser.parse = function (text) {
        if (text.indexOf('?') === -1)
            return {};
        var query = text.slice(text.indexOf('?') + 1);
        var result = {};
        query.split('&').forEach(function (part) {
            var item = part.split('=');
            result[item[0]] = decodeURIComponent(item[1]);
        }, this);
        return result;
    };
    return CommandParser;
}());
exports.CommandParser = CommandParser;
