for (var i = 0; i < ENV.count; i++) {
    var worker = new Worker('worker-impl.js');
    worker.postMessage(ENV);
    new ReactWorker(worker, document.getElementById('topLevelContainer-' + i));
}
