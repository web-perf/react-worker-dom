import {EVENT, RENDER_QUEUE, MAX_QUEUE_SIZE} from './../common/constants';

class WorkerBridge {
    constructor() {
        this.queue = [];

        self.addEventListener('message', ({
            data
        }) => {
            switch (data.type) {
                case EVENT:
                    handleEvent(data.args);
                    break;
            }
        });
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
            self.postMessage(JSON.stringify({
                type: RENDER_QUEUE,
                args: this.queue
            }));
            this.queue = [];
        }
    }

    handleEvent(args) {
        // TODO - Pass the events to the appropriate nodes/event Handlers
    }
}

export default new WorkerBridge();
