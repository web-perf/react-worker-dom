/*
Performance Measurement suite for the DBMonster app

- Ensure that a HTTP server is running at the root of this project
- Ensure that the project is built and dist folder has all the generated files
 */

var fs = require('fs');
var browserPerf = require('browser-perf');

var ROWS = [1, 2, 3, 5, 7, 10, 15, 20, 25, 30, 40, 50, 60, 70, 80, 90, 100, 120, 150, 170, 200];
var FILE = '_dbmonster-perf.json';

var IS_WORKER = true;
var BROWSER = 'chrome'

if (process.argv[2] !== 'worker') {
    IS_WORKER = false;
}
if (process.argv[3] !== 'chrome') {
    BROWSER = 'android';
}

console.log(IS_WORKER, BROWSER);
return

(function run(i) {
    if (i < ROWS.length) {
        var row = ROWS[i];
        var url = ['http://localhost:8080/test/dbmonster/index.html#worker=', IS_WORKER, '&rows=', row].join('');
        browserPerf(null, function(err, res) {
            if (err) {
                console.log('ERROR', err);
            } else {
                saveResults(res[0], BROWSER + (IS_WORKER ? 'worker' : 'normal'), row);
                run(i + 1);
            }
        }, {
            selenium: 'http://localhost:9515',
            preScript: function(b) {
                return b.get(url).then(function() {
                    return b.sleep(3000);
                })
            },
            actions: [function(cfg) {
                return function(b) {
                    return b.sleep(5000);
                }
            }],
            browsers: [{
                browserName: BROWSER
            }],
            metrics: ['TimelineMetrics']
        });
    }
}(0));



function saveResults(result, isWorker, rows) {
    var res = {};

    try {
        res = JSON.parse(fs.readFileSync(FILE));
    } catch (e) {}
    if (typeof res[isWorker] === 'undefined') {
        res[isWorker] = {};
    }
    if (typeof res[isWorker][rows] === 'undefined') {
        res[isWorker][rows] = [];
    }
    res[isWorker][rows].push(result['framesPerSec (devtools)']);
    fs.writeFileSync(FILE, JSON.stringify(res, null, 4));
}
