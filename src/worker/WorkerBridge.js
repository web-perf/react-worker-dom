import Channel from './../common/channel';
import {EVENT, RENDER_QUEUE, MAX_QUEUE_SIZE} from './../common/constants';

class WorkerBridge {
    constructor() {
        this.queue = [];
        this.channel = new Channel(self);
        this.channel.onMessage(this.handleMessage.bind(this));
    }

    handleMessage(data){
        switch (data.type) {
            case EVENT:
                handleEvent(data.args);
                break;
        }

    }

    postMessage(msg) {
        this.queue.push(msg);
        // Flush the message queue if we have enough messages 
        if (this.queue.length > MAX_QUEUE_SIZE) {
            this.flushQueue();
        }
    }

    flushQueue() {
        if (this.queue.length > 0) {
            this.channel.send(RENDER_QUEUE, this.queue);
            this.queue = [];
        }
    }

    handleEvent(args) {
        // TODO - Pass the events to the appropriate nodes/event Handlers
    }
}

export default new WorkerBridge();
