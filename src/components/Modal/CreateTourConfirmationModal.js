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
                    width="106"
                    height="79"
                    viewBox="0 0 106 79"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="3.5"
                      y="3.5"
                      width="99"
                      height="72"
                      rx="6.5"
                      fill="white"
                      stroke="url(#paint0_linear)"
                      stroke-width="7"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear"
                        x1="0"
                        y1="0"
                        x2="112.127"
                        y2="53.5862"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#E54986" />
                        <stop offset="1" stop-color="#F2C94C" />
                      </linearGradient>
                    </defs>
                  </svg>

                  <svg
                    width="28"
                    height="31"
                    fill="none"
                    viewBox="0 0 28 31"
                    className="modal-video-svg"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M27 13.7679C28.3333 14.5377 28.3333 16.4622 27 17.232L3.75 30.6554C2.41667 31.4252 0.749998 30.463 0.749999 28.9234L0.75 2.0766C0.75 0.537005 2.41667 -0.425246 3.75 0.344555L27 13.7679Z"
                      fill="#C4C4C4"
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
                    width="100"
                    height="100"
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="46.5"
                      fill="white"
                      stroke="url(#paint0_linear)"
                      stroke-width="7"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear"
                        x1="15"
                        y1="14"
                        x2="83"
                        y2="86"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#D02176" />
                        <stop offset="1" stop-color="#F2C94C" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <svg
                    width="44"
                    height="54"
                    fill="none"
                    viewBox="0 0 44 54"
                    className="bubble_user_svg"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21.6 0C18.7357 0 15.9887 1.13785 13.9633 3.16325C11.9379 5.18864 10.8 7.93566 10.8 10.8C10.8 13.6643 11.9379 16.4114 13.9633 18.4368C15.9887 20.4621 18.7357 21.6 21.6 21.6C24.4644 21.6 27.2114 20.4621 29.2368 18.4368C31.2622 16.4114 32.4 13.6643 32.4 10.8C32.4 7.93566 31.2622 5.18864 29.2368 3.16325C27.2114 1.13785 24.4644 0 21.6 0Z"
                      fill="#BCBCBC"
                    />
                    <path
                      d="M35.1 27H8.1C5.95175 27 3.89148 27.8534 2.37244 29.3724C0.853391 30.8915 0 32.9517 0 35.1C0 41.1264 2.4786 45.954 6.5448 49.221C10.5462 52.434 15.9138 54 21.6 54C27.2862 54 32.6538 52.434 36.6552 49.221C40.716 45.954 43.2 41.1264 43.2 35.1C43.2 32.9517 42.3466 30.8915 40.8276 29.3724C39.3085 27.8534 37.2483 27 35.1 27Z"
                      fill="#BCBCBC"
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
                className="video-modal-option"
                onClick={(e) => onTourSelect(tourType, `${tourType} Modal`)}
              >
                <div className="video-modal-container">
                  <svg
                    width="127"
                    height="79"
                    viewBox="0 0 127 79"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="3.5"
                      y="3.5"
                      width="120"
                      height="72"
                      rx="36"
                      fill="white"
                      stroke="url(#paint0_linear)"
                      stroke-width="7"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear"
                        x1="0"
                        y1="0"
                        x2="124.278"
                        y2="71.1599"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#E54986" />
                        <stop offset="1" stop-color="#F2C94C" />
                      </linearGradient>
                    </defs>
                  </svg>

                  <svg
                    width="31"
                    height="42"
                    viewBox="0 0 31 42"
                    fill="none"
                    className="modal-audio-svg"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.5 26.25C19.9105 26.25 23.4848 22.725 23.4848 18.375V7.875C23.4848 3.525 19.9105 0 15.5 0C11.0895 0 7.51515 3.525 7.51515 7.875V18.375C7.51515 22.725 11.0895 26.25 15.5 26.25ZM31 18.2812C31 18.075 30.8309 17.9062 30.6242 17.9062H27.8061C27.5994 17.9062 27.4303 18.075 27.4303 18.2812C27.4303 24.8578 22.0898 30.1875 15.5 30.1875C8.91015 30.1875 3.5697 24.8578 3.5697 18.2812C3.5697 18.075 3.40061 17.9062 3.19394 17.9062H0.375758C0.169091 17.9062 0 18.075 0 18.2812C0 26.1891 5.94636 32.7141 13.6212 33.6375V38.4375H6.79652C6.15303 38.4375 5.63636 39.1078 5.63636 39.9375V41.625C5.63636 41.8312 5.76788 42 5.92758 42H25.0724C25.2321 42 25.3636 41.8312 25.3636 41.625V39.9375C25.3636 39.1078 24.847 38.4375 24.2035 38.4375H17.1909V33.6609C24.955 32.8172 31 26.2547 31 18.2812Z"
                      fill="#BCBCBC"
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
                    width="100"
                    height="100"
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="46.5"
                      fill="white"
                      stroke="url(#paint0_linear)"
                      stroke-width="7"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear"
                        x1="15"
                        y1="14"
                        x2="83"
                        y2="86"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#D02176" />
                        <stop offset="1" stop-color="#F2C94C" />
                      </linearGradient>
                    </defs>
                  </svg>

                  <svg
                    width="31"
                    height="42"
                    viewBox="0 0 31 42"
                    fill="none"
                    className="bubble_mic_svg"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.5 26.25C19.9105 26.25 23.4848 22.725 23.4848 18.375V7.875C23.4848 3.525 19.9105 0 15.5 0C11.0895 0 7.51515 3.525 7.51515 7.875V18.375C7.51515 22.725 11.0895 26.25 15.5 26.25ZM31 18.2812C31 18.075 30.8309 17.9062 30.6242 17.9062H27.8061C27.5994 17.9062 27.4303 18.075 27.4303 18.2812C27.4303 24.8578 22.0898 30.1875 15.5 30.1875C8.91015 30.1875 3.5697 24.8578 3.5697 18.2812C3.5697 18.075 3.40061 17.9062 3.19394 17.9062H0.375758C0.169091 17.9062 0 18.075 0 18.2812C0 26.1891 5.94636 32.7141 13.6212 33.6375V38.4375H6.79652C6.15303 38.4375 5.63636 39.1078 5.63636 39.9375V41.625C5.63636 41.8312 5.76788 42 5.92758 42H25.0724C25.2321 42 25.3636 41.8312 25.3636 41.625V39.9375C25.3636 39.1078 24.847 38.4375 24.2035 38.4375H17.1909V33.6609C24.955 32.8172 31 26.2547 31 18.2812Z"
                      fill="#BCBCBC"
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

// {/* <div className="trailButtonsWrapper">
//   {/* <button
//               type="button"
//               className="ant-btn ant-btn-primary trail_add_step_btn"
//               onClick={(e) => onTourSelect(textType, `${textType} Modal`)}
//             >
//               {textType} Modal
//             </button> */}
//   <button
//     type="button"
//     className="ant-btn ant-btn-primary trail_add_step_btn"
//     onClick={(e) => onTourSelect(tourType, `${tourType} Modal`)}
//   >
//     {tourType} Modal
//   </button>
//   <button
//     type="button"
//     className="ant-btn ant-btn-primary trail_add_step_btn"
//     onClick={(e) => onTourSelect(tourType, `${tourType} Bubble`)}
//   >
//     {tourType} Bubble
//   </button>
// </div>; */}
