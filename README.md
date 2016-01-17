# React Renderer using Web Workers

A React Custom renderer using Web Workers. All the Virtual DOM reconcilliations happen in a WebWorker thread. Only node updates are sent over to the UI thread, result in a much more responsive UI.  

>> This renderer is experimental and may change in the future

An existing React application can leverage WebWorkers using this library with minimal change. Look at the usage section for details. 

## Demo
The demo app has 2 versions - one with normal react, and another with web workers enabled. 
- Clone the repo run `npm install` to install all dependencies.
- Build the app using `npm run demo`
- Open `http://localhost:8080/test/dbmonster/index.html` to view the demo app.
- Tweak the params in the URL to change to use web workers, increase number of components, etc. 

## Usage

A typical React application would looks something like the following.

```js
// File: main.jsx
import React from 'react';
import reactDOM from 'react-dom';
reactDOM.render(<Component/>, document.getElementById('container'));
```

To use this renderer, we would need to split the above file into 2 parts, one that is on the page, and another that starts as a web worker. 

This is the file that is run on the main UI thread, and is included in the html page using a script tag. Notice the second import that uses `react-worker-dom`. 

```js
// File: main.js
import React from 'react';
import reactDOM from 'react-worker-dom';
reactDOM.render(new Worker('worker.js'), document.getElementById('container'));
```

The `worker.js` file is the one that now holds the actual Component. 

```js
// File: worker.jsx
import React from 'react';
import ReactWorkerDOM from 'react-worker-dom-worker';
ReactWorkerDOM.render(<Component/>);
```

Look at `test\dbmonster` directory for the example. The big difference is that the script on the main app does not define the React Component, it is instead defined in the worker. 

## Roadmap
- This experiment was to measure the performance characteristics of using web workers and hence does not yet implement events. Event will have to be different from React's regular events since the event handlers here is async and executed in the web worker. This is closer to ReactNative than React.   
- A better batching algorithm for sending messages to the UI thread for rendering. This algorithm should also take into account, the time take for each node update such that it can manage jank, or discard render() calls that are old. 
