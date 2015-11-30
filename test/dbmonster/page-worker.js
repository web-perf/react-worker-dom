import ENV from './ENV';

var content = document.getElementById('content');
for (var i = 0; i < ENV.count; i++) {
	var container = document.createElement('div');
	container.style.width = 100 / ENV.count + '%';
	content.appendChild(container);

	new ReactWorker(new Worker('main-worker.js'), container);
}