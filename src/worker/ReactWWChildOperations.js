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
            if (update.toIndex){
                parent.addChildAtIndex(child.getPublicInstance(), update.toIndex);
            } else {
                parent.addChild(child.getPublicInstance());
            }
        }
    }, [MOVE_EXISTING]() {
        console.log(MOVE_EXISTING);
    }, [SET_MARKUP]() {
        console.log(SET_MARKUP);
    }, [TEXT_CONTENT]() {
        console.log(TEXT_CONTENT);
    }, [REMOVE_NODE](update, components) {
        // FIXME - Since this is async, if more than one node from the same parent 
        // Node is to be removed, this causes an error
        update.parentNode.removeChildFromIndex(update.fromIndex);
    }
};

export function processChildrenUpdates(updates, components) {
    for (let i = 0, l = updates.length; i < l; ++i) {
        updates[i].parentNode = ReactWWIDOperations.get(updates[i].parentID);
        let update = updates[i];
        actions[update.type](update, components);
    }
}

export function replaceNodeWithMarkupByID(reactId, markup) {
    // reactId here is the reactId of the old node
    // By the time we are here, the oldNode is already unmounted and hence gone from ReactWWOps
    // ASSUMPTION: The nextNode has the same reactId as the old node

    const nextNode = markup.getPublicInstance();
    nextNode.replaceAt(reactId);

}
