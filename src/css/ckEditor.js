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
    .ck.ck-label {
        display:block
    }
    .ck.ck-voice-label {
        display:none
    }
    .ck.ck-label {
        font-weight:700
    }
    .ck.ck-sticky-panel .ck-sticky-panel__content_sticky {
        z-index:var(--ck-z-modal);
        position:fixed;top:0
    }
    .ck.ck-sticky-panel .ck-sticky-panel__content_sticky_bottom-limit {
        top:auto;position:absolute
    }
    .ck.ck-sticky-panel .ck-sticky-panel__content_sticky {
        box-shadow:var(--ck-drop-shadow),0 0;
        border-width:0 1px 1px;
        border-top-left-radius:0;
        border-top-right-radius:0
    }
    .ck.ck-dropdown {
        display:inline-block;
        position:relative
    }
    .ck.ck-dropdown .ck-dropdown__arrow {
        pointer-events:none;
        z-index:var(--ck-z-default)
    }
    .ck.ck-dropdown .ck-button.ck-dropdown__button {
        width:100%
    }
    .ck.ck-dropdown .ck-button.ck-dropdown__button.ck-on .ck-tooltip {
        display:none
    }
    .ck.ck-dropdown .ck-dropdown__panel {
        -webkit-backface-visibility:hidden;
        display:none;
        z-index:var(--ck-z-modal);
        position:absolute
    }
    .ck.ck-dropdown .ck-dropdown__panel.ck-dropdown__panel-visible {
        display:inline-block
    }
    .ck.ck-dropdown .ck-dropdown__panel.ck-dropdown__panel_ne,
    .ck.ck-dropdown .ck-dropdown__panel.ck-dropdown__panel_nw {
        bottom:100%
    }
    .ck.ck-dropdown .ck-dropdown__panel.ck-dropdown__panel_se,
    .ck.ck-dropdown .ck-dropdown__panel.ck-dropdown__panel_sw {
        top:100%;bottom:auto
    }
    .ck.ck-dropdown .ck-dropdown__panel.ck-dropdown__panel_ne,
    .ck.ck-dropdown .ck-dropdown__panel.ck-dropdown__panel_se {
        left:0
    }
    .ck.ck-dropdown .ck-dropdown__panel.ck-dropdown__panel_nw,
    .ck.ck-dropdown .ck-dropdown__panel.ck-dropdown__panel_sw {
        right:0
    }
    :root {
        --ck-dropdown-arrow-size:calc(var(--ck-icon-size)*0.5)
    }
    .ck.ck-dropdown {
        font-size:inherit
    }
    .ck.ck-dropdown .ck-dropdown__arrow {
        width:var(--ck-dropdown-arrow-size)
    }
    [dir=ltr] .ck.ck-dropdown .ck-dropdown__arrow {
        right:var(--ck-spacing-standard);
        margin-left:var(--ck-spacing-small)
    }
    [dir=rtl] .ck.ck-dropdown .ck-dropdown__arrow {
        left:var(--ck-spacing-standard);
        margin-right:var(--ck-spacing-small)
    }
    .ck.ck-dropdown.ck-disabled .ck-dropdown__arrow {
        opacity:var(--ck-disabled-opacity)
    }
    [dir=ltr] .ck.ck-dropdown .ck-button.ck-dropdown__button:not(.ck-button_with-text) {
        padding-left:var(--ck-spacing-small)
    }
    [dir=rtl] .ck.ck-dropdown .ck-button.ck-dropdown__button:not(.ck-button_with-text) {
        padding-right:var(--ck-spacing-small)
    }
    .ck.ck-dropdown .ck-button.ck-dropdown__button .ck-button__label {
        width:7em;
        overflow:hidden;
        text-overflow:ellipsis
    }
    .ck.ck-dropdown .ck-button.ck-dropdown__button.ck-disabled .ck-button__label {
        opacity:var(--ck-disabled-opacity)
    }
    .ck.ck-dropdown .ck-button.ck-dropdown__button.ck-on {
        border-bottom-left-radius:0;
        border-bottom-right-radius:0
    }
    .ck.ck-dropdown__panel {
        border-radius:0
    }
    .ck-rounded-corners .ck.ck-dropdown__panel,
    .ck.ck-dropdown__panel.ck-rounded-corners {
        border-radius:var(--ck-border-radius)
    }
    .ck.ck-dropdown__panel {
        box-shadow:var(--ck-drop-shadow),0 0;
        background:var(--ck-color-dropdown-panel-background);
        border:1px solid var(--ck-color-dropdown-panel-border);
        bottom:0;min-width:100%
    }
    .ck.ck-dropdown__panel.ck-dropdown__panel_se {
        border-top-left-radius:0
    }
    .ck.ck-dropdown__panel.ck-dropdown__panel_sw {
        border-top-right-radius:0
    }
    .ck.ck-dropdown__panel.ck-dropdown__panel_ne {
        border-bottom-left-radius:0
    }
    .ck.ck-dropdown__panel.ck-dropdown__panel_nw {
        border-bottom-right-radius:0
    }
