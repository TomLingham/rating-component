// @flow

import React from 'react';
import { render } from 'react-dom';
import App from './components/App';

const DOM_NODE_ID = 'app';

const node = document.getElementById(DOM_NODE_ID);

if (node == null) {
  throw new Error(`Unable to find DOM node '#${DOM_NODE_ID}'`);
}

render(<App />, node);
