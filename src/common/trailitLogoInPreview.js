/* global chrome */

export const addTrailitLogo = () => {
  const extensionDiv = document.getElementById("extension-div").shadowRoot;
  const image = extensionDiv.querySelector(".trailit_logoLeftBottom");

  if (extensionDiv && !image) {
    const element = document.createElement("img");
    element.src = require("../images/logo.png");
    element.alt = "logo_image_in_preview";
    element.className = "trailit_logoLeftBottom cursor";

    chrome.storage.local.get(["trail_status", "trail_name"], (items) => {
      if (items.trail_status === "public" && items.trail_name) {
        let trailName = items.trail_name.split(" ").join("-");

        element.onclick = () => {
          // Open trail profile page in new tab
          window.open(
            `${process.env.REACT_APP_TRAILIT_WEB_APP}/trail/${trailName}`,
            "_blank"
          );
        };
      } else {
        element.onclick = () => {
          // Open trail profile page in new tab
          window.open("https://www.trailit.co/", "_blank");
        };
      }
    });

    // Append element in body
    extensionDiv.appendChild(element);
  }
};

export const removeTrailitLogo = () => {
  // Image selector
  const image = document
    .getElementById("extension-div")
    .shadowRoot.querySelector(".trailit_logoLeftBottom");

  if (image) {
    // Remove image from perent node
    image.parentNode.removeChild(image);
  }
};
