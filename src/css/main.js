export const main1Css = `
    #my-extension-root {
        font-family: 'Lato', sans-serif !important;
        width: 60px !important;
        height: 500px !important;
        float: right;        
    }

    #my-extension-root button:focus {
        outline: none;
    }

    #my-extension-root .wrap.open .blob {
        cursor: pointer;
        border: none;
        outline: none;
        position: relative;
        z-index: 10;
        // background: linear-gradient(321.4deg, #D02176 15.15%, #EC8FBC 84.05%) !important;
        background: rgb(253,215,86);
        background: -moz-linear-gradient(135deg, rgba(253,215,86,1) 0%, rgba(218,28,92,1) 85%);
        background: -webkit-linear-gradient(135deg, rgba(253,215,86,1) 0%, rgba(218,28,92,1) 85%);
        background: linear-gradient(135deg, rgba(253,215,86,1) 0%, rgba(218,28,92,1) 85%);
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#fdd756",endColorstr="#da1c5c",GradientType=1);
        box-shadow: -4px -4px 9px 29px rgba(237, 237, 237, 0.1), 0px 4px 76px 8px rgba(0, 0, 0, 0.2);
        right: 0;
        width: 60px;
        height: 60px;
        border-radius: 50%;
    }

    #my-extension-root .wrap .blob:hover:not([disabled]) {
        // background: linear-gradient(321.4deg, #D02176 15.15%, #faaed3 84.05%) !important;
        background: linear-gradient(135deg, rgba(253,215,86,1) 0%, rgba(218,28,92,1) 70%);
    }

    #my-extension-root .wrap.open .blob,
    #my-extension-root .wrap.open.createMenu .blob {
        // display: block;
        box-shadow: none;
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        padding: 0;
    }

    #my-extension-root .wrap.open .blob {
        margin-top: 10px;
        // display: block;
    }

    #my-extension-root .my-extension,
    #my-extension-root .wrap.open {
        width: 100%;
        // height: 100%;
        position: absolute;
        text-align: right;
    }

    #my-extension-root .wrap.open {
        // margin-top: 80px;
        margin-top: 70px;
    }

    #my-extension-root .wrap.open.createMenu {
        margin-top: 0;
    }

    #my-extension-root .wrap .blob svg {
        // box-shadow:0 0 4px rgba(0,0,0,.14), 0 4px 8px rgba(0,0,0,.28);
        // -webkit-box-shadow:0 0 4px rgba(0,0,0,.14), 0 4px 8px rgba(0,0,0,.28);
        // -moz-box-shadow:0 0 4px rgba(0,0,0,.14), 0 4px 8px rgba(0,0,0,.28);
        // background: #fff;
        // -webkit-border-radius: 50%;
        // -moz-border-radius: 50%;
        // border-radius: 50%;
        // float: right;
        // width: 40px !important;
        // height: 40px !important; 
        width: 28px !important;
        height: 24px !important;
    }

    #my-extension-root .wrap .blob .audio_svg,
    #my-extension-root .wrap .blob .edit_trail_svg {
        width: 50px !important;
        height: 50px !important;
    }

    #my-extension-root .wrap .blob svg circle {fill: transparent !important;}
    #my-extension-root .wrap .blob svg path {fill: #fff;}

    #my-extension-root .wrap .blob:after {
        content: attr(data-title);
        // color: #DA5E9A;
        color: #ff7958;
        // width: 220px; 
        margin-right: 6px;
        font-family: 'Lato', sans-serif;
        line-height: 30px;
        font-weight: 400!important;
        // text-align: right;
        position: absolute;
        text-transform: capitalize!important;
        letter-spacing: 0;
        box-shadow: 5px 2px 4px #00000052;
        opacity: 0;
        background: white;
        border-radius: 3px;
        padding: 5px 15px;
        background: white;
        transition: all 0.2s ease-out;
        font-size: 22px !important;
        top: 15px !important;
        right: 80px !important;
    }

    #my-extension-root .wrap .blob:not([disabled]):hover:after {
        opacity: 1;
        pointer-events: visible;
    }

    // #my-extension-root .wrap .blob:hover::after {
    //     color: #ffffff;
    //     background:#fb542b;
    // }

    #my-extension-root button.menu{
        background: transparent !important;
        box-shadow: none !important;
        -webkit-box-shadow: none !important;
        -moz-box-shadow: none !important;
        min-height: 46px !important;
        /* margin-left: 23px !important; */
        margin-left: 10px !important;
    }

    #my-extension-root button.menu img {
        height: 38px !important;
        width: 38px !important;
        transition: all 0.2s ease-out;
    }

    #my-extension-root .wrap.open.createMenu button.menu .trail_edit_v2 {
        transform: rotate(45deg) !important;
    }

    #my-extension-root button.menu , #my-extension-defaultroot button.menu{
        position: relative;
        height: 40px;
        min-height: 40px;
        width: 40px;
        display: block;
        margin-top: 10px;
        background: linear-gradient(
            324deg,
            rgba(230, 16, 0, 1) 0%,
            rgba(255, 136, 78, 1) 100%
        );
        box-shadow: 0 0 4px rgba(0,0,0,.14), 0 4px 8px rgba(0,0,0,.28);
        -webkit-box-shadow: 0 0 4px rgba(0,0,0,.14), 0 4px 8px rgba(0,0,0,.28);
        -moz-box-shadow: 0 0 4px rgba(0,0,0,.14), 0 4px 8px rgba(0,0,0,.28);
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
        border: none;
        cursor: pointer;
        padding: 0;
    }

    #my-extension-root .menu img, #my-extension-defaultroot button.menu img {
        /* margin-top: 4px; */
        width: 30px;
        margin: 0;  
        height: 30px;
        vertical-align: middle;
        background: transparent!important;
        display: initial;
    }

    // #my-extension-root .wrap .blob:hover .svg_btn2 {
    //     fill: #ffffff;
    //     stroke: #ffffff;
    // }

    // #my-extension-root .wrap .blob:hover .svg_btn {
    //     fill: #ffffff !important;
    //     stroke: #fb542b;
    // }

    // #my-extension-root .wrap .blob:hover #Ellipse_101 {
    //     fill: #fb542b;
    // }

    // #my-extension-root .wrap .blob:hover span {
    //     background: #fb542b;
    //     color: #ffffff;
    // }

    #my-extension-root .menu img.trail_plus {
        width: 24px;
        height: 24px;
        // top: 8px;
        top: 5px;
        right: 7px;
    }

    .wrap.open button.blob{
        -webkit-transform: scale(0);
        transform:  scale(0);
        transition: all .5s;
    }

    .wrap.open.createMenu button.blob{
        -webkit-transform: scale(1);
        transform:  scale(1);
    }

    .wrap.open button:nth-child(1) {    
        transition-delay: 50ms;
        transform: scale(1);
        display: block;
    }

    .wrap.open.createMenu button:nth-child(1) {    
        transition-delay: 150ms;
        transform: scale(0);
        display: none;
    }
    .wrap.open button:nth-child(2) {    
        transition-delay: 100ms;
        display: none;
    }

    .wrap.open.createMenu button:nth-child(2) {    
        transition-delay: 100ms;
        display: block;
    }

    .wrap.open button:nth-child(3) {    
        transition-delay: 150ms;
        display: none;
    }
    .wrap.open.createMenu button:nth-child(3) {    
        transition-delay: 50ms;
        display: block;
    }

    .wrap.open button:nth-child(5) {    
        transition-delay: 200ms;
        display: none;
    }

    .wrap.open.createMenu button:nth-child(5) {    
        transition-delay: 50ms;
        display: block;
    }

    .wrap.open button:nth-child(6) {    
        transition-delay: 150ms;
        display: none;
    }

    .wrap.open.createMenu button:nth-child(6) {    
        transition-delay: 100ms;
        display: block;
    }

    .wrap.open button:nth-child(7) {    
        transition-delay: 100ms;
        // display: none;
        transform: scale(1);
        display: block;
    }

    .wrap.open.createMenu button:nth-child(7) {    
        transition-delay: 150ms;
        // display: block;
        display: none;
    }

    .wrap.open button:nth-child(8) {    
        transition-delay: 50ms;
        transform: scale(1);
        transform: scale(0);
        display: block;
    }

    .wrap.open.createMenu button:nth-child(8) {    
        transition-delay: 200ms;
        transform: scale(0);
        display: none;
    }

    // .wrap .trail_plus {
    //     opacity: 0;
    //     position: absolute;
    //     top: 0;
    //     right: 0;
    // }

    .wrap .trail_edit {
        width: 20px!important;
        height: 20px!important;
        position: absolute;
        top: 10px;
        right: 10px;
    }

    .wrap.open.createMenu .trail_plus {
        opacity: 1;
    }

    .wrap.open.createMenu .trail_edit {
        opacity: 0;
    }

    .wrap.open .menu img {
        -webkit-transform: rotate(0); 
        transform: rotate(0);
        -webkit-transition: -webkit-transform 150ms cubic-bezier(.4,0,1,1);
        transition: transform 150ms cubic-bezier(.4,0,1,1);
    }

    .wrap.open.createMenu .menu img {
        -webkit-transform:  rotate(315deg);
        transform: rotate(315deg);
        -webkit-transition: -webkit-transform 150ms cubic-bezier(.4,0,1,1);
        transition: transform 150ms cubic-bezier(.4,0,1,1);
    }

    .d-flex {
        width: 100%;
        display: flex;
        line-height: 1.2;
        // justify-content: space-between;
        justify-content: left;
    }

    .d-flex-1 {
        // width: 70px;
        width: 20%;
    }

    .d-flex-2 {
        // width: 60%;
        width: 160px;
    }

    .d-flex-1 h4 {
        margin: 0 0 0px 0;
        color: #fff;
        font-size: 13px;
    }
`;