`;

export const ckEditor2 = `
    .ck.ck-icon {
        vertical-align:middle
    }
    :root {
        --ck-icon-size:calc(var(--ck-line-height-base)*var(--ck-font-size-normal))
    }
    .ck.ck-icon {
        width:var(--ck-icon-size);
        height:var(--ck-icon-size);
        font-size:.8333350694em;
        will-change:transform
    }
    .ck.ck-icon,.ck.ck-icon * {
        color:inherit;cursor:inherit
    }
    .ck.ck-icon :not([fill]) {
        fill:currentColor
    }
    .ck.ck-tooltip,
    .ck.ck-tooltip .ck-tooltip__text:after {
        position:absolute;
        pointer-events:none;
        -webkit-backface-visibility:hidden
    }
    .ck.ck-tooltip {
        visibility:hidden;opacity:0;
        display:none;
        z-index:var(--ck-z-modal)
    }
    .ck.ck-tooltip .ck-tooltip__text {
        display:inline-block
    }
    .ck.ck-tooltip .ck-tooltip__text:after {
        content:"";
        width:0;
        height:0
    }
    :root {
        --ck-tooltip-arrow-size:5px
    }
    .ck.ck-tooltip {
        left:50%;
        top:0;
        transition:opacity .2s ease-in-out .2s
    }
    .ck.ck-tooltip .ck-tooltip__text {
        border-radius:0
    }
    .ck-rounded-corners .ck.ck-tooltip .ck-tooltip__text,
    .ck.ck-tooltip .ck-tooltip__text.ck-rounded-corners {
        border-radius:var(--ck-border-radius)
    }
    .ck.ck-tooltip .ck-tooltip__text {
        font-size:.9em;
        line-height:1.5;
        color:var(--ck-color-tooltip-text);
        padding:var(--ck-spacing-small) var(--ck-spacing-medium);
        background:var(--ck-color-tooltip-background);
        position:relative;left:-50%
    }
    .ck.ck-tooltip .ck-tooltip__text:after {
        transition:opacity .2s ease-in-out .2s;
        border-style:solid;
        left:50%
    }
    .ck.ck-tooltip.ck-tooltip_s {
        bottom:calc(var(--ck-tooltip-arrow-size)*-1);
        transform:translateY(100%)
    }
    .ck.ck-tooltip.ck-tooltip_s .ck-tooltip__text:after {
        top:calc(var(--ck-tooltip-arrow-size)*-1);
        transform:translateX(-50%);
        border-left-color:transparent;
        border-bottom-color:var(--ck-color-tooltip-background);
        border-right-color:transparent;
        border-top-color:transparent;
        border-left-width:var(--ck-tooltip-arrow-size);
        border-bottom-width:var(--ck-tooltip-arrow-size);
        border-right-width:var(--ck-tooltip-arrow-size);
        border-top-width:0
    }
    .ck.ck-tooltip.ck-tooltip_n {
        top:calc(var(--ck-tooltip-arrow-size)*-1);
        transform:translateY(-100%)
    }
    .ck.ck-tooltip.ck-tooltip_n .ck-tooltip__text:after {
        bottom:calc(var(--ck-tooltip-arrow-size)*-1);
        transform:translateX(-50%);
        border-left-color:transparent;
        border-bottom-color:transparent;
        border-right-color:transparent;
        border-top-color:var(--ck-color-tooltip-background);
        border-left-width:var(--ck-tooltip-arrow-size);
        border-bottom-width:0;
        border-right-width:var(--ck-tooltip-arrow-size);
        border-top-width:var(--ck-tooltip-arrow-size)
    }
    .ck.ck-button,
    a.ck.ck-button {
        -moz-user-select:none;
        -webkit-user-select:none;
        -ms-user-select:none;
        user-select:none
    }
    .ck.ck-button .ck-tooltip,
    a.ck.ck-button .ck-tooltip{
        display:block
    }
    @media (hover:none){
        .ck.ck-button .ck-tooltip,
        a.ck.ck-button .ck-tooltip{
            display:none
        }
    }
    .ck.ck-button,
    a.ck.ck-button{
        position:relative;
        display:inline-flex;align-items:center;
        justify-content:left
    }
    .ck.ck-button .ck-button__label,
    a.ck.ck-button .ck-button__label{
        display:none
    }
    .ck.ck-button.ck-button_with-text .ck-button__label,
    a.ck.ck-button.ck-button_with-text .ck-button__label{
        display:inline-block
    }
    .ck.ck-button:not(.ck-button_with-text),
    a.ck.ck-button:not(.ck-button_with-text){
        justify-content:center
    }
    .ck.ck-button:hover .ck-tooltip,a.ck.ck-button:hover .ck-tooltip{
        visibility:visible;
        opacity:1
    }
    .ck.ck-button:focus:not(:hover) .ck-tooltip,
    a.ck.ck-button:focus:not(:hover) .ck-tooltip{
        display:none
    }
    .ck.ck-button,
    a.ck.ck-button{
        background:var(--ck-color-button-default-background)
    }
    .ck.ck-button:not(.ck-disabled):hover,
    a.ck.ck-button:not(.ck-disabled):hover{
        background:var(--ck-color-button-default-hover-background)
    }
    .ck.ck-button:not(.ck-disabled):active,
    a.ck.ck-button:not(.ck-disabled):active{
        background:var(--ck-color-button-default-active-background);
        box-shadow:inset 0 2px 2px var(--ck-color-button-default-active-shadow)
    }
    .ck.ck-button.ck-disabled,
    a.ck.ck-button.ck-disabled{
        background:var(--ck-color-button-default-disabled-background)
    }
    .ck.ck-button,a.ck.ck-button{
        border-radius:0
    }
    .ck-rounded-corners .ck.ck-button,
    .ck-rounded-corners a.ck.ck-button,
    .ck.ck-button.ck-rounded-corners,
    a.ck.ck-button.ck-rounded-corners{
        border-radius:var(--ck-border-radius)
    }
    .ck.ck-button,a.ck.ck-button{
        white-space:nowrap;
        cursor:default;
        vertical-align:middle;
        padding:var(--ck-spacing-tiny);
        text-align:center;
        min-width:var(--ck-ui-component-min-height);
        min-height:var(--ck-ui-component-min-height);
        line-height:1;
        font-size:inherit;
        border:1px solid transparent;
        transition:box-shadow .2s ease-in-out,border .2s ease-in-out;
        -webkit-appearance:none
    }
    .ck.ck-button:active,
    .ck.ck-button:focus,
    a.ck.ck-button:active,
    a.ck.ck-button:focus{
        outline:none;border:var(--ck-focus-ring);
        box-shadow:var(--ck-focus-outer-shadow),0 0
    }
    .ck.ck-button .ck-button__icon use,
    .ck.ck-button .ck-button__icon use *,
    a.ck.ck-button .ck-button__icon use,
    a.ck.ck-button .ck-button__icon use *{
        color:inherit
    }
    .ck.ck-button .ck-button__label,
    a.ck.ck-button .ck-button__label{
        font-size:inherit;
        font-weight:inherit;
        color:inherit;
        cursor:inherit;
        vertical-align:middle
    }
    [dir=ltr] .ck.ck-button .ck-button__label,
    [dir=ltr] a.ck.ck-button .ck-button__label{
        text-align:left
    }
    [dir=rtl] .ck.ck-button .ck-button__label,
    [dir=rtl] a.ck.ck-button .ck-button__label{
        text-align:right
    }
    .ck.ck-button .ck-button__keystroke,
    a.ck.ck-button .ck-button__keystroke{
        color:inherit
    }
    [dir=ltr] .ck.ck-button .ck-button__keystroke,
    [dir=ltr] a.ck.ck-button .ck-button__keystroke{
        margin-left:var(--ck-spacing-large)
    }
    [dir=rtl] .ck.ck-button .ck-button__keystroke,
    [dir=rtl] a.ck.ck-button .ck-button__keystroke{
        margin-right:var(--ck-spacing-large)
    }
    .ck.ck-button .ck-button__keystroke,
    a.ck.ck-button .ck-button__keystroke{
        font-weight:700;opacity:.7
    }
    .ck.ck-button.ck-disabled:active,
    .ck.ck-button.ck-disabled:focus,
    a.ck.ck-button.ck-disabled:active,
    a.ck.ck-button.ck-disabled:focus{
        box-shadow:var(--ck-focus-disabled-outer-shadow),0 0
    }
    .ck.ck-button.ck-disabled .ck-button__icon,
    a.ck.ck-button.ck-disabled .ck-button__icon{
        opacity:var(--ck-disabled-opacity)
    }
    .ck.ck-button.ck-disabled .ck-button__label,
    a.ck.ck-button.ck-disabled .ck-button__label{
        opacity:var(--ck-disabled-opacity)
    }
    .ck.ck-button.ck-disabled .ck-button__keystroke,
    a.ck.ck-button.ck-disabled .ck-button__keystroke{
        opacity:.3
    }
    .ck.ck-button.ck-button_with-text,
    a.ck.ck-button.ck-button_with-text{
        padding:var(--ck-spacing-tiny) var(--ck-spacing-standard)
    }
    [dir=ltr] .ck.ck-button.ck-button_with-text .ck-button__icon,
    [dir=ltr] a.ck.ck-button.ck-button_with-text .ck-button__icon{
        margin-left:calc(var(--ck-spacing-small)*-1);
        margin-right:var(--ck-spacing-small)
    }
    [dir=rtl] .ck.ck-button.ck-button_with-text .ck-button__icon,
    [dir=rtl] a.ck.ck-button.ck-button_with-text .ck-button__icon{
        margin-right:calc(var(--ck-spacing-small)*-1);
        margin-left:var(--ck-spacing-small)
    }
    .ck.ck-button.ck-button_with-keystroke .ck-button__label,
    a.ck.ck-button.ck-button_with-keystroke .ck-button__label{
        flex-grow:1
    }
    .ck.ck-button.ck-on,
    a.ck.ck-button.ck-on{
        background:var(--ck-color-button-on-background)
    }
    .ck.ck-button.ck-on:not(.ck-disabled):hover,
    a.ck.ck-button.ck-on:not(.ck-disabled):hover{
        background:var(--ck-color-button-on-hover-background)
    }
    .ck.ck-button.ck-on:not(.ck-disabled):active,
    a.ck.ck-button.ck-on:not(.ck-disabled):active{
        background:var(--ck-color-button-on-active-background);
        box-shadow:inset 0 2px 2px var(--ck-color-button-on-active-shadow)
    }
    .ck.ck-button.ck-on.ck-disabled,
    a.ck.ck-button.ck-on.ck-disabled{
        background:var(--ck-color-button-on-disabled-background)
    }
    .ck.ck-button.ck-button-save,
    a.ck.ck-button.ck-button-save{
        color:var(--ck-color-button-save)
    }
    .ck.ck-button.ck-button-cancel,
    a.ck.ck-button.ck-button-cancel{
        color:var(--ck-color-button-cancel)
    }
    .ck.ck-button-action,
    a.ck.ck-button-action{
        background:var(--ck-color-button-action-background)
    }
    .ck.ck-button-action:not(.ck-disabled):hover,
    a.ck.ck-button-action:not(.ck-disabled):hover{
        background:var(--ck-color-button-action-hover-background)
    }
    .ck.ck-button-action:not(.ck-disabled):active,a.ck.ck-button-action:not(.ck-disabled):active{
        background:var(--ck-color-button-action-active-background);
        box-shadow:inset 0 2px 2px var(--ck-color-button-action-active-shadow)
    }
    .ck.ck-button-action.ck-disabled,
    a.ck.ck-button-action.ck-disabled{
        background:var(--ck-color-button-action-disabled-background)
    }
    .ck.ck-button-action,a.ck.ck-button-action{
        color:var(--ck-color-button-action-text)
    }
    .ck.ck-button-bold,
    a.ck.ck-button-bold{
        font-weight:700
    }
