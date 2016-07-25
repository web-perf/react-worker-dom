/**
 * Created by avim on 7/25/16.
 */

const extensions = {
    masonry: (el, cols)=> {
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
    }
};


module.exports = extensions;