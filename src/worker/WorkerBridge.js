class WorkerBridge {
    constructor(interval, maxQueueSize) {
        this.queue = [];

        this.interval = interval || 20;
        this.maxQueueSize = maxQueueSize || 500;

        self.addEventListener('message', ({
            data
        }) => {
            switch (data.type) {
                case 'event':
                    handleEvent(data.args);
                    break;
            }
        });
    }

    postMessage(msg) {
        this.queue.push(msg);
        // Flush the message queue if we have enough messages 
        if (this.queue.length > this.maxQueueSize) {
            this.flushQueue();
        }
    }

    flushQueue() {
        if (this.queue.length > 0) {
            self.postMessage({
                type: 'renderQueue',
                args: this.queue
            });
            this.queue = [];
        }
    }

    handleEvent(args) {
        // TODO - Pass the events to the appropriate nodes/event Handlers
    }
}

export default new WorkerBridge();
