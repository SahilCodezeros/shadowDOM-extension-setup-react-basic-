export const mainCss = `
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