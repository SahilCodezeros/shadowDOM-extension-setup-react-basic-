import React, { Component } from "react";
import $ from "jquery";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

class TrailDeleteModal extends Component {
  componentDidMount() {
    const scrollTop = $(window).scrollTop();
    $("html, body").animate({ scrollTop: scrollTop });
  }

  render() {
    const {
      onDone,
      onDeleteModalClose,
      deleteModal,
      onDeleteButtonClick,
    } = this.props;

    $(document).ready(() => {
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
        toggle={onDeleteModalClose}
        isOpen={deleteModal.show}
        className="tr_modal trail_create_modal"
        container={document.getElementById("extension-div").shadowRoot}
      >
        <ModalHeader className="tr_modal_trail_modal_header" closeButton>
          Delete Alert
        </ModalHeader>
        <ModalBody>
          <p className="trailit_DeleteText">
            Are you sure want to delete {deleteModal.trail ? "trail" : "step"}{" "}
            {deleteModal.title ? `(${deleteModal.title})` : ""}?
          </p>
          <div className="trailButtonsWrapper">
            <button
              type="button"
              className="custom-button"
              onClick={onDeleteModalClose}
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={onDone}
              className="custom-button"
              onClick={(e) => onDeleteButtonClick(e)}
            >
              DELETE
            </button>
          </div>
        </ModalBody>
      </Modal>
    );
  }
}

export default TrailDeleteModal;
