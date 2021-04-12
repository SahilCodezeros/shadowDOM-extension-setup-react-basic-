/* global chrome */

export const addTrailitLogo = () => {
  const extensionDiv = document.getElementById("extension-div").shadowRoot;
  const image = extensionDiv.querySelector(".trailit_logoLeftBottom");

  // <img src={require('/images/trailit_logo.png')} className="trailit_logoLeftBottom" alt=".."/>
  if (extensionDiv && !image) {
    const element = document.createElement("img");
    element.src = "https://trailit.co/wp-content/uploads/2020/04/logo.png";
    element.alt = "logo_image_in_preview";

    chrome.storage.local.get(
      ["trail_status", "trail_id", "userData"],
      (items) => {
        const classArray = ["trailit_logoLeftBottom"];

        if (
          items.trail_status === "public" &&
          items.trail_id &&
          items.userData &&
          items.userData._id
        ) {
          classArray.push("cursor");
          element.className = classArray.join(" ");
          element.onclick = () => {
            // Open trail profile page in new tab
            window.open(
              `${process.env.REACT_APP_TRAILIT_WEB_APP}/creator-trail-details?trail_id=${items.trail_id}&author_id=${items.userData._id}`,
              "_blank"
            );
          };
        } else {
          element.className = classArray.join(" ");
        }
      }
    );

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
