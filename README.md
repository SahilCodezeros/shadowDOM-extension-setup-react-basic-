For this setup changes done in manifest.json, webpack.config.js files.

To use webpack.config.js run npm run eject command.

---> In manifest.json

remove css property from content_script in manifest.json file

"content_scripts": [{
    "matches": [
      "<all_urls>",
      "http://*/*",
      "https://*/*"
    ],
    "js": [
      "/static/js/content.js"
    ],
    "run_at": "document_end"
}],

---> In webpack.config.js

Use style-loader for injecting style tag in desire element

{
    loader: 'style-loader',
    options: {
        insert: function (element) {
        // const extensionHostID = 'root';
        // let extensionHost = document.getElementById(extensionHostID);

        // if (!extensionHost) {
        //   extensionHost = document.createElement('div');
        //   extensionHost.setAttribute('id', extensionHostID);
        //   window.document.body.append(extensionHost);
        //   extensionHost.attachShadow({mode: 'open'});
        //   // Add style tag to shadow host
        //   extensionHost.shadowRoot.appendChild(element);
        // }

        // extension-test(content.js)
        const extensionTestID = 'extension-div';
        let extensionTest = document.getElementById(extensionTestID);

        if (!extensionTest) {
            extensionTest = document.createElement('div');
            extensionTest.setAttribute('id', extensionTestID);
            window.document.body.append(extensionTest);
            extensionTest.attachShadow({mode: 'open'});
            // Add style tag to shadow host
            extensionTest.shadowRoot.appendChild(element);
        }
        },
    },
}