import EventHandler from './../eventHandler';

class Window {
    addEventListener(eventType, callback, useCapture) {
        EventHandler.add('window', eventType, callback, useCapture);
    }
}

self.window = new Window();