import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import $ from "jquery";
import { Button } from "antd";

import SettingsComponent from "../settingsComponents";

class TrailSetting extends Component {
  constructor(props) {
    super();
  }

  componentDidMount() {
    // window.scrollTo(0, 0);
    const scrollTop = $(window).scrollTop();
    $("html, body").animate({ scrollTop: scrollTop });
  }

  hideModal = () => {
    // Call this.props.hideModal function
    this.props.hideModal();
  };

  render() {
    $(document).ready(() => {
      const modalDiv = document
        .getElementById("extension-div")
        .shadowRoot.querySelector(".trail_setting_modal");
      if (modalDiv) {
        if (!modalDiv.parentNode.parentNode.parentNode.getAttribute("class")) {
          modalDiv.parentNode.parentNode.parentNode.setAttribute(
            "class",
            "trial_modal_show trial_create_modal_main"
          );
        }
      }
    });

    return (
      <Modal
        centered={true}
        toggle={this.hideModal}
        isOpen={this.props.show}
        className="tr_modal trail_create_modal trail_setting_modal"
        container={document.getElementById("extension-div").shadowRoot}
      >
        <ModalHeader
          toggle={this.hideModal}
          className="tr_modal_trail_modal_header"
        >
          Trail Settings
        </ModalHeader>
        <ModalBody>
          <SettingsComponent />
          {/* <div className="trailButtonsWrapper">
            <Button type="primary" onClick={this.hideModal}>
              Close
            </Button>
          </div> */}
        </ModalBody>
      </Modal>
    );
  }
}

export default TrailSetting;
