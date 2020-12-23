import React, { useEffect, memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBold, faItalic, faUnderline, faLink, faStrikethrough } from '@fortawesome/free-solid-svg-icons';

import { textEditor1 } from '../css/textEditor';

const TextEditor = memo((props) => {
    const { onChange } = props;

    // Udate description function
    const updateDescription = () => {
        const shadowRoot = document.getElementById('extension-div').shadowRoot;
        if (
            shadowRoot.querySelector('iframe') && 
            shadowRoot.querySelector('iframe').contentWindow.document.body.getAttribute('eventadded') !== 'true'
        ) {
            shadowRoot.querySelector('iframe').contentWindow.document.body.setAttribute('eventadded', 'true');
            shadowRoot.querySelector('iframe').contentWindow.document.body.addEventListener('keyup', (e) => {
                e.preventDefault();

                // Call change function of parent component
                onChange(e.target.innerHTML);
            });
        }
    };

    // On button click handler function
    const onButtonClickHandler = (command) => {
        const shadowRoot = document.getElementById('extension-div').shadowRoot;

        if (command !== 'createLink') {
            // Execute exec command function
            shadowRoot.querySelector('iframe').contentWindow.document.execCommand(command, false, null);

        } else {
            let promptValue = prompt('Enter a URL', '');            
            if (!promptValue || promptValue === '') return;

            // Execute exec command function
            shadowRoot.querySelector('iframe').contentWindow.document.execCommand(
                command, 
                false, 
                promptValue
            );
        }

        // Get innerHTML of body
        const description = shadowRoot.querySelector('iframe').contentWindow.document.body.innerHTML;

        // Call on change function
        onChange(description);
    };

    // Enable edit moda function
    const enableEditMode = () => {
        const shadowRoot = document.getElementById('extension-div').shadowRoot;

        // Content editable true
        shadowRoot.querySelector('iframe').contentWindow.document.body.contentEditable = true;
    };

    useEffect(() => {
        // Call enable edit mode function
        enableEditMode();

        // Call update description function
        updateDescription();   
    }, []);

    // const shadowRoot = document.getElementById('extension-div').shadowRoot;
    // if (shadowRoot.querySelector('iframe')) {
    //     if (shadowRoot.querySelector('iframe').contentWindow.document.body.getAttribute('contenteditable') !== 'true') {
    //         // Call enable edit mode function
    //         enableEditMode();
    //     }

    //     if (shadowRoot.querySelector('iframe').contentWindow.document.body.getAttribute('eventadded') !== 'true') {
    //         // Call update description function
    //         updateDescription(); 
    //     }
    // }

    return (
        <>
            <style>{ textEditor1 }</style>
            <div id="custom-text-editor">
                <div className="button-container">
                    <button 
                        type="button" 
                        className="text-editor-button"
                        onClick={ (e) => onButtonClickHandler('bold') }
                    >
                        <FontAwesomeIcon icon={ faBold } size="sm" />
                    </button>
                    <button 
                        type="button" 
                        className="text-editor-button"
                        onClick={ (e) => onButtonClickHandler('italic') }
                    >
                        <FontAwesomeIcon icon={ faItalic } size="sm" />
                    </button>
                    <button 
                        type="button" 
                        className="text-editor-button"
                        onClick={ (e) => onButtonClickHandler('underline') }
                    >
                        <FontAwesomeIcon icon={ faUnderline } size="sm" />
                    </button>
                    <button 
                        type="button" 
                        className="text-editor-button"
                        onClick={ (e) => onButtonClickHandler('strikeThrough') }
                    >
                        <FontAwesomeIcon icon={ faStrikethrough } size="sm" />
                    </button>
                    <button 
                        type="button" 
                        className="text-editor-button"
                        onClick={ (e) => onButtonClickHandler('createLink') }
                    >
                        <FontAwesomeIcon icon={ faLink } size="sm" />
                    </button>
                </div>

                <iframe 
                    name="richTextField" 
                    title="custom-text-editor" 
                    className="text-editor-frame"
                >
                </iframe>
            </div>
        </>
    );
});

export default TextEditor;