# React Renderer using Web Workers

A React Custom renderer using Web Workers. All the Virtual DOM diffing happens in the Worker thread, and only node updates are sent over to the UI thread. 

>> This renderer is experimental and may change in the future

The application components themselves should not change, the only change as a result of using this renderer would be to call the method on `react-worker-dom` instead of `react-dom`. 

## Demo
The demo app has 2 versions - one with normal react, and another with web workers enabled. 
- Clone the repo run `npm install` to install all dependencies.
- Build the app using `npm run demo`
- Open `http://localhost:8080/index.html` for the normal version of the app
- Open `http://localhost:8080/index.html?worker.html` for the version of the app that uses web workers

You can also look at `test\dbmonster\ENV.js` to change parameters like number of rows (called `rows`) or number of top level components (called `count`) are rendered, to see how the performance of the app is impacted when more nodes need to be rendered. 

## Usage

On a regular react application, a main file could have something like 

```js
// File: main.jsx
import React from 'react';
import reactDOM from 'react-dom';
reactDom.render(<Component/>, document.getElementById('container'));
```

To use this renderer, the script above needs to be started as a web worker. The web worker does not have access to `document` or other DOM elements. Hence, the worker file will now look like

```js
// File: main-worker.js
import React from 'react';
import reactDOM from 'react-worker-dom';
reactDom.render(<Component/>);
```

In the webpage, add a script tag that has the file `dist/ReactWorker.js`, and then have a script block that has the following snippet. 

```js
new ReactWorker(new Worker('main-worker.js'), document.getElementById('container'));`
```

Look at `test\dbmonster` directory for the example. 

## Roadmap
- This experiment was to measure the performance characteristics of using web workers and hence does not yet implement events. Event will have to be different from React's regular events since the event handlers here is async and executed in the web worker. This is closer to ReactNative than React.   
- A better batching algorithm for sending messages to the UI thread for rendering. This algorithm should also take into account, the time take for each node update such that it can manage jank, or discard render() calls that are old. 
