export const addOverlay = () => {
    // Get shadow root document
    const shadowRoot = document.getElementById('extension-div').shadowRoot;

    // Create new div element and set class attribute
    const trailOverlay = document.createElement('div');
    trailOverlay.setAttribute('class', 'trail_overlay');

    // Append trail overlay to shadow root
    shadowRoot.appendChild(trailOverlay);
};

export const setOverlayHtml = (window, docHeight, topPosition, bounding, leftPosition, tourType) => {
    // Get shadow root document
    const shadowRoot = document.getElementById('extension-div').shadowRoot;
    
    shadowRoot.querySelector('.trail_overlay').innerHTML = `
        <svg height="100%" width="100%">
            <polygon points="0,0 ${window.innerWidth},0 ${window.innerWidth},${docHeight} 0,${docHeight} 0,${topPosition + bounding.height + 10} ${leftPosition + bounding.width + 10},${topPosition + bounding.height + 10} ${leftPosition + bounding.width + 10},${topPosition - 10} ${leftPosition - 10},${topPosition - 10} ${leftPosition - 10},${topPosition + bounding.height + 10} 0,${topPosition + bounding.height + 10}" style="fill:rgba(0,0,0,0.8);"/>
            Sorry, your browser does not support inline SVG.
        </svg>
    `;

    shadowRoot.querySelector('.trail_overlay').style.height = `${docHeight}px`;
    shadowRoot.querySelector('.trail_overlay').classList.add('trail_overlay_style');

    if (tourType === 'webUserTour') {
        shadowRoot.querySelector('.trail_overlay').addEventListener('dblclick', () => {
            shadowRoot.querySelector('.trail_overlay').style.display = "none";
        });
    }
};

export const removeOverlay = () => {
    // Get shadow root document
    const shadowRoot = document.getElementById('extension-div').shadowRoot;

    // Remove trail overlay
    shadowRoot.querySelector('.trail_overlay').remove();
};