# React Renderer using Web Workers

A React Custom renderer using Web Workers. All the Virtual DOM reconcilliations happen in a WebWorker thread. Only node updates are sent over to the UI thread, result in a much more responsive UI.  

An existing React application can leverage WebWorkers using this library with minimal change. Look at the usage section for details.

**This is the React 15.x experimental version, see master branch if you're running React 0.14.**

## Demo

The demo is hosted at [http://web-perf.github.io/react-worker-dom/](http://web-perf.github.io/react-worker-dom/). To run a local version of the demo,

- Clone the repo run `npm install` to install all dependencies.
- Build the app using `npm run demo`
- Open `http://localhost:8080/test/dbmonster/` to view the demo app, or `http://localhost:8080/test/todo` for the todo app.
- Tweak the params in the URL to change to use web workers, increase number of components, etc.

## Usage

```bash
npm install --save react-worker-dom
```

### A typical React application

A typical React application would looks something like the following.

```js
// File: main.jsx
import React from 'react';
import reactDOM from 'react-dom';
reactDOM.render(<Component/>, document.getElementById('container'));
```

### Using it with Web Workers

To use this renderer, we would need to split the above file into 2 parts, one that is on the page, and another that starts as a web worker.

```js
// File: main.js - included using a script tag in index.html
import React from 'react';
import ReactDOM from 'react-worker-dom/page'; // Instead of using react-dom
ReactDOM.render(new Worker('worker.js'), document.getElementById('container'));
```

The `worker.js` file is the one that now holds the actual Component.

```js
// File: worker.jsx - loaded in index.html using new Worker('worker.jsx') in the file script above;
import React from 'react';
import ReactWorkerDOM from 'react-worker-dom/worker';
ReactWorkerDOM.render(<Component/>);
```

Look at `test\dbmonster` and `test\todoapp` directory for the examples.

## Testing Performance

To manually look at frame rates, load the dbmonster [demo pages](http://web-perf.github.io/react-worker-dom/) in Chrome, and view the [frame meter](https://developer.chrome.com/devtools/docs/rendering-settings#show-fps%20meter) in devtools.

To automatically collect frame rates and compare it with the normal version
- Run `npm run demo` to start the server and host the web pages
- Run `npm run perf chrome worker` to test frame rates for various rows in chrome in a Web Worker. Instead of `chrome`, you could use `android`, and instead of `worker`, you could use `normal` to test the other combinations.
- The frame rates are available in `_dbmonster.json` file, for each row count.

## Roadmap
Here are the things that need to be done next.

- ~~Enable preventDefault() semantics in events.~~
- Add support for form elements like `<input>`, `<select>`, etc.
- Support event utilities that enable things like autofocus, etc. 
