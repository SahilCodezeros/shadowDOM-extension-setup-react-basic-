export const textEditor1 = `
    #custom-text-editor {
        width: 100%;
    }

    .button-container {
        border: 1px solid #dddddd;
        padding-bottom: 3px;
        background: #fafafa;
        border-bottom: 0px !important;
        border-radius: 4px 4px 0px 0px;
    }

    .text-editor-button {
        width: 28px;
        height: 28px;
        margin-top: 5px;
        border-radius: 3px;
        border-color: #fafafa;
        border: 1px solid #fafafa;  
    }

    .active-text-button {
        border: 1px solid #ccc;
        background-color: #ccc;
    }

    .text-editor-button svg {
        width: 12px;
        height: 12px;
    }

    .text-editor-frame {
        height: 80px;
        widht: 270px;
        border: 1px solid #dddddd;
        border-radius: 0px 0px 4px 4px;
    }

    .modal-body .text-editor-frame {
        width: 99.5%;
    }

    .popover-inner .text-editor-frame {
        width: 99.2%;
    }

    .create-link-container {
        display: none;
        // position: absolute;
        top: 0;
        left: 0;
        right: 0;
        font-size: 1em;
        padding: 15px 10px;
        background: #fff;
        box-shadow: 0 0.3em 1em #ccc;
        border-top: 2px solid #888;
        border-radius: 5px;
        z-index: 5;
    }

    .create-link {
        display: flex;
        // align-items: baseline;  
    }

    .create-link-input {
        // flex: 1;
        height: 15px;
        font-size: 12px;
        width: 100%;
        // font-size: inherit;
        font-weight: normal;
        padding: 0.5em 0.8em;
        margin: 0 10px 0 0;
        border-radius: 3px;
        border: 1px solid #bbb;
        background-color: #fff;
        box-shadow: none;
        outline: none;
        -webkit-appearance: none;
        -moz-appearance: none;
    }

    .create-link-button-container {
        width: 48%;
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        // border: 1px solid #bbb;
        border-top-color: #ccc;
        border-bottom-color: #888;
        border-radius: 3px;
        margin: 0;
    }

    .create-link-button {
        padding: 0.5em;
        border-bottom: none;
        position: relative;
        float: left;
        font-size: 0.75em;
        white-space: nowrap;
        margin: 0;
        background: #fb542b !important;
        border: 1px solid #fb542b;
        color: #fff;
        text-transform: uppercase;
        font-weight: 400;
        outline: none;
        cursor: pointer;
    }

    .create-link-button:hover {
        background: #ffffff !important;
        border: 1px solid #fb542b;
        color: #fb542b;
    }

    .create-link-button:not(:first-child) {
        border-left: 1px solid #ccc !important;
    }
`;
