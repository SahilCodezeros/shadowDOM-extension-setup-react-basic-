export const mainFlipCss = `
    .trail_card {
        width: 100%;
        height: 100%;
    }
    
    .trail_card__face {
        position: absolute;
        width: 100%;
        height: 100%;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
    }
    
    .trail_card__face--front {
        left: 0;
        transform-origin: 50% 50% -189px;
        transition: all 0.6s ease-in-out;
        background: none;
    }
    
    .trail_card__face--back {
        background: none;
        transform: rotateY(84.5deg);
        transform-origin: 50% 50% -189px;
        transition: all 0.6s ease-in-out;
    }

    // .trail_card.trail_flipped .my-extension {
    //     position: relative !important;
    // }

    .closeContinue {
        position: relative !important;
    }
    
    .trail_card.trail_flipped .trail_card__face--back {
        transform: rotateY(0deg);
    }
    
    .trail_card.trail_flipped .trail_card__face--front {
        transform: rotateY(-84.5deg);
    }

    .trail_fullscreen .trail_card.trail_flipped .trail_card__face--back {
        transform: unset;
    }
`;
