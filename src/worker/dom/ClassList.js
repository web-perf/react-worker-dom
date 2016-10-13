class ClassList {
    constructor(domElement) {
        this._domElement = domElement;
    }
    add(value) {
        const classList = this._getCurrentClassList()
        const newClassNames = (typeof value === 'string') ? [value] : value;
        classList.push(...newClassNames);
        this._domElement.setAttribute('className', classList.join(' '));
    }
    remove(value) {
        const classList = this._getCurrentClassList();
        const classNames = (typeof value === 'string') ? [value] : value;
        classNames.forEach((className) => {
            const index = classList.indexOf(value);
            if (index >= 0) {
                classList.splice(index, 1);
            }
        })
        this._domElement.setAttribute('className', classList.join(' '));
    }
    item(index) {
        const classList = this._getCurrentClassList();
        return classList[index];
    }
    contains(value) {
        const classList = this._getCurrentClassList();
        return classList.includes(value);
    }
    toggle(value) {
        console.log('TODO: Implement classList.toggle()')
    }
    _getCurrentClassList() {
        if (this._domElement.attributes['className']) {
            return this._domElement.attributes['className'].split(' ');
        }
        return [];
    }
}

export default ClassList;