`;

export const ckEditor3 = `
    .ck.ck-list{
        -moz-user-select:none;
        -webkit-user-select:none;
        -ms-user-select:none;
        user-select:none;
        display:flex;
        flex-direction:column
    }
    .ck.ck-list .ck-list__item,
    .ck.ck-list .ck-list__separator{
        display:block
    }
    .ck.ck-list .ck-list__item>:focus{
        position:relative;
        z-index:var(--ck-z-default)
    }
    .ck.ck-list{
        border-radius:0
    }
    .ck-rounded-corners .ck.ck-list,
    .ck.ck-list.ck-rounded-corners{
        border-radius:var(--ck-border-radius)
    }
    .ck.ck-list{
        list-style-type:none;
        background:var(--ck-color-list-background)
    }
    .ck.ck-list__item{
        cursor:default;
        min-width:12em
    }
    .ck.ck-list__item .ck-button{
        min-height:unset;
        width:100%;
        text-align:left;
        border-radius:0;
        padding:calc(var(--ck-line-height-base)*0.2*var(--ck-font-size-base)) calc(var(--ck-line-height-base)*0.4*var(--ck-font-size-base))
    }
    .ck.ck-list__item .ck-button .ck-button__label{
        line-height:calc(var(--ck-line-height-base)*1.2*var(--ck-font-size-base))
    }
    .ck.ck-list__item .ck-button:active{
        box-shadow:none
    }
    .ck.ck-list__item .ck-button.ck-on{
        background:var(--ck-color-list-button-on-background);
        color:var(--ck-color-list-button-on-text)
    }
    .ck.ck-list__item .ck-button.ck-on:active{
        box-shadow:none
    }
    .ck.ck-list__item .ck-button.ck-on:hover:not(.ck-disabled){
        background:var(--ck-color-list-button-on-background-focus)
    }
    .ck.ck-list__item .ck-button.ck-on:focus:not(.ck-disabled){
        border-color:var(--ck-color-base-background)
    }
    .ck.ck-list__item .ck-button:hover:not(.ck-disabled){
        background:var(--ck-color-list-button-hover-background)
    }
    .ck.ck-list__item .ck-switchbutton.ck-on{
        background:var(--ck-color-list-background);
        color:inherit
    }
    .ck.ck-list__item .ck-switchbutton.ck-on:hover:not(.ck-disabled){
        background:var(--ck-color-list-button-hover-background);
        color:inherit
    }
    .ck.ck-list__separator{
        height:1px;
        width:100%;
        background:var(--ck-color-base-border)
    }
    .ck.ck-button.ck-switchbutton .ck-button__toggle,
    .ck.ck-button.ck-switchbutton .ck-button__toggle .ck-button__toggle__inner{
        display:block
    }
    :root{
        --ck-switch-button-toggle-width:2.6153846154em;
        --ck-switch-button-toggle-inner-size:1.0769230769em;
        --ck-switch-button-toggle-spacing:1px;
        --ck-switch-button-translation:1.3846153847em
    }
    dir=ltr] .ck.ck-button.ck-switchbutton .ck-button__label{
        margin-right:calc(var(--ck-spacing-large)*2)
    }
    [dir=rtl] .ck.ck-button.ck-switchbutton .ck-button__label{
        margin-left:calc(var(--ck-spacing-large)*2)
    }
    .ck.ck-button.ck-switchbutton .ck-button__toggle{
        border-radius:0
    }
    .ck-rounded-corners .ck.ck-button.ck-switchbutton .ck-button__toggle,
    .ck.ck-button.ck-switchbutton .ck-button__toggle.ck-rounded-corners{
        border-radius:var(--ck-border-radius)
    }
    [dir=ltr] .ck.ck-button.ck-switchbutton .ck-button__toggle{
        margin-left:auto
    }
    [dir=rtl] .ck.ck-button.ck-switchbutton .ck-button__toggle{
        margin-right:auto
    }
    .ck.ck-button.ck-switchbutton .ck-button__toggle{
        transition:background .4s ease;
        width:var(--ck-switch-button-toggle-width);
        background:var(--ck-color-switch-button-off-background)
    }
    .ck.ck-button.ck-switchbutton .ck-button__toggle .ck-button__toggle__inner{
        border-radius:0
    }
    .ck-rounded-corners .ck.ck-button.ck-switchbutton .ck-button__toggle .ck-button__toggle__inner,
    .ck.ck-button.ck-switchbutton .ck-button__toggle .ck-button__toggle__inner.ck-rounded-corners{
        border-radius:var(--ck-border-radius);
        border-radius:calc(var(--ck-border-radius)*0.5)
    }
    .ck.ck-button.ck-switchbutton .ck-button__toggle .ck-button__toggle__inner{
        margin:var(--ck-switch-button-toggle-spacing);
        width:var(--ck-switch-button-toggle-inner-size);
        height:var(--ck-switch-button-toggle-inner-size);
        background:var(--ck-color-switch-button-inner-background);
        transition:all .3s ease
    }
    .ck.ck-button.ck-switchbutton .ck-button__toggle:hover{
        background:var(--ck-color-switch-button-off-hover-background)
    }
    .ck.ck-button.ck-switchbutton .ck-button__toggle:hover .ck-button__toggle__inner{
        box-shadow:0 0 0 5px var(--ck-color-switch-button-inner-shadow)
    }
    .ck.ck-button.ck-switchbutton.ck-disabled .ck-button__toggle{
        opacity:var(--ck-disabled-opacity)
    }
    .ck.ck-button.ck-switchbutton.ck-on .ck-button__toggle{
        background:var(--ck-color-switch-button-on-background)
    }
    .ck.ck-button.ck-switchbutton.ck-on .ck-button__toggle:hover{
        background:var(--ck-color-switch-button-on-hover-background)
    }
    [dir=ltr] .ck.ck-button.ck-switchbutton.ck-on .ck-button__toggle .ck-button__toggle__inner{
        transform:translateX(var(--ck-switch-button-translation))
    }
    [dir=rtl] .ck.ck-button.ck-switchbutton.ck-on .ck-button__toggle .ck-button__toggle__inner{
        transform:translateX(calc(var(--ck-switch-button-translation)*-1))
    }
    .ck.ck-toolbar-dropdown .ck.ck-toolbar .ck.ck-toolbar__items{
        flex-wrap:nowrap
    }
    .ck.ck-toolbar-dropdown .ck-dropdown__panel .ck-button:focus{
        z-index:calc(var(--ck-z-default) + 1)
    }
    .ck.ck-toolbar-dropdown .ck-toolbar{
        border:0
    }
    .ck.ck-dropdown .ck-dropdown__panel .ck-list{
        border-radius:0
    }
    .ck-rounded-corners .ck.ck-dropdown .ck-dropdown__panel .ck-list,
    .ck.ck-dropdown .ck-dropdown__panel .ck-list.ck-rounded-corners{
        border-radius:var(--ck-border-radius);
        border-top-left-radius:0
    }
    .ck.ck-dropdown .ck-dropdown__panel .ck-list .ck-list__item:first-child .ck-button{
        border-radius:0
    }
    .ck-rounded-corners .ck.ck-dropdown .ck-dropdown__panel .ck-list .ck-list__item:first-child .ck-button,
    .ck.ck-dropdown .ck-dropdown__panel .ck-list .ck-list__item:first-child .ck-button.ck-rounded-corners{
        border-radius:var(--ck-border-radius);
        border-top-left-radius:0;
        border-bottom-left-radius:0;
        border-bottom-right-radius:0
    }
    .ck.ck-dropdown .ck-dropdown__panel .ck-list .ck-list__item:last-child .ck-button{
        border-radius:0
    }
    .ck-rounded-corners .ck.ck-dropdown .ck-dropdown__panel .ck-list .ck-list__item:last-child .ck-button,.ck.ck-dropdown .ck-dropdown__panel .ck-list .ck-list__item:last-child .ck-button.ck-rounded-corners{
        border-radius:var(--ck-border-radius);
        border-top-left-radius:0;
        border-top-right-radius:0
    }
