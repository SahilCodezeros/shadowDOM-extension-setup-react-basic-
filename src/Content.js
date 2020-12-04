import * as React from 'react';
import ReactDOM from 'react-dom';

import './Content.css';

/*global chrome*/

export class Test extends React.Component {
    
    render() {
        console.log('content.js loaded');

        return (
            <div className="container" id="top">
                <h2 className="h2 ff-mp-b c-gradient">
                    TESTING Shadow dom 
                </h2>
                <button onClick={ () => console.log('hiii') }>Hiii</button>
            </div>
        );
    };
};

// extension-test(content.js)
const extensionTestID = 'extension-div';
let extensionTest = document.getElementById(extensionTestID);

if (!extensionTest) {
  extensionTest = document.createElement('div');
  extensionTest.setAttribute('id', extensionTestID);
  window.document.body.append(extensionTest);
  extensionTest.attachShadow({mode: 'open'});
}

// Select our shadow host
let extensionRoot = document.getElementById('extension-div');
if (extensionRoot) {
    // Create the shadow root
    const shadowRoot = extensionRoot.shadowRoot;

    if (shadowRoot) {
        let div = shadowRoot.getElementById('extension');
        if (!div) {
            // Create a div element
            div = document.createElement('div');
            div.setAttribute('id', 'extension');

            // Append div to shadow DOM
            shadowRoot.appendChild(div);
            ReactDOM.render(<Test/>, div);
        }
    }
}