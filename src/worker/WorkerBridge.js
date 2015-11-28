class WorkerBridge {
    constructor(interval, maxQueueSize) {
        this.queue = [];

        this.interval = interval || 20;
        this.maxQueueSize = maxQueueSize || 500;

        this.setupListeners();
    }
    postMessage(msg) {
        this.queue.push(msg);
        this.notifyNewMessage();
    }

    notifyNewMessage() {
        // Flush the message queue if we have enough messages 
        if (this.queue.length > this.maxQueueSize) {
            this.flushQueue();
        }
    }

    flushQueue() {
        if (this.queue.length > 0) {
            self.postMessage(this.queue);
            this.queue = [];
        }
    }

    setupListeners() {
        // Flush the message queue periodically
        setInterval(() => {
            //this.flushQueue();
        }, this.interval);
    }
}

export default new WorkerBridge();