`;

export const ckEditor4 = `
    .ck.ck-toolbar{
        -moz-user-select:none;
        -webkit-user-select:none;
        -ms-user-select:none;
        user-select:none;
        display:flex;
        flex-flow:row nowrap;
        align-items:center
    }
    .ck.ck-toolbar>.ck-toolbar__items{
        display:flex;
        flex-flow:row wrap;
        align-items:center;
        flex-grow:1
    }
    .ck.ck-toolbar .ck.ck-toolbar__separator{
        display:inline-block
    }
    .ck.ck-toolbar .ck.ck-toolbar__separator:first-child,
    .ck.ck-toolbar .ck.ck-toolbar__separator:last-child{
        display:none
    }
    .ck.ck-toolbar.ck-toolbar_grouping>.ck-toolbar__items{
        flex-wrap:nowrap
    }
    .ck.ck-toolbar.ck-toolbar_vertical>.ck-toolbar__items{
        flex-direction:column
    }
    .ck.ck-toolbar.ck-toolbar_floating>.ck-toolbar__items{
        flex-wrap:nowrap
    }
    .ck.ck-toolbar>.ck.ck-toolbar__grouped-dropdown>.ck-dropdown__button .ck-dropdown__arrow{
        display:none
    }
    .ck.ck-toolbar{
        border-radius:0
    }
    .ck-rounded-corners .ck.ck-toolbar,.ck.ck-toolbar.ck-rounded-corners{
        border-radius:var(--ck-border-radius)
    }
    .ck.ck-toolbar{
        background:var(--ck-color-toolbar-background);
        padding:0 var(--ck-spacing-small);
        border:1px solid var(--ck-color-toolbar-border)
    }
    .ck.ck-toolbar .ck.ck-toolbar__separator{
        align-self:stretch;
        width:1px;
        min-width:1px;
        margin-top:0;
        margin-bottom:0;
        background:var(--ck-color-toolbar-border)
    }
    .ck.ck-toolbar>.ck-toolbar__items>*{
        margin-top:var(--ck-spacing-small);
        margin-bottom:var(--ck-spacing-small);
        margin-right:var(--ck-spacing-small)
    }
    .ck.ck-toolbar>.ck-toolbar__items:empty+.ck.ck-toolbar__separator{
        display:none
    }
    .ck.ck-toolbar>.ck-toolbar__items>*,
    .ck.ck-toolbar>.ck.ck-toolbar__grouped-dropdown{
        margin-top:var(--ck-spacing-small);
        margin-bottom:var(--ck-spacing-small)
    }
    .ck.ck-toolbar.ck-toolbar_vertical{
        padding:0
    }
    .ck.ck-toolbar.ck-toolbar_vertical>.ck-toolbar__items>.ck{
        width:100%;
        margin:0;
        border-radius:0;
        border:0
    }
    .ck.ck-toolbar.ck-toolbar_compact{
        padding:0
    }
    .ck.ck-toolbar.ck-toolbar_compact>.ck-toolbar__items>*{
        margin:0
    }
    .ck.ck-toolbar.ck-toolbar_compact>.ck-toolbar__items>:not(:first-child):not(:last-child){
        border-radius:0
    }
    .ck.ck-toolbar>.ck.ck-toolbar__grouped-dropdown>.ck.ck-button.ck-dropdown__button{
        padding-left:var(--ck-spacing-tiny)
    }
    .ck-toolbar-container .ck.ck-toolbar{
        border:0
    }
    .ck.ck-toolbar[dir=rtl]>.ck-toolbar__items>.ck,[dir=rtl] .ck.ck-toolbar>.ck-toolbar__items>.ck{
        margin-right:0
    }
    .ck.ck-toolbar[dir=rtl]:not(.ck-toolbar_compact)>.ck-toolbar__items>.ck,
    [dir=rtl] .ck.ck-toolbar:not(.ck-toolbar_compact)>.ck-toolbar__items>.ck{
        margin-left:var(--ck-spacing-small)
    }
    .ck.ck-toolbar[dir=rtl]>.ck-toolbar__items>.ck:last-child,
    [dir=rtl] .ck.ck-toolbar>.ck-toolbar__items>.ck:last-child{
        margin-left:0
    }
    .ck.ck-toolbar[dir=rtl].ck-toolbar_compact>.ck-toolbar__items>.ck:first-child,
    [dir=rtl] .ck.ck-toolbar.ck-toolbar_compact>.ck-toolbar__items>.ck:first-child{
        border-top-left-radius:0;
        border-bottom-left-radius:0
    }
    .ck.ck-toolbar[dir=rtl].ck-toolbar_compact>.ck-toolbar__items>.ck:last-child,
    [dir=rtl] .ck.ck-toolbar.ck-toolbar_compact>.ck-toolbar__items>.ck:last-child{
        border-top-right-radius:0;border-bottom-right-radius:0
    }
    .ck.ck-toolbar[dir=rtl]>.ck.ck-toolbar__separator,
    [dir=rtl] .ck.ck-toolbar>.ck.ck-toolbar__separator{
        margin-left:var(--ck-spacing-small)
    }
    .ck.ck-toolbar[dir=rtl].ck-toolbar_grouping>.ck-toolbar__items:not(:empty):not(:only-child),
    [dir=rtl] .ck.ck-toolbar.ck-toolbar_grouping>.ck-toolbar__items:not(:empty):not(:only-child){
        margin-left:var(--ck-spacing-small)
    }
    .ck.ck-toolbar[dir=ltr]>.ck-toolbar__items>.ck:last-child,
    [dir=ltr] .ck.ck-toolbar>.ck-toolbar__items>.ck:last-child{
        margin-right:0
    }
    .ck.ck-toolbar[dir=ltr].ck-toolbar_compact>.ck-toolbar__items>.ck:first-child,
    [dir=ltr] .ck.ck-toolbar.ck-toolbar_compact>.ck-toolbar__items>.ck:first-child{
        border-top-right-radius:0;
        border-bottom-right-radius:0
    }
    .ck.ck-toolbar[dir=ltr].ck-toolbar_compact>.ck-toolbar__items>.ck:last-child,
    [dir=ltr] .ck.ck-toolbar.ck-toolbar_compact>.ck-toolbar__items>.ck:last-child{
        border-top-left-radius:0;
        border-bottom-left-radius:0
    }
    .ck.ck-toolbar[dir=ltr]>.ck.ck-toolbar__separator,[dir=ltr] .ck.ck-toolbar>.ck.ck-toolbar__separator{
        margin-right:var(--ck-spacing-small)
    }
    .ck.ck-toolbar[dir=ltr].ck-toolbar_grouping>.ck-toolbar__items:not(:empty):not(:only-child),
    [dir=ltr] .ck.ck-toolbar.ck-toolbar_grouping>.ck-toolbar__items:not(:empty):not(:only-child){
        margin-right:var(--ck-spacing-small)
    }
    .ck.ck-editor{
        position:relative
    }
    .ck.ck-editor .ck-editor__top .ck-sticky-panel .ck-toolbar{
        z-index:var(--ck-z-modal)
    }
    .ck.ck-editor__top .ck-sticky-panel .ck-toolbar{
        border-radius:0
    }
    .ck-rounded-corners .ck.ck-editor__top .ck-sticky-panel .ck-toolbar,
    .ck.ck-editor__top .ck-sticky-panel .ck-toolbar.ck-rounded-corners{
        border-radius:var(--ck-border-radius);
        border-bottom-left-radius:0;
        border-bottom-right-radius:0
    }
    .ck.ck-editor__top .ck-sticky-panel .ck-toolbar{
        border-bottom-width:0
    }
    .ck.ck-editor__top .ck-sticky-panel .ck-sticky-panel__content_sticky .ck-toolbar{
        border-bottom-width:1px;
        border-radius:0
    }
    .ck-rounded-corners .ck.ck-editor__top .ck-sticky-panel .ck-sticky-panel__content_sticky .ck-toolbar,
    .ck.ck-editor__top .ck-sticky-panel .ck-sticky-panel__content_sticky .ck-toolbar.ck-rounded-corners{
        border-radius:var(--ck-border-radius);
        border-radius:0
    }
    .ck.ck-editor__main>.ck-editor__editable{
        background:var(--ck-color-base-background);
        border-radius:0
    }
    .ck-rounded-corners .ck.ck-editor__main>.ck-editor__editable,
    .ck.ck-editor__main>.ck-editor__editable.ck-rounded-corners{
        border-radius:var(--ck-border-radius);
        border-top-left-radius:0;
        border-top-right-radius:0
    }
    .ck.ck-editor__main>.ck-editor__editable:not(.ck-focused){
        border-color:var(--ck-color-base-border)
    }
    .ck.ck-block-toolbar-button{
        position:absolute;
        z-index:var(--ck-z-default)
    }
    :root{
        --ck-color-block-toolbar-button:var(--ck-color-text);
        --ck-block-toolbar-button-size:var(--ck-font-size-normal)
    }
    .ck.ck-block-toolbar-button{
        color:var(--ck-color-block-toolbar-button);
        font-size:var(--ck-block-toolbar-size)
    }
    :root{
        --ck-balloon-panel-arrow-z-index:calc(var(--ck-z-default) - 3)
    }
    .ck.ck-balloon-panel{
        display:none;
        position:absolute;
        z-index:var(--ck-z-modal)
    }
    .ck.ck-balloon-panel.ck-balloon-panel_with-arrow:after,
    .ck.ck-balloon-panel.ck-balloon-panel_with-arrow:before{
        content:"";
        position:absolute
    }
    .ck.ck-balloon-panel.ck-balloon-panel_with-arrow:before{
        z-index:var(--ck-balloon-panel-arrow-z-index)
    }
    .ck.ck-balloon-panel.ck-balloon-panel_with-arrow:after{
        z-index:calc(var(--ck-balloon-panel-arrow-z-index) + 1)
    }
    .ck.ck-balloon-panel[class*=arrow_n]:before{
        z-index:var(--ck-balloon-panel-arrow-z-index)
    }
    .ck.ck-balloon-panel[class*=arrow_n]:after{
        z-index:calc(var(--ck-balloon-panel-arrow-z-index) + 1)
    }
    .ck.ck-balloon-panel[class*=arrow_s]:before{
        z-index:var(--ck-balloon-panel-arrow-z-index)
    }
    .ck.ck-balloon-panel[class*=arrow_s]:after{
        z-index:calc(var(--ck-balloon-panel-arrow-z-index) + 1)
    }
    .ck.ck-balloon-panel.ck-balloon-panel_visible{
        display:block
    }
    :root{
        --ck-balloon-arrow-offset:2px;
        --ck-balloon-arrow-height:10px;
        --ck-balloon-arrow-half-width:8px
    }
    .ck.ck-balloon-panel{
        border-radius:0
    }
    .ck-rounded-corners .ck.ck-balloon-panel,
    .ck.ck-balloon-panel.ck-rounded-corners{
        border-radius:var(--ck-border-radius)
    }
    .ck.ck-balloon-panel{
        box-shadow:var(--ck-drop-shadow),0 0;
        min-height:15px;
        background:var(--ck-color-panel-background);
        border:1px solid var(--ck-color-panel-border)
    }
    .ck.ck-balloon-panel.ck-balloon-panel_with-arrow:after,
    .ck.ck-balloon-panel.ck-balloon-panel_with-arrow:before{
        width:0;
        height:0;
        border-style:solid
    }
    .ck.ck-balloon-panel[class*=arrow_n]:after,
    .ck.ck-balloon-panel[class*=arrow_n]:before{
        border-left-width:var(--ck-balloon-arrow-half-width);
        border-bottom-width:var(--ck-balloon-arrow-height);
        border-right-width:var(--ck-balloon-arrow-half-width);
        border-top-width:0
    }
    .ck.ck-balloon-panel[class*=arrow_n]:before{
        border-bottom-color:var(--ck-color-panel-border)
    }
    .ck.ck-balloon-panel[class*=arrow_n]:after,
    .ck.ck-balloon-panel[class*=arrow_n]:before{
        border-left-color:transparent;
        border-right-color:transparent;
        border-top-color:transparent
    }
    .ck.ck-balloon-panel[class*=arrow_n]:after{
        border-bottom-color:var(--ck-color-panel-background);
        margin-top:var(--ck-balloon-arrow-offset)
    }
    .ck.ck-balloon-panel[class*=arrow_s]:after,
    .ck.ck-balloon-panel[class*=arrow_s]:before{
        border-left-width:var(--ck-balloon-arrow-half-width);
        border-bottom-width:0;
        border-right-width:var(--ck-balloon-arrow-half-width);
        border-top-width:var(--ck-balloon-arrow-height)
    }
    .ck.ck-balloon-panel[class*=arrow_s]:before{
        border-top-color:var(--ck-color-panel-border)
    }
    .ck.ck-balloon-panel[class*=arrow_s]:after,
    .ck.ck-balloon-panel[class*=arrow_s]:before{
        border-left-color:transparent;
        border-bottom-color:transparent;
        border-right-color:transparent
    }
    .ck.ck-balloon-panel[class*=arrow_s]:after{
        border-top-color:var(--ck-color-panel-background);
        margin-bottom:var(--ck-balloon-arrow-offset)
    }
    .ck.ck-balloon-panel.ck-balloon-panel_arrow_n:after,
    .ck.ck-balloon-panel.ck-balloon-panel_arrow_n:before{
        left:50%;margin-left:calc(var(--ck-balloon-arrow-half-width)*-1);
        top:calc(var(--ck-balloon-arrow-height)*-1)
    }
    .ck.ck-balloon-panel.ck-balloon-panel_arrow_nw:after,
    .ck.ck-balloon-panel.ck-balloon-panel_arrow_nw:before{
        left:calc(var(--ck-balloon-arrow-half-width)*2);
        top:calc(var(--ck-balloon-arrow-height)*-1)
    }
    .ck.ck-balloon-panel.ck-balloon-panel_arrow_ne:after,
    .ck.ck-balloon-panel.ck-balloon-panel_arrow_ne:before{
        right:calc(var(--ck-balloon-arrow-half-width)*2);
        top:calc(var(--ck-balloon-arrow-height)*-1)
    }
    .ck.ck-balloon-panel.ck-balloon-panel_arrow_s:after,
    .ck.ck-balloon-panel.ck-balloon-panel_arrow_s:before{
        left:50%;margin-left:calc(var(--ck-balloon-arrow-half-width)*-1);
        bottom:calc(var(--ck-balloon-arrow-height)*-1)
    }
    .ck.ck-balloon-panel.ck-balloon-panel_arrow_sw:after,
    .ck.ck-balloon-panel.ck-balloon-panel_arrow_sw:before{
        left:calc(var(--ck-balloon-arrow-half-width)*2);
        bottom:calc(var(--ck-balloon-arrow-height)*-1)
    }
    .ck.ck-balloon-panel.ck-balloon-panel_arrow_se:after,
    .ck.ck-balloon-panel.ck-balloon-panel_arrow_se:before{
        right:calc(var(--ck-balloon-arrow-half-width)*2);
        bottom:calc(var(--ck-balloon-arrow-height)*-1)
    }
    .ck.ck-balloon-panel.ck-balloon-panel_arrow_sme:after,
    .ck.ck-balloon-panel.ck-balloon-panel_arrow_sme:before{
        right:25%;
        margin-right:calc(var(--ck-balloon-arrow-half-width)*2);
        bottom:calc(var(--ck-balloon-arrow-height)*-1)
    }
    .ck.ck-balloon-panel.ck-balloon-panel_arrow_smw:after,
    .ck.ck-balloon-panel.ck-balloon-panel_arrow_smw:before{
        left:25%;
        margin-left:calc(var(--ck-balloon-arrow-half-width)*2);
        bottom:calc(var(--ck-balloon-arrow-height)*-1)
    }
    .ck.ck-balloon-panel.ck-balloon-panel_arrow_nme:after,
    .ck.ck-balloon-panel.ck-balloon-panel_arrow_nme:before{
        right:25%;
        margin-right:calc(var(--ck-balloon-arrow-half-width)*2);
        top:calc(var(--ck-balloon-arrow-height)*-1)
    }
    .ck.ck-balloon-panel.ck-balloon-panel_arrow_nmw:after,
    .ck.ck-balloon-panel.ck-balloon-panel_arrow_nmw:before{
        left:25%;
        margin-left:calc(var(--ck-balloon-arrow-half-width)*2);
        top:calc(var(--ck-balloon-arrow-height)*-1)
    }
