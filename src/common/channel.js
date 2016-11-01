import {WORKER_MESSAGES as _} from './constants';
import TouchList from './api/TouchList';
import Screen from './api/Screen';

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
        // TODO: Create general event parsing method to handle all even types
        if (isTouchEvent(e)) {
            result = Object.assign(result, getTouchProperties(e));
        }
        return JSON.stringify(result);
    }

    static deserializeEvent(msg) {
        let e = JSON.parse(msg);
        if (isTouchEvent(e)) {
            e = Object.assign(e, getTouchProperties(e));
        }
        e.preventDefault = e.stopPropgation = function () { }
        return e;
    }
}

function isTouchEvent(e) {
    return e.type.match(/touchmove|touchstart|touchend|touchcancel/)
}

function getTouchProperties(e) {
    // Support only one touch at the moment
    const targetTouches = new TouchList([e.targetTouches[0]]);
    const touches = new TouchList([e.touches[0]]);
    const changedTouches = new TouchList([e.changedTouches[0]]);
    let screen = {};
    if(e.view.screen) {
      screen = new Screen(e.view.screen);
    }

    return {
        targetTouches,
        touches,
        changedTouches,
        view: {
          screen
        },
    }

}
