export default class Channel {
    constructor(channel) {
        this.channel = channel;
    }
    send(type, args) {
        this.channel.postMessage(JSON.stringify({
            type, args
        }));
    }
    onMessage(handler) {
        this.channel.addEventListener('message', (e) => {
            handler(JSON.parse(e.data));
        });
    }
}
