
import {render} from 'react-worker-dom';



render(new Worker('/dist/todo/worker-impl.js'), document.getElementById('content'));
