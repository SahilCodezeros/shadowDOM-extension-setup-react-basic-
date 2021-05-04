export const tooltipCss1 = `
    .trail_tooltip {
        width: 280px !important;
        position: unset;
    }

    .trail_tooltip.fade.show {
        position: unset !important;
    }
    
    .trail_tooltip .popover {
        // z-index: 9999999999;
        z-index: 999999999;
        background: #ffffff;
        width: 300px !important;
        max-width: 300px !important;
        // height: 297px !important;
        padding: 0 !important;
        display: block !important;
    }

    .bs-popover-bottom,
    .bs-popover-auto[x-placement^="bottom"] {
        margin-top: 0.5rem;
    }

    .trail_tooltip .bs-popover-auto[x-placement^="bottom"],
    .trail_tooltip_done .bs-popover-auto[x-placement^="bottom"] {
        margin: 20px 0 0 !important;
    }

    .trail_tooltip .popover.show.bs-popover-auto,
    .ant-notification.ant-notification-topLeft .trail_noti {
        box-shadow: 0 0 9px rgba(0, 0, 0, 0.5);
    }

    .trail_tooltip .popover.show.bs-popover-auto,
    .trail_tooltip .popover-inner {
        border-radius: 10px !important;
    }

    .trail_tooltip .popover-body {
        // padding: 15px;
        padding: 15px 15px 10px 15px;
    }

    .popover-inner form {
        margin-bottom: 0;
    }
    
    .trail_tooltip .m-0,
    .trail_create_modal .m-0 {
        margin: 0 !important;
    }
    
    .trail_tooltip .ant-btn {
        font-size: 12px;
        height: 28px;
        padding: 0 12px;
    }
`;
