export const videoTourCss1 = `
    .video-wrap_tooltip {
        position: absolute;
        z-index: 99999;
    }

    .video-wrap_tooltip-smallScreen {
        top: calc(100% - 205px);
        left: calc(100% - 430px);
        width: 348px;
        height: 194.344px;
        display: block;
    }

    .video-wrap_tooltip.video-wrap_tooltip-smallScreen .tr_gradient_border {
        padding: 5px;
        display: inline-block;
        border-radius: 50%;
        overflow: hidden;
        float: right;
        /* position: relative; */
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
`;