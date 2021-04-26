import React from "react";
import $ from "jquery";
import Dragabilly from "draggabilly";
import { Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";

import dragElement from "../common/draggable";
import { resizeScreen } from "../common/helper";
import { videoTourCss1 } from "../css/videoTour";
import { stopMediaPlaying } from "../common/stopePlayingMedia";
import {
  addTrailitLogo,
  removeTrailitLogo,
} from "../common/trailitLogoInPreview";
import ContinueTourConfirmation from "./Modal/ContinueTourConfirmation";
import { matchUrl } from "./common";

let draggie, dragEle;
const chrome = window.chrome;
class VideoTour extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      fullScreen: true,
      loadVideo: false,
      draggable: false,
      webUrl: "",
      mobileScreen: false,
    };
  }

  handleWithoutLogin = (event, tourSide, type, currentStep) => {
    chrome.storage.local.get(["isGuest"], (items) => {
      if (currentStep % 3 === 0 && tourSide === "next" && items.isGuest) {
        this.props.videoToggle();
      } else {
        this.onClickToManagePopoverButton(event, tourSide);
      }
    });
  };

  continueTrailWithoutLogin = (event, tourSide) => {
    this.onClickToManagePopoverButton(event, tourSide);
    this.props.videoToggle();
  };

  toSignInWithoutLogin = () => {
    this.props.toggle();
  };

  elementDragging = () => {
    dragEle = document
      .getElementById("extension-div")
      .shadowRoot.querySelector(".video-wrap_tooltip");
    draggie = new Dragabilly(dragEle);
  };

  componentDidMount() {
    this.setState({ loadVideo: true, fullScreen: false, draggable: true });
    let video = document
      .getElementById("extension-div")
      .shadowRoot.getElementById("trail_video");
    const playButton = document
      .getElementById("extension-div")
      .shadowRoot.querySelector(".tr_play_button");
    playButton.style.display = "block";
    // $('.tr_play_button').css('display', 'block');
    chrome.storage.local.get(["AutoPlayMediaToggle"], (items) => {
      if (
        items.AutoPlayMediaToggle === undefined ||
        items.AutoPlayMediaToggle
      ) {
        video.play();
        playButton.style.display = "none";
      }
    });

    if (!matchUrl(this.props.data[this.props.tourStep - 1].url, document.URL)) {
      window.location.href = this.props.data[this.props.tourStep - 1].url;
    }

    if (document.readyState === "complete") {
      $(document).ready(() => {
        // Stop playing websites audio or video
        stopMediaPlaying();
      });
    } else if (
      document.readyState === "interactive" &&
      document.URL.includes("https://www.youtube.com/")
    ) {
      $(document).ready(() => {
        // Stop playing websites audio or video
        stopMediaPlaying();
      });
    } else {
      document.body.onload = function () {
        // Stop playing websites audio or video
        stopMediaPlaying();
      };
    }

    // Add trailit logo
    addTrailitLogo();

    // Register add event listener
    window.addEventListener("resize", this.resizeWindow);
  }

  resizeWindow = () => {
    const { mobileScreen } = this.state;

    if (resizeScreen()) {
      if (!mobileScreen) {
        // Set state
        this.setState({ mobileScreen: true });
      }
    } else {
      if (mobileScreen) {
        // Set state
        this.setState({ mobileScreen: false });
      }
    }
  };

  /**
   * Manage popover web user tour button
   * @data tooltip data
   * @step tooltip current step
   */
  onClickToManagePopoverButton = async (event, tourSide) => {
    let { tourStep } = this.props;
    let step = tourSide === "prev" ? tourStep - 1 : tourStep + 1;

    if ($("body")) {
      $("body").removeClass("trail_fullscreen");
    }

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

  static getDerivedStateFromProps(nextProps, prevState) {
    let getVideo = document
      .getElementById("extension-div")
      .shadowRoot.getElementById("trail_video");
    let getSource = document
      .getElementById("extension-div")
      .shadowRoot.getElementById("sourceVideo");

    if (
      getVideo !== null &&
      prevState.webUrl !== nextProps.data[nextProps.tourStep - 1].web_url
    ) {
      getVideo.load();
      if (getSource !== null) {
        getSource.setAttribute(
          "src",
          nextProps.data[nextProps.tourStep - 1].web_url
        );
      }
    }

    return {
      webUrl: nextProps.data[nextProps.tourStep - 1].web_url,
    };
  }

  onClickToDoneTour = (data, step) => {
    if ($("body")) {
      $("body").removeClass("trail_fullscreen");
    }
    chrome.storage.local.set({ closeContinue: false });
    this.props.toggle({ removePreviewTrails: true });
  };

  toggleScreen = (e) => {
    e.preventDefault();
    if (!this.state.fullScreen && this.state.draggable) {
      $("body").addClass("trail_fullscreen");
      // Make video full screen
      this.setState((prevState) => {
        return {
          fullScreen: !prevState.fullScreen,
          draggable: false,
        };
      });
    } else {
      const shadowRootDoc = document.getElementById("extension-div").shadowRoot;
      // Setting top and left for small video screen
      shadowRootDoc.querySelector(".video-wrap_tooltip").style.top =
        "calc(100% - 235px)";
      shadowRootDoc.querySelector(".video-wrap_tooltip").style.left =
        "calc(100% - 430px)";

      $("body").removeClass("trail_fullscreen");

      // Make video small screen
      this.setState((prevState) => {
        return {
          fullScreen: !prevState.fullScreen,
          draggable: true,
        };
      });
    }
  };

  onClickToPlayVideo = () => {
    let video = document
      .getElementById("extension-div")
      .shadowRoot.getElementById("trail_video");
    video.play();

    const playButton = document
      .getElementById("extension-div")
      .shadowRoot.querySelector(".tr_play_button");
    playButton.style.display = "none";
  };

  onClickPauseVideo = () => {
    const playButton = document
      .getElementById("extension-div")
      .shadowRoot.querySelector(".tr_play_button");
    playButton.style.display = "block";
  };

  componentWillUnmount() {
    // Remove trailit logo
    removeTrailitLogo();

    // Remove add event listener
    window.removeEventListener("resize", this.resizeWindow);
  }

  render() {
    if (this.state.loadVideo) {
      if (!this.state.fullScreen) {
        dragElement(
          document
            .getElementById("extension-div")
            .shadowRoot.querySelector(".video-wrap_tooltip")
        );
      }
    }

    const { tourStep, tourSide } = this.props;

    return (
      <>
        {this.props.videoRef && (
          <ContinueTourConfirmation
            open={this.props.videoRef}
            toggle={this.props.videoToggle}
            continueTrail={this.continueTrailWithoutLogin}
            toSignIn={this.toSignInWithoutLogin}
          />
        )}
        <style>{videoTourCss1}</style>
        <div
          className={[
            this.state.fullScreen
              ? tourSide === "prev"
                ? "trail_vC trail_video_overlayPrev trail_tooltip_done"
                : "trail_vC trail_video_overlayNext trail_tooltip_done"
              : null,
          ].join(" ")}
        >
          <div
            className={[
              "video-wrap_tooltip",
              this.state.fullScreen
                ? "video-wrap_tooltip-fullScreen"
                : "video-wrap_tooltip-smallScreen",
              resizeScreen() && "video-mobile",
            ].join(" ")}
          >
            {this.props.data.length > 0 && !this.state.fullScreen && (
              <Button
                type="link"
                disabled={this.props.onDone}
                className="trial_button_close"
                onClick={this.props.closeButtonHandler}
              >
                <CloseOutlined />
              </Button>
            )}
            <div
              className={[
                !this.state.fullScreen ? "tr_gradient_border" : "",
              ].join(" ")}
            >
              <div className="video-wrap_tooltip-inner">
                <video
                  className="tr_video"
                  id="trail_video"
                  controls
                  allow="autoplay"
                  onPause={this.onClickPauseVideo}
                  onEnded={this.onClickPauseVideo}
                  disablePictureInPicture
                  controlsList="nodownload nofullscreen"
                >
                  <source
                    id="sourceVideo"
                    src={this.props.data[this.props.tourStep - 1].web_url}
                  />
                </video>
                <div
                  className="tr_play_button"
                  onClick={this.onClickToPlayVideo}
                ></div>
              </div>
            </div>
            <div
              className={[
                "btn-wrap",
                "videoShow",
                this.state.fullScreen
                  ? "videoShow-fullScreen"
                  : "videoShow-smallScreen",
              ].join(" ")}
            >
              {1 < tourStep && (
                <React.Fragment>
                  <button
                    disabled={this.props.onDone}
                    className="custom-button ex_mr_10"
                    onClick={(e) =>
                      this.onClickToManagePopoverButton(e, "prev")
                    }
                  >
                    Previous
                  </button>
                </React.Fragment>
              )}
              {this.props.data.length > tourStep && (
                <React.Fragment>
                  <button
                    disabled={this.props.onDone}
                    className="custom-button ex_mr_10"
                    onClick={(e) => {
                      this.handleWithoutLogin(
                        e,
                        "next",
                        this.props.data[this.props.tourStep - 1].type,
                        this.props.tourStep
                      );
                    }}
                  >
                    Next
                  </button>
                </React.Fragment>
              )}
              {this.props.data.length === tourStep && (
                <React.Fragment>
                  <button
                    disabled={this.props.onDone}
                    className="custom-button ex_mr_10"
                    onClick={() => this.onClickToDoneTour(tourStep)}
                  >
                    Done
                  </button>
                </React.Fragment>
              )}
            </div>

            <a
              id="trail_pip_video_button"
              onClick={(e) => this.toggleScreen(e)}
              className={[
                "icon videoShow",
                this.state.fullScreen
                  ? "video-icon-fullScreen"
                  : "video-icon-smallScreen",
              ].join(" ")}
            >
              <img
                alt="full-small screen button img"
                src={
                  !this.state.fullScreen
                    ? "https://www.materialui.co/materialIcons/navigation/fullscreen_white_36x36.png"
                    : "https://www.materialui.co/materialIcons/navigation/fullscreen_exit_white_48x48.png"
                }
              />
            </a>
          </div>
        </div>
      </>
    );
  }
}

export default VideoTour;
