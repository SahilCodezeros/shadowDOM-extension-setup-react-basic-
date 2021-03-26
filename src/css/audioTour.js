export const audioTourCss1 = `
    .audio_wrap_tooltip {
        position: fixed;
        bottom:-9%;
        right:20%;
        max-width: 500px;
        /* box-shadow: 0 0 5px rgba(0,0,0,0.5);
        -webkit-box-shadow: 0 0 5px rgba(0,0,0,0.5); */
        border-radius: 5px;
        -webkit-border-radius: 5px;
        z-index: 9999;
        /* padding: 15px; */
    }

    .trail_preview_bx .audio_wrap_tooltip_innr {
        background: linear-gradient(
            60deg,
            #f79533,
            #f37055,
            #ef4e7b,
            #a166ab,
            #5073b8,
            #1098ad,
            #07b39b,
            #6fba82
        );
        -webkit-animation: animatedgradient 3s ease alternate infinite !important;
        animation: animatedgradient 3s ease alternate infinite !important;
        background-size: 300% 300%;
        opacity: 1;
    }

    .audio_wrap_tooltip_innr {
        border-radius: 50px;
        -webkit-border-radius: 50px;
        overflow: hidden;
        padding: 5px;
    }

    .audio_wrap_tooltip img {
        width: 40px;
        height: 40px;
        margin: 0 10px 0 0;
        border-radius: 50%;
        background: #ffffff;
    }

    .trialit_audio.tr_gradient_border {
        border-radius: 50px;
        -webkit-border-radius: 50px;
    }

    .trialit_audio {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 15px;
        // background: #333333;
    }

    .tr_audioplayer {
        height: 38px;
        width: 300px;
        color: #fff;
        text-shadow: 1px 1px 0 #000;
        border: 1px solid #222;
        position: relative;
        z-index: 1;
        background: #333;
        background: -webkit-gradient(
          linear,
          left top,
          left bottom,
          from(#444),
          to(#222)
        );
        background: -webkit-linear-gradient(top, #444, #222);
        background: linear-gradient(top, #444, #222);
        -webkit-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15),
          0 0 1.25em rgba(0, 0, 0, 0.5);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15),
          0 0 1.25em rgba(0, 0, 0, 0.5);
        -webkit-border-radius: 2px;
        -moz-border-radius: 2px;
        border-radius: 2px;
    }

    .tr_audioplayer-mini {
        width: 38px;
        margin: 0 auto;
    }
      
    .tr_audioplayer > div {
        position: absolute;
    }
      
    .tr_audioplayer-playpause {
        width: 38px;
        height: 100%;
        text-align: left;
        text-indent: -9999px;
        cursor: pointer;
        z-index: 2;
        top: 0;
        left: 0;
    }
    
    .tr_audioplayer:not(.tr_audioplayer-mini) .tr_audioplayer-playpause {
        border-right: 1px solid #555;
        border-right-color: rgba(255, 255, 255, 0.1);
    }
    
    .tr_audioplayer-mini .tr_audioplayer-playpause {
        width: 100%;
    }
    
    .tr_audioplayer-playpause:hover,
    .tr_audioplayer-playpause:focus {
        background-color: #222;
    }
    
    .tr_audioplayer-playpause a {
        display: block;
    }
    
    .tr_audioplayer:not(.tr_audioplayer-playing) .tr_audioplayer-playpause a {
        width: 0px;
        height: 0px;
        border: 8px solid transparent;
        border-right: none;
        border-left-color: #fff;
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        margin: -8px 0 0 -4px;
        padding: 0 !important;
    }
    
    .tr_audioplayer .tr_audioplayer-playing.tr_audioplayer-playpause a {
        border: none;
        width: 10px;
        height: 15px;
    }
    
    .tr_audioplayer-playing .tr_audioplayer-playpause a {
        width: 12px;
        height: 12px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin: -6px 0 0 -6px;
    }
    
    .tr_audioplayer-playing .tr_audioplayer-playpause a:before,
    .tr_audioplayer-playing .tr_audioplayer-playpause a:after {
        width: 40%;
        height: 100%;
        background-color: #fff;
        content: "";
        position: absolute;
        top: 0;
    }
    
    .tr_audioplayer-playing .tr_audioplayer-playpause a:before {
        left: 0;
    }
    
    .tr_audioplayer-playing .tr_audioplayer-playpause a:after {
        right: 0;
    }
    
    .tr_audioplayer-time {
        width: 70px;
        height: 100%;
        line-height: 38px;
        text-align: center;
        z-index: 2;
        top: 0;
    }
    
    .tr_audioplayer-time-current {
        // border-left: 1px solid #111;
        // border-left-color: 1px solid rgba(0, 0, 0, 0.25);
        left: 38px;
    }
    
    .tr_audioplayer-time-duration {
        border-right: 1px solid #555;
        border-right-color: rgba(255, 255, 255, 0.1);
        right: 38px;
    }

    .tr_audioplayer-time.tr_audioplayer-time-current,
    .tr_audioplayer-time.tr_audioplayer-time-duration {
        color: #ffffff !important;
        font-size: 13px !important;
        font-family: Montserrat, "Lato", sans-serif !important;
    }
    
    .tr_audioplayer-novolume .tr_audioplayer-time-duration {
        border-right: 0;
        right: 0;
    }
    
    .tr_audioplayer-bar {
        height: 14px;
        background-color: #222;
        cursor: pointer;
        z-index: 1;
        top: 50%;
        right: 110px;
        left: 110px;
        margin-top: -7px;
    }
    
    .tr_audioplayer-novolume .tr_audioplayer-bar {
        right: 70px;
        /* 70 */
    }
    
    .tr_audioplayer-bar div {
        width: 0;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
    }
    
    .tr_audioplayer-bar-loaded {
        background-color: #333;
        z-index: 1;
    }
    
    .tr_audioplayer-bar-played {
        background: #007fd1;
        background: -webkit-gradient(
          linear,
          left top,
          right top,
          from(#007fd1),
          to(#c600ff)
        );
        background: -webkit-linear-gradient(left, #007fd1, #c600ff);
        background: linear-gradient(left, #007fd1, #c600ff);
        z-index: 2;
    }
    
    .tr_audioplayer-play,
    .tr_audioplayer-pause {
        -webkit-filter: drop-shadow(1px 1px 0 #000);
        filter: drop-shadow(1px 1px 0 #000);
    }
    
    .tr_audioplayer-bar,
    .tr_audioplayer-bar div {
        -webkit-border-radius: 4px;
        border-radius: 4px;
    }
    
    .tr_audioplayer-bar {
        -webkit-box-shadow: -1px -1px 0 rgba(0, 0, 0, 0.5),
          1px 1px 0 rgba(255, 255, 255, 0.1);
        box-shadow: -1px -1px 0 rgba(0, 0, 0, 0.5), 1px 1px 0 rgba(255, 255, 255, 0.1);
    }
    
    .tr_audioplayer-bar-played {
        -webkit-box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.5);
        box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.5);
    }
    
    .tr_audioplayer *,
    .tr_audioplayer *:before,
    .tr_audioplayer *:after {
        -webkit-transition: color 0.25s ease, background-color 0.25s ease,
          opacity 0.5s ease;
        transition: color 0.25s ease, background-color 0.25s ease, opacity 0.5s ease;
    }
    
    .tr_audioplayer audio {
        width: 0px;
        height: 0px;
        visibility: hidden;
    }
    
    .tr_audioplayer-playing.tr_audioplayer-playpause a:before,
    .tr_audioplayer-playing.tr_audioplayer-playpause a:after {
        width: 3px;
        height: 100%;
        background-color: #fff;
        content: "";
        position: absolute;
        top: 0;
    }
    
    .tr_audioplayer-playing.tr_audioplayer-playpause a:before {
        left: 0;
    }
    
    .tr_audioplayer-playing.tr_audioplayer-playpause a:after {
        right: 0;
    }    

    .audio_wrap_tooltip .btn-wrap.videoShow{
        position: static;
        padding: 15px;
        text-align: right;
    }

    .volume-container .volume-button .volume {
        transform: scale(0.7);
        box-sizing: border-box;
        display: inline-block;
        vertical-align: middle;
        font-style: normal;
        color: #ddd;
        text-align: left;
        text-indent: -9999px;
        direction: ltr;
    }

    .volume-container .volume-button .volume:after,
    .volume-container .volume-button .volume:before {
        content: "";
        pointer-events: none;
    }

    .volume-container .volume-button .volume::after,
    .volume-container .volume-button .volume::before {
        position: absolute;
        top: 5px;
        right: 0;
    }

    .volume-container {
        cursor: pointer;
        position: relative;
        z-index: 2;
        right: 0;
        top: 0;
        width: 39px;
        height: 38px;
    }

    .volume-container .volume-button {
        height: 35px;
        display: inline-block;
        padding: 5px 8px;
        box-sizing: border-box;
    }

    .volume-container .volume-button .volume {
        transform: scale(0.7);
        margin: 0;
    }

    .volume-container .volume-slider {
        position: absolute;
        right: 38px;
        top: 0;
        z-index: -1;
        width: 0;
        height: 36px;
        background: white;
        transition: 0.25s;
        padding: 15px 0;
        border-radius: 4px;
        background: #333;
        background: -webkit-gradient(
        linear,
        left top,
        left bottom,
        from(#444),
        to(#222)
        );
        background: -webkit-linear-gradient(top, #444, #222);
        background: linear-gradient(top, #444, #222);
        box-sizing: border-box;
    }
        
    .volume-container .volume-slider .volume-percentage {
        background: -webkit-gradient(
        linear,
        left bottom,
        left top,
        from(#007fd1),
        to(#c600ff)
        );
        background: -webkit-linear-gradient(bottom, #007fd1, #c600ff);
        height: 100%;
        width: 75%;
        border-radius: 4px;
    }
    
    .volume-container:hover .volume-slider {
        left: -160px;
        width: 160px;
    }
    
    /* .volume-container .volume-button .volume.icono-volumeMedium::after, */
    .volume-container .volume-button .volume.icono-volumeMedium::before {
        top: -7px;
        left: 4px;
        width: 20px;
        height: 25px;
        box-sizing: border-box;
    }

    .tr_audioplayer-volume-button:before,
    .icono-volumeMedium:before {
        border-style: double;
        border-width: 6px;
        left: -2px;
        border-color: #ffffff !important;
    }

    .icono-volumeMute:after,
    .icono-volumeMute:before {
        -webkit-transform: translateY(-50%) rotate(45deg);
        -ms-transform: translateY(-50%) rotate(45deg);
        transform: translateY(-50%) rotate(45deg);
    }

    .icono-volume,
    .icono-volumeHigh,
    .icono-volumeMedium,
    .icono-volumeMute {
        width: 0;
        height: 0;
        border: 7px solid;
        border-left: none;
        border-top-color: transparent;
        border-bottom-color: transparent;
        padding: 6px 3px;
        box-shadow: inset 4px 0;
        margin: 4px 10px 4px 11px;
    }

    .icono-volumeMute:after {
        height: 10px;
        width: 2px;
        left: 21px;
        box-shadow: inset 0 0 0 32px;
    }

    .icono-volumeMute:before {
        width: 10px;
        height: 2px;
        left: 17px;
        box-shadow: inset 0 0 0 32px;
    }

    .icono-volumeHigh:after,
    .icono-volumeHigh:before,
    .icono-volumeLow:before,
    .icono-volumeMedium:before {
        width: 15px;
        height: 15px;
        position: absolute;
        border-radius: 50%;
        border-top-color: transparent !important;
        border-bottom-color: transparent !important;
        border-left-color: transparent !important;
        left: 2px;
    }

    .volume-slider-root {
        width: calc(100% - 50px);
        height: 100%;
        background: #ffffff !important;
        border-radius: 4px;
        display: table;
        margin: 0 auto;
    }
`;

export const audioPlayerCss2 = `
    .playpause-mobile {
        // width: 35px !important;
        // width: 2.1rem !important;
        width: 17% !important;
    }

    .time-current-mobile {
        // width: 30px !important;
        // left: 40px !important;
        // width: 2rem !important;
        // padding: 0 5px !important;

        width: 15% !important;
        left: 21% !important;
    }

    .time-bar-modile {
        // width: 60px !important;
        // left: 80.5px !important;
        top: 53% !important;
        // width: 3.9rem !important;
        // left: 5rem !important;

        width: 20% !important;
        left: 41.5% !important;
    }

    .time-duration-mobile {
        // width: 30px !important;
        // right: 35px !important;
        // right: 2rem !important;
        // width: 2.2rem !important;
        // padding: 0px 6px !important;

        width: 22% !important;
        right: 18% !important;
    }

    .volume-mobile {
        // width: 35px !important;
        width: 18% !important;
    }

    .volume-container:hover .volume-slider-mobile {
        width: 350% !important;
        left: -352% !important;
    }

    .audio_wrap_mobile {
        right: 15vw !important;
        width: 72vw;
        top: 65vh !important;
    }

    .trail_tooltip_done .audio_wrap_mobile {
        width: inherit !important;
    }
`;
