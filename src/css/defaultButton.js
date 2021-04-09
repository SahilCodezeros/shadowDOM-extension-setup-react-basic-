export const defaultButtonCss1 = `
    #my-extension-defaultroot .sidepopup {
        // box-shadow: 0 0 10px rgba(0, 0, 0, 0.16);
        // -webkit-box-shadow: 0 0 10px rgba(0, 0, 0, 0.16);
        // -moz-box-shadow: 0 0 10px rgba(0, 0, 0, 0.16);
        // background: transparent;
        // background: white;
        width: 340px;
        height: calc(100% - 80px);
        padding: 0 25px;
        position: relative;
        border-radius: 5px;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        box-sizing: border-box;
    }
    
    #my-extension-defaultroot .space {
        height: 15px;
        width: 100%;
        display: block;
    }
    
    /* #my-extension-defaultroot .sidepopup.open:after {
        content: '';
        width: 100%;
        height: 100%;
        background: #ffffffbd;
        position: absolute;
        left: -20px;
        top: -20px;
        z-index: -1;
        border-radius: 5px;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
    } */
    
    div#my-extension-defaultroot {
        display: block;
        border-radius: 5px;
        font-family: 'Lato', sans-serif;
        z-index: 99999999;
        box-shadow: rgb(212 30 121) 0px 0px 9px;
    }
    
    #my-extension-defaultroot .sidepopup {
        display: none;
    }
    
    #my-extension-defaultroot .sidepopup.open {
        display: block;
    }
    
    #my-extension-defaultroot .sidepanal {
        // height: calc(100vh - 170px);
        height: calc(100vh - 150px);
        position: relative;
    }
    
    #my-extension-defaultroot .sidepopup.open+button.menu.pop {
        transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
    }
    
    #my-extension-defaultroot button.menu.pop {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 65px;
        height: 65px;
        background: transparent !important;
        border: none !important;
        transition: all 0.2s ease-out;
    }
    
    #my-extension-defaultroot .title {
        // font-size: 22px;
        font-size: 18px;
        font-weight: bold;
        line-height: 24px;
        // color: #fb542b;
        color: #000000;
        text-transform: unset;
        -webkit-text-transform: unset;
        font-family: Montserrat, 'Lato', sans-serif;
        text-align: left;
    }
    
    #my-extension-defaultroot .my-4 {
        margin: 30px 0 15px;
    }
    
    #my-extension-defaultroot .optionBtn {
        float: right;
    }
    
    #my-extension-defaultroot .titleBack {
        float: left;
        color: #D41E79;
        display: table;
        font-size: 18px;
        font-weight: bold;
        font-family: Montserrat;
    }

    .trail_builder-back-button {
        background: transparent !important;
    }
    
    #my-extension-defaultroot .hdr {
        display: inline-block;
        width: 100%;
    }
    
    #my-extension-defaultroot .optionBtn button {
        border: none;
        background: transparent;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        padding: 0;
        margin-left: 10px !important;
    }
    
    #my-extension-defaultroot .optionBtn button img {
        width: 5px;
    }
    
    #my-extension-defaultroot .optionBtn button:hover {
        background: #d4d4d4;
    }
    
    #my-extension-defaultroot .titleBack button {
        background: transparent;
        border: none;
        margin-right: 10px;
    }
    
    button {
        cursor: pointer !important;
    }
    
    #my-extension-defaultroot .input {
        font-size: 10px;
        font-weight: 400;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        width: calc(100% - 22px);
        padding: 10px;
        resize: none;
    }
    
    #my-extension-defaultroot input[type="submit"], #my-extension-defaultroot .btn {
        color: #fb542b;
        font-size: 14px;
        font-weight: bold;
        border: 1px solid #fb542b;
        border-radius: 3px;
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        background: #fff;
        min-width: 82px;
        line-height: 35px;
        /* float: right; */
        box-shadow: none;
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
    }
    
    #my-extension-defaultroot .btn:hover {
        background: #fb542b;
        color: #fff;
    }
    
    #my-extension-defaultroot .mb-2 {
        margin-bottom: 5px;
    }

    .trail_video_frm{ padding-bottom: 5px;}
    #my-extension-defaultroot .pl-4 {
        padding-left: 30px!important;
    }
    
    #my-extension-defaultroot .flow .li {
        position: relative;
    }
    
    #my-extension-defaultroot .counter {
        position: absolute;
        border-radius: 50%;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        text-align: center;
        z-index: 1;
        background: #d4d4d4;
        width: 13px;
        height: 13px;
        box-sizing: border-box;
        font-size: 0;
        top: 32px;
        left: -26px;
    }

    #my-extension-defaultroot .active .counter  {
        border: 2px solid #fb542b;
        left: -36px;
        width: 32px;
        height: 32px;
        padding: 2px;
        line-height: 24px!important;
        background:#ffffff;
        color:#ffffff;
        top: 23px;
    }

    #my-extension-defaultroot .active .counter span {
        background: #fb542b;
        color: #ffffff;
        border-radius: 50%;
        display: block;
        font-size: 12px!important;
    }
    
    #my-extension-defaultroot .en_title {
        font-size: 14px!important;
        font-weight: 700!important;
        line-height: 20px!important;
        margin-bottom: 5px!important;
        color: #000000!important;
    }
    
    #my-extension-defaultroot .en_desc, #my-extension-defaultroot .en_desc p, #my-extension-defaultroot .en_desc a{
        font-size: 14px!important;
        font-weight: 400!important;
        line-height: 20px!important;
        color: #aaaaaa!important;
        font-family: 'Lato', sans-serif !important;
        text-decoration: none!important;
    }

    #my-extension-defaultroot .en_desc p span{
        color: #aaaaaa!important;
    }

    #my-extension-defaultroot .active .en_title, #my-extension-defaultroot .active .en_desc{
        color: #212121!important;
    }

    #my-extension-defaultroot .li.done:after {
        content: '';
        width:0;
        height: 100%;
        position: absolute ;
        top: 47px;
        left: -20px;
        border:0.5pt dashed var(--color-gray);
    }

    #my-extension-defaultroot .li.done:last-child:after {
        content: none;
    }
    
    #my-extension-defaultroot .mr-2 {
        margin-right: 20px;
    }
    
    #my-extension-defaultroot button:not(.s-btn) {
        box-shadow: none;
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        padding: 0;
    }
    
    .trail_select_bx {
        box-shadow: 0 0 10px 5px #fb542b !important;
        -webkit-box-shadow:0 0 10px 5px #fb542b !important;
    }
    
    #my-extension-defaultroot .sidepopup .video {
        height: calc(100% - 40px);
    }
    
    #my-extension-defaultroot .sidepopup .first_step {
        height: 100%;
    }

    // #my-extension-defaultroot .titleBack button:not(.s-btn),
    #my-extension-defaultroot .optionBtn button:not(.s-btn) {
        background: #fff !important;
    }

    .trail_builder-back-button {
        background: transparent;
    }

    #my-extension-defaultroot .titleBack button:not(.s-btn) {
        min-height: 25px;
        height: 25px;
    }
    
    #my-extension-defaultroot .video-wrap_tooltip .title {
        font-size: 40px;
        text-align: center;
        color: #ffffff;
        margin-bottom: 30px;
    }
    
    #my-extension-defaultroot .video-wrap_tooltip .contentTitle {
        font-size: 30px;
        text-align: center;
        color: #ffffff;
        margin-bottom: 30px;
    }
    
    #my-extension-defaultroot .video-wrap_tooltip .description {
        font-size: 25px;
        text-align: center;
        color: #ffffff;
        margin-bottom: 30px;
    }

    #my-extension-defaultroot .flow {
        max-height: calc(100vh - 675px);
    }
    
    #my-extension-defaultroot .flow .li {
        margin-left: 40px !important;
        padding-bottom: 10px;
    }
`;

