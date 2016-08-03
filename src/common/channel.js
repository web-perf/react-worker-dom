import {WORKER_MESSAGES as _} from './constants';

export default class Channel {
    constructor(channel) {
        this.channel = channel;
    }
    send(type, payload) {
        this.channel.postMessage(JSON.stringify({ type, payload }));
    }
    onMessage(handler) {
        this.channel.addEventListener('message', ({data}) => {
            let { type, payload } = JSON.parse(data);
            handler(type, payload);
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
        e.preventDefault = e.stopPropgation = function () { }
        return e;
    }
}
