import React, { Component } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import $ from "jquery";

class CreateTourConfirmationModal extends Component {
  componentDidMount() {
    const scrollTop = $(window).scrollTop();
    $("html, body").animate({ scrollTop: scrollTop });
  }

  render() {
    const { data, onModalClose, onTourSelect, textType } = this.props;
    const { show, tourType } = data;

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
        // size='sm'
        isOpen={show}
        centered={true}
        toggle={onModalClose}
        className="tr_modal trail_create_modal"
        container={document.getElementById("extension-div").shadowRoot}
      >
        <ModalHeader
          toggle={onModalClose}
          className="tr_modal_trail_modal_header"
          closeButton
        >
          Confirmation Alert
        </ModalHeader>
        <ModalBody>
          <p className="trailit_DeleteText">Please select tour type</p>
          <div className="trailButtonsWrapper">
            {/* <button
              type="button"
              className="ant-btn ant-btn-primary trail_add_step_btn"
              onClick={(e) => onTourSelect(textType, `${textType} Modal`)}
            >
              {textType} Modal
            </button> */}
            <button
              type="button"
              className="ant-btn ant-btn-primary trail_add_step_btn"
              onClick={(e) => onTourSelect(tourType, `${tourType} Modal`)}
            >
              {tourType} Modal
            </button>
            <button
              type="button"
              className="ant-btn ant-btn-primary trail_add_step_btn"
              onClick={(e) => onTourSelect(tourType, `${tourType} Bubble`)}
            >
              {tourType} Bubble
            </button>
          </div>
        </ModalBody>
      </Modal>
    );
  }
}

export default CreateTourConfirmationModal;