export const defaultButtonCss2 = `
    #my-extension-defaultroot input[type="text"],
    .trail_create_modal input[type="text"],
    #my-extension-defaultroot input[type="password"],
    #my-extension-defaultroot textarea,
    .trail_tooltip input[type="text"],
    .trail_tooltip input[type="password"],
    .trail_tooltip textarea,
    .trailMain input[type="text"],
    .trailMain input[type="password"],
    .trailMain textarea {
        border: 1px solid #dddddd !important;
        box-shadow: none !important;
        background: #ffffff !important;
        color: #000 !important;
        font-size: 14px !important;
        font-style: normal !important;
        font-family: "Lato", sans-serif !important;
    }

    #my-extension-defaultroot input[type="text"]:focus {
        outline: none !important;
        border: 1px solid #D41E79 !important;
    }

    .trail_tooltip input.ant-input[type="password"]::-webkit-input-placeholder,
    .trail_tooltip input.ant-input[type="text"]::-webkit-input-placeholder,
    .trail_create_modal input.ant-input[type="text"]::-webkit-input-placeholder,
    .trail_tooltip textarea.ant-input::-webkit-input-placeholder,
    #my-extension-defaultroot
    input.ant-input[type="password"]::-webkit-input-placeholder,
    #my-extension-defaultroot
    input.ant-input[type="text"]::-webkit-input-placeholder,
    #my-extension-defaultroot textarea.ant-input::-webkit-input-placeholder {
        font-size: 14px !important;
        font-family: "Lato", sans-serif !important;
        color: #9b9b9b !important;
    }

    #my-extension-defaultroot .sidepopup.open {
        animation: opacity 0.7s forwards;
        -webkit-animation: opacity 0.7s forwards;
        // overflow: auto !important;
    }

    #my-extension-defaultroot .sidepopup.open * {
        animation: opacity2 0.3s forwards;
        -webkit-animation: opacity2 0.3s forwards;
        animation-delay: 0.5s;
        -webkit-animation-delay: 0.5s;
        opacity: 0;
        word-break: break-all;
    }

    #my-extension-defaultroot .sidepopup.open:after {
        animation: move 0.3s forwards;
        -webkit-animation: move 0.3s forwards;
        animation-delay: 1s;
        -webkit-animation-delay: 1s;
        left: 0;
        top: 0;
    }

    #my-extension-defaultroot .ant-upload,
    .trail_tooltip .ant-upload,
    .trail_create_modal .ant-upload {
        border: 1px dashed #d5d5d5;
        border-radius: 5px;
        text-align: center;
    }

    #my-extension-defaultroot .ant-upload {
        margin-bottom: 5px;
    }

    #my-extension-defaultroot p.ant-upload-drag-icon,
    .trail_tooltip p.ant-upload-drag-icon,
    .trail_create_modal p.ant-upload-drag-icon {
        margin: 10px 0 0 !important;
    }

    #my-extension-defaultroot span.anticon.anticon-cloud-upload,
    .trail_tooltip span.anticon.anticon-cloud-upload,
    .trail_create_modal span.anticon.anticon-cloud-upload,
    .trail_create_modal span.anticon.anticon-cloud-upload svg {
        color: #e0e0e0 !important;
        fill: #e0e0e0 !important;
        font-size: 40px;
        line-height: 48px;
    }

    #my-extension-defaultroot p.ant-upload-text,
    .trail_tooltip p.ant-upload-text,
    .trail_create_modal p.ant-upload-text {
        font-size: 14px;
        font-family: "Lato", sans-serif !important;
        color: #9b9b9b;
        margin-top: 0;
    }

    #my-extension-defaultroot p.ant-upload-tex {
        margin-bottom: 1rem;
    }

    #my-extension-defaultroot .upload_bx,
    .trail_create_modal .upload_bx,
    .trail_tooltip .upload_bx {
        position: relative;
    }

    #my-extension-defaultroot .upload_bx input,
    .trail_create_modal .upload_bx input,
    .trail_tooltip .upload_bx input {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        cursor: pointer;
        opacity: 0 !important;
        animation: none !important;
        -webkit-animation: none !important;
    }
    
    #my-extension-defaultroot .ant-upload *,
    .trail_tooltip .ant-upload * {
        text-align: center !important;
    }

    .trail_tooltip .popover-body .tr_icon_grp button img,
    .trail_create_modal .tr_icon_grp button img,
    #my-extension-defaultroot .drag_icon img {
        background: transparent;
    }

    .trail_tooltip .popover-body .tr_icon_grp button img,
    .trail_create_modal .tr_icon_grp button img {
        max-width: 25px !important;
    }

    #my-extension-defaultroot .audio_wrap_tooltip {
        width: 390px;
    }

    #my-extension-defaultroot .sidepopup.open .drag_icon img {
        width: 15px !important;
        height: 15px !important;
        // opacity: 0.3 !important;
        opacity: 1 !important;
        animation: none !important;
        color: #aaaaaa !important;
    }

    #my-extension-defaultroot .sidepopup.open .drag_icon {
        position: absolute;
        top: 5px;
        left: 5px;
        z-index: 2;
        display: inherit;
    }

    .sidepopcontent {
        height: calc(100% - 31px); 
        overflow: auto;
        // padding-right: 29px;
    }

    .sidepopcontent .trailButtonsWrapper {
        display: flex;
        justify-content: space-around;
        padding-bottom: 20px;
    }

    .jc-end {
        justify-content: flex-end !important;
    }

    .trail_video_frm {
        display: block;
    }

    p.ant-upload-drag-icon {
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .ant-input,
    input.ant-input[type="text"],
    input.ant-input[type="password"],
    textarea.ant-input {
        box-sizing: border-box;
        font-feature-settings: "tnum";
        position: relative;
        display: inline-block;
        width: 100%;
        height: 32px;
        min-height: 32px;
        color: #000000 !important;
        font-size: 14px;
        line-height: 1.5;
        background-color: rgb(255, 255, 255);
        background-image: none;
        margin: 0px;
        font-variant: tabular-nums;
        list-style: none;
        padding: 4px 11px;
        border-radius: 4px;
        transition: all 0.3s ease 0s;
        text-align: left;
    }

    textarea.ant-input:focus,
    input.ant-input[type="password"]:focus,
    input.ant-input[type="text"]:focus {
        outline: none !important;
        border: 1px solid #D41E79 !important;
    }
    
    .tr_side_form {
        display: table;
        padding: 10px 0;
        width: 100%;
    }

    .trailitStepBox {
        box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);
        border-radius: 7px;
        background-color: #D41E79;
        margin: 0 0 10px 5px !important;
        position: relative;
        display: flex;
        justify-content: space-between;
        height: 67px;
    }

    .trailitStepBox.active,
    .info_bbx.active,
    .info_bbx_gradient.active,
    .info_bbx_grey.active {
        border: 2px solid #f04d26;
        width: 89.5% !important;
    }

    .trailitStepBox.trailitSubStepBox .trailitStepTitle {
        max-height: 19px !important;
        margin: 15px 15px 15px 30px !important;
        white-space: nowrap;
    }
    .trailitStepBox.trailitSubStepBox {
        align-items: center;
        width: 80%;
        margin-left: 20% !important;
    }
    
    .trailitStepBox.trailitSubStepBox button.trailit_dotsButton {
        margin-right: 10px;
    }

    #my-extension-defaultroot .drag_icon {
        opacity: 0.4!important;
        animation: none!important;
        cursor: move;
    }

    .trailitStepTitle {
        font-family: Montserrat, "Roboto", sans-serif;
        font-style: normal;
        font-weight: normal;
        font-size: 13px;
        margin: 25px 15px;
        line-height: 19px;
        // color: #000000;
        color: #ffffff;
        display: -webkit-box !important;
        -webkit-line-clamp: 2 !important;
        -webkit-box-orient: vertical !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
        max-height: 38px !important;
        word-break: break-all !important;
    }

    .trailitStepTitle span {
        margin-left: 10px;
    }

    .trailitIconRight {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-end;
        padding: 10px 10px 10px 0;
    }

    .trailitIconRight > div {
        display: inherit;
    }
`;

