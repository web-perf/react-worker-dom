import Channel from './../common/channel';
import {TIMEOUT, WORKER_MESSAGES as _ } from './../common/constants';
import TreeNode from './dom/TreeNode';

class WorkerBridge {
    constructor() {
        this.queue = [];
        this.channel = new Channel(self);
        this.channel.onMessage(this.handleMessage.bind(this));
        this.pollQueue();
    }

    pollQueue() {
        self.setTimeout(() => {
            this.flushQueue();
            this.pollQueue();
        }, TIMEOUT);
    }

    handleMessage(type, payload) {
        switch (type) {
            case _.renderTime:
                this.rate = payload.count / payload.time;
                break;
            case _.event:
                this.eventHandler(payload);
                break;
            default:
                console.log('Unknown operation %s', type);
        }
    }

    onEventHandler(handler) {
        this.eventHandler = handler;
    }

    eventHandlerCalled(event) {
        this.channel.send(_.event, {
            guid: event.guid,
            defaultPrevented: event.defaultPrevented,
            propagationStoped: event.propagationStoped
        });
    }

    send(operation, guid, params) {
        if (!Array.isArray(params)) {
            params = [params];
        };
        let guidPos = [];
        var args = params.map((a, i) => a instanceof TreeNode ? (guidPos.push(i), a._guid) : a);
        this.queue.push({
            operation,
            guid,
            args,
            guidPos: guidPos.length > 0 ? guidPos : undefined
        });
    }

    flushQueue() {
        if (this.queue.length === 0) {
            return;
        }
        this.channel.send(_.renderQueue, this.queue);
        this.queue = [];
    }
}

export default new WorkerBridge();