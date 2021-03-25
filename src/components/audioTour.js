import React from "react";
import ReactPlayer from "react-player";
import $ from "jquery";
import { Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";

import dragElement from "../common/draggable";
import { resizeScreen } from "../common/helper";
import { audioTourCss1, audioPlayerCss2 } from "../css/audioTour";
import { stopMediaPlaying } from "../common/stopePlayingMedia";
import {
  addTrailitLogo,
  removeTrailitLogo,
} from "../common/trailitLogoInPreview";
import ContinueTourConfirmation from "./Modal/ContinueTourConfirmation";

const chrome = window.chrome;
let timeInterval;
let audio;

class AudioTour extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      audioLoad: false,
      audioUrl: "",
      type: "audio",
      doneTour: false,
      step: 0,
      profileImage: "",
    };
  }

  handleWithoutLogin = (event, tourSide, type, currentStep) => {
    chrome.storage.local.get(["isGuest"], (items) => {
      if (currentStep % 3 === 0 && tourSide === "next" && items.isGuest) {
        this.props.audioToggle();
      } else {
        this.onClickToManagePopoverButton(event, tourSide);
      }
    });
  };

  continueTrailWithoutLogin = (event, tourSide) => {
    this.onClickToManagePopoverButton(event, tourSide);
    this.props.audioToggle();
  };

  toSignInWithoutLogin = () => {
    this.props.toggle();
  };

  componentDidMount() {
    // console.log("this.props", this.props);
    let self = this;
    chrome.storage.local.get(
      ["userData", "isPreview", "authorData", "followedTrailUserData"],
      (items) => {
        self.setState({
          profileImage: items.isPreview
            ? items.authorData.profileImage
            : items.followedTrailUserData
            ? items.followedTrailUserData.profileImage
            : items.userData.profileImage
            ? items.userData.profileImage
            : "",
          audioLoad: true,
          audioUrl: new Audio(this.props.data[this.props.tourStep - 1].web_url),
          tourStep: this.props.tourStep,
        });
      }
    );

    if (this.props.data[this.props.tourStep - 1].url !== document.URL) {
      window.location.href = this.props.data[this.props.tourStep - 1].url;
    }

    //

    // if(document.URL.includes('youtube.com')) {
    //     let videoElem = document.querySelector('.video-stream.html5-main-video');
    //     videoElem.addEventListener('onloadeddata', () => {
    //         videoElem.pause();
    //     })
    //     setTimeout(() => {
    //         videoElem.pause();
    //     }, 1000)
    // }

    // setTimeout(() => {
    //     if(document.querySelector('.audio_wrap_tooltip')!== null) {
    //         document.querySelectorAll('video').forEach(res => {
    //             if(res.className !== "preview-video") {
    //                 res.pause()
    //             }
    //         })
    //     }
    // }, 1000);

    // if (document.readyState === 'complete') {
    //     $(document).ready(() => {
    // // Stop playing websites audio or video
    // stopMediaPlaying();
    //     });

    // } else {
    //     document.body.onload = function () {
    //         // Stop playing websites audio or video
    //         stopMediaPlaying();
    //     };
    // }

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
  }

  /**
   * Manage popover web user tour button
   * @data tooltip data
   * @step tooltip current step
   */
  onClickToManagePopoverButton = async (event, tourSide) => {
    let { tourStep } = this.props;
    let step = tourSide === "prev" ? tourStep - 1 : tourStep + 1;

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
  };

  onClickToDoneTour = (data, step) => {
    let { tourStep } = this.props;
    chrome.storage.local.set({ closeContinue: false });
    this.props.toggle({ removePreviewTrails: true });
    this.setState({ doneTour: true });
  };

  componentDidUpdate(prevProps, prevState) {
    // console.log("did updated");
    if (
      this.props.tourStep !== prevProps.tourStep &&
      this.props.data[this.props.tourStep - 1].type === this.state.type
    ) {
      // console.log("audio url");
      this.setState({
        audioUrl: new Audio(this.props.data[this.props.tourStep - 1].web_url),
      });
    } else if (
      this.props.tourStep !== prevProps.tourStep &&
      this.props.data[this.props.tourStep - 1].type !== this.state.type
    ) {
      const tr_audioplayer = document
        .getElementById("extension-div")
        .shadowRoot.querySelector(".tr_audioplayer");
      const playBtn = tr_audioplayer.querySelector(".tr_audioplayer-playpause");
      playBtn.classList.remove("tr_audioplayer-playing");

      this.setState({ audioUrl: "", audioLoad: false });
    }
  }

  cleanup = () => {
    // Clean up
    audio.pause();
    clearInterval(timeInterval);
  };

  componentWillUnmount() {
    if (audio && timeInterval) {
      this.cleanup();
    }

    // Remove trailit log
    removeTrailitLogo();
  }

  render() {
    // Do clean up work
    if (audio && timeInterval) {
      this.cleanup();
    }

    console.log("in render");

    // $(() => {
    const tr_audioplayer = document
      .getElementById("extension-div")
      .shadowRoot.querySelector(".tr_audioplayer");

    if (this.state.audioLoad && this.state.audioUrl) {
      audio = this.state.audioUrl;
      audio.autoplay = true;

      const playBtn = tr_audioplayer.querySelector(".tr_audioplayer-playpause");
      if (!this.props.previewInTooltip) {
        const audioWrapTooltip = document
          .getElementById("extension-div")
          .shadowRoot.querySelector(".audio_wrap_tooltip");

        //Make the DIV element draggagle:
        dragElement(audioWrapTooltip);
      }

      let playAudio = false;

      //credit for song: Adrian kreativaweb@gmail.com
      audio.addEventListener("loadeddata", () => {
        if (!playAudio) {
          playAudio = true;

          if (
            this.props.data[this.props.tourStep - 1].url === document.URL &&
            document
              .getElementById("extension-div")
              .shadowRoot.querySelector(".audio_wrap_tooltip")
          ) {
            chrome.storage.local.get(["AutoPlayMediaToggle"], (items) => {
              if (
                items.AutoPlayMediaToggle === undefined ||
                items.AutoPlayMediaToggle
              ) {
                let audioPromise = audio.play();
                if (audioPromise !== undefined) {
                  audioPromise
                    .then((res) => {
                      playBtn.classList.add("tr_audioplayer-playing");

                      //check audio percentage and update time accordingly
                      const progressBar = tr_audioplayer.querySelector(
                        ".tr_audioplayer-bar-played"
                      );
                      timeInterval = setInterval(() => {
                        progressBar.style.width =
                          (audio.currentTime / audio.duration) * 100 + "%";
                        tr_audioplayer.querySelector(
                          ".tr_audioplayer-time-current"
                        ).textContent = getTimeCodeFromNum(audio.currentTime);
                      }, 500);

                      audio.volume = 0.75;
                    })
                    .catch((err) => console.log("err", err));
                }
              }
            });
          }
          tr_audioplayer.querySelector(
            ".tr_audioplayer-time-duration"
          ).textContent = isNaN(audio.duration)
            ? 0.0
            : getTimeCodeFromNum(audio.duration);
        }
      });

      //Audio ended event
      audio.onended = function () {
        playBtn.classList.remove("tr_audioplayer-playing");
      };

      //click on timeline to skip around
      const timeline = tr_audioplayer.querySelector(".tr_audioplayer-bar");
      timeline.addEventListener(
        "click",
        (e) => {
          const timelineWidth = window.getComputedStyle(timeline).width;
          const timeToSeek =
            (e.offsetX / parseInt(timelineWidth)) * audio.duration;
          audio.currentTime = timeToSeek;
        },
        false
      );

      //click volume slider to change volume
      const volumeSlider = tr_audioplayer.querySelector(".volume-slider-root");
      volumeSlider.addEventListener(
        "click",
        (e) => {
          const sliderWidth = window.getComputedStyle(volumeSlider).width;
          const newVolume = e.offsetX / parseInt(sliderWidth);
          audio.volume = newVolume;
          tr_audioplayer.querySelector(".volume-percentage").style.width =
            newVolume * 100 + "%";
        },
        false
      );

      //toggle between playing and pausing on button click
      playBtn.addEventListener("click", () => {
        console.log("on play button click");
        console.log("audio.pause", audio.paused);

        if (audio.paused) {
          playBtn.classList.add("tr_audioplayer-playing");
          chrome.storage.local.get(["AutoPlayMediaToggle"], (items) => {
            if (!items.AutoPlayMediaToggle || items.AutoPlayMediaToggle) {
              audio.autoplay = true;
              let audioPromise = audio.play();

              if (audioPromise !== undefined) {
                audioPromise
                  .then((res) => {
                    playBtn.classList.add("tr_audioplayer-playing");
                    //check audio percentage and update time accordingly
                    const progressBar = tr_audioplayer.querySelector(
                      ".tr_audioplayer-bar-played"
                    );
                    timeInterval = setInterval(() => {
                      progressBar.style.width =
                        (audio.currentTime / audio.duration) * 100 + "%";
                      tr_audioplayer.querySelector(
                        ".tr_audioplayer-time-current"
                      ).textContent = getTimeCodeFromNum(audio.currentTime);
                    }, 500);

                    audio.volume = 0.75;
                  })
                  .catch((err) => console.log("err", err));
              }
            }
          });

          tr_audioplayer.querySelector(
            ".tr_audioplayer-time-duration"
          ).textContent = isNaN(audio.duration)
            ? 0.0
            : getTimeCodeFromNum(audio.duration);
        } else {
          audio.pause();
          playBtn.classList.remove("tr_audioplayer-playing");
        }
      });

      tr_audioplayer
        .querySelector(".volume-button")
        .addEventListener("click", () => {
          const volumeEl = tr_audioplayer.querySelector(
            ".volume-container .volume"
          );
          audio.muted = !audio.muted;
          if (audio.muted) {
            volumeEl.classList.remove("icono-volumeMedium");
            volumeEl.classList.add("icono-volumeMute");
          } else {
            volumeEl.classList.add("icono-volumeMedium");
            volumeEl.classList.remove("icono-volumeMute");
          }
        });

      //turn 128 seconds into 2:08
      function getTimeCodeFromNum(num) {
        let seconds = parseInt(num);
        let minutes = parseInt(seconds / 60);
        seconds -= minutes * 60;
        const hours = parseInt(minutes / 60);
        minutes -= hours * 60;

        if (hours === 0)
          return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
        return `${String(hours).padStart(2, 0)}:${minutes}:${String(
          seconds % 60
        ).padStart(2, 0)}`;
      }
    }
    // });

    const { tourStep } = this.props;

    return (
      // className={`trail_tooltip_done ${tourSide==='prev'?"trail_vC trail_video_overlayPrev trail_tooltip_done":"trail_vC trail_video_overlayNext trail_tooltip_done"}`}
      <div>
        {this.props.audioRef && (
          <ContinueTourConfirmation
            open={this.props.audioRef}
            toggle={this.props.audioToggle}
            continueTrail={this.continueTrailWithoutLogin}
            toSignIn={this.toSignInWithoutLogin}
          />
        )}
        <style>{audioTourCss1}</style>
        <style>{audioPlayerCss2}</style>
        <div className="audio_wrap_tooltip">
          <div className="audio_wrap_tooltip_innr">
            <div className="trialit_audio tr_gradient_border">
              <img
                alt="user-img"
                src={
                  this.state.profileImage == ""
                    ? require("../images/user.png")
                    : this.state.profileImage
                }
              />
              <div className="tr_audioplayer">
                <div
                  className={`tr_audioplayer-playpause ${
                    resizeScreen() && "playpause-mobile"
                  }`}
                  title="Play"
                >
                  <a>Play</a>
                </div>
                <div
                  className={`tr_audioplayer-time tr_audioplayer-time-current ${
                    resizeScreen() && "time-current-mobile"
                  }`}
                >
                  00:00
                </div>
                <div
                  className={`tr_audioplayer-bar ${
                    resizeScreen() && "time-bar-modile"
                  }`}
                >
                  <div className="tr_audioplayer-bar-loaded"></div>
                  <div className="tr_audioplayer-bar-played"></div>
                </div>
                <div
                  className={`tr_audioplayer-time tr_audioplayer-time-duration ${
                    resizeScreen() && "time-duration-mobile"
                  }`}
                ></div>
                <div
                  className={`volume-container ${
                    resizeScreen() && "volumn-mobile"
                  }`}
                >
                  <div className="volume-button">
                    <div className="volume icono-volumeMedium"></div>
                  </div>
                  <div className="volume-slider">
                    <div className="volume-slider-root">
                      <div className="volume-percentage"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {!this.props.previewInTooltip && (
            <div className="btn-wrap videoShow">
              {this.props.data.length > 0 && (
                <Button
                  type="link"
                  disabled={this.props.onDone}
                  className="trial_button_close"
                  onClick={(e) => {
                    audio.pause();
                    clearInterval(timeInterval);
                    this.props.closeButtonHandler(e);
                  }}
                >
                  <CloseOutlined />
                </Button>
              )}
              {1 < tourStep && (
                <React.Fragment>
                  <button
                    disabled={this.props.onDone}
                    className="ant-btn ant-btn-primary ex_mr_10"
                    onClick={(e) => {
                      audio.pause();
                      clearInterval(timeInterval);
                      this.onClickToManagePopoverButton(e, "prev");
                    }}
                  >
                    Previous
                  </button>
                </React.Fragment>
              )}
              {this.props.data.length > tourStep && (
                <React.Fragment>
                  <button
                    disabled={this.props.onDone}
                    className="ant-btn ant-btn-primary"
                    onClick={(e) => {
                      audio.pause();
                      clearInterval(timeInterval);

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
                    className="ant-btn ant-btn-primary"
                    onClick={() => {
                      audio.pause();
                      this.onClickToDoneTour(tourStep);
                    }}
                  >
                    Done
                  </button>
                </React.Fragment>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default AudioTour;
