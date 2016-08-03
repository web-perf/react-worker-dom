import document from './dom/Document';
import window from './dom/Window'

import {OPS as _} from './../common/constants';
import Bridge from './bridge';

self.topElement = document.createElement('div');
Bridge.send(_.attachRoot, null, [self.topElement]);

export default self.topElement;