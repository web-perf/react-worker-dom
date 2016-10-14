import Channel from './../common/channel';
import {WORKER_MESSAGES as _} from './../common/constants';
import Dom from './Dom';

class ReactWorker {
    constructor(worker, container) {
        this.container = container;
        this.channel = new Channel(worker);
        this.channel.onMessage(this.handleMessage.bind(this));
        this.domOperation = Dom(container, this.channel);
        this.rafId = requestAnimationFrame(this.sendRAFUpdate.bind(this));
    }

    sendRAFUpdate() {
        this.channel.send(_.requestAnimationFrame, { id: this.rafId });
        this.rafId = requestAnimationFrame(this.sendRAFUpdate.bind(this));
    }

    handleMessage(type, payload) {
        switch (type) {
            case _.renderQueue:
                // var start = performance.now();
                payload.forEach(op => {
                    this.domOperation(op)
                });
                /*this.channel.send(_.renderTime, {
                    time: performance.now() - start,
                    count: payload.length
                });*/
                break;
            case _.cancelAnimationFrame:
                // console.log('CANCEL IN MAIN', payload.id);
                cancelAnimationFrame(payload.id);
                break;
            default:
                console.log('Cannot handle message %s', data.type, data.args);
        }
    }
}

module.exports = {
    render: function (worker, container) {
        return new ReactWorker(worker, container);
    }
}