`;

export const ckEditor5 = `
    .ck .ck-link_selected{
        background:var(--ck-color-link-selected-background)
    }
    .ck .ck-balloon-rotator__navigation{
        display:flex;
        align-items:center;
        justify-content:center
    }
    .ck .ck-balloon-rotator__content .ck-toolbar{
        justify-content:center
    }
    .ck .ck-balloon-rotator__navigation{
        background:var(--ck-color-toolbar-background);
        border-bottom:1px solid var(--ck-color-toolbar-border);
        padding:0 var(--ck-spacing-small)
    }
    .ck .ck-balloon-rotator__navigation>*{
        margin-right:var(--ck-spacing-small);
        margin-top:var(--ck-spacing-small);
        margin-bottom:var(--ck-spacing-small)
    }
    .ck .ck-balloon-rotator__navigation .ck-balloon-rotator__counter{
        margin-right:var(--ck-spacing-standard);
        margin-left:var(--ck-spacing-small)
    }
    .ck .ck-balloon-rotator__content .ck.ck-annotation-wrapper{
        box-shadow:none
    }
    .ck .ck-fake-panel{
        position:absolute;
        z-index:calc(var(--ck-z-modal) - 1)
    }
    .ck .ck-fake-panel div{
        position:absolute
    }
    .ck .ck-fake-panel div:first-child{
        z-index:2
    }
    .ck .ck-fake-panel div:nth-child(2){
        z-index:1
    }
    :root{
        --ck-balloon-fake-panel-offset-horizontal:6px;
        --ck-balloon-fake-panel-offset-vertical:6px
    }
    .ck .ck-fake-panel div{
        box-shadow:var(--ck-drop-shadow),0 0;
        min-height:15px;
        background:var(--ck-color-panel-background);
        border:1px solid var(--ck-color-panel-border);
        border-radius:var(--ck-border-radius);
        width:100%;height:100%
    }
    .ck .ck-fake-panel div:first-child{
        margin-left:var(--ck-balloon-fake-panel-offset-horizontal);
        margin-top:var(--ck-balloon-fake-panel-offset-vertical)
    }
    .ck .ck-fake-panel div:nth-child(2){
        margin-left:calc(var(--ck-balloon-fake-panel-offset-horizontal)*2);
        margin-top:calc(var(--ck-balloon-fake-panel-offset-vertical)*2)
    }
    .ck .ck-fake-panel div:nth-child(3){
        margin-left:calc(var(--ck-balloon-fake-panel-offset-horizontal)*3);
        margin-top:calc(var(--ck-balloon-fake-panel-offset-vertical)*3)
    }
    .ck .ck-balloon-panel_arrow_s+.ck-fake-panel,
    .ck .ck-balloon-panel_arrow_se+.ck-fake-panel,
    .ck .ck-balloon-panel_arrow_sw+.ck-fake-panel{
        --ck-balloon-fake-panel-offset-vertical:-6px
    }
    .ck.ck-labeled-input .ck-labeled-input__status{
        font-size:var(--ck-font-size-small);
        margin-top:var(--ck-spacing-small);
        white-space:normal
    }
    .ck.ck-labeled-input .ck-labeled-input__status_error{
        color:var(--ck-color-base-error)
    }
    :root{
        --ck-input-text-width:18em
    }
    .ck.ck-input-text{
        border-radius:0
    }
    .ck-rounded-corners .ck.ck-input-text,
    .ck.ck-input-text.ck-rounded-corners{
        border-radius:var(--ck-border-radius)
    }
    .ck.ck-input-text{
        box-shadow:var(--ck-inner-shadow),0 0;
        background:var(--ck-color-input-background);
        border:1px solid var(--ck-color-input-border);
        padding:var(--ck-spacing-extra-tiny) var(--ck-spacing-medium);
        min-width:var(--ck-input-text-width);
        min-height:var(--ck-ui-component-min-height);
        transition:box-shadow .2s ease-in-out,border .2s ease-in-out
    }
    .ck.ck-input-text:focus{
        outline:none;border:var(--ck-focus-ring);
        box-shadow:var(--ck-focus-outer-shadow),var(--ck-inner-shadow)
    }
    .ck.ck-input-text[readonly]{
        border:1px solid var(--ck-color-input-disabled-border);
        background:var(--ck-color-input-disabled-background);
        color:var(--ck-color-input-disabled-text)
    }
    .ck.ck-input-text[readonly]:focus{
        box-shadow:var(--ck-focus-disabled-outer-shadow),var(--ck-inner-shadow)
    }
    .ck.ck-input-text.ck-error{
        border-color:var(--ck-color-input-error-border);
        animation:ck-text-input-shake .3s ease both
    }
    .ck.ck-input-text.ck-error:focus{
        box-shadow:var(--ck-focus-error-outer-shadow),var(--ck-inner-shadow)
    }
    @keyframes ck-text-input-shake{
        20%{
            transform:translateX(-2px)
        }
        40%{
            transform:translateX(2px)
        }
        60%{
            transform:translateX(-1px)
        }
        80%{
            transform:translateX(1px)
        }
    }
    .ck.ck-link-form{
        display:flex
    }
    .ck.ck-link-form .ck-label{
        display:none
    }
    @media screen and (max-width:600px){
        .ck.ck-link-form{
            flex-wrap:wrap
        }
        .ck.ck-link-form .ck-labeled-input{
            flex-basis:100%
        }
        .ck.ck-link-form .ck-button{
            flex-basis:50%
        }
    }
    .ck.ck-link-form_layout-vertical{
        display:block
    }
    .ck.ck-link-form{
        padding:var(--ck-spacing-standard)
    }
    .ck.ck-link-form:focus{
        outline:none
    }
    [dir=ltr] .ck.ck-link-form>:not(:first-child),
    [dir=rtl] .ck.ck-link-form>:not(:last-child){
        margin-left:var(--ck-spacing-standard)
    }
    @media screen and (max-width:600px){
        .ck.ck-link-form{
            padding:0;
            width:calc(var(--ck-input-text-width)*0.8)
        }
        .ck.ck-link-form .ck-labeled-input{
            margin:var(--ck-spacing-standard) var(--ck-spacing-standard) 0
        }
        .ck.ck-link-form .ck-labeled-input .ck-input-text{
            min-width:0;
            width:100%
        }
        .ck.ck-link-form .ck-button{
            padding:var(--ck-spacing-standard);
            margin-top:var(--ck-spacing-standard);
            border-radius:0;border:0;
            border-top:1px solid var(--ck-color-base-border)
        }
        [dir=ltr] .ck.ck-link-form .ck-button{
            margin-left:0
        }
        [dir=ltr] .ck.ck-link-form .ck-button:first-of-type{
            border-right:1px solid var(--ck-color-base-border)
        }
        [dir=rtl] .ck.ck-link-form .ck-button{
            margin-left:0
        }
        [dir=rtl] .ck.ck-link-form .ck-button:last-of-type{
            border-right:1px solid var(--ck-color-base-border)
        }
    }
    .ck.ck-link-form_layout-vertical{
        padding:0;min-width:var(--ck-input-text-width)
    }
    .ck.ck-link-form_layout-vertical .ck-labeled-input{
        margin:var(--ck-spacing-standard) var(--ck-spacing-standard) var(--ck-spacing-small)
    }
    .ck.ck-link-form_layout-vertical .ck-labeled-input .ck-input-text{
        min-width:0;width:100%
    }
    .ck.ck-link-form_layout-vertical .ck-button{
        padding:var(--ck-spacing-standard);
        margin:0;
        border-radius:0;
        border:0;
        border-top:1px solid var(--ck-color-base-border);
        width:50%
    }
    [dir=ltr] .ck.ck-link-form_layout-vertical .ck-button{
        margin-left:0
    }
    [dir=ltr] .ck.ck-link-form_layout-vertical .ck-button:first-of-type{
        border-right:1px solid var(--ck-color-base-border)
    }
    [dir=rtl] .ck.ck-link-form_layout-vertical .ck-button{
        margin-left:0
    }
    [dir=rtl] .ck.ck-link-form_layout-vertical .ck-button:last-of-type{
        border-right:1px solid var(--ck-color-base-border)
    }
    .ck.ck-link-form_layout-vertical .ck.ck-list{
        margin-left:0
    }
    .ck.ck-link-form_layout-vertical .ck.ck-list .ck-button.ck-switchbutton{
        border:0;
        width:100%
    }
    .ck.ck-link-form_layout-vertical .ck.ck-list .ck-button.ck-switchbutton:hover{
        background:none
    }
    .ck.ck-link-actions{
        display:flex;
        flex-direction:row;
        flex-wrap:nowrap
    }
    .ck.ck-link-actions .ck-link-actions__preview{
        display:inline-block
    }
    .ck.ck-link-actions .ck-link-actions__preview .ck-button__label{
        overflow:hidden
    }
    @media screen and (max-width:600px){
        .ck.ck-link-actions{
            flex-wrap:wrap
        }
        .ck.ck-link-actions .ck-link-actions__preview{
            flex-basis:100%
        }
        .ck.ck-link-actions .ck-button:not(.ck-link-actions__preview){
            flex-basis:50%
        }
    }
    .ck.ck-link-actions{
        padding:var(--ck-spacing-standard)
    }
    .ck.ck-link-actions .ck-button.ck-link-actions__preview{
        padding-left:0;
        padding-right:0
    }
    .ck.ck-link-actions .ck-button.ck-link-actions__preview .ck-button__label{
        padding:0 var(--ck-spacing-medium);
        color:var(--ck-color-link-default);
        text-overflow:ellipsis;
        cursor:pointer;
        max-width:var(--ck-input-text-width);
        min-width:3em;text-align:center
    }
    .ck.ck-link-actions .ck-button.ck-link-actions__preview .ck-button__label:hover{
        text-decoration:underline
    }
    .ck.ck-link-actions .ck-button.ck-link-actions__preview,
    .ck.ck-link-actions .ck-button.ck-link-actions__preview:active,
    .ck.ck-link-actions .ck-button.ck-link-actions__preview:focus,
    .ck.ck-link-actions .ck-button.ck-link-actions__preview:hover{
        background:none
    }
    .ck.ck-link-actions .ck-button.ck-link-actions__preview:active{
        box-shadow:none
    }
    .ck.ck-link-actions .ck-button.ck-link-actions__preview:focus .ck-button__label{
        text-decoration:underline
    }
    .ck.ck-link-actions:focus{
        outline:none
    }
    [dir=ltr] .ck.ck-link-actions .ck-button:not(:first-child),
    [dir=rtl] .ck.ck-link-actions .ck-button:not(:last-child){
        margin-left:var(--ck-spacing-standard)
    
    }@media screen and (max-width:600px){
        .ck.ck-link-actions{
            padding:0;width:calc(var(--ck-input-text-width)*0.8)
        }
        .ck.ck-link-actions .ck-button.ck-link-actions__preview{
            margin:var(--ck-spacing-standard) var(--ck-spacing-standard) 0
        }
        .ck.ck-link-actions .ck-button.ck-link-actions__preview .ck-button__label{
            min-width:0;max-width:100%
        }
        .ck.ck-link-actions .ck-button:not(.ck-link-actions__preview){
            padding:var(--ck-spacing-standard);
            margin-top:var(--ck-spacing-standard);
            border-radius:0;
            border:0;
            border-top:1px solid var(--ck-color-base-border)
        }
        [dir=ltr] .ck.ck-link-actions .ck-button:not(.ck-link-actions__preview){
            margin-left:0
        }
        [dir=ltr] .ck.ck-link-actions .ck-button:not(.ck-link-actions__preview):first-of-type{
            border-right:1px solid var(--ck-color-base-border)
        }
        [dir=rtl] .ck.ck-link-actions .ck-button:not(.ck-link-actions__preview){
            margin-left:0
        }
        [dir=rtl] .ck.ck-link-actions .ck-button:not(.ck-link-actions__preview):last-of-type{
            border-right:1px solid var(--ck-color-base-border)
        }
    }
    .ck.ck-color-grid{
        display:grid
    }
    :root{
        --ck-color-grid-tile-size:24px;
        --ck-color-color-grid-check-icon:#000
    }
    .ck.ck-color-grid{
        grid-gap:5px;padding:8px
    }
    .ck.ck-color-grid__tile{
        width:var(--ck-color-grid-tile-size);
        height:var(--ck-color-grid-tile-size);
        min-width:var(--ck-color-grid-tile-size);
        min-height:var(--ck-color-grid-tile-size);
        padding:0;
        transition:box-shadow .2s ease;
        border:0
    }
    .ck.ck-color-grid__tile.ck-disabled{
        cursor:unset;transition:unset
    }
    .ck.ck-color-grid__tile.ck-color-table__color-tile_bordered{
        box-shadow:0 0 0 1px var(--ck-color-base-border)
    }
    .ck.ck-color-grid__tile .ck.ck-icon{
        display:none;color:var(--ck-color-color-grid-check-icon)
    }
    .ck.ck-color-grid__tile.ck-on{
        box-shadow:inset 0 0 0 1px var(--ck-color-base-background),0 0 0 2px var(--ck-color-base-text)
    }
    .ck.ck-color-grid__tile.ck-on .ck.ck-icon{
        display:block
    }
    .ck.ck-color-grid__tile.ck-on,.ck.ck-color-grid__tile:focus:not(.ck-disabled),
    .ck.ck-color-grid__tile:hover:not(.ck-disabled){
        border:0
    }
    .ck.ck-color-grid__tile:focus:not(.ck-disabled),
    .ck.ck-color-grid__tile:hover:not(.ck-disabled){
        box-shadow:inset 0 0 0 1px var(--ck-color-base-background),0 0 0 2px var(--ck-color-focus-border)
    }
    .ck.ck-color-grid__label{
        padding:0 var(--ck-spacing-standard)
    }
