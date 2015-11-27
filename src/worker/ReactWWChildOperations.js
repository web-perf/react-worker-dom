import ReactMultiChildUpdateTypes from 'react/lib/ReactMultiChildUpdateTypes';
import ReactWWIDOperations from './ReactWWIDOperations';

const {
    INSERT_MARKUP, MOVE_EXISTING, SET_MARKUP, TEXT_CONTENT, REMOVE_NODE
} =
ReactMultiChildUpdateTypes;

export const actions = {
    [INSERT_MARKUP](update, components) {
        const parent = update.parentNode;
        const child = components[update.markupIndex];

        if (typeof child === 'string' || typeof child === 'number') {
            parent.setContent(child);
        } else {
            parent.appendChild(child.getPublicInstance());
        }
    }, [MOVE_EXISTING]() {
        console.log(MOVE_EXISTING);
    }, [SET_MARKUP]() {
        console.log(SET_MARKUP);
    }, [TEXT_CONTENT]() {
        console.log(TEXT_CONTENT);
    }, [REMOVE_NODE](update, components) {
        console.log(REMOVE_NODE)
    }
};

export function processChildrenUpdates(updates, components) {
    for (let i = 0, l = updates.length; i < l; ++i) {
        updates[i].parentNode = ReactWWIDOperations.get(updates[i].parentID);
        let update = updates[i];
        actions[update.type](update, components);
    }
}

export function replaceNodeWithMarkupByID(id, markup) {
    console.log(id, markup);
    const node = ReactWWIDOperations.get(id);

    const nextNode = markup.getPublicInstance();
    const parentNode = node.parent;

    if (parentNode) {
        parentNode.remove(node);
        parentNode.add(nextNode);
    }
}
