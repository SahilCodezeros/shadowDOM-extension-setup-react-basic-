export const myExtensionRootFlipCss = `
    #my-extension-root-flip {
        width: 340px;
        position: fixed;
        top: 130px;
        right: 40px;
        z-index: 9999;
        z-index: 9999999999;
        height: calc(100vh - 170px);
        perspective: 1800px;
    }

    .trail_fullscreen #my-extension-root-flip {
        perspective: unset;
    }

    #my-extension-root-flip.trail_flip_box {
        width: auto;
        height: auto;
    }

    .trial_modal_show {
        z-index: unset !important;  
    }

    .modal {
        background-color: transparent !important;
        overflow-y: hidden;
    }

    .trial_modal_show .modal {
        position: fixed !important;
        top: 50% !important;
        left: 50% !important;
        bottom: 0 !important;
        right: 0 !important;
        z-index: 9999999999 !important;
        display: none;
        overflow: hidden;
        outline: 0 !important;
        max-width: 500px !important;
        min-width: 500px !important;
        transform: translate(-50%, -50%) !important;
        width: 100% !important;
        padding: 0 !important;
        margin: 0 !important;
        max-height: 100% !important;
    }

    .fade.show {
        opacity: 1 !important;
        visibility: visible !important;
    }

    .trial_create_modal_main .modal {
        height: 326px !important;
    }

    .trial_modal_show .modal {
        overflow-x: hidden;
        overflow-y: auto;
    }

    @media (min-width: 576px) {
        .trial_modal_show .modal-dialog {
          max-width: 500px;
          margin: 0 auto !important;
        }
      
        .trial_modal_show .modal-sm {
          max-width: 300px;
        }
    }

    .trial_modal_show .modal.show .modal-dialog {
        transition: -webkit-transform 0.3s ease-out;
        transition: transform 0.3s ease-out;
        transition: transform 0.3s ease-out, -webkit-transform 0.3s ease-out;
        -webkit-transform: translate(0, 0) !important;
        transform: translate(0, 0) !important;
        position: relative;
        width: auto;
        left: 0 !important;
        padding: 0 !important;
        margin: 10px;
    }

    .trial_modal_show .modal.show .modal-dialog, 	
    .trial_modal_show .modal.show.fade .modal-dialog{	
        top: 0!important;	
    }

    .trial_modal_show .modal-content {
        position: relative !important;
        display: -ms-flexbox !important;
        display: flex !important;
        -ms-flex-direction: column !important;
        flex-direction: column !important;
        background-color: #fff !important;
        background-clip: padding-box !important;
        border: 1px solid rgba(0, 0, 0, 0.2) !important;
        border-radius: 0.3rem !important;
        outline: 0 !important;
        box-shadow: none !important;
        padding: 0 !important;
    }

    .trial_modal_show .modal .modal-content {
        height: auto !important;
        left: 0% !important;
        position: static !important;
        top: 0% !important;
        -webkit-transform: translateY(0%) translateX(0%) !important;
        transform: translateY(0%) translateX(0%) !important;
    }

    .trial_create_modal_main .modal .modal-content {
        border-radius: 10px !important;
        /* overflow: hidden; */
    }

    .trial_modal_show .modal-dialog .modal-content .modal-header {	
        border-radius: 10px !important;	
    }

    .trail_create_modal .modal-header {
        padding: 10px 20px !important;
        background: #fff !important;
        border: none;
        box-sizing: border-box;
        text-transform: unset !important;
        text-align: left !important;
    }

    .trial_modal_show .modal-header {
        display: -ms-flexbox;
        display: flex;
        -ms-flex-align: center;
        align-items: center;
        -ms-flex-pack: justify;
        justify-content: space-between;
        height: 44px !important;
        margin: 0 !important;
    }

    .tr_modal_trail_modal_header h5 {
        margin: 0 !important;
        font-weight: 500 !important;
        font-size: 16px !important;
        font-weight: 400 !important;
        margin-bottom: 0 !important;
        line-height: 1.5 !important;
        color: #5f5d5d !important;
        text-transform: unset !important;
        text-align: left !important;
        letter-spacing: 0 !important;
        font-family: "Lato", sans-serif !important;
    }

    .trial_modal_show .modal-dialog .modal-content .modal-body {	
        border: none !important;	
    }

    .trail_create_modal .modal-body {
        padding: 0 20px 15px !important;
    }

    .trial_modal_show .modal-body {
        position: relative;
        -ms-flex: 1 1 auto;
        flex: 1 1 auto;
        padding: 15px;
        margin: 0 !important;
    }

    .trailit_DeleteText {
        all: unset !important;
        font-weight: 500 !important;
        font-size: 18px !important;
        line-height: 29px !important;
        color: #000000 !important;
        font-family: "Lato", sans-serif !important;
        padding-bottom: 40px !important;
        display: block !important;
    }

    .trail_create_modal p {
        margin: 0 !important;
    }

    .trail_create_modal .trailButtonsWrapper {
        text-align: right;
        display: flex;
        justify-content: flex-end;
        flex-direction: row;
        position: unset;
    }

    .tr_modal .trailButtonsWrapper {
        text-align: right;
        padding: 0;
    }

    .tr_modal .ant-btn.ant-btn-primary {
        background: #fb542b !important;
        color: #ffffff;
        border: 1px solid #fb542b !important;
        box-shadow: none !important;
        -webkit-box-shadow: none !important;
        -moz-box-shadow: none !important;
        width: auto !important;
        border-radius: 3px !important;
        min-width: 82px !important;
        font-size: 12px;
        font-weight: 400 !important;
        font-family: "Lato", sans-serif !important;
        height: 28px;
        line-height: 28px;
        text-transform: uppercase;
        -webkit-text-transform: uppercase;
        margin-bottom: 0;
        letter-spacing: 0 !important;
        padding: 0 6px;
        text-align: center;
        min-height: 28px;
    }

    .tr_modal .ant-btn.ant-btn-primary:hover {
        background: #ffffff !important;
        border: 1px solid #fb542b !important;
        color: #fb542b !important;
    }

    .trail_create_modal button {
        margin-left: 10px !important;
    }

    button:focus {
        outline: none !important;
    }

    .trailit_logoLeftBottom {
        position: fixed;
        left: 20px;
        bottom: 20px;
        width: 100px;
        z-index: 999999999 !important;
    }

    .trial_modal_show .modal-dialog-centered {
        min-height: 100%;
    }

    .modal-dialog-centered {
        display: -ms-flexbox;
        display: flex;
        -ms-flex-align: center;
        align-items: center;
        min-height: calc(100% - 1rem);
    }

    .trial_modal_show .modal-dialog .modal-header .close,	
    .trial_modal_show .modal-dialog .modal-header .close:hover,	
    .trial_modal_show .modal-dialog .modal-header .close:focus,	
    .trial_modal_show .modal-dialog .modal-header .close:active {	
        transform: rotate(0)!important;	
    }	

    .trial_modal_show .close {
        float: right;
        font-size: 24px !important;
        font-weight: 400 !important;
        line-height: 24px !important;
        color: #000 !important;
        text-shadow: 0 1px 0 #fff;
        opacity: 0.5 !important;
        padding: 0 !important;
        background: transparent !important;
        border: none !important;
        -webkit-box-shadow: none !important;
        box-shadow: none !important;
        -webkit-appearance: none;
        min-height: 24px !important;
        width: 24px !important;
        position: unset !important;
    }

    .tr_icon_grp {
        display: flex;
        justify-content: left;
        padding-bottom: 10px;
        position: unset;
        flex-direction: unset;
    }
      
    .tr_icon_grp button img {
        margin: 0;
    }

    .trail_create_modal .tr_icon_grp button.tr_active {
        filter: grayscale(0);
    }

    .trail_create_modal .tr_icon_grp button:hover,
    .trail_create_modal .tr_icon_grp button:focus {
        background-color: #f2f2f2;
        border-color: #f2f2f2;
    }

    .trail_tooltip .popover-body .tr_icon_grp button:disabled {
        cursor: default !important;
    }

    .trail_create_modal .tr_icon_grp button {
        margin-right: 24px;
    }

    .trail_create_modal .tr_icon_grp button:last-child {
        margin-right: 0;
    }

    .trail_create_modal .tr_icon_grp button {
        border: none;
        background: #f2f2f2;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-left: 0 !important;
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
        filter: grayscale(1);
        padding: 0;
        // margin: 0 0 0 0;
    }

    .trial_modal_show .modal form {
        margin-bottom: 0;
    }

    .ant-row.ant-form-item,
    .upload_bx {
        display: table;
        width: 100%;
    }

    .trail_tooltip .ant-form-item,
    .trail_create_modal .ant-form-item {
        margin-bottom: 5px;
    }
`;

