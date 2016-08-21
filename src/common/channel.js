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
        let result = {
            bubbles: e.bubbles,
            cancelable: e.cancelable,
            defaultPrevented: e.defaultPrevented,
            eventPhase: e.eventPhase,
            isTrusted: e.isTrusted,
            timeStamp: e.timeStamp,
            type: e.type,
            currentTarget: e.currentTarget['__reactNode'],
            target: e.target['__reactNode'],
            targetProps: {
                value: e.target.value,
                checked: e.target.checked,
                selected: e.target.selected
            }
        };
        return JSON.stringify(result);
    }

    static deserializeEvent(msg) {
        var e = JSON.parse(msg);
        e.preventDefault = e.stopPropgation = function () { }
        return e;
    }
}
