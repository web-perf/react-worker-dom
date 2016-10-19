import Touch from './Touch';

export default class TouchList {
    constructor(touches) {
        touches.forEach((touch, index) => {
            const touchMock = new Touch(touch);
            this[index] = touchMock;
        })
    }

    get length() {
        let hasMoreTouches = true;
        let index = 0;
        while(hasMoreTouches) {
            if (this[index]) {
                index += 1;
            } else {
                hasMoreTouches = false;
            }
        }
        return index;
    }

    item(index) {
        return this[index];
    }
}
