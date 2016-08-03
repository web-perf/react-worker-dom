class Window {
    addEventListener(eventType, callback, useCapture){
        console.log('Window event listener', arguments);
    }
}

self.window = new Window();