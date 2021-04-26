import React, { Component } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import $ from "jquery";

class CreateTourConfirmationModal extends Component {
  componentDidMount() {
    const scrollTop = $(window).scrollTop();
    $("html, body").animate({ scrollTop: scrollTop });
  }

  render() {
    const { data, onModalClose, onTourSelect } = this.props;
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
          className="tr_modal_trail_modal_header confirmation_modal"
          closeButton
        ></ModalHeader>
        <ModalBody>
          <p className="continue-modal-text">Select {tourType} Format</p>
          {tourType === "video" ? (
            <div className="modal-and-bubble-option-container">
              <div
                className="video-modal-option"
                onClick={(e) => onTourSelect(tourType, `${tourType} Modal`)}
              >
                <div className="video-modal-container">
                  <svg
                    width="85"
                    height="63"
                    viewBox="0 0 85 63"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="3"
                      y="3"
                      width="79"
                      height="57"
                      rx="7"
                      fill="white"
                      stroke="url(#paint0_linear)"
                      stroke-width="6"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear"
                        x1="0"
                        y1="0"
                        x2="89.7275"
                        y2="43.119"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#E54986" />
                        <stop offset="1" stop-color="#F2C94C" />
                      </linearGradient>
                    </defs>
                  </svg>

                  <svg
                    width="22"
                    height="25"
                    fill="none"
                    viewBox="0 0 22 25"
                    className="modal-video-svg"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21 10.768C22.3333 11.5378 22.3333 13.4623 21 14.2321L3.75 24.1913C2.41666 24.9611 0.750001 23.9989 0.750001 22.4593L0.750002 2.54071C0.750002 1.0011 2.41667 0.0388563 3.75 0.808657L21 10.768Z"
                      fill="#D02176"
                    />
                  </svg>
                </div>

                <span className="confirmation-modal-span custom-css">
                  {tourType}
                </span>
              </div>
              <div
                className="video-bubble-option"
                onClick={(e) => onTourSelect(tourType, `${tourType} Bubble`)}
              >
                <div>
                  <svg
                    width="80"
                    height="80"
                    viewBox="0 0 80 80"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="40"
                      cy="40"
                      r="37"
                      fill="white"
                      stroke="url(#paint0_linear)"
                      stroke-width="6"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear"
                        x1="0"
                        y1="0"
                        x2="73"
                        y2="87.5"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#D41E79" />
                        <stop offset="1" stop-color="#F2C94C" />
                      </linearGradient>
                    </defs>
                  </svg>

                  <svg
                    width="35"
                    height="44"
                    fill="none"
                    viewBox="0 0 35 44"
                    className="bubble_user_svg"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.2397 0C14.9536 0 12.7611 0.908163 11.1446 2.5247C9.52804 4.14124 8.61987 6.33374 8.61987 8.61988C8.61987 10.906 9.52804 13.0985 11.1446 14.715C12.7611 16.3316 14.9536 17.2398 17.2397 17.2398C19.5259 17.2398 21.7184 16.3316 23.3349 14.715C24.9515 13.0985 25.8596 10.906 25.8596 8.61988C25.8596 6.33374 24.9515 4.14124 23.3349 2.5247C21.7184 0.908163 19.5259 0 17.2397 0Z"
                      fill="#D41E79"
                    />
                    <path
                      d="M28.0146 21.5497H6.46491C4.75031 21.5497 3.10593 22.2308 1.89353 23.4432C0.681122 24.6556 0 26.3 0 28.0146C0 32.8245 1.97826 36.6776 5.22364 39.2851C8.41731 41.8495 12.7014 43.0994 17.2398 43.0994C21.7781 43.0994 26.0622 41.8495 29.2559 39.2851C32.4969 36.6776 34.4795 32.8245 34.4795 28.0146C34.4795 26.3 33.7984 24.6556 32.586 23.4432C31.3736 22.2308 29.7292 21.5497 28.0146 21.5497Z"
                      fill="#D41E79"
                    />
                  </svg>
                </div>

                <span className="confirmation-modal-span">
                  {tourType} Bubble
                </span>
              </div>
            </div>
          ) : (
            <div className="modal-and-bubble-option-container">
              <div
                className="audio-modal-option"
                onClick={(e) => onTourSelect(tourType, `${tourType} Modal`)}
              >
                <div className="audio-modal-container">
                  <svg
                    width="85"
                    height="63"
                    viewBox="0 0 85 63"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="3"
                      y="3"
                      width="79"
                      height="57"
                      rx="7"
                      fill="white"
                      stroke="url(#paint0_linear)"
                      stroke-width="6"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear"
                        x1="0"
                        y1="0"
                        x2="89.7275"
                        y2="43.119"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#E54986" />
                        <stop offset="1" stop-color="#F2C94C" />
                      </linearGradient>
                    </defs>
                  </svg>

                  <svg
                    width="20"
                    height="27"
                    fill="none"
                    viewBox="0 0 20 27"
                    className="modal-audio-svg"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 16.875C12.8455 16.875 15.1515 14.6089 15.1515 11.8125V5.0625C15.1515 2.26607 12.8455 0 10 0C7.15455 0 4.84848 2.26607 4.84848 5.0625V11.8125C4.84848 14.6089 7.15455 16.875 10 16.875ZM20 11.7522C20 11.6196 19.8909 11.5112 19.7576 11.5112H17.9394C17.8061 11.5112 17.697 11.6196 17.697 11.7522C17.697 15.98 14.2515 19.4062 10 19.4062C5.74849 19.4062 2.30303 15.98 2.30303 11.7522C2.30303 11.6196 2.19394 11.5112 2.06061 11.5112H0.242424C0.109091 11.5112 0 11.6196 0 11.7522C0 16.8358 3.83636 21.0305 8.78788 21.6241V24.7098H4.38485C3.9697 24.7098 3.63636 25.1407 3.63636 25.6741V26.7589C3.63636 26.8915 3.72121 27 3.82424 27H16.1758C16.2788 27 16.3636 26.8915 16.3636 26.7589V25.6741C16.3636 25.1407 16.0303 24.7098 15.6152 24.7098H11.0909V21.6392C16.1 21.0968 20 16.878 20 11.7522Z"
                      fill="#D41E79"
                    />
                  </svg>
                </div>

                <span className="confirmation-modal-span custom-css">
                  {tourType}
                </span>
              </div>
              <div
                className="audio-bubble-option"
                onClick={(e) => onTourSelect(tourType, `${tourType} Bubble`)}
              >
                <div>
                  <svg
                    width="80"
                    height="80"
                    viewBox="0 0 80 80"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="40"
                      cy="40"
                      r="37"
                      fill="white"
                      stroke="url(#paint0_linear)"
                      stroke-width="6"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear"
                        x1="14"
                        y1="10.5"
                        x2="70.5"
                        y2="80"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#D41E79" />
                        <stop offset="1" stop-color="#F2C94C" />
                      </linearGradient>
                    </defs>
                  </svg>

                  <svg
                    width="20"
                    height="27"
                    fill="none"
                    viewBox="0 0 20 27"
                    className="bubble_mic_svg"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 16.875C12.8455 16.875 15.1515 14.6089 15.1515 11.8125V5.0625C15.1515 2.26607 12.8455 0 10 0C7.15455 0 4.84848 2.26607 4.84848 5.0625V11.8125C4.84848 14.6089 7.15455 16.875 10 16.875ZM20 11.7522C20 11.6196 19.8909 11.5112 19.7576 11.5112H17.9394C17.8061 11.5112 17.697 11.6196 17.697 11.7522C17.697 15.98 14.2515 19.4062 10 19.4062C5.74849 19.4062 2.30303 15.98 2.30303 11.7522C2.30303 11.6196 2.19394 11.5112 2.06061 11.5112H0.242424C0.109091 11.5112 0 11.6196 0 11.7522C0 16.8358 3.83636 21.0305 8.78788 21.6241V24.7098H4.38485C3.9697 24.7098 3.63636 25.1407 3.63636 25.6741V26.7589C3.63636 26.8915 3.72121 27 3.82424 27H16.1758C16.2788 27 16.3636 26.8915 16.3636 26.7589V25.6741C16.3636 25.1407 16.0303 24.7098 15.6152 24.7098H11.0909V21.6392C16.1 21.0968 20 16.878 20 11.7522Z"
                      fill="#D41E79"
                    />
                  </svg>
                </div>
                <span className="confirmation-modal-span">
                  {tourType} Bubble
                </span>
              </div>
            </div>
          )}
        </ModalBody>
      </Modal>
    );
  }
}

export default CreateTourConfirmationModal;
