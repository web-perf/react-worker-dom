import Channel from './../common/channel';
import {WORKER_MESSAGES as _} from './../common/constants';
import Dom from './Dom';

class ReactWorker {
    constructor(worker, container) {
        this.container = container;
        this.channel = new Channel(worker);
        this.channel.onMessage(this.handleMessage.bind(this));
        this.dom = new Dom(container);
    }

    handleMessage(type, payload) {
        switch (type) {
            case _.renderQueue:
                var start = performance.now();
                payload.forEach(op => this.dom.handleOp(op));
                this.channel.send(_.RENDER_TIME, {
                    time: performance.now() - start,
                    count: payload.length
                });
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