export const main2Css = `
    .info_bbx_gradient {
        background: linear-gradient(208.4deg, #9085f3 15.15%, #ef7e81 84.05%);
        // width: 100%;
        // width: 96%;
        height: 45px;
        border-radius: 7px;
        padding: 10px;
        margin: 0px 0px 10px 5px !important;
    }

    .info_bbx_grey {
        background: #808080;
        width: 100%;
        height: 45px;
        border-radius: 7px;
        padding: 10px;
        margin: 0px 0px 10px 5px !important;
    }

    .info_bbx_gradient.inactive,
    .info_bbx_grey.inactive {
        // width: 97% !important;
        width: 91% !important;
    }

    // .trailitStepBox.active,
    // .info_bbx.active,
    .info_bbx_gradient.active,
    .info_bbx_grey.active {
        // border: 2px solid #f04d26;
        // border-radius: 1rem;
        // border-width: 10px;
        // position: relative;
    }

    // .info_bbx_gradient.active::before,
    // .info_bbx_grey.active::before {
    //     content: "";
    //     position: absolute;
    //     top: -5px;
    //     bottom: -5px;
    //     left: -5px;
    //     right: -5px;
    //     border: 6px solid #222;
    //     border-radius: .8rem;
    // }

    .d-flex-2 p {
        margin: 0 0 0px 0;
        color: #fff;
        // line-height: 20px;
        font-size: 14px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .d-flex-3 {
        margin-top: -5px;
    }

    .d-flex-image {
        margin-top: 10px
    }

    #my-extension-defaultroot .sidepopup.open::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        border-radius: 10px;
        // background-color: #f5f5f5;
        background-color: transparent;
        width: 0;
    }

    #my-extension-defaultroot .sidepopup.open::-webkit-scrollbar {
        width: 8px;
        // background-color: #f5f5f5;
        background-color: transparent;
        width: 0;
    }

    #my-extension-defaultroot .sidepopup.open::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        // background-color: #555;
        background-color: transparent;
        width: 0;
    }

    .react-draggable-transparent-selection *::-moz-selection {
        all: inherit;
    }

    .react-draggable-transparent-selection *::selection {
        all: inherit;
    }

    .trail_settings_container {
        padding: 10px;
    }

    .trail_settings {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
    }

    .trail_settings span {
        color: #000000;
        font-size: 13px;
        font-family: 'Montserrat';
        font-weight: 500;
    }

    #my-extension-root .wrap.open .blob[disabled] {
        background: #808080;
        cursor: not-allowed !important;
    }

    .responsive_modal {
        max-width: 95vw;
    }
`;
