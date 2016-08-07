/**
 * Created by avim on 7/25/16.
 */
import {render} from 'ReactOverTheWireDOM';

const extensions = {
    masonry: (el, cols) => {
        let colsHeights = Array(cols).fill(0);
        const children = Array.from(el.children);
        const columnWidth = el.offsetWidth / cols;
        const childrenHeights = children.map((child) => child.offsetHeight);

        children.forEach((child, index) => {
            if (childrenHeights[index] === 0) {
                return;
            }
            const currentMinHeight = Math.min.apply(null, colsHeights);
            const nextColumn = colsHeights.findIndex((h) => h === currentMinHeight);
            child.style.top = currentMinHeight + 'px';
            child.style.left = (nextColumn * columnWidth) + 'px';
            colsHeights[nextColumn] += childrenHeights[index] + 20;
        });
        el.style.height = (Math.max.apply(null, colsHeights) + 20) + 'px';
    },
    overTheWireWS: (el, host, channel) => {
        var ws = new WebSocket(host, channel);
        ws.addEventListener("open", () => {
            render({
                addEventListener: (handler) => {
                    ws.addEventListener("message", (e) => {
                        handler(JSON.parse(e.data));
                    });
                },
                postMessage: (data) => {
                    ws.send(JSON.stringify(data));
                }
            }, el, extensions);
        });
    }
};


module.exports = extensions;