`;

export const ckEditor6 = `
    .ck .ck-button.ck-color-table__remove-color{
        display:flex;
        align-items:center;
        width:100%
    }
    label.ck.ck-color-grid__label{
        font-weight:unset
    }
    .ck .ck-button.ck-color-table__remove-color{
        padding:calc(var(--ck-spacing-standard)/2) var(--ck-spacing-standard);
        border-bottom-left-radius:0;
        border-bottom-right-radius:0
    }
    .ck .ck-button.ck-color-table__remove-color:not(:focus){
        border-bottom:1px solid var(--ck-color-base-border)
    }
    [dir=ltr] .ck .ck-button.ck-color-table__remove-color .ck.ck-icon{
        margin-right:var(--ck-spacing-standard)
    }
    [dir=rtl] .ck .ck-button.ck-color-table__remove-color .ck.ck-icon{
        margin-left:var(--ck-spacing-standard)
    }
    .ck.ck-character-grid .ck-character-grid__tiles{
        display:grid;
        grid-template-columns:repeat(10,1fr)
    }
    :root{
        --ck-character-grid-tile-size:24px
    }
    .ck.ck-character-grid{
        overflow-y:auto;
        overflow-x:hidden;
        width:350px;
        max-height:200px
    }
    .ck.ck-character-grid .ck-character-grid__tiles{
        margin:var(--ck-spacing-standard);
        grid-gap:var(--ck-spacing-standard)
    }
    .ck.ck-character-grid .ck-character-grid__tile{
        width:var(--ck-character-grid-tile-size);
        height:var(--ck-character-grid-tile-size);
        min-width:var(--ck-character-grid-tile-size);
        min-height:var(--ck-character-grid-tile-size);
        font-size:1.2em;padding:0;transition:box-shadow .2s ease;
        border:0
    }
    .ck.ck-character-grid .ck-character-grid__tile:focus:not(.ck-disabled),
    .ck.ck-character-grid .ck-character-grid__tile:hover:not(.ck-disabled){
        border:0;
        box-shadow:inset 0 0 0 1px var(--ck-color-base-background),0 0 0 2px var(--ck-color-focus-border)
    }
    .ck.ck-character-grid .ck-character-grid__tile .ck-button__label{
        line-height:var(--ck-character-grid-tile-size);
        width:100%;text-align:center
    }
    .ck.ck-character-info{
        display:flex;
        justify-content:space-between;
        padding:var(--ck-spacing-small) var(--ck-spacing-standard);
        border-top:1px solid var(--ck-color-base-border)
    }
    .ck.ck-character-info>*{
        text-transform:uppercase;
        font-size:var(--ck-font-size-small)
    }
    .ck.ck-character-info .ck-character-info__name{
        max-width:280px;
        text-overflow:ellipsis;
        overflow:hidden
    }
    .ck.ck-character-info .ck-character-info__code{
        opacity:.6
    }
    .ck.ck-special-characters-navigation{
        display:flex;
        flex-direction:row;
        flex-wrap:nowrap;
        align-items:center;
        justify-content:space-between;
        border-bottom:1px solid var(--ck-color-base-border);
        padding:var(--ck-spacing-standard)
    }
    [dir=ltr] .ck.ck-special-characters-navigation{
        padding-left:var(--ck-spacing-large)
    }
    [dir=rtl] .ck.ck-special-characters-navigation{
        padding-right:var(--ck-spacing-large)
    }
    .ck.ck-special-characters-navigation>.ck-label{
        max-width:160px;
        text-overflow:ellipsis;
        overflow:hidden
    }
    .ck.ck-special-characters-navigation>.ck-dropdown .ck-dropdown__panel{
        max-height:250px;
        overflow-y:auto;
        overflow-x:hidden
    }
    .trail_tooltip
        .ck.ck-toolbar
        > .ck.ck-toolbar__grouped-dropdown
        > .ck.ck-button.ck-dropdown__button {
        margin: 0 !important;
    }

    .ck.ck-content.ck-editor__editable.ck-rounded-corners.ck-editor__editable_inline {
        height: 81px;
        border-color: #dddddd;
        border-radius: 0 0 4px 4px;
        box-sizing: border-box;
        padding: 10px;
    }

    .ck.ck-content p {
        color: #000;
    }

    .ck.ck-content.ck-editor__editable.ck-rounded-corners.ck-editor__editable_inline.ck-focused {
        border-color: #fb542b;
        outline: none;
    }

    .ck.ck-balloon-panel.ck-balloon-panel_arrow_nw.ck-balloon-panel_visible.ck-balloon-panel_with-arrow,
    .ck.ck-balloon-panel.ck-balloon-panel_arrow_n.ck-balloon-panel_visible.ck-balloon-panel_with-arrow {
        z-index: 999999999 !important;
    }

    .ck.ck-toolbar.ck-toolbar_grouping {
        border-color: #ddd;
        border-radius: 4px 4px 0 0 !important;
    }

    span.ck.ck-toolbar__separator {
        background: #ddd !important;
    }

    .ck.ck-toolbar > .ck-toolbar__items > * {
        margin-right: 0 !important;
    }

    .ck.ck-content.ck-editor__editable.ck-rounded-corners.ck-editor__editable_inline p {
        font-family: "Lato", sans-serif !important;
        font-size: 14px !important;
    }

    .ck-input {
        border: 1px solid #dddddd !important;
        box-shadow: none !important;
        background: #ffffff !important;
        color: #000 !important;
        font-size: 14px !important;
        font-style: normal !important;
        font-family: "Lato", sans-serif !important;
    }

    .ck-input::-webkit-input-placeholder {
        font-size: 14px !important;
        font-family: "Lato", sans-serif !important;
        color: #9b9b9b !important;
    }
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