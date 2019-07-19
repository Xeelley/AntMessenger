### List of all availble types for Ant.add

```ts
Ant.add(type: 'text_message', status: string, listener: (id: string, text: string, payload: FacebookMessanger.FacebookMessagePayloadMessagingEntry) => any): void;

Ant.add(type: 'echo', status: string, listener: (id: string, payload: FacebookMessanger.FacebookMessagePayloadMessagingEntry) => any): void;

Ant.add(type: 'quick_reply', status: string, listener: (id: string, text: string, reply: T.QuickReplyPayload) => any): void;

Ant.add(type: 'delivery', status: string, listener: (id: string, delivery: FacebookMessanger.FacebookMessagePayloadDelivery) => any): void;

Ant.add(type: 'sticker', status: string, listener: (id: string, sticker: T.StickerPayload) => any): void;

Ant.add(type: 'image', status: string, listener: (id: string, image: T.ImagePayload) => any): void;

Ant.add(type: 'audio', status: string, listener: (id: string, audio: T.AudioPayload) => any): void;

Ant.add(type: 'location', status: string, listener: (id: string, location: T.LocationPayload) => any): void;

Ant.add(type: 'postback', status: string, listener: (id: string, payload: string) => any): void;

```