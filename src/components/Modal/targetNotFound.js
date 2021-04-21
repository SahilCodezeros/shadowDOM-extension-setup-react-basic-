import React from "react";
import { Modal, ModalBody } from "reactstrap";
import { Button } from "antd";
import { CloseOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import $ from "jquery";

import {
  addTrailitLogo,
  removeTrailitLogo,
} from "../../common/trailitLogoInPreview";
import ContinueTourConfirmation from "./ContinueTourConfirmation";
import { matchUrl } from "../common";

const chrome = window.chrome;
class TargetNotFound extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleWithoutLogin = (event, tourSide, type, currentStep) => {
    this.setState({ open: false });
    chrome.storage.local.get(["isGuest"], (items) => {
      if (currentStep % 3 === 0 && tourSide === "next" && items.isGuest) {
        this.props.previewModalToggle();
      } else {
        this.onClickToManagePopoverButton(event, tourSide);
      }
    });
  };

  continueTrailWithoutLogin = (event, tourSide) => {
    this.onClickToManagePopoverButton(event, tourSide);
    this.props.previewModalToggle();
  };

  toSignInWithoutLogin = () => {
    this.props.toggle();
  };

  componentDidMount() {
    setTimeout(() => {
      const scrollTop = $(window).scrollTop();
      $("html, body").animate({ scrollTop: scrollTop });

      this.setState({ open: true });
    }, 3500);

    // if (this.props.data[this.props.tourStep - 1].url !== document.URL) {
    //   window.location.href = this.props.data[this.props.tourStep - 1].url;
    // }

    this.addModalClass();

    addTrailitLogo();
  }

  componentDidUpdate(prevProps, prevState) {
    this.addModalClass();
  }

  /**
   * Manage popover web user tour button
   * @data tooltip data
   * @step tooltip current step
   */
  onClickToManagePopoverButton = async (event, tourSide) => {
    this.props.toogleTargetDataNotFound(false);

    let { tourStep } = this.props;
    let step = tourSide === "prev" ? tourStep - 1 : tourStep + 1;

    await this.toggle();

    if (matchUrl(this.props.data[step - 1].url, document.URL)) {
      let type = this.props.data[step - 1].type;
      this.props.tour(step, type, tourSide);
    } else {
      // Set loading true to show overlay
      this.props.setLoadingState(true);

      let type = this.props.data[step - 1].type;
      await this.props.tour(step, type, tourSide);
      window.location.href = this.props.data[step - 1].url;
    }
  };

  onClickToDoneTour = (data, step) => {
    this.props.toogleTargetDataNotFound(false);
    if (
      document
        .getElementById("extension-div")
        .shadowRoot.querySelector("#my-extension-root-flip").classList.value ===
      ""
    ) {
      document
        .getElementById("extension-div")
        .shadowRoot.querySelector("#my-extension-root-flip")
        .classList.remove("trail_flip_box");
    }
    chrome.storage.local.set({ closeContinue: false });
    this.props.toggle({ removePreviewTrails: true });
  };

  onButtonCloseHandler = async (e) => {
    this.props.toogleTargetDataNotFound(false);
    // Call parent component function to close tooltip preview
    if (
      document
        .getElementById("extension-div")
        .shadowRoot.querySelector("#my-extension-root-flip").classList.value ===
      ""
    ) {
      document
        .getElementById("extension-div")
        .shadowRoot.querySelector("#my-extension-root-flip")
        .classList.remove("trail_flip_box");
    }
    await this.props.closeButtonHandler(e);
  };

  toggle = () => {
    if (
      document
        .getElementById("extension-div")
        .shadowRoot.querySelector("#my-extension-root-flip").classList.value ===
      ""
    ) {
      document
        .getElementById("extension-div")
        .shadowRoot.querySelector("#my-extension-root-flip")
        .classList.remove("trail_flip_box");
    }
    this.setState({ open: false });
  };

  addModalClass = () => {
    $(document).ready(() => {
      const modalDiv = document
        .getElementById("extension-div")
        .shadowRoot.querySelector(".trail_preview_modal");

      if (modalDiv) {
        if (!modalDiv.parentNode.parentNode.parentNode.getAttribute("class")) {
          modalDiv.parentNode.parentNode.parentNode.setAttribute(
            "class",
            "trial_modal_show trail_preview_modal_main"
          );
        }
      }
    });
  };

  componentWillUnmount() {
    // Remove trailit logo
    removeTrailitLogo();
  }

  render() {
    const { open } = this.state;
    const { tourStep } = this.props;
    let preview = (
      <div className={`trail_modal_title p-0`}>Target Data not Found</div>
    );

    return (
      <div>
        {this.props.previewModalRef && (
          <ContinueTourConfirmation
            open={this.props.previewModalRef}
            toggle={this.props.previewModalToggle}
            continueTrail={this.continueTrailWithoutLogin}
            toSignIn={this.toSignInWithoutLogin}
          />
        )}
        <Modal
          isOpen={open}
          centered={true}
          toggle={this.onButtonCloseHandler}
          container={document
            .getElementById("extension-div")
            .shadowRoot.querySelector(".modal-open")}
          className="tr_modal trail_preview_modal trail_tooltip_done trail_text_only"
        >
          <ModalBody>
            {this.props.data.length > 0 && (
              <Button
                type="link"
                disabled={this.props.onDone}
                className="trial_button_close"
                onClick={this.onButtonCloseHandler}
              >
                <CloseOutlined type="close" />
              </Button>
            )}
            <div className="trail_modal_content_main">{preview}</div>

            <div className="btn-wrap">
              {1 < tourStep && (
                <Button
                  type="link"
                  disabled={this.props.onDone}
                  className="prev"
                  onClick={(e) => this.onClickToManagePopoverButton(e, "prev")}
                >
                  <LeftOutlined type="left" />
                </Button>
              )}
              {this.props.data.length > tourStep && (
                <Button
                  type="link"
                  disabled={this.props.onDone}
                  className="next"
                  onClick={(e) => {
                    this.handleWithoutLogin &&
                      this.handleWithoutLogin(
                        e,
                        "next",
                        this.props.data[this.props.tourStep - 1].type,
                        this.props.tourStep
                      );
                  }}
                >
                  <RightOutlined type="right" />
                </Button>
              )}
              {this.props.data.length === tourStep && (
                <Button
                  type="link"
                  disabled={this.props.onDone}
                  className="next"
                  onClick={() =>
                    this.onClickToDoneTour(
                      this.props.data[tourStep - 1],
                      tourStep
                    )
                  }
                >
                  <RightOutlined type="right" />
                </Button>
              )}
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default TargetNotFound;
