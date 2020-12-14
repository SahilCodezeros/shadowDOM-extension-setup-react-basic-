export const addTrailitLogo = () => {
    const extensionDiv = document.getElementById('extension-div').shadowRoot;
    const image = extensionDiv.querySelector('.trailit_logoLeftBottom');
    
    // <img src={require('/images/trailit_logo.png')} className="trailit_logoLeftBottom" alt=".."/>
    if (extensionDiv && !image) {
        const element = document.createElement('img');
        element.src = "https://trailit.co/wp-content/uploads/2020/04/logo.png";
        element.className = 'trailit_logoLeftBottom';
        element.alt = 'logo_image_in_preview';

        // Append element in body 
        extensionDiv.appendChild(element);
    }
};

export const removeTrailitLogo = () => {
    // Image selector
    const image = document.getElementById('extension-div').shadowRoot.querySelector('.trailit_logoLeftBottom');

    if (image) {
        // Remove image from perent node
        image.parentNode.removeChild(image);
    }
};