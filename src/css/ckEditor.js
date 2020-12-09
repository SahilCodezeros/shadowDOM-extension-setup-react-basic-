export const ckEditor1 = `
    .ck.ck-placeholder:before,
    .ck .ck-placeholder:before {
        content: attr(data-placeholder);
        pointer-events: none
    }
    .ck.ck-read-only .ck-placeholder:before {
        display: none
    }
    .ck.ck-placeholder:before,
    .ck .ck-placeholder:before {
        cursor:text;
        color: #707070
    }
    .ck.ck-label {
        display:block
    }
    .ck.ck-voice-label {
        display:none
    }
    .ck.ck-label {
        font-weight:700
    }
    .ck-hidden {
        display: none !important
    }
    .ck.ck-reset,
    .ck.ck-reset_all,
    .ck.ck-reset_all * { 
        box-sizing: border-box;
        width: auto;
        height: auto;
        position: static
    }
    :root {
        --ck-z-default: 1;
        --ck-z-modal: calc(var(--ck-z-default) + 999);
        --ck-color-base-foreground: #fafafa;
        --ck-color-base-background: #fff;
        --ck-color-base-border: #c4c4c4;
        --ck-color-base-action:#61b045;
        --ck-color-base-focus:#6cb5f9;
        --ck-color-base-text:#333;
        --ck-color-base-active:#198cf0;
        --ck-color-base-active-focus:#0e7fe1;
        --ck-color-base-error:#db3700;
        --ck-color-focus-border:#1f89e5;
        --ck-color-focus-outer-shadow:#bcdefb;
        --ck-color-focus-disabled-shadow:rgba(119,186,248,0.3);
        --ck-color-focus-error-shadow:rgba(255,64,31,0.3);
        --ck-color-text:var(--ck-color-base-text);
        --ck-color-shadow-drop:rgba(0,0,0,0.15);
        --ck-color-shadow-drop-active:rgba(0,0,0,0.2);
        --ck-color-shadow-inner:rgba(0,0,0,0.1);
        --ck-color-button-default-background:transparent;
        --ck-color-button-default-hover-background:#e6e6e6;
        --ck-color-button-default-active-background:#d9d9d9;
        --ck-color-button-default-active-shadow:#bfbfbf;
        --ck-color-button-default-disabled-background:transparent;
        --ck-color-button-on-background:#dedede;
        --ck-color-button-on-hover-background:#c4c4c4;
        --ck-color-button-on-active-background:#bababa;
        --ck-color-button-on-active-shadow:#a1a1a1;
        --ck-color-button-on-disabled-background:#dedede;
        --ck-color-button-action-background:var(--ck-color-base-action);
        --ck-color-button-action-hover-background:#579e3d;
        --ck-color-button-action-active-background:#53973b;
        --ck-color-button-action-active-shadow:#498433;
        --ck-color-button-action-disabled-background:#7ec365;
        --ck-color-button-action-text:var(--ck-color-base-background);
        --ck-color-button-save:#008a00;
        --ck-color-button-cancel:#db3700;
        --ck-color-switch-button-off-background:#b0b0b0;
        --ck-color-switch-button-off-hover-background:#a3a3a3;
        --ck-color-switch-button-on-background:var(--ck-color-button-action-background);
        --ck-color-switch-button-on-hover-background:#579e3d;
        --ck-color-switch-button-inner-background:var(--ck-color-base-background);
        --ck-color-switch-button-inner-shadow:rgba(0,0,0,0.1);
        --ck-color-dropdown-panel-background:var(--ck-color-base-background);
        --ck-color-dropdown-panel-border:var(--ck-color-base-border);
        --ck-color-input-background:var(--ck-color-base-background);
        --ck-color-input-border:#c7c7c7;
        --ck-color-input-error-border:var(--ck-color-base-error);
        --ck-color-input-text:var(--ck-color-base-text);
        --ck-color-input-disabled-background:#f2f2f2;
        --ck-color-input-disabled-border:#c7c7c7;
        --ck-color-input-disabled-text:#5c5c5c;
        --ck-color-list-background:var(--ck-color-base-background);
        --ck-color-list-button-hover-background:var(--ck-color-button-default-hover-background);
        --ck-color-list-button-on-background:var(--ck-color-base-active);
        --ck-color-list-button-on-background-focus:var(--ck-color-base-active-focus);
        --ck-color-list-button-on-text:var(--ck-color-base-background);
        --ck-color-panel-background:var(--ck-color-base-background);
        --ck-color-panel-border:var(--ck-color-base-border);
        --ck-color-toolbar-background:var(--ck-color-base-foreground);
        --ck-color-toolbar-border:var(--ck-color-base-border);
        --ck-color-tooltip-background:var(--ck-color-base-text);
        --ck-color-tooltip-text:var(--ck-color-base-background);
        --ck-color-engine-placeholder-text:#707070;
        --ck-color-upload-bar-background:#6cb5f9;
        --ck-color-link-default:#0000f0;
        --ck-color-link-selected-background:rgba(31,177,255,0.1);
        --ck-disabled-opacity:.5;
        --ck-focus-outer-shadow-geometry:0 0 0 3px;
        --ck-focus-outer-shadow:var(--ck-focus-outer-shadow-geometry) var(--ck-color-focus-outer-shadow);
        --ck-focus-disabled-outer-shadow:var(--ck-focus-outer-shadow-geometry) var(--ck-color-focus-disabled-shadow);
        --ck-focus-error-outer-shadow:var(--ck-focus-outer-shadow-geometry) var(--ck-color-focus-error-shadow);
        --ck-focus-ring:1px solid var(--ck-color-focus-border);
        --ck-font-size-base:13px;
        --ck-line-height-base:1.84615;
        --ck-font-face:Helvetica,Arial,Tahoma,Verdana,Sans-Serif;
        --ck-font-size-tiny:0.7em;
        --ck-font-size-small:0.75em;
        --ck-font-size-normal:1em;
        --ck-font-size-big:1.4em;
        --ck-font-size-large:1.8em;
        --ck-ui-component-min-height:2.3em
    }
    .ck.ck-reset,
    .ck.ck-reset_all,
    .ck.ck-reset_all * {
        margin:0;padding:0;
        border:0;
        background:transparent;
        text-decoration:none;
        vertical-align:middle;
        transition:none;
        word-wrap:break-word
    }
    .ck.ck-reset_all,
    .ck.ck-reset_all * {
        border-collapse:collapse;
        font:normal normal normal var(--ck-font-size-base)/var(--ck-line-height-base) var(--ck-font-face);
        color:var(--ck-color-text);
        text-align:left;
        white-space:nowrap;
        cursor:auto;float:none
    }
    .ck.ck-reset_all .ck-rtl * {
        text-align:right
    }
    .ck.ck-reset_all iframe {
        vertical-align:inherit
    } 
    .ck.ck-reset_all textarea {
        white-space:pre-wrap
    } 
    .ck.ck-reset_all input[type=password],
    .ck.ck-reset_all input[type=text],
    .ck.ck-reset_all textarea {
        cursor:text
    }
    .ck.ck-reset_all input[type=password][disabled],
    .ck.ck-reset_all input[type=text][disabled],
    .ck.ck-reset_all textarea[disabled] {
        cursor:default
    }
    .ck.ck-reset_all fieldset {
        padding:10px;
        border:2px groove #dfdee3
    }
    .ck.ck-reset_all button::-moz-focus-inner {
        padding:0;
        border:0
    }
    .ck[dir=rtl],
    .ck[dir=rtl] .ck {
        text-align:right
    }
    :root {
        --ck-border-radius:2px;
        --ck-inner-shadow:2px 2px 3px var(--ck-color-shadow-inner) inset;
        --ck-drop-shadow:0 1px 2px 1px var(--ck-color-shadow-drop);
        --ck-drop-shadow-active:0 3px 6px 1px var(--ck-color-shadow-drop-active);
        --ck-spacing-unit:0.6em;
        --ck-spacing-large:calc(var(--ck-spacing-unit)*1.5);
        --ck-spacing-standard:var(--ck-spacing-unit);
        --ck-spacing-medium:calc(var(--ck-spacing-unit)*0.8);
        --ck-spacing-small:calc(var(--ck-spacing-unit)*0.5);
        --ck-spacing-tiny:calc(var(--ck-spacing-unit)*0.3);
        --ck-spacing-extra-tiny:calc(var(--ck-spacing-unit)*0.16)
    }
    .ck.ck-editor__editable:not(.ck-editor__nested-editable) {
        border-radius:0
    }
    .ck-rounded-corners .ck.ck-editor__editable:not(.ck-editor__nested-editable),
    .ck.ck-editor__editable:not(.ck-editor__nested-editable).ck-rounded-corners {
        border-radius:var(--ck-border-radius)
    }
    .ck.ck-editor__editable:not(.ck-editor__nested-editable).ck-focused {
        outline:none;
        border:var(--ck-focus-ring);
        box-shadow:var(--ck-inner-shadow),0 0
    }
    .ck.ck-editor__editable_inline {
        overflow:auto;
        padding:0 var(--ck-spacing-standard);
        border:1px solid transparent
    }
    .ck.ck-editor__editable_inline[dir=ltr] {
        text-align:left
    }
    .ck.ck-editor__editable_inline[dir=rtl] {
        text-align:right
    }
    .ck.ck-editor__editable_inline>:first-child {
        margin-top:var(--ck-spacing-large)
    }
    .ck.ck-editor__editable_inline>:last-child {
        margin-bottom:var(--ck-spacing-large)
    }
    .ck.ck-balloon-panel.ck-toolbar-container[class*=arrow_n]:after {
        border-bottom-color:var(--ck-color-base-foreground)
    }
    .ck.ck-balloon-panel.ck-toolbar-container[class*=arrow_s]:after {
        border-top-color:var(--ck-color-base-foreground)
    }
`;

const ckEditor2 = `

`;

const ckEditor3 = `

`;

const ckEditor4 = `

`;

const ckEditor5 = `

`;

const ckEditor6 = `

`;

const ckEditor7 = `

`;

const ckEditor8 = `

`;

const ckEditor9 = `

`;

const ckEditor10 = `

`;

const ckEditor11 = `

`;

const ckEditor12 = `

`;

const ckEditor13 = `

`;
