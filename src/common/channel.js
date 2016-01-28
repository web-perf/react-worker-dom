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
    static serializeEvent(e) {
        var newTarget = {
            value: e.target.value,
            checked: e.target.checked,
            selected: e.target.selected
        }
        delete e.view;
        e.target = newTarget;
        return JSON.stringify(e);
    }
    static deserializeEvent(msg) {
        var e = JSON.parse(msg);
        e.preventDefault = e.stopPropgation = function() {}
        return e;
    }
}
