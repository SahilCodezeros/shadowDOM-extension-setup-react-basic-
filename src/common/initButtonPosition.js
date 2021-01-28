export const initButtonPosition = (num) => {
    const shadowRoot = document.getElementById('extension-div').shadowRoot;

    // Remove postion relative
    shadowRoot.getElementById('my-extension-defaultroot').style.top = '0px';
    shadowRoot.getElementById('my-extension-defaultroot').style.left = '0px';
    shadowRoot.getElementById('my-extension-defaultroot').style.right = '0px';
    shadowRoot.getElementById('my-extension-defaultroot').style.bottom = '0px';
    shadowRoot.getElementById('my-extension-defaultroot').style.position = 'initial';
}