export const defaultButtonCss3 = `
    .trailit_dotsButton {
        border: none;
        background: none;
        padding: 0;
        cursor: pointer;
        line-height: 10px!important;
    }

    .trailit_dotsMenuList {
        position: absolute;
        width: 80px;
        // top: 20px;
        right: 30px;
        padding: 12px 10px;
        background: #f2f2f2;
        border-radius: 7px;
        box-shadow: 5px 5px 8px rgba(0, 0, 0, 0.2);
        z-index: 2;
    }
        
    .trailit_dotsMenuList button {
        border: none;
        background: none;
        padding: 0;
        font-weight: 500;
        font-size: 14px;
        line-height: 17px;
        margin-bottom: 13px;
        width: 100%;
        text-align: left;
        z-index: 2;
    }

    .trailitSubStepBox .trailit_dotsMenuList {
        top: 40px !important;
    }
    
    button {
        margin-bottom: 0 !important;
    }

    #my-extension-defaultroot .white_background {
        background: white;
    }

    #my-extension-defaultroot .transparent_background {
        background: transparent;
    }    
`;

export const deleteModalCss = `
    .trial_create_modal_main,
    .trail_preview_modal_main {
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

    // .modal-open .trial_modal_show .modal {
    //     overflow-x: hidden;
    //     overflow-y: auto;
    // }

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

    .trail_create_modal .modal-header, .trail_continue_modal .modal-header  {
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
        font-family: Montserrat, "Lato", sans-serif !important;
        padding-bottom: 40px !important;
        display: block !important;
    }

    .trail_create_modal p {
        margin: 0 !important;
    }

    .tr_modal .trailButtonsWrapper {
        text-align: right;
        padding: 0;
    }

    button:focus {
        outline: none !important;
    }
`;
