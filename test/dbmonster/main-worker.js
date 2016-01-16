
var content = document.getElementById('content');
for (var i = 0; i < ENV.count; i++) {
	var container = document.createElement('div');
	container.style.width = 100 / ENV.count + '%';
	content.appendChild(container);

	var worker = new Worker('worker-impl.js');
	worker.postMessage(ENV);
	new ReactWorker(worker, container);
}