import React, { Component } from "react";
import $ from "jquery";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

import SendTipForm from "../../common/SendTipForm";

class SendTipModal extends Component {
  componentDidMount() {
    const scrollTop = $(window).scrollTop();
    $("html, body").animate({ scrollTop: scrollTop });
  }

  render() {
    const {
      sendTipModal,
      onSendTipModalClose,
      isSuccess,
      setError,
      sendTip,
      isLoading,
      sendLoader,
    } = this.props;

    $(() => {
      const modalDiv = document
        .getElementById("extension-div")
        .shadowRoot.querySelector(".tr_modal");

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
        isOpen={sendTipModal}
        toggle={onSendTipModalClose}
        className="tr_modal trail_create_modal"
        container={document.getElementById("extension-div").shadowRoot}
      >
        <ModalHeader className="tr_modal_trail_modal_header" closeButton>
          Send Tip
        </ModalHeader>
        <ModalBody>
          {isSuccess ? (
            <div className="tr_description">
              <p style={{ color: "#0c8026", textAlign: "center" }}>
                Transaction completed successfully.
              </p>
            </div>
          ) : !setError ? (
            <SendTipForm
              sendTip={sendTip}
              onCancel={onSendTipModalClose}
              isLoading={isLoading}
              sendLoader={sendLoader}
              modal
            />
          ) : (
            <div className="tr_description">
              <p style={{ color: "#d21e1e", textAlign: "center" }}>
                {setError}
              </p>
            </div>
          )}
        </ModalBody>
      </Modal>
    );
  }
}

export default SendTipModal;
