import React from "react";
import { Button } from "antd";
import { CloseOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Popover, PopoverHeader, PopoverBody } from "reactstrap";
import $ from "jquery";

import AudioTour from "./audioTour";
import { resizeScreen } from "../common/helper";
import { stopMediaPlaying } from "../common/stopePlayingMedia";
import {
  addOverlay,
  setOverlayHtml,
  removeOverlay,
} from "../common/trailOverlay";
import {
  addTrailitLogo,
  removeTrailitLogo,
} from "../common/trailitLogoInPreview";
import ContinueTourConfirmation from "./Modal/ContinueTourConfirmation";
import { matchUrl } from "./common";

const chrome = window.chrome;

class WebUserTour extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isTourActive: true,
      tourStep: 1,
      tourSteps: {},
      tourContent: [],
      uniqueTargetStatus: false,
      curentTour: {},
    };
  }

  handleWithoutLogin = (event, tourSide, type, currentStep) => {
    this.props.toogleTargetDataNotFound(false);

    chrome.storage.local.get(["isGuest"], (items) => {
      if (currentStep % 3 === 0 && tourSide === "next" && items.isGuest) {
        this.props.tooltipToggle();
      } else {
        this.onClickToManagePopoverButton(event, tourSide);
      }
    });
  };

  continueTrailWithoutLogin = (event, tourSide) => {
    this.onClickToManagePopoverButton(event, tourSide);
    this.props.tooltipToggle();
  };
  toSignInWithoutLogin = () => {
    this.props.toggle();
  };

  componentDidMount() {
    $(() => {
      this.handleLoad();
    });
  }

  resizeFunction = () => {
    let { tourStep } = this.state;
    const shadowRoot = document.getElementById("extension-div").shadowRoot;

    if (!shadowRoot.querySelector(".trail_tooltip_done")) return;

    this.getWebUserTour("", this.props.data[tourStep - 1], tourStep);
  };

  componentDidUpdate(prevProps) {
    if (prevProps.tourStep !== this.props.tourStep) {
      this.createPopOver(this.props.tourStep);
      chrome.runtime.onMessage.addListener(this.handleMessage.bind(this));
      this.getWebUserTour(
        "",
        this.props.data[this.props.tourStep - 1],
        this.props.tourStep
      );
    }

    // Call add logo function
    this.addLogo();
  }

  handleLoad = (e) => {
    let { tourStep } = this.state;
    let timeout = 0;

    if (document.URL.includes("https://common.fund")) {
      timeout = 2000;
    }

    setTimeout(() => {
      this.createPopOver(tourStep);
      chrome.runtime.onMessage.addListener(this.handleMessage.bind(this));
      this.getWebUserTour("", this.props.data[tourStep - 1], tourStep);

      if (
        this.props.data[tourStep - 1].mediaType &&
        (this.props.data[tourStep - 1].mediaType === "video" ||
          this.props.data[tourStep - 1].mediaType === "audio")
      ) {
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

        // Add logo
        this.addLogo();

        setTimeout(() => {
          document.querySelectorAll("video").forEach((res) => {
            if (res.className !== "preview-video") {
              res.pause();
            }
          });
        }, 2000);
      }

      // Add event listener
      window.addEventListener("resize", this.resizeFunction);
    }, timeout);
  };

  addLogo = () => {
    // Add trailit logo
    addTrailitLogo();
  };

  handleMessage(msg) {
    setTimeout(() => {
      chrome.storage.local.get(
        [
          "trail_web_user_tour",
          "tourStatus",
          "tourType",
          "tourStep",
          "currentTourType",
        ],
        function (items) {
          this.createPopOver(items.tourStep);
          this.getWebUserTour(
            "",
            this.props.data[items.tourStep - 1],
            items.tourStep
          );
        }
      );
    }, 3000);
  }

  componentWillUnmount() {
    // Remove listener when this component unmounts
    chrome.runtime.onMessage.removeListener(this.handleMessage);

    // Remove event listener
    window.removeEventListener("resize", this.resizeFunction);

    // Remove trailit logo
    removeTrailitLogo();

    this.setState({ isTourActive: false });
  }

  static getDerivedStateFromProps(props, state) {
    return {
      tourStep: props.tourStep,
    };
  }

  /**
   * create popover based on their url
   */
  createPopOver = (step) => {
    const { tourSteps } = this.state;

    let content = this.props.data
      .map((res, index) => {
        let unqTarget = res.uniqueTarget;

        if (resizeScreen()) {
          if (res.unique_target_one != "") {
            unqTarget = res.unique_target_one;
          }
        }

        if (
          res.url == this.props.data[step - 1].url &&
          res.type == "tooltip" &&
          document.querySelector(unqTarget) != null
        ) {
          tourSteps[`step${index + 1}`] = false;
          res["step"] = index + 1;
          return res;
        }
      })
      .filter((r) => r != undefined);

    this.setState({ tourContent: content, tourSteps });
  };

  /**
   * get currentweb user tour
   */
  getWebUserTour = (event, data, step) => {
    let { tourSteps } = this.state;
    let activeWeb = data;
    let unqTarget = this.props.data[step - 1].uniqueTarget;

    if (resizeScreen()) {
      if (this.props.data[step - 1].unique_target_one != "") {
        unqTarget = this.props.data[step - 1].unique_target_one;
      }
    }

    if (document.querySelector(unqTarget) == null) {
      this.props.toogleTargetDataNotFound(true);
    } else {
      // Call Add overlay function
      addOverlay();

      let targetElement = "html, body";
      var docHeight = document.documentElement.scrollHeight;
      let original = document.querySelector(unqTarget);
      let bounding = original.getBoundingClientRect();
      let offset = $(unqTarget).offset();

      let leftPosition = offset.left;
      let topPosition = offset.top;

      setTimeout(() => {
        if ($(unqTarget).offset() !== undefined) {
          if (topPosition !== $(unqTarget).offset().top) {
            // Call remove overlay function
            removeOverlay();

            // shadowRoot.querySelector('.trail_overlay').remove();
            this.createPopOver(step);
            this.getWebUserTour(event, data, step);
          }
        }
      }, 1000);

      // Call set overlay html function
      setOverlayHtml(
        window,
        docHeight,
        topPosition,
        bounding,
        leftPosition,
        "webUserTour"
      );

      if (event != "") {
        event.preventDefault();
      }

      const y =
        document.querySelector(unqTarget).getBoundingClientRect().top +
        document.querySelector(targetElement).scrollTop +
        bounding.height -
        300;
      $(targetElement).stop().animate(
        {
          scrollTop: y,
        },
        1000
      );

      window.addEventListener("load", () => {
        setTimeout(() => {
          $(targetElement).stop().animate(
            {
              scrollTop: y,
            },
            1000
          );
        }, 2000);
      });

      activeWeb = {
        ...activeWeb,
        uniqueTarget: unqTarget,
      };

      tourSteps[`step${step}`] = true;
      this.setState({
        curentTour: activeWeb,
        uniqueTargetStatus: true,
        tourStep: step,
        tourSteps,
      });
    }
  };

  /**
   * Manage popover web user tour button
   * @data tooltip data
   * @step tooltip current step
   */
  onClickToManagePopoverButton = async (event, tourSide) => {
    this.props.toogleTargetDataNotFound(false);

    let step =
      tourSide === "prev" ? this.props.tourStep - 1 : this.props.tourStep + 1;

    removeOverlay();

    // document.getElementById('extension-div').shadowRoot.querySelector('.trail_overlay').remove();
    $(".trail_web_user_tour").parents().css("z-index", "");
    $(".trail_web_user_tour").removeAttr("trail_web_user_tour");

    let { tourStep } = this.state;
    let unqTarget = this.props.data[tourStep - 1].uniqueTarget;

    if (resizeScreen()) {
      if (this.props.data[tourStep - 1].unique_target_one != "") {
        unqTarget = this.props.data[tourStep - 1].unique_target_one;
      }
    }

    document.querySelector(unqTarget).classList.remove("trail_web_user_tour");
    if (matchUrl(this.props.data[step - 1].url, document.URL)) {
      let type = this.props.data[step - 1].type;

      if (type === "tooltip") {
        this.props.tour(step, type, tourSide);
      } else {
        this.setState({ tourStep: step - 1 });
        this.props.tour(step, type, tourSide);
      }
    } else {
      // Set loading true to show overlay
      this.props.setLoadingState(true);
      let type = this.props.data[step - 1].type;
      await this.props.tour(step, type, tourSide);
      window.location.href = this.props.data[step - 1].url;
      setTimeout(() => {
        this.createPopOver(step);
        this.getWebUserTour(event, this.props.data[step - 1], step);
      }, 2000);
    }

    // Call remove overlay function
  };

  onClickToDoneTour = (data, step) => {
    this.props.toogleTargetDataNotFound(false);
    let { tourSteps } = this.state;

    Object.keys(tourSteps).map((r, i) => {
      tourSteps[r] = false;
    });

    this.setState({ tourSteps, tourStep: 1 });

    this.props.toggle({ removePreviewTrails: true });
  };

  onLoadedEvent = (e) => {
    let { uniqueTarget } = this.props.data[this.state.tourStep - 1];
    let targetElement = "html, body";
    let bounding = document.querySelector(uniqueTarget).getBoundingClientRect();
    const y =
      document.querySelector(uniqueTarget).getBoundingClientRect().top +
      document.querySelector(targetElement).scrollTop +
      bounding.height -
      300;
    $(targetElement).stop().animate(
      {
        scrollTop: y,
      },
      1000
    );
  };

  onButtonCloseHandler = async (e) => {
    this.props.toogleTargetDataNotFound(false);
    let res = await this.props.closeButtonHandler(e);

    return res;
  };

  render() {
    const { tourSteps, tourStep, tourContent, uniqueTargetStatus } = this.state;
    let preview = null;
    let mediaTypeStatus;

    if (
      resizeScreen() &&
      this.props.data[tourStep - 1].unique_target_one != ""
    ) {
      mediaTypeStatus = this.props.data[tourStep - 1].mobile_media_type;
    } else {
      mediaTypeStatus = this.props.data[tourStep - 1].mediaType;
    }

    if (mediaTypeStatus && mediaTypeStatus === "video") {
      preview = (
        <div className="tr_preview_video_bx">
          <video
            className="preview-video"
            disablePictureInPicture
            controlsList="nodownload"
            controls
            onLoadedData={(e) => this.onLoadedEvent(e)}
            allow="autoplay"
            autoPlay={true}
          >
            <source src={this.props.data[tourStep - 1].web_url} />
          </video>
        </div>
      );
    } else if (mediaTypeStatus && mediaTypeStatus === "audio") {
      preview = (
        <AudioTour
          data={this.props.data}
          toggle={this.props.toggle}
          tourStep={this.props.tourStep}
          tour={this.props.tour}
          previewInTooltip
        />
      );
    } else if (mediaTypeStatus && mediaTypeStatus === "image") {
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
        {this.props.tooltipRef && (
          <ContinueTourConfirmation
            open={this.props.tooltipRef}
            toggle={this.props.tooltipToggle}
            continueTrail={this.continueTrailWithoutLogin}
            toSignIn={this.toSignInWithoutLogin}
          />
        )}
        {uniqueTargetStatus &&
          matchUrl(this.props.data[tourStep - 1].url, document.URL) && (
            <React.Fragment>
              {tourContent.map((res, index) => {
                let unTarget = resizeScreen()
                  ? res.unique_target_one != ""
                    ? res.unique_target_one
                    : res.uniqueTarget
                  : res.uniqueTarget;
                let title, description;

                if (resizeScreen() && res.unique_target_one != "") {
                  title = res.mobile_title;
                  description = res.mobile_description;
                } else {
                  title = res.title;
                  description = res.description;
                }

                return (
                  <Popover
                    target={unTarget}
                    container={
                      document.getElementById("extension-div").shadowRoot
                    }
                    className={`trail_tooltip_done ${
                      mediaTypeStatus && mediaTypeStatus === "text"
                        ? "trail_text_only"
                        : "" || (mediaTypeStatus && mediaTypeStatus === "video")
                        ? "tr_video_only"
                        : "" || (mediaTypeStatus && mediaTypeStatus === "image")
                        ? "tr_picture_only"
                        : "" || (mediaTypeStatus && mediaTypeStatus === "audio")
                        ? "tr_audio_only"
                        : ""
                    } ${resizeScreen() && "mobile_preview_popover"}`}
                    placement="top"
                    isOpen={tourSteps[`step${res.step}`]}
                  >
                    {/* <button> */}
                    <img
                      alt=".."
                      className="trailit_IconRightBottom"
                      src={require(`../images/trailit_icon1.png`)}
                      onClick={(e) => {
                        // Call send tip open modal function
                        this.props.onSendTipModalOpen();
                      }}
                    />
                    {/* </button> */}
                    <div className="trail_preview_bx">
                      <PopoverHeader
                        className={`top ${
                          resizeScreen() && "tooltip_title_mobile"
                        }`}
                      >
                        {title}
                      </PopoverHeader>
                      <PopoverBody>
                        {
                          <span
                            dangerouslySetInnerHTML={{ __html: description }}
                          ></span>
                        }
                        {preview}
                      </PopoverBody>
                      <PopoverHeader
                        className={`bottom ${
                          resizeScreen() && "tooltip_title_mobile"
                        }`}
                      >
                        {res.title}
                      </PopoverHeader>
                    </div>
                    <div className="btn-wrap">
                      {this.props.data.length > 0 && (
                        <Button
                          disabled={this.props.onDone}
                          type="link"
                          className="trial_button_close"
                          onClick={this.onButtonCloseHandler}
                        >
                          <CloseOutlined type="close" />
                        </Button>
                      )}
                      {1 < tourStep && (
                        <Button
                          disabled={this.props.onDone}
                          type="link"
                          className="prev"
                          onClick={(e) =>
                            this.onClickToManagePopoverButton(e, "prev")
                          }
                        >
                          <LeftOutlined type="left" />
                        </Button>
                      )}
                      {this.props.data.length > tourStep && (
                        <Button
                          disabled={this.props.onDone}
                          type="link"
                          className="next"
                          onClick={(e) => {
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
                          disabled={this.props.onDone}
                          type="link"
                          className="next"
                          onClick={() => this.onClickToDoneTour(res, tourStep)}
                        >
                          <RightOutlined type="right" />
                        </Button>
                      )}
                    </div>
                  </Popover>
                );
              })}
            </React.Fragment>
          )}
      </div>
    );
  }
}

export default WebUserTour;
