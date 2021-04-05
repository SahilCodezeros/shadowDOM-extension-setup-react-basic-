export const videoTourCss1 = `
    .video-wrap_tooltip {
        position: absolute;
        z-index: 99999;
    }

    .video-wrap_tooltip-smallScreen {
        top: calc(100% - 235px);
        // top: calc(100% - 205px);
        left: calc(100% - 430px);
        width: 348px;
        height: 194.344px;
        display: block;
    }

    .video-wrap_tooltip.video-wrap_tooltip-smallScreen .video-wrap_tooltip-inner {
        width: auto;
        height: 100%;
        float: right;
    }

    .video-wrap_tooltip.video-wrap_tooltip-smallScreen .tr_gradient_border:after {
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        z-index: 0;
    }

    .videoShow-smallScreen {
        right: 0;
        bottom: -40px;
    }

    .btn-wrap.videoShow {
        position: absolute;
    }

    video::-webkit-media-controls-fullscreen-button {
        display: none !important;
    }
    
    .video-wrap_tooltip .icon {
        z-index: 999999;
        position: absolute !important;
        width: 24px !important;
        height: 24px !important;
    }
    
    .video-wrap_tooltip .icon img {
        background: transparent !important;
    }
    
    .video-wrap_tooltip .icon:hover {
        cursor: pointer;
    }
    
    .video-icon-fullScreen {
        bottom: 87px !important;
        right: 38px !important;
    }
    
    .video-icon-smallScreen {
        bottom: 65px !important;
        right: 13px !important;
    }
    
    .video-wrap_tooltip .icon img {
        width: 24px !important;
    }
    
    video {
        width: inherit;
        height: inherit;
        /* object-fit: initial; */
    }
    
    video:focus {
        outline: none !important;
    }
      
    .video-wrap_tooltip-smallScreen video {
        width: auto;
        height: 100%;
        float: right;
    }

    .video-wrap_tooltip a {
        color: #ffffff !important;
    } 

    .video-wrap_tooltip.video-wrap_tooltip-smallScreen .video-wrap_tooltip-inner {
        width: auto;
        height: 100%;
        float: right;
    }
    
    .video-wrap_tooltip.video-wrap_tooltip-fullScreen .video-wrap_tooltip-inner {
        width: 100%;
        height: calc(100vh - 28px);
        float: right;
    }
    
    /*circle video*/
    .video-wrap_tooltip.video-wrap_tooltip-smallScreen .video-wrap_tooltip-inner {
        border-radius: 50%;
        overflow: hidden;
        width: 190px;
        height: 190px;
        z-index: 1;
        position: relative;
    }
    
    .video-wrap_tooltip.video-wrap_tooltip-smallScreen
        .video-wrap_tooltip-inner
        iframe {
        height: 100%;
        border: none;
    }
    
    .video-wrap_tooltip.video-wrap_tooltip-smallScreen .tr_gradient_border {
        padding: 5px;
        display: inline-block;
        border-radius: 50%;
        overflow: hidden;
        float: right;
        /* position: relative; */
    }
    
    .video-wrap_tooltip.video-wrap_tooltip-smallScreen .tr_gradient_border:after {
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        z-index: 0;
    }
    
    .videoShow-smallScreen {
        right: 0;
    }
    
    .video-wrap_tooltip.video-wrap_tooltip-smallScreen video {
        position: absolute;
        left: -38%;
        max-width: unset;
    }
    
    .tr_play_button {
        width: 0;
        height: 0;
        border-color: transparent transparent transparent #fff;
        border-style: solid;
        border-width: 30px 0px 30px 50px;
        position: absolute;
        top: 36%;
        left: calc(50% - 20px);
        -webkit-transition: border-color 0.4s ease-in-out;
        transition: border-color 0.4s ease-in-out;
        cursor: pointer;
    }
    
    .video-wrap_tooltip-smallScreen video::-webkit-media-controls-timeline,
    .video-wrap_tooltip-smallScreen video::-webkit-media-controls-current-time-display {
        display: none;
    }
    
    .videoShow-fullScreen video::-webkit-media-controls-timeline,
    .videoShow-fullScreen video::-webkit-media-controls-current-time-display {
        display: block;
    }

    .trail_video_overlayNext {
        position: fixed;
        z-index: 9999999999;
        top: -130px;
        right: -40px;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.9);
    }
    
    .trail_video_overlayPrev {
        // position: fixed;
        // z-index: 9999999999;
        // top: 0;
        // left: 0;
        // width: 100%;
        // height: 100vh;
        // background: rgba(0, 0, 0, 0.9);
        position: fixed;
        z-index: 9999999999;
        top: -130px;
        right: -40px;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.9);
    }

    .trail_video_overlayNext *,
    .trail_video_overlayPrev * {
        color: #fff !important;
        font-family: "Lato", sans-serif !important;
        background: transparent !important;
        font-size: 16px;
    }

    .video-wrap_tooltip-fullScreen {
        width: 100vw;
        height: calc(100vh - 28px);
        bottom: inherit !important;
        right: inherit !important;
        top: inherit !important;
        left: inherit !important;
        margin: 0 auto;
        transform: translate(0, 0) !important;
        position: fixed !important;
    }

    .videoShow-fullScreen {
        bottom: -25px;
        right: 22px;
    }

    .trail_tooltip_done .ant-btn.ant-btn-primary {
        background: #fb542b !important;
        color: #ffffff;
        border: 1px solid #fb542b !important;
        box-shadow: none !important;
        -webkit-box-shadow: none !important;
        -moz-box-shadow: none !important;
    }

    .ex_mr_10{
        margin-right: 10px;
    }

    .video-mobile {
        top: 47vh !important;
    }
`;
