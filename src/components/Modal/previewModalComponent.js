import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Form, Input, Button } from "antd";
import { CloseOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import $ from "jquery";

import AudioTour from "../audioTour";
import { stopMediaPlaying } from "../../common/stopePlayingMedia";
import {
  addTrailitLogo,
  removeTrailitLogo,
} from "../../common/trailitLogoInPreview";
import ContinueTourConfirmation from "./ContinueTourConfirmation";

const chrome = window.chrome;
class PreviewModalComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      open: true,
      autoPlay: true,
    };
  }

  handleWithoutLogin = (event, tourSide, type, currentStep) => {
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

  async componentDidMount() {
    const scrollTop = $(window).scrollTop();
    $("html, body").animate({ scrollTop: scrollTop });

    if (this.props.data[this.props.tourStep - 1].url !== document.URL) {
      window.location.href = this.props.data[this.props.tourStep - 1].url;
    }

    // this.setState({ autoPlay: true });

    // setTimeout(() => {
    //     document.querySelectorAll('video').forEach(res => {
    //         console.log('res', res);
    //         if(res.className !== "preview-video") {
    //             res.pause()
    //         }
    //     })
    // }, 1000);

    // chrome.storage.local.get(['AutoPlayMediaToggle'], (items) => {
    //     console.log('items', items);
    //     if(items && (!items.AutoPlayMediaToggle || items.AutoPlayMediaToggle)) {
    //         autoplay = items.AutoPlayMediaToggle;
    //         this.setState({ autoPlay: items.AutoPlayMediaToggle });
    //     }

    // });

    // Add modal class to dom
    this.addModalClass();

    // if (document.readyState === 'loading') {
    //     console.log('state loading');
    // } else if (document.readyState === 'complete') {
    //     console.log('state complete');
    // }

    if (document.readyState === "complete") {
      $(document).ready(() => {
        // Call toggle website media
        this.toggleWebSitesMedia();
      });
    } else if (
      document.readyState === "interactive" &&
      document.URL.includes("https://www.youtube.com/")
    ) {
      // document.body.onload = function () { https://www.dailymotion.com/
      //     console.log('body is loaded!!!!');
      //     // Call toggle website media
      //     this.toggleWebSitesMedia();
      // };
      $(document).ready(() => {
        // Call toggle website media
        this.toggleWebSitesMedia();
      });
    } else if (document.URL.includes("https://twitter.com/")) {
      $(document).ready(() => {
        // Call toggle website media
        this.toggleWebSitesMedia();
      });
    } else {
      $(window).on("load", () => {
        // Call toggle website media
        this.toggleWebSitesMedia();
      });

      // document.body.onload = async function () {
      //     console.log('in body onload');
      //     // Call toggle website media
      //     await this.toggleWebSitesMedia();
      // };
    }

    // Add trailit logo
    addTrailitLogo();
  }

  componentDidUpdate(prevProps, prevState) {
    // chrome.storage.local.get(['AutoPlayMediaToggle'], (items) => {
    //     if(prevState.autoPlay !== items.AutoPlayMediaToggle) {
    //         this.setState({ autoPlay: items.AutoPlayMediaToggle });
    //     }
    // });

    // this.setState({ autoPlay: true });

    // Add modal class to dom
    this.addModalClass();

    // Call toggle website media
    this.toggleWebSitesMedia();
  }

  /**
   * Manage popover web user tour button
   * @data tooltip data
   * @step tooltip current step
   */
  onClickToManagePopoverButton = async (event, tourSide) => {
    let { tourStep } = this.props;
    let step = tourSide === "prev" ? tourStep - 1 : tourStep + 1;

    await this.toggle();

    // console.log("this.props.data[step - 1]ccccc", this.props.data[step - 1])
    if (this.props.data[step - 1].url === document.URL) {
      let type = this.props.data[step - 1].type;
      this.props.tour(step, type, tourSide);
    } else {
      // Set loading true to show overlay
      this.props.setLoadingState(true);

      let type = this.props.data[step - 1].type;
      await this.props.tour(step, type, tourSide);
      window.location.href = this.props.data[step - 1].url;
    }
    // if(document.querySelector('#my-extension-root-flip').classList.value ==="") {
    //     document.querySelector('#my-extension-root-flip').classList.remove('trail_flip_box');
    // }
    this.setState({ open: true });
  };

  onClickToDoneTour = (data, step) => {
    let { tourSteps } = this.props;
    this.setState({ open: false });
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

  toggleWebSitesMedia = () => {
    const { tourStep, data } = this.props;
    if (
      data[tourStep - 1].mediaType &&
      data[tourStep - 1].mediaType === "video"
    ) {
      // Stop playing websites audio or video
      stopMediaPlaying();
    }
  };

  componentWillUnmount() {
    // Remove trailit log
    removeTrailitLogo();
  }

  render() {
    const { open, autoPlay } = this.state;
    const { tourStep, tourSide, play } = this.props;
    const { title, description } = this.props.data[tourStep - 1];
    let preview = null;

    if (
      this.props.data[tourStep - 1].mediaType &&
      this.props.data[tourStep - 1].mediaType === "video"
    ) {
      preview = (
        <div className="tr_preview_video_bx">
          <video
            className="preview-video"
            disablePictureInPicture
            controlsList="nodownload"
            controls
            allow="autoplay"
            autoPlay={autoPlay}
          >
            <source src={this.props.data[tourStep - 1].web_url} />
          </video>
        </div>
      );
    } else if (
      this.props.data[tourStep - 1].mediaType &&
      this.props.data[tourStep - 1].mediaType === "audio"
    ) {
      preview = (
        <AudioTour
          data={this.props.data}
          toggle={this.props.toggle}
          tourStep={this.props.tourStep}
          tour={this.props.tour}
          previewInTooltip
        />
      );
    } else if (
      this.props.data[tourStep - 1].mediaType &&
      this.props.data[tourStep - 1].mediaType === "image"
    ) {
      preview = (
        <div className="tr_preview_picture_bx">
          <img
            className="preview-picture"
            src={this.props.data[tourStep - 1].web_url}
            alt="preview-img"
          />
        </div>
      );
    }

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
          container={document.getElementById("extension-div").shadowRoot.querySelector(".modal-open")}
          className={`tr_modal trail_preview_modal trail_tooltip_done ${
            this.props.data[tourStep - 1].mediaType &&
            this.props.data[tourStep - 1].mediaType === "text"
              ? "trail_text_only"
              : "" ||
                (this.props.data[tourStep - 1].mediaType &&
                  this.props.data[tourStep - 1].mediaType === "video")
              ? "tr_video_only"
              : "" ||
                (this.props.data[tourStep - 1].mediaType &&
                  this.props.data[tourStep - 1].mediaType === "image")
              ? "tr_picture_only"
              : "" ||
                (this.props.data[tourStep - 1].mediaType &&
                  this.props.data[tourStep - 1].mediaType === "audio")
              ? "tr_audio_only"
              : ""
          }`}
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
            <div className="trail_modal_content_main">
              <div className="trail_modal_title">{title}</div>
              {
                <span
                  className="trail_modal_content"
                  dangerouslySetInnerHTML={{ __html: description }}
                ></span>
              }
              {preview}
            </div>

            <div className="btn-wrap">
              {1 < tourStep && (
                <Button
                  type="link"
                  disabled={this.props.onDone}
                  className="prev"
                  onClick={(e) =>
                    this.onClickToManagePopoverButton(
                      e,
                      this.props.data[tourStep - 1],
                      tourStep - 1,
                      "prev"
                    )
                  }
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
                    console.log("previewModal Next");

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

export default PreviewModalComponent;
