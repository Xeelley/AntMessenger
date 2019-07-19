export class CommandParser {

    static parse(text: string): { [index: string]: string } {
        if (text.indexOf('?') === -1) return {};
        const query = text.slice(text.indexOf('?') + 1);
        const result: { [index: string]: string } = {};
        query.split('&').forEach(part => {
            const item = part.split('=');
            result[item[0]] = decodeURIComponent(item[1]);
        }, this);
        return result;
    }
}