import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// // Select our shadow host
// let extensionRoot = document.getElementById('extension-root');
// if (extensionRoot) {
//   // Create the shadow root
//   const shadowRoot = extensionRoot.shadowRoot;

//   if (shadowRoot) {
//     let div = shadowRoot.getElementById('extension');
//     if (!div) {
//       // Create a div element
//       div = document.createElement('div');
//       div.setAttribute('id', 'extension');

//       // Append div to shadow DOM
//       shadowRoot.appendChild(div);
//       // ReactDOM.render(<Test/>, div);

//       ReactDOM.render(
//         <React.StrictMode>
//           <App />
//         </React.StrictMode>,
//         div
//       );
//     }
//   }
// }

ReactDOM.render(
  // <React.StrictMode>
    <App />,
  // </React.StrictMode>,
  document.getElementById('extension-div')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
