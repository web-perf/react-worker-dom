
import {render} from 'reactworker-onPage';



render(new Worker('/react-worker-dom/dist/todo/worker-impl.js'), document.getElementById('content'));
