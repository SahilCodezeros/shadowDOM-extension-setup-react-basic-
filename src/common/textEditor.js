import React, { useEffect, memo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBold,
  faItalic,
  faUnderline,
  faLink,
  faStrikethrough,
} from "@fortawesome/free-solid-svg-icons";

import { textEditor1 } from "../css/textEditor";

const TextEditor = memo((props) => {
  const { onChange } = props;

  // State
  const [link, setLink] = useState("");

  // Remove create link container function
  const removeCreateLinkContainer = () => {
    const shadowRoot = document.getElementById("extension-div").shadowRoot;

    // Remove create link modal
    shadowRoot.querySelector(".create-link-container").style.display = "none";

    // Set set link state
    setLink("");
  };

  // On input change handler function
  const onInputChangeHandler = (e) => {
    // Set link state
    setLink(e.target.value);
  };

  // On iframe body click function
  const onIframeBodyClick = () => {
    const shadowRoot = document.getElementById("extension-div").shadowRoot;

    shadowRoot
      .querySelector("iframe")
      .contentWindow.document.body.addEventListener("click", (e) => {
        // Call remove create link container
        removeCreateLinkContainer();

        if (e.target.tagName === "BODY") return;

        if (e.target.tagName === "STRIKE") {
          // Add active-text-button class to strikeThrough button
          shadowRoot
            .querySelector(".strikeThrough")
            .classList.add("active-text-button");
        } else {
          // Remove active-text-button class to strikeThrough button
          shadowRoot
            .querySelector(".strikeThrough")
            .classList.remove("active-text-button");
        }

        if (e.target.tagName === "B") {
          // Add active-text-button class to bold button
          shadowRoot.querySelector(".bold").classList.add("active-text-button");
        } else {
          // Remove active-text-button class to bold button
          shadowRoot
            .querySelector(".bold")
            .classList.remove("active-text-button");
        }

        if (e.target.tagName === "U") {
          // Add active-text-button class to underline button
          shadowRoot
            .querySelector(".underline")
            .classList.add("active-text-button");
        } else {
          // Remove active-text-button class to underline button
          shadowRoot
            .querySelector(".underline")
            .classList.remove("active-text-button");
        }

        if (e.target.tagName === "I") {
          // Add active-text-button class to italic button
          shadowRoot
            .querySelector(".italic")
            .classList.add("active-text-button");
        } else {
          // Remove active-text-button class to italic button
          shadowRoot
            .querySelector(".italic")
            .classList.remove("active-text-button");
        }
      });
  };

  // Udate description function
  const updateDescription = () => {
    const shadowRoot = document.getElementById("extension-div").shadowRoot;
    if (
      shadowRoot.querySelector("iframe") &&
      shadowRoot
        .querySelector("iframe")
        .contentWindow.document.body.getAttribute("eventadded") !== "true"
    ) {
      shadowRoot
        .querySelector("iframe")
        .contentWindow.document.body.setAttribute("eventadded", "true");
      shadowRoot
        .querySelector("iframe")
        .contentWindow.document.body.addEventListener("keyup", (e) => {
          e.preventDefault();

          // Call change function of parent component
          onChange(e.target.innerHTML);
        });
    }
  };

  // On button click handler function
  const onButtonClickHandler = (command) => {
    const shadowRoot = document.getElementById("extension-div").shadowRoot;

    // Toggle button
    shadowRoot
      .querySelector(`.${command}`)
      .classList.toggle("active-text-button");

    // Execute exec command function
    shadowRoot
      .querySelector("iframe")
      .contentWindow.document.execCommand(command, false, null);

    // Get innerHTML of body
    const description = shadowRoot.querySelector("iframe").contentWindow
      .document.body.innerHTML;

    // Call on change function
    onChange(description);
  };

  // On link click handler function
  const onLinkClickHandler = (command) => {
    const shadowRoot = document.getElementById("extension-div").shadowRoot;

    // Toggle button
    shadowRoot
      .querySelector(`.${command}`)
      .classList.toggle("active-text-button");

    const linkContainer = shadowRoot.querySelector(".create-link-container");
    const display = getComputedStyle(linkContainer).display;
    shadowRoot.querySelector(".create-link-container").style.display =
      display === "none" ? "block" : "none";

    if (display === "none") return;

    // Set set link state
    setLink("");
  };

  // On create link click handler function
  const onCreateLinkClickHandler = (command) => {
    // if (!link.includes("https://")) {
    //   alert("Please provide valid https address!");

    //   return;
    // }

    const shadowRoot = document.getElementById("extension-div").shadowRoot;
    const iFrame = shadowRoot.querySelector("iframe");

    const selection = iFrame.contentWindow.document.getSelection();

    // Execute exec command function
    iFrame.contentWindow.document.execCommand(command, false, link);
    selection.anchorNode.parentElement.target = "_blank";

    // Remove active-text-button class
    shadowRoot
      .querySelector(".linkButton")
      .classList.remove("active-text-button");

    // Get innerHTML of body
    const description = iFrame.contentWindow.document.body.innerHTML;

    // Call on change function
    onChange(description);

    // Call remove create link container
    removeCreateLinkContainer();
  };

  // On unlink click handler function
  const onUnlinkClickHandler = (command) => {
    const shadowRoot = document.getElementById("extension-div").shadowRoot;

    // Execute exec command function
    shadowRoot
      .querySelector("iframe")
      .contentWindow.document.execCommand(command, false, null);

    // Remove active-text-button class
    shadowRoot
      .querySelector(".linkButton")
      .classList.remove("active-text-button");

    // Get innerHTML of body
    const description = shadowRoot.querySelector("iframe").contentWindow
      .document.body.innerHTML;

    // Call on change function
    onChange(description);

    // Call remove create link container
    removeCreateLinkContainer();
  };

  // Enable edit moda function
  const enableEditMode = () => {
    const shadowRoot = document.getElementById("extension-div").shadowRoot;

    // Content editable true
    shadowRoot.querySelector(
      "iframe"
    ).contentWindow.document.body.contentEditable = true;
  };

  useEffect(() => {
    // Call enable edit mode function
    enableEditMode();

    // Call update description function
    updateDescription();

    // Call on iframe body click function
    onIframeBodyClick();

    const shadowRoot = document.getElementById("extension-div").shadowRoot;
    const frame = shadowRoot.querySelector("iframe");

    if (frame) {
      const link = document.createElement("link");
      link.type = "text/css";
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap";
      frame.contentDocument.head.appendChild(link);

      frame.contentDocument.body.style.fontFamily = "Lato, sans-serif";
      frame.contentDocument.body.style.fontSize = "14px";
    }
  }, []);

  return (
    <>
      <style>{textEditor1}</style>
      <div id="custom-text-editor">
        <div className="button-container">
          <button
            type="button"
            className="text-editor-button bold"
            onClick={(e) => onButtonClickHandler("bold")}
          >
            <FontAwesomeIcon icon={faBold} size="sm" />
          </button>
          <button
            type="button"
            className="text-editor-button italic"
            onClick={(e) => onButtonClickHandler("italic")}
          >
            <FontAwesomeIcon icon={faItalic} size="sm" />
          </button>
          <button
            type="button"
            className="text-editor-button underline"
            onClick={(e) => onButtonClickHandler("underline")}
          >
            <FontAwesomeIcon icon={faUnderline} size="sm" />
          </button>
          <button
            type="button"
            className="text-editor-button strikeThrough"
            onClick={(e) => onButtonClickHandler("strikeThrough")}
          >
            <FontAwesomeIcon icon={faStrikethrough} size="sm" />
          </button>
          <button
            type="button"
            className="text-editor-button linkButton"
            onClick={(e) => onLinkClickHandler("linkButton")}
          >
            <FontAwesomeIcon icon={faLink} size="sm" />
          </button>
        </div>

        <div className="create-link-container">
          <div className="create-link">
            <input
              value={link}
              className="create-link-input"
              onKeyDown={(e) => e.stopPropagation()}
              onChange={(e) => onInputChangeHandler(e)}
            />
            <div className="create-link-button-container">
              <button
                className="custom-button-link custom-button"
                onClick={(e) => onCreateLinkClickHandler("createLink")}
              >
                Link
              </button>
              <button
                className="custom-button-unlink custom-button"
                onClick={(e) => onUnlinkClickHandler("unlink")}
              >
                Unlink
              </button>
            </div>
          </div>
        </div>

        <iframe
          name="richTextField"
          title="custom-text-editor"
          className="text-editor-frame"
        ></iframe>
      </div>
    </>
  );
});

export default TextEditor;
