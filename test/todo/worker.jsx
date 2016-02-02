
import {render} from 'react-worker-dom';



render(new Worker('/react-worker-dom/dist/todo/worker-impl.js'), document.getElementById('content'));