export const myExtensionRootCss = `
    #my-extension-root {
        font-family: 'Lato', sans-serif!important;
        width: 40px;
        height: 430px;
        float: right;
    }
    
    #my-extension-root button:focus {
        outline: none;
    }
    
    #my-extension-root .wrap .blob {
        cursor: pointer;
        border: none;
        outline: none;
        position: relative;
        z-index: 10;
        background: transparent!important;
        right: 0;
        width: 100%;
        height: 40px;
    }
    
    #my-extension-root .wrap.open .blob {
        display: block;
        box-shadow: none;
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        padding: 0;
    }
    #my-extension-root .wrap .blob {
        margin-top: 10px;
        display: block;
    }

    #my-extension-root .my-extension,
    #my-extension-root .wrap {
        width: 100%;
        height: 100%;
        position: relative;
        text-align: right;
    }

    #my-extension-root .wrap .blob svg {
        box-shadow:0 0 4px rgba(0,0,0,.14), 0 4px 8px rgba(0,0,0,.28);
        -webkit-box-shadow:0 0 4px rgba(0,0,0,.14), 0 4px 8px rgba(0,0,0,.28);
        -moz-box-shadow:0 0 4px rgba(0,0,0,.14), 0 4px 8px rgba(0,0,0,.28);
        background: #fff;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
        float: right;
        width: 40px !important;
        height: 40px !important;
    }

    #my-extension-root .wrap .blob:after {
        content: attr(data-title);
        color: #fb542b;
        width: 130px;
        margin-right: 6px;
        box-shadow:0 0 4px rgba(0,0,0,.14), 0 4px 8px rgba(0,0,0,.28);
        -webkit-box-shadow:0 0 4px rgba(0,0,0,.14), 0 4px 8px rgba(0,0,0,.28);
        -moz-box-shadow:0 0 4px rgba(0,0,0,.14), 0 4px 8px rgba(0,0,0,.28);
        background: #fff;
        font-family: 'Lato', sans-serif;
        font-size: 14px;
        line-height: 30px;
        font-weight: 400!important;
        text-align: center;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        position: absolute;
        top: 6px;
        right: 50px;
        text-transform: capitalize!important;
        letter-spacing: 0;
    }

    #my-extension-root .wrap .blob:hover::after {
        color: #ffffff;
        background:#fb542b;
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

    #my-extension-root .wrap .blob:hover .svg_btn2 {
        fill: #ffffff;
        stroke: #ffffff;
    }
    
    #my-extension-root .wrap .blob:hover .svg_btn {
        fill: #ffffff !important;
        stroke: #fb542b;
    }
    
    #my-extension-root .wrap .blob:hover #Ellipse_101 {
        fill: #fb542b;
    }
    
    #my-extension-root .wrap .blob:hover span {
        background: #fb542b;
        color: #ffffff;
    }
    
    #my-extension-root .menu img.trail_plus {
        width: 24px;
        height: 24px;
        top: 8px;
        right: 7px;
    }

    .wrap button.blob{
        -webkit-transform: scale(0);
        transform:  scale(0);
        transition: all .5s;
    }

    .wrap.open button.blob{
        -webkit-transform: scale(1);
        transform:  scale(1);
    }

    .wrap button:nth-child(1) {    
        transition-delay: 50ms;
    }

    .wrap.open button:nth-child(1) {    
        transition-delay: 150ms;
    }
    .wrap button:nth-child(2) {    
        transition-delay: 100ms;
    }

    .wrap.open button:nth-child(2) {    
        transition-delay: 100ms;
    }

    .wrap button:nth-child(3) {    
        transition-delay: 150ms;
    }
    .wrap.open button:nth-child(3) {    
        transition-delay: 50ms;
    }

    .wrap button:nth-child(5) {    
        transition-delay: 200ms;
    }

    .wrap.open button:nth-child(5) {    
        transition-delay: 50ms;
    }

    .wrap button:nth-child(6) {    
        transition-delay: 150ms;
    }

    .wrap.open button:nth-child(6) {    
        transition-delay: 100ms;
    }

    .wrap button:nth-child(7) {    
        transition-delay: 100ms;
    }
    
    .wrap.open button:nth-child(7) {    
        transition-delay: 150ms;
    }

    .wrap button:nth-child(8) {    
        transition-delay: 50ms;
    }

    .wrap.open button:nth-child(8) {    
        transition-delay: 200ms;
    }

    .wrap .trail_plus {
        opacity: 0;
        position: absolute;
        top: 0;
        right: 0;
    }

    .wrap .trail_edit {
        width: 20px!important;
        height: 20px!important;
        position: absolute;
        top: 10px;
        right: 10px;
    }

    .wrap.open .trail_plus {
        opacity: 1;
    }

    .wrap.open .trail_edit {
        opacity: 0;
    }

    .wrap .menu img {
        -webkit-transform: rotate(0); 
        transform: rotate(0);
        -webkit-transition: -webkit-transform 150ms cubic-bezier(.4,0,1,1);
        transition: transform 150ms cubic-bezier(.4,0,1,1);
    }

    .wrap.open .menu img {
        -webkit-transform:  rotate(315deg);
        transform: rotate(315deg);
        -webkit-transition: -webkit-transform 150ms cubic-bezier(.4,0,1,1);
        transition: transform 150ms cubic-bezier(.4,0,1,1);
    }
`;