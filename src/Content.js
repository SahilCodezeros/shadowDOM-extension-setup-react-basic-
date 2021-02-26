import * as React from "react";
import ReactDOM from "react-dom";
import { Button } from "antd";
import { CloudUploadOutlined } from "@ant-design/icons";
import unique from "unique-selector";
import { arrayMove } from "react-sortable-hoc";
import _ from "lodash";
import $ from "jquery";
import WebFont from "webfontloader";
import Draggable from "react-draggable";

import { socket } from "./common/socket";
import Tooltip from "./components/tooltip";
import VideoTour from "./components/videoTour";
import AudioTour from "./components/audioTour";
import { sendTransection } from "./code/sendtx";
import WebUserTour from "./components/webUserTour";
import MySubscription from "./components/mySubscription";
import SendTipModal from "./components/Modal/SendTipModal";
import TrailSetting from "./components/Modal/TrailSettingsModal";
import { handleFileUpload } from "./common/audAndVidCommon";
import { initButtonPosition } from "./common/initButtonPosition";
import CreateNewTrailModal from "./components/CreateNewTrailModal";
import CreateModalComponent from "./components/Modal/createModalComponent";
import { queryParentElement } from "./components/common";
import TrailDeleteModal from "./components/Modal/TrailDeleteModal";
import PreviewModalComponent from "./components/Modal/previewModalComponent";
import SortableItem, { SortableContainer } from "./components/SortableItem";
import {
  addOverlay,
  setOverlayHtml,
  removeOverlay,
} from "./common/trailOverlay";
import {
  addTrailitLogo,
  removeTrailitLogo,
} from "./common/trailitLogoInPreview";
import CreateTourConfirmationModal from "./components/Modal/CreateTourConfirmationModal";
import {
  getAllUser,
  deleteTrail,
  uploadTrails,
  followTrails,
  arraySorting,
  getFollowTrails,
  updateTrailFlag,
  getUserOneTrail,
  getFollowedOneTrail,
  UpdateTrailData,
  updateTrailTrack,
  updateNotification,
  getAllNotification,
  unFollowTrailOfUser,
  getUserData,
  getSingleTrailData,
  getTrailPublic,
} from "./common/axios";

import { main1Css, main2Css } from "./css/main";
import { tooltipCss1 } from "./css/tooltip";
import { mainFlipCss } from "./css/mainflip";
import {
  myExtensionRootFlipCss0,
  myExtensionRootFlipCss1,
  myExtensionRootFlipCss2,
  myExtensionRootFlipCss3,
  myExtensionRootFlipCss4,
  myExtensionRootFlipCss5,
} from "./css/myExtensionRootFlip";
import {
  defaultButtonCss1,
  defaultButtonCss2,
  defaultButtonCss3,
} from "./css/defaultButton";

import "./Content.css";
import { get } from "./AppUtill";
import { resolve } from "promise";

/*global chrome*/

WebFont.load({
  google: {
    families: ["Lato", "Raleway:400,500,700", "sans-serif"],
  },
  // eslint-disable-next-line no-restricted-globals
  context: frames["text-editor-frame"],
});

let app;
let obj = {};
let root1 = "none";
let allTrails = [];
let trailWebUserTour = [];
let preventToggle = false;

const resizeScreen = () => {
  return window.innerWidth <= 760;
};

if (window.location.href.includes("https://www.and.co")) {
  document.querySelector("html").style.zoom = "100%";
}

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
      trail_web_user_tour: [],
      modalSubscription: false,
      modalCreateNewTrailModal: false,
      currentUserId: null,
      followerList: [],
      closeContinue: false,
      showSetting: false,
      followedTrailUserData: null,
      confirmationModal: {
        show: false,
        tourType: "",
      },
    };
  }

  async componentDidMount() {
    chrome.storage.local.get(
      [
        "trail_web_user_tour",
        "trail_data_id",
        "trail_id",
        "userData",
        "previewUserId",
        "notification",
        "saveSort",
        "tourStep",
        "closeContinue",
        "isPreview",
        "isPreviewSingleTrail",
        "authorData",
        "showSetting",
        "followedTrailUserData",
        "noStepsToWatch",
      ],
      async (items) => {
        let closeContinue = false;

        if (
          items.closeContinue &&
          items.trail_web_user_tour &&
          items.trail_web_user_tour.length > 0
        ) {
          closeContinue = true;
        }

        this.setState({
          closeContinue: closeContinue,
          currentUserId: items.userData._id,
          followedTrailUserData: items.followedTrailUserData,
        });
        socket.on("connect", () => {});

        socket.emit("userId", items.userData._id);

        // socket.on('notification', (data) => {
        // 	// Get chrome push notification
        // 	this.getNewNotification();

        // 	// Get notifiation data from server when socket notificatin listen
        // 	this.userNotificaion();
        // });

        // // Get notifiation data from server when page load
        // this.userNotificaion();

        if (items.showSetting !== undefined && items.showSetting !== null) {
          // Set show setting state
          this.setState({ showSetting: items.showSetting });
        }

        chrome.storage.onChanged.addListener(async (changes) => {
          // console.log("change1", changes);
          //
          // if (changes.authorData && changes.authorData.userName.newValue) {
          //   let { data } = await getUserData(
          //     changes.authorData.newValue.userName
          //   );
          //

          //   chrome.storage.local.set({
          //     authorData: data.response.result.userData,
          //   });
          // }

          if (changes.showSetting) {
            // Set show setting state
            this.setState({ showSetting: changes.showSetting.newValue });
          }

          if (
            (changes.isPreview && changes.isPreview.newValue) ||
            (changes.isPreviewSingleTrail &&
              changes.isPreviewSingleTrail.newValue)
          ) {
            this.openMenu("preview");
          }

          if (changes.closeContinue !== undefined) {
            this.setState({ closeContinue: changes.closeContinue.newValue });
          }

          if (
            changes.openButton &&
            changes.openButton.newValue === "ManageTrail"
          ) {
            this.props.mainToggle();
          }

          if (
            changes.currentTourType &&
            changes.currentTourType.newValue === "" &&
            changes.tourStep &&
            changes.tourStep.newValue === "" &&
            changes.tourType &&
            changes.tourType.newValue === ""
          ) {
            chrome.storage.local.get(
              [
                "trail_web_user_tour",
                "userData",
                "trail_id",
                "previewUserId",
                "notification",
                "saveSort",
                "tourStep",
                "followedTrailUserData",
                "noStepsToWatch",
                "isPreview",
                "currentTrailsTab",
              ],
              async (items) => {
                // console.log("line 241");
                try {
                  if (
                    items.currentTrailsTab === "Followed" &&
                    items.followedTrailUserData
                  ) {
                    const data = {
                      ...items,
                      trail_id: items.trail_id,
                      tourStep: items.tourStep,
                      authorData: { ...items.followedTrailUserData },
                      isPreview: items.isPreview,
                      noStepsToWatch: items.noStepsToWatch,
                    };

                    await this.getCurrUserFollowedTrailData(data);
                  } else {
                    let data = { ...items };
                    if (items.followedTrailUserData) {
                      data = {
                        ...items,
                        trail_id: items.trail_id,
                        tourStep: items.tourStep,
                        userData: { ...items.followedTrailUserData },
                        trail_web_user_tour: items.trail_web_user_tour,
                      };
                    }

                    // Call common get user data function
                    await this.getCurrUserDataCommon(data);
                  }
                } catch (err) {
                  console.log("err", err);
                }
              }
            );
          }
        });

        if (
          document.URL.includes(
            `${process.env.REACT_APP_MS4_URL}userTourDataDetail/readTrailit_trail_data_tour/`
          ) &&
          !items.saveSort
        ) {
          let previewUserId;
          const url = new URL(document.URL);

          // Remove notification
          const data = {
            user_id: items.userData._id,
            updateValue: {
              flag: "read",
            },
            updated: new Date().getTime(),
          };

          try {
            const notiRes = await updateNotification(data);
            if (
              notiRes.data.response &&
              notiRes.data.response.statusCode === "200"
            ) {
              // Remove asterisk from trail icon
              chrome.runtime.sendMessage("", {
                type: "badgeText",
                badgeText: "",
              });
            }

            // if (!items.previewUserId) {
            // 	lesockett url = new URL(document.URL);
            // 	const params = new URLSearchParams(url.search.substring(1));
            // 	previewUserId = params.get('user_id');
            // } else {
            // 	previewUserId = items.previewUserId
            // }
          } catch (err) {}

          const params = new URLSearchParams(url.search.substring(1));
          previewUserId = params.get("user_id");
          let trailId = params.get("trailId");

          // Get trails of preview user from database
          let screen = resizeScreen() ? "mobile" : "web";
          const res = await getUserOneTrail(trailId, screen);
          const result = res.data;

          if (
            result.response &&
            result.response.statusCode !== 404 &&
            result.response.result.length > 0
          ) {
            result.response.result.forEach((el) => {
              allTrails.push({
                userId: previewUserId,
                trail_data_id: el.trail_data_id,
                url: el.url,
                path: el.path,
                selector: el.selector,
                class: el.class,
                title: el.title,
                description: el.description,
                web_url: el.web_url,
                trail_id: el.trail_id,
                type: el.type,
                uniqueTarget: el.unique_target,
                unique_target_one: el.unique_target_one,
                mobile_media_type: el.mobile_media_type,
                mobile_title: el.mobile_title,
                mobile_description: el.mobile_description,
                mediaType: el.media_type,
                created: el.created,
              });
            });

            // if (allTrails.length > 0) {
            // 	allTrails.sort((a, b) => {
            // 		return (+a.created) - (+b.created);
            // 	});
            // }

            const data = {
              follower_id: items.userData._id,
              previewUserId,
            };

            // Get follow data of user from database
            const followData = await getFollowTrails(data);
            const followRes = followData.data;

            if (
              followRes.response.statusCode !== 404 ||
              followRes.response.result !== "Trailit follow not found"
            ) {
              const follow =
                followRes.response.result.count.length > 0 ? true : false;

              obj.followingData = {
                previewUserId,
                follow,
              };

              chrome.storage.local.set({
                followData: {
                  previewUserId,
                  follow,
                },
              });
            }

            preventToggle = true;
            trailWebUserTour = allTrails;

            chrome.storage.local.set({
              trail_web_user_tour: allTrails,
              previewUserId,
            });

            this.openMenu("preview", previewUserId);
          }
        } else if (
          items.userData &&
          (typeof items.previewUserId === "undefined" ||
            items.previewUserId === "") &&
          !items.saveSort
        ) {
          if (preventToggle) {
            preventToggle = false;
          }

          // For viewing followed trail data
          if (items.followedTrailUserData) {
            const data = {
              ...items,
              trail_id: items.trail_id,
              tourStep: items.tourStep,
              authorData: { ...items.followedTrailUserData },
              isPreview: items.isPreview,
              noStepsToWatch: items.noStepsToWatch,
            };

            // console.log("line 406");

            await this.getCurrUserFollowedTrailData(data);
          } else {
            // For viewing preview trails from web-app or own trails
            const data = {
              trail_id: items.trail_id,
              tourStep: items.tourStep,
              userData: { ...items.authorData },
              trail_web_user_tour: items.trail_web_user_tour,
              noStepsToWatch: items.noStepsToWatch,
              isPreview: items.isPreview,
            };

            if (items.isPreview) {
              // Call get current user data common function
              await this.getCurrUserDataCommon(data);
            } else if (items.isPreviewSingleTrail) {
              data.trail_data_id = items.trail_data_id;
              await this.getSingleTrail(data);
            } else {
              // console.log("line 428");
              // Call get current user data common function
              await this.getCurrUserDataCommon(items);
            }
          }
        }
      }
    );

    chrome.storage.local.get(
      [
        "trail_web_user_tour",
        "tourStatus",
        "tourType",
        "tourStep",
        "currentTourType",
        "loadingCount",
        "userData",
      ],
      async function (items) {
        this.setState({ trail_web_user_tour: items.trail_web_user_tour });
        // trailWebUserTour = items.trail_web_user_tour;
        this.setState({ menuOpen: true });
        // Store totalTrails number in localStorage
        localStorage.setItem(
          process.env.REACT_APP_LOCALSTORAGE,
          items.trail_web_user_tour ? this.state.trail_web_user_tour.length : 0
        );

        if (
          (items.currentTourType === "preview" ||
            items.currentTourType === "") &&
          items.tourType === "preview" &&
          items.tourStep !== ""
        ) {
          chrome.storage.local.set({ openButton: "", tourType: "" });
        }

        if (items.tourStep !== "" && items.currentTourType === "preview") {
          if (items.trail_web_user_tour !== undefined) {
            chrome.storage.local.set({
              currentTourType:
                items.trail_web_user_tour[items.tourStep - 1].type,
            });
          }
        }

        if (
          (items.currentTourType === "tooltip" ||
            items.currentTourType === "video") &&
          items.tourType === "preview"
        ) {
          // this.props.downToggleButton(true);
          // this.props.downToggleButton(true);
        }

        if (items.trail_web_user_tour !== undefined) {
          this.setState({ trailList: items.trail_web_user_tour });
        }

        if (items.tourStatus !== undefined) {
          this.setState({ tourStatus: items.tourStatus });
        }
      }.bind(this)
    );

    chrome.runtime.onMessage.addListener(this.onHandleSubscription);

    // 	(msg) => {
    //
    // 	if(msg.subject === 'DOMObj') {
    // 		chrome.storage.local.get(["userData"], async function (items) {
    // 			socket.emit('userId', items.userData._id)
    // 		})
    // 		socket.on('followerList', data => {
    //
    // 			let follower = data.map(result => {

    // 			})
    // 		});
    // 		this.onToggleSubscription(true);
    // 	}
    // });
  }

  async getCurrUserFollowedTrailData(items) {
    try {
      const trail_id = items.trail_id,
        author_id = items.authorData._id,
        loggedInUserId = get(["userData", "_id"], items);

      let continueFlag = false,
        step,
        visited;

      // Call get followed one trail function
      const { data } = await getFollowedOneTrail(
        trail_id,
        author_id,
        loggedInUserId
      );

      const handleSteps = (result) => {
        if (get(["response", "result", "steps"], result)) {
          return result.response.result.steps;
        } else {
          return result.response.result || [];
        }
      };

      if (
        data.response &&
        data.response.statusCode !== 404 &&
        handleSteps(data).length > 0
      ) {
        //checking if visited step is last then start from other non visited step
        // let check =
        //   get(["steps"], data.response.result, [])[
        //     get(["steps"], data.response.result, []).length - 1
        //   ].trail_data_id ===
        //   Number(
        //     get(["visitedSteps"], data.response.result, "").split(",")[
        //       get(["visitedSteps"], data.response.result, "").split(",")
        //         .length - 1
        //     ]
        //   );

        let index = get(["steps"], data.response.result, []).findIndex(
          (step) =>
            !get(["visitedSteps"], data.response.result, "")
              .split(",")
              .map((i) => Number(i))
              .includes(step.trail_data_id)
        );

        step = index + 1;

        // if (!check) {
        //   step = stepNumber;
        // } else {
        //   let index = get(["steps"], data.response.result, []).findIndex(
        //     (step) =>
        //       !get(["visitedSteps"], data.response.result, "")
        //         .split(",")
        //         .map((i) => i, Number)
        //         .includes(step)
        //   );

        //   step = index + 1;
        // }

        // if (step > 1) {
        //   continueFlag = true;
        //   data.response.result.steps[index].flag = "continue";
        // }

        const visitedSteps = get(["visitedSteps"], data.response.result, "")
          .split(",")
          .map((item) => Number(item));

        const continueButton =
          get(["visitedSteps"], data.response.result, "").split("").length >
            0 &&
          !(
            get(["steps"], data.response.result, []).length ===
            get(["visitedSteps"], data.response.result, "").split(",").length
          );

        allTrails = handleSteps(data).map((el, i) => {
          let flag = el.flag === "continue" ? "" : el.flag;

          if (continueButton && visitedSteps.length - 1 === i) {
            flag = "continue";
            continueFlag = true;
          }

          visitedSteps.includes(el.trail_data_id)
            ? (visited = true)
            : (visited = false);

          return {
            userId: author_id,
            trail_data_id: el.trail_data_id,
            url: el.url,
            path: el.path,
            selector: el.selector,
            class: el.class,
            title: el.title,
            description: el.description,
            web_url: el.web_url,
            trail_id: el.trail_id,
            type: el.type,
            uniqueTarget: el.unique_target,
            unique_target_one: el.unique_target_one,
            mobile_media_type: el.mobile_media_type,
            mobile_title: el.mobile_title,
            mobile_description: el.mobile_description,
            mediaType: el.media_type,
            created: el.created,
            sortId: el.trail_sortId ? el.trail_sortId : "",
            flag,
            visited,
          };
        });

        trailWebUserTour = [...allTrails];
        obj.trailList = [...allTrails];
      } else {
        trailWebUserTour = [];
        allTrails = [];
      }

      console.log({
        step,
        tourStep: items.tourStep,
        allTrails,
        trail_id,
        continueFlag,
      });

      this.setState({
        trail_web_user_tour: trailWebUserTour,
        followedTrailUserData: items.followedTrailUserData
          ? items.followedTrailUserData
          : null,
      });

      const tourStep =
        items.tourStep && items.tourStep !== "" ? items.tourStep : 1;

      chrome.storage.local.set({
        trail_id,
        tourStep: tourStep,
        trail_web_user_tour: allTrails,
        closeContinue: continueFlag,
      });
    } catch (err) {
      console.log("err", err);
    }
  }

  async getCurrUserDataCommon(items) {
    const user_id = items.userData._id;
    let res,
      continueFlag = false,
      trail_id = items.trail_id;

    try {
      // Get user's trails from database
      let screen = resizeScreen() ? "mobile" : "web";

      res = await getUserOneTrail(trail_id, screen);

      trailWebUserTour = items.trail_web_user_tour;
    } catch (err) {
      console.log("err", err);
    }

    // if (items.trail_web_user_tour && items.trail_web_user_tour.length > 0) {
    // 	items.trail_web_user_tour.forEach(el => {
    // 		if (!el.trail_id) {
    // 			allTrails.push(el);
    // 		}
    // 	});
    // }

    const result = res.data;

    const handleSteps = (result) => {
      if (get(["response", "result", "steps"], result)) {
        return result.response.result.steps;
      } else {
        return result.response.result || [];
      }
    };

    if (
      result.response &&
      result.response.statusCode !== 404 &&
      handleSteps(result).length > 0
    ) {
      allTrails = handleSteps(result).map((el) => {
        if (el.flag === "continue") {
          continueFlag = true;
        }

        return {
          userId: user_id,
          trail_data_id: el.trail_data_id,
          url: el.url,
          path: el.path,
          selector: el.selector,
          class: el.class,
          title: el.title,
          description: el.description,
          web_url: el.web_url,
          trail_id: el.trail_id,
          type: el.type,
          uniqueTarget: el.unique_target,
          unique_target_one: el.unique_target_one,
          mobile_media_type: el.mobile_media_type,
          mobile_title: el.mobile_title,
          mobile_description: el.mobile_description,
          mediaType: el.media_type,
          created: el.created,
          sortId: el.trail_sortId ? el.trail_sortId : "",
          flag: el.flag,
        };
      });
    } else {
      trailWebUserTour = [];
      allTrails = [];
    }

    // if (allTrails.length > 0) {
    // 	allTrails.sort((a, b) => {
    // 		if (a.sortId !== '') {
    // 			return (+a.sortId) - (+b.sortId);
    // 		} else {
    // 			return (+a.created) - (+b.created);
    // 		}
    // 	});
    // }

    trailWebUserTour = allTrails;
    obj.trailList = allTrails;

    this.setState({
      trail_web_user_tour: trailWebUserTour,
      followedTrailUserData: items.followedTrailUserData
        ? items.followedTrailUserData
        : null,
    });
    chrome.storage.local.set({
      trail_web_user_tour: allTrails,
      tourStep: items.tourStep ? items.tourStep : "",
      trail_id,
      closeContinue: continueFlag,
    });
  }

  async getSingleTrail(data) {
    let res;
    try {
      res = await getSingleTrailData(data.trail_id, data.trail_data_id);
    } catch (err) {}
    if (
      res.data &&
      res.data.response &&
      res.data.response.statusCode === "200"
    ) {
      let payload = { ...res.data.response.result };

      let singleTrail = {
        userId: data.userData.user_id,
        trail_data_id: payload.trail_data_id,
        url: payload.url,
        path: payload.path,
        selector: payload.selector,
        class: payload.class,
        title: payload.title,
        description: payload.description,
        web_url: payload.web_url,
        trail_id: payload.trail_id,
        type: payload.type,
        uniqueTarget: payload.unique_target,
        unique_target_one: payload.unique_target_one,
        mobile_media_type: payload.mobile_media_type,
        mobile_title: payload.mobile_title,
        mobile_description: payload.mobile_description,
        mediaType: payload.media_type,
        created: payload.created,
        sortId: payload.trail_sortId ? payload.trail_sortId : "",
        flag: payload.flag,
      };

      this.setState({ trail_web_user_tour: [singleTrail] });

      chrome.storage.local.get(
        ["trail_id", "userData", "tourStep", "isPreviewSingleTrail"],
        (storage) => {
          if (data.loggedInData) {
            chrome.storage.local.set({
              trail_web_user_tour: [payload],
              tourStep: storage.tourStep ? storage.tourStep : "",
              trail_id: data.trail_id,
              old_trail_id: storage.trail_id,
              old_user_data: { ...storage.userData },
              isPreviewSingleTrail: false,
              webUrl: "",
              userData: { ...data.loggedInData },
              authorData: { ...data.userData },
            });
          } else {
            chrome.storage.local.set({
              tourStep: data.tourStep ? data.tourStep : "",
              trail_id: data.trail_id,
            });
          }
        }
      );
    }
  }

  componentWillUnmount() {
    chrome.storage.local.set({ loadingCount: 0, showSetting: false });
  }

  onHandleSubscription = async (msObj) => {
    if (msObj.message === "urlChanged") {
      if (!this.state.menuOpen) {
        this.setState({ menuOpen: true });
      }
    }

    if (msObj.subject === "DOMInfo") {
      chrome.storage.local.get(
        [
          "userData",
          "trail_id",
          "tourStep",
          "trail_web_user_tour",
          "isPreview",
          "authorData",
          "isPreviewSingleTrail",
          "trail_data_id",
          "noStepsToWatch",
          "followedTrailUserData",
        ],
        async (items) => {
          // For viewing followed trail data
          if (items.followedTrailUserData) {
            const data = {
              ...items,
              trail_id: items.trail_id,
              authorData: { ...items.followedTrailUserData },
              isPreview: items.isPreview,
              noStepsToWatch: items.noStepsToWatch,
            };

            return await this.getCurrUserFollowedTrailData(data);
          }

          // For viewing preview trail data from web-app or own trails
          const data = {
            trail_id: items.trail_id,
            tourStep: items.tourStep,
            userData: { ...items.authorData },
            trail_web_user_tour: items.trail_web_user_tour,
            noStepsToWatch: items.noStepsToWatch,
            isPreview: items.isPreview,
          };

          if (items.isPreview) {
            // Call get current user data common function
            await this.getCurrUserDataCommon(data);
          } else if (items.isPreviewSingleTrail) {
            data.trail_data_id = items.trail_data_id;
            await this.getSingleTrail(data);
          } else {
            // console.log("line 821");
            // Call get current user data common function
            await this.getCurrUserDataCommon(items);
          }
        }
      );

      this.setState({ menuOpen: true });
    }

    chrome.storage.local.get(
      ["closeContinue"],
      async function (items) {
        this.setState({
          closeContinue:
            items.closeContinue === undefined ? false : items.closeContinue,
        });
      }.bind(this)
    );

    if (msObj.subject === "CreateTrail") {
      this.onToggleCreateNewTrailModal(true);
    }

    if (msObj.subject === "DOMObj") {
      let allUserData = await getAllUser();
      chrome.storage.local.get(["userData"], async function (items) {
        socket.emit("userId", items.userData._id);
      });

      socket.on("followerList", (data) => {
        if (allUserData.status === 200) {
          let follower = data.map((result) => {
            let findFollower = allUserData.data.data.response.find(
              (r) => r._id === result
            );
            return findFollower.email;
          });
          this.setState({ followerList: follower });
        }
      });

      this.onToggleSubscription(true);
    }
  };

  // Get all notification of user
  userNotificaion() {
    chrome.storage.local.get(["userData"], async (items) => {
      // Get notification count from database
      const data = {
        user_id: items.userData._id,
        flag: "unread",
      };

      try {
        const res = await getAllNotification(data);

        if (res.data.response && res.data.response.statusCode === "200") {
          // Set count of notification in chrome runtime
          chrome.runtime.sendMessage("", {
            type: "budgeText",
            badgeText: `${res.data.response.result.length}`,
          });
        }
      } catch (err) {}
    });
  }

  // Get new notification of client from server and send it to chrome notification
  getNewNotification = () => {
    chrome.runtime.sendMessage("", {
      type: "notification",
      options: {
        title: "Just wanted to notify you",
        message: "How great it is!",
        iconUrl:
          "https://ca.slack-edge.com/TC9UZTSLX-UC8TZ2210-f65b94665589-48",
        type: "basic",
      },
    });
    // chrome.runtime.sendMessage('', {
    // 	type: 'notification',
    // 	options: {
    // 		title: 'Trailit',
    // 		message: 'You have got new notification!',
    // 		iconUrl: 'https://ca.slack-edge.com/TC9UZTSLX-UC8TZ2210-f65b94665589-512',
    // 		type: 'basic'
    // 	}
    // });
  };

  // On media tour tour select
  onMediaTourSelect = (tourType) => {
    // Set confirmation modal state
    this.setState({
      confirmationModal: {
        show: true,
        tourType,
      },
    });
  };

  // On confirmation modal close
  confirmationModalClose = () => {
    // Set confirmation modal state
    this.setState({
      confirmationModal: {
        show: false,
        tourType: "",
      },
    });
  };

  // On select tour type click
  onTourTypeSelect = (tourType, tourStep) => {
    // Call close confirmation modal
    this.confirmationModalClose();

    setTimeout(() => {
      if (tourStep === `${tourType} Modal`) {
        this.openMenu("modal", undefined, undefined, tourType);
      } else {
        this.openMenu(tourType);
      }
    }, 400);
  };

  openMenu = async (type, previewId, closeContinue, stepType) => {
    let mainObj = {},
      objStatus = true;

    if (
      document.URL.includes("https://twitter.com") &&
      (type === "video" || type === "audio")
    ) {
      alert(`We don't have permission to add ${type} in this site`);
      return "";
    } else if (
      document.URL.includes(
        `${process.env.REACT_APP_MS4_URL}userTourDataDetail/readTrailit_trail_data_tour/`
      ) &&
      previewId !== "" &&
      (type === "video" || type === "audio" || type === "tooltip")
    ) {
      alert(`We don't have permission to add ${type} in this site`);
      return "";
    } else if (
      document.URL.includes("https://docs.google.com") &&
      type === "tooltip"
    ) {
      alert(`We don't have permission to add ${type} in this site`);
      return "";
    }

    switch (type) {
      case "tooltip":
        mainObj.tourType = "tooltip";
        // this.props.toggle();
        this.props.mainToggle(true);
        break;
      case "Make Edit":
        mainObj.tourType = "Make Edit";
        this.props.mainToggle(true);
        break;
      case "modal":
        mainObj.tourType = "modal";
        mainObj.stepType = stepType;
        chrome.runtime.sendMessage("", {
          type: "chromeModal",
          status: true,
        });
        this.props.mainToggle(true);
        break;
      case "video":
        mainObj.tourType = "video";
        // this.props.this.props.mainToggle();
        this.props.mainToggle(true);
        break;
      case "preview":
        mainObj.tourType = "preview";
        objStatus = false;
        // let { trail_web_user_tour } = this.state;
        chrome.storage.local.get(
          [
            "trail_web_user_tour",
            "userData",
            "isPreview",
            "continueTourStepId",
          ],
          async function (items) {
            let trail_web_user_tour = items.trail_web_user_tour;

            if (trail_web_user_tour && trail_web_user_tour.length > 0) {
              this.setState({ trail_web_user_tour: items.trail_web_user_tour });
              let tour = {};

              trail_web_user_tour.forEach((el, i) => {
                if (el.flag === "continue" && !items.isPreview) {
                  tour = {
                    tourStep: i + 1,
                    currentTourType: el.type,
                    tourType: el.tourType,
                    url: el.url,
                  };
                }
                if (items.isPreview && items.continueTourStepId) {
                  tour = {
                    tourStep: items.continueTourStepId + 1,
                    currentTourType:
                      trail_web_user_tour[items.continueTourStepId].type,
                    tourType:
                      trail_web_user_tour[items.continueTourStepId].tourType,
                    url: trail_web_user_tour[items.continueTourStepId].url,
                  };
                }
              });

              if (tour.url) {
                if (closeContinue !== undefined) {
                  let tourTData =
                    trail_web_user_tour[
                      trail_web_user_tour.length === tour.tourStep
                        ? 0
                        : tour.tourStep
                    ];
                  tour = {
                    tourStep:
                      trail_web_user_tour.length === tour.tourStep
                        ? 1
                        : tour.tourStep + 1,
                    currentTourType: tourTData.type,
                    tourType: "preview",
                    url: tourTData.url,
                  };
                }
              }

              chrome.storage.local.set({
                openButton: "CreateTrail",
                tourStep: tour.tourStep ? tour.tourStep : 1,
                currentTourType: tour.currentTourType
                  ? tour.currentTourType
                  : trail_web_user_tour[0].type,
                tourType: tour.tourType ? tour.tourType : "preview",
              });

              console.log("tour", tour);

              if (
                tour.url &&
                tour.url !== document.URL &&
                (closeContinue !== undefined || closeContinue === undefined)
              ) {
                // Set loading state to false
                chrome.storage.local.set({ loading: "true" });
                chrome.runtime.sendMessage("", {
                  type: "openInTab",
                  url: tour.url,
                });
              } else if (
                !tour.url &&
                trail_web_user_tour[0].url !== document.URL &&
                (closeContinue !== undefined || closeContinue === undefined)
              ) {
                // Set loading state to false
                chrome.storage.local.set({ loading: "true" });
                chrome.runtime.sendMessage("", {
                  type: "openInTab",
                  url: trail_web_user_tour[0].url,
                });
              } else if (
                !tour.url &&
                trail_web_user_tour[0].url === document.URL &&
                (closeContinue !== undefined || closeContinue === undefined)
              ) {
                // Set loading state to false
                chrome.storage.local.set({ loading: "false" });
              } else if (
                tour.url &&
                tour.url === document.URL &&
                (closeContinue !== undefined || closeContinue === undefined)
              ) {
                // Set loading state to false
                chrome.storage.local.set({ loading: "false" });
              }
            } else {
              if (trail_web_user_tour && trail_web_user_tour.length > 0) {
                chrome.storage.local.set({
                  openButton: "CreateTrail",
                  tourStep: 1,
                  currentTourType: "preview",
                });
              } else {
                alert("There are no trails, Please create the trails");
              }
            }
            if (
              !preventToggle &&
              trail_web_user_tour &&
              trail_web_user_tour.length > 0
            ) {
              this.props.onChangeTourType(mainObj.tourType);
              this.props.mainToggle(true);
            }
          }.bind(this)
        );

        // this.setState({ trail_web_user_tour: trailWebUserTour });

        break;
      case "":
        this.setState({
          menuOpen: !this.state.menuOpen,
        });
        break;
      case "audio":
        mainObj.tourType = "audio";
        // this.props.toggle();
        this.props.mainToggle(true);
        break;
      default:
        break;
    }

    if (mainObj.tourType && objStatus) {
      if (mainObj.stepType && mainObj.stepType !== "") {
        chrome.storage.local.set({
          openButton: "CreateTrail",
          currentTourType: "preview",
          stepType: mainObj.stepType,
          tourType: mainObj.tourType === undefined ? "" : mainObj.tourType,
        });
      } else {
        chrome.storage.local.set({
          openButton: "CreateTrail",
          currentTourType: "preview",
          tourType: mainObj.tourType === undefined ? "" : mainObj.tourType,
        });
      }
    }

    if (mainObj.tourType !== "preview") {
      this.props.onChangeTourType(mainObj.tourType);
    } else {
    }
  };

  onToggleSubscription = (modalSubscription) => {
    this.setState({ modalSubscription });
  };

  onToggleCreateNewTrailModal = (modalCreateNewTrailModal) => {
    this.setState({ modalCreateNewTrailModal });
  };

  onContinueTour = (e) => {
    this.openMenu("preview", "", "closeContinue");
  };

  // Copy Web app link
  copyWebApplink = (e) => {
    const { currentUserId } = this.state;
    chrome.storage.local.get(
      [
        "trail_web_user_tour",
        "userData",
        "previewUserId",
        "notification",
        "saveSort",
        "tourStep",
        "closeContinue",
      ],
      async (items) => {
        if (
          items.trail_web_user_tour != undefined &&
          items.trail_web_user_tour.length == 0
        ) {
          alert("Please create trail");
          return null;
        }

        let trail_web_user_tour = items.trail_web_user_tour;

        const trailId = trail_web_user_tour[0].trail_id;
        const URL = trail_web_user_tour[0].url;
        let qryString = URL.split("?").length > 1 ? "&" : "?";
        const trailUrl = `http://go.trialit.co/live/${URL}${qryString}trailUserId=${currentUserId}&trailId=${trailId}&trailPreview=true&tourStep=1`;
        function copyStringToClipboard(str) {
          // Create new element
          var el = document.createElement("textarea");

          // Set value (string to be copied)
          el.value = str;

          // Set non-editable to avoid focus and move outside of view
          el.setAttribute("readonly", "");
          el.style = { position: "absolute", left: "-9999px" };
          document.body.appendChild(el);

          // Select text inside element
          el.select();

          // Copy text to clipboard
          document.execCommand("copy");

          // Remove temporary element
          document.body.removeChild(el);
        }

        alert("Successfully copied");
        copyStringToClipboard(trailUrl);
      }
    );
  };

  hideSettingModal() {
    // Set chrome storage
    chrome.storage.local.set({ showSetting: false });

    // Set show setting state
    // this.setState({ showSetting: false });
  }

  disableTooltipTourButton = () => {
    if (document.URL === "https://imgur.com/") return true;
    if (document.URL.includes("https://www.reddit.com")) return true;
    if (document.URL.includes("https://twitter.com")) return true;
    if (document.URL.includes("https://docs.google.com")) return true;

    return false;
  };

  disableMediaTourButton = () => {
    if (document.URL.includes("https://twitter.com")) return true;

    return false;
  };

  render() {
    const {
      menuOpen,
      showSetting,
      followerList,
      closeContinue,
      modalSubscription,
      confirmationModal,
      followedTrailUserData,
      modalCreateNewTrailModal,
    } = this.state;

    // if (document.URL.includes("https://docs.google.com")) {
    //   const tooltipButton = document
    //     .getElementById("extension-div")
    //     .shadowRoot.querySelector(".create_tooltip_button");

    //   if (tooltipButton) {
    //     tooltipButton.style.visibility = "hidden";
    //   }
    // }

    // if (document.URL.includes("https://twitter.com")) {
    //   const videoButton = document
    //     .getElementById("extension-div")
    //     .shadowRoot.querySelector(".create_video_button");

    //   if (videoButton) {
    //     videoButton.style.visibility = "hidden";
    //   }

    //   const audioButton = document
    //     .getElementById("extension-div")
    //     .shadowRoot.querySelector(".create_audio_button");

    //   if (audioButton) {
    //     audioButton.style.visibility = "hidden";
    //   }
    // }

    return (
      <>
        <style>{main1Css}</style>
        <style>{main2Css}</style>
        <div id="my-extension-root">
          {showSetting && (
            <TrailSetting
              show={showSetting}
              hideModal={this.hideSettingModal}
            />
          )}
          {confirmationModal.show && (
            <CreateTourConfirmationModal
              data={confirmationModal}
              // textType="text"
              onModalClose={this.confirmationModalClose}
              onTourSelect={this.onTourTypeSelect}
            />
          )}

          <div className={`my-extension ${closeContinue && closeContinue}`}>
            {closeContinue && (
              <button
                className="trail_continue_btn"
                onClick={this.onContinueTour}
              >
                Continue...
              </button>
            )}
            <MySubscription
              open={modalSubscription}
              toggle={this.onToggleSubscription}
              followerList={followerList}
            />
            <CreateNewTrailModal
              open={modalCreateNewTrailModal}
              toggle={this.onToggleCreateNewTrailModal}
              followerList={followerList}
            />

            {/* <div className={`wrap open ${menuOpen ? 'createMenu': ''}`}> */}
            <div className={`wrap open ${!menuOpen ? "createMenu" : ""}`}>
              {/* Preview Button */}
              {/* <button className="blob" onClick={e => this.openMenu('preview')} data-title="Preview">
								<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
									<g id="Group_471" data-name="Group 471" transform="translate(11703 4613)">
										<circle id="Ellipse_101" data-name="Ellipse 101" cx="24" cy="24" r="24" transform="translate(-11703 -4613)" fill="#fff" />
										<g id="visibility" transform="translate(-11694 -4688.449)">
											<g id="Group_278" data-name="Group 278" transform="translate(0 90.449)">
												<g id="Group_277" data-name="Group 277" transform="translate(0)">
													<path id="Path_103" data-name="Path 103" d="M28.032,98.985c-2.049-5.106-7.668-8.536-13.983-8.536S2.116,93.879.066,98.985a.915.915,0,0,0,0,.682c2.051,5.105,7.671,8.535,13.983,8.535s11.931-3.43,13.983-8.535A.915.915,0,0,0,28.032,98.985Zm-13.983,7.387c-5.428,0-10.253-2.817-12.141-7.047,1.886-4.23,6.711-7.046,12.141-7.046S24.3,95.1,26.19,99.325C24.3,103.555,19.477,106.372,14.049,106.372Z" transform="translate(0 -90.449)" fill="#fb542b" className="svg_btn" stroke="#fff" stroke-width="0.5" />
												</g>
											</g>
											<g id="Group_280" data-name="Group 280" transform="translate(8.66 93.987)">
												<g id="Group_279" data-name="Group 279" transform="translate(0 0)">
													<path id="Path_104" data-name="Path 104" d="M156.762,152.32a5.338,5.338,0,1,0,5.338,5.338A5.344,5.344,0,0,0,156.762,152.32Zm0,8.846a3.508,3.508,0,1,1,3.508-3.508A3.512,3.512,0,0,1,156.762,161.166Z" transform="translate(-151.424 -152.32)" fill="#ffffff" className="svg_btn" stroke="#fff" stroke-width="0.5" />
												</g>
											</g>
										</g>
									</g>
								</svg>
							</button> */}
              <button
                className="blob"
                onClick={(e) => this.openMenu("preview")}
                data-title="Preview"
              >
                <svg
                  width="40"
                  height="30"
                  viewBox="0 0 40 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.4531 20.0751C23.3699 20.0751 25.7344 17.7433 25.7344 14.8668C25.7344 11.9903 23.3699 9.65845 20.4531 9.65845C17.5364 9.65845 15.1719 11.9903 15.1719 14.8668C15.1719 17.7433 17.5364 20.0751 20.4531 20.0751Z"
                    fill="white"
                  />
                  <path
                    d="M39.8757 14.4097C38.3466 10.3186 35.6921 6.78068 32.2403 4.23311C28.7885 1.68554 24.6906 0.240019 20.4531 0.0751953C16.2157 0.240019 12.1178 1.68554 8.66595 4.23311C5.21411 6.78068 2.55963 10.3186 1.03057 14.4097C0.927309 14.7051 0.927309 15.0286 1.03057 15.3241C2.55963 19.4151 5.21411 22.953 8.66595 25.5006C12.1178 28.0482 16.2157 29.4937 20.4531 29.6585C24.6906 29.4937 28.7885 28.0482 32.2403 25.5006C35.6921 22.953 38.3466 19.4151 39.8757 15.3241C39.9789 15.0286 39.9789 14.7051 39.8757 14.4097ZM20.4531 23.6074C18.7818 23.6074 17.1481 23.0948 15.7584 22.1343C14.3688 21.1739 13.2857 19.8088 12.6461 18.2117C12.0065 16.6146 11.8392 14.8572 12.1653 13.1617C12.4913 11.4662 13.2961 9.90876 14.4779 8.68637C15.6597 7.46399 17.1654 6.63153 18.8046 6.29428C20.4438 5.95702 22.1428 6.13012 23.6869 6.79167C25.231 7.45322 26.5507 8.57351 27.4792 10.0109C28.4078 11.4483 28.9034 13.1381 28.9034 14.8669C28.8999 17.1839 28.0085 19.405 26.4246 21.0434C24.8406 22.6818 22.6932 23.6038 20.4531 23.6074Z"
                    fill="white"
                  />
                </svg>
                {/* <span>Preview</span> */}
              </button>

              {/* Tooltip */}
              {/* <button class="blob" onClick={e => this.openMenu('tooltip')} data-title="Create Tool Tip">
								<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
									<g id="Group_471" data-name="Group 471" transform="translate(11703 4613)">
										<circle id="Ellipse_101" data-name="Ellipse 101" cx="24" cy="24" r="24" transform="translate(-11703 -4613)" fill="#fff" />
										<g id="drawing-tablet" transform="translate(-11693.5 -4603)">
											<path id="Path_105" data-name="Path 105" d="M293.045,393.1a.549.549,0,1,0-.549-.549A.549.549,0,0,0,293.045,393.1Zm0,0" transform="translate(-275.972 -370.488)" fill="#ffffff" className="svg_btn2" stroke="#ffffff" stroke-width="0.25" />
											<path id="Path_107" data-name="Path 107" d="M25.853,6.147H24.348l2.4-2.4a2.195,2.195,0,1,0-3.1-3.1l-5.5,5.5H3.244A2.747,2.747,0,0,0,.5,8.89V25.354A2.747,2.747,0,0,0,3.244,28.1h22.61A2.747,2.747,0,0,0,28.6,25.354V8.89a2.747,2.747,0,0,0-2.744-2.744ZM13.314,12.77a1.652,1.652,0,0,1,.4-.643l.022-.022,1.552,1.552-.022.022a1.655,1.655,0,0,1-.644.4l-1.959.653Zm-.379-1.42a2.754,2.754,0,0,0-.663,1.073l-.956,2.868-.709.662a.549.549,0,1,0,.748.8l.724-.675,2.887-.963a2.755,2.755,0,0,0,1.073-.663l3.917-3.918h4.249V23.708H7.085V10.537h6.664Zm3.126,1.53-1.552-1.552,8.357-8.357,1.552,1.552ZM24.419,1.419a1.1,1.1,0,0,1,1.552,1.552l-.776.776L23.643,2.2ZM27.5,25.354A1.648,1.648,0,0,1,25.853,27H3.244A1.648,1.648,0,0,1,1.6,25.354V8.89A1.648,1.648,0,0,1,3.244,7.244h13.8l-2.2,2.195H6.536a.549.549,0,0,0-.549.549V24.256a.549.549,0,0,0,.549.549h18.22a.549.549,0,0,0,.549-.549V9.988a.549.549,0,0,0-.549-.549h-3.7l2.2-2.195h2.6A1.648,1.648,0,0,1,27.5,8.89Zm0,0" transform="translate(0 0)" fill="#ffffff" className="svg_btn2" stroke="#ffffff" stroke-width="0.25" />
											<path id="Path_108" data-name="Path 108" d="M333.041,317.492h3.293a.549.549,0,0,0,.549-.549v-4.39a.549.549,0,1,0-1.1,0v3.841h-2.744a.549.549,0,0,0,0,1.1Zm0,0" transform="translate(-313.773 -294.882)" fill="#ffffff" className="svg_btn2" stroke="#ffffff" stroke-width="0.25" />
										</g>
									</g>
								</svg>
							</button> */}
              <button
                className="blob create_tooltip_button"
                onClick={(e) => this.openMenu("tooltip")}
                data-title="Tooltip"
                disabled={
                  this.disableTooltipTourButton() || followedTrailUserData
                }
              >
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M26 13.9998H22V9.99986C22 9.46943 21.7893 8.96073 21.4142 8.58567C21.0391 8.2106 20.5304 7.99989 20 7.99989C19.4696 7.99989 18.9609 8.2106 18.5858 8.58567C18.2107 8.96073 18 9.46943 18 9.99986V13.9998H14C13.4696 13.9998 12.9609 14.2105 12.5858 14.5856C12.2107 14.9607 12 15.4694 12 15.9998C12 16.5302 12.2107 17.0389 12.5858 17.414C12.9609 17.789 13.4696 17.9997 14 17.9997H18V21.9997C18 22.5301 18.2107 23.0388 18.5858 23.4139C18.9609 23.789 19.4696 23.9997 20 23.9997C20.5304 23.9997 21.0391 23.789 21.4142 23.4139C21.7893 23.0388 22 22.5301 22 21.9997V17.9997H26C26.5304 17.9997 27.0391 17.789 27.4142 17.414C27.7893 17.0389 28 16.5302 28 15.9998C28 15.4694 27.7893 14.9607 27.4142 14.5856C27.0391 14.2105 26.5304 13.9998 26 13.9998ZM34 0H6C4.4087 0 2.88258 0.632132 1.75736 1.75733C0.632141 2.88254 0 4.40864 0 5.99992V25.9996C0 27.5909 0.632141 29.117 1.75736 30.2422C2.88258 31.3674 4.4087 31.9996 6 31.9996H29.18L36.58 39.4194C36.7669 39.6048 36.9885 39.7515 37.2322 39.851C37.4759 39.9505 37.7368 40.001 38 39.9994C38.2624 40.0062 38.5226 39.9514 38.76 39.8394C39.1252 39.6894 39.4379 39.4346 39.6586 39.1072C39.8792 38.7797 39.998 38.3943 40 37.9995V5.99992C40 4.40864 39.3679 2.88254 38.2426 1.75733C37.1174 0.632132 35.5913 0 34 0ZM36 33.1795L31.42 28.5796C31.2331 28.3942 31.0115 28.2476 30.7678 28.1481C30.5241 28.0485 30.2632 27.9981 30 27.9996H6C5.46957 27.9996 4.96086 27.7889 4.58579 27.4138C4.21071 27.0388 4 26.5301 4 25.9996V5.99992C4 5.46949 4.21071 4.96079 4.58579 4.58572C4.96086 4.21066 5.46957 3.99994 6 3.99994H34C34.5304 3.99994 35.0391 4.21066 35.4142 4.58572C35.7893 4.96079 36 5.46949 36 5.99992V33.1795Z"
                    fill="white"
                  />
                </svg>
                {/* <span>ToolTip</span> */}
              </button>

              {/* Create Modal */}
              {/* <button class="blob" onClick={e => this.openMenu('modal')} data-title="Create Modal">
								<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
									<g id="Group_471" data-name="Group 471" transform="translate(11703 4613)">
										<circle id="Ellipse_101" data-name="Ellipse 101" cx="24" cy="24" r="24" transform="translate(-11703 -4613)" fill="#fff"/>
										<g id="interface" transform="translate(-11693 -4602)">
										<path className="svg_btn" id="Path_1" data-name="Path 1" d="M0,6.186V25.2H27.657V1H0ZM24.2,2.729h1.729V4.457H24.2ZM1.729,6.186h24.2V23.471H1.729Z" fill="#ffffff"/>
										<path className="svg_btn" id="Path_2" data-name="Path 2" d="M3,6H6.457V7.729H3Z" transform="translate(2.186 3.643)" fill="#ffffff"/>
										<path className="svg_btn" id="Path_3" data-name="Path 3" d="M6,6H18.1V7.729H6Z" transform="translate(4.371 3.643)" fill="#ffffff"/>
										<path className="svg_btn" id="Path_4" data-name="Path 4" d="M3,8H6.457V9.729H3Z" transform="translate(2.186 5.1)" fill="#ffffff"/>
										<path className="svg_btn" id="Path_5" data-name="Path 5" d="M6,8H18.1V9.729H6Z" transform="translate(4.371 5.1)" fill="#ffffff"/>
										<path className="svg_btn" id="Path_6" data-name="Path 6" d="M3,10H6.457v1.729H3Z" transform="translate(2.186 6.557)" fill="#ffffff"/>
										<path className="svg_btn" id="Path_7" data-name="Path 7" d="M6,10H18.1v1.729H6Z" transform="translate(4.371 6.557)" fill="#ffffff"/>
										</g>
									</g>
								</svg>
							</button> */}
              {/* {!document.URL.includes("https://twitter.com") && ( */}
              <button
                className="blob create_video_button"
                onClick={(e) => this.onMediaTourSelect("video")}
                data-title="Video"
                disabled={
                  this.disableMediaTourButton() || followedTrailUserData
                }
              >
                <svg
                  width="41"
                  height="29"
                  viewBox="0 0 41 29"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.8779 6.55304H14.8779V12.553H8.87793V16.553H14.8779V22.553H18.8779V16.553H24.8779V12.553H18.8779V6.55304Z"
                    fill="white"
                  />
                  <path
                    d="M32.8789 4.55298C32.8789 2.34698 31.0849 0.552979 28.8789 0.552979H4.87891C2.67291 0.552979 0.878906 2.34698 0.878906 4.55298V24.553C0.878906 26.759 2.67291 28.553 4.87891 28.553H28.8789C31.0849 28.553 32.8789 26.759 32.8789 24.553V17.887L40.8789 24.553V4.55298L32.8789 11.219V4.55298ZM28.8809 24.553H4.87891V4.55298H28.8789V14.553L28.8809 24.553Z"
                    fill="white"
                  />
                </svg>
                {/* <span>Video</span> */}
              </button>
              {/* )} */}

              <button className="menu" onClick={(e) => this.openMenu("")}>
                <img
                  alt="tour_menu"
                  className="trail_plus trail_edit_v2"
                  src={require(`./images/trailit_X_button_new.png`)}
                />
              </button>
              {/* {!document.URL.includes("https://twitter.com") && ( */}
              <React.Fragment>
                {/* Create Video */}
                {/* <button className="blob" onClick={(e) => this.openMenu('video')} data-title="Create Video">
											<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
												<g id="Group_472" data-name="Group 472" transform="translate(-1820 -597)">
													<circle id="Ellipse_101" data-name="Ellipse 70" cx="24" cy="24" r="24" transform="translate(1820 597)" fill="#fff" />
													<g id="video-camera-side-view-outlined-tool-symbol" transform="translate(1832 502.041)">
														<g id="Group_281" data-name="Group 281" transform="translate(0 111.272)">
															<path id="Path_109" data-name="Path 109" d="M15.317,126.681a2.156,2.156,0,0,0,2.2-2.2V113.473a2.156,2.156,0,0,0-2.2-2.2H2.2a2.156,2.156,0,0,0-2.2,2.2V124.48a2.156,2.156,0,0,0,2.2,2.2ZM1.1,124.459V113.493a1.092,1.092,0,0,1,1.113-1.12H15.431a1.092,1.092,0,0,1,1.113,1.12v10.966a1.093,1.093,0,0,1-1.113,1.122H2.213A1.093,1.093,0,0,1,1.1,124.459Z" transform="translate(0 -111.272)" fill="#ffffff" className="svg_btn2" stroke="#ffffff" stroke-width="0.2" />
															<path id="Path_110" data-name="Path 110" d="M475.162,121.072v1.348l5.414,4.261V111.272l-5.414,4.3v1.379l4.313-3.236v10.592Z" transform="translate(-456.362 -111.272)" fill="#ffffff" className="svg_btn2" stroke="#ffffff" stroke-width="0.2" />
														</g>
													</g>
												</g>
											</svg>
										</button> */}
                <button
                  className="blob create_audio_button"
                  onClick={(e) => this.onMediaTourSelect("audio")}
                  data-title="Audio"
                  disabled={
                    this.disableMediaTourButton() || followedTrailUserData
                  }
                >
                  <svg
                    className="audio_svg"
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                  >
                    <g
                      id="Group_471"
                      data-name="Group 471"
                      transform="translate(11717 4613)"
                    >
                      <circle
                        id="Ellipse_101"
                        data-name="Ellipse 101"
                        cx="24"
                        cy="24"
                        r="24"
                        transform="translate(-11717 -4613)"
                        fill="#fff"
                      />
                      <g
                        id="audio-interface-speaker-symbol"
                        transform="translate(-11707 -4671.857)"
                      >
                        <g
                          id="Group_282"
                          data-name="Group 282"
                          transform="translate(0 72.857)"
                        >
                          <path
                            stroke-width="0"
                            id="Path_111"
                            data-name="Path 111"
                            d="M3.9,86.838l9.831,5.992V72.857L3.9,78.849H1.3A1.3,1.3,0,0,0,0,80.181v5.327A1.3,1.3,0,0,0,1.3,86.84H3.9ZM1.248,80.1H3.9l8.586-4.746v14.98L3.9,85.486H1.248Z"
                            transform="translate(0 -72.857)"
                            fill="#ffffff"
                            className="svg_btn"
                          />
                          <path
                            stroke-width="0"
                            id="Path_112"
                            data-name="Path 112"
                            d="M349.714,171.382v1.387a7.074,7.074,0,0,0,0-12.483v1.387s2.5,1.059,2.5,4.855S349.714,171.382,349.714,171.382Z"
                            transform="translate(-334.734 -156.541)"
                            fill="#ffffff"
                            className="svg_btn"
                          />
                          <path
                            stroke-width="0"
                            id="Path_113"
                            data-name="Path 113"
                            d="M524.571,117.829v1.648s3.745-1.8,3.745-8.738S524.571,102,524.571,102v1.62s2.5,1.378,2.5,7.118S524.571,117.829,524.571,117.829Z"
                            transform="translate(-502.101 -100.752)"
                            className="svg_btn"
                            fill="#ffffff"
                          />
                          <path
                            stroke-width="0"
                            id="Path_114"
                            data-name="Path 114"
                            d="M437.143,144.543v1.58s3.745-2.06,3.745-7.49-3.745-7.49-3.745-7.49v1.528s2.5,1.624,2.5,5.962S437.143,144.543,437.143,144.543Z"
                            transform="translate(-418.418 -128.647)"
                            className="svg_btn"
                            fill="#ffffff"
                          />
                        </g>
                      </g>
                    </g>
                  </svg>
                  {/* <span>Create Audio</span> */}
                </button>
              </React.Fragment>
              {/* )} */}
              {resizeScreen() && (
                <button
                  className="blob"
                  data-title="Make Edit"
                  onClick={(e) => this.openMenu("Make Edit")}
                  disabled={followedTrailUserData}
                >
                  <svg
                    className="edit_trail_svg"
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                  >
                    <g
                      id="Group_471"
                      data-name="Group 471"
                      transform="translate(11697 4613)"
                    >
                      <circle
                        id="Ellipse_101"
                        data-name="Ellipse 101"
                        cx="24"
                        cy="24"
                        r="24"
                        transform="translate(-11697 -4613)"
                        fill="#fff"
                      />
                      <g id="signs" transform="translate(-11683 -4599)">
                        <path
                          id="Path_1"
                          className="svg_btn2"
                          data-name="Path 1"
                          d="M10.143,20.286A10.143,10.143,0,1,1,20.286,10.143,10.154,10.154,0,0,1,10.143,20.286Zm0-19.018a8.875,8.875,0,1,0,8.875,8.875A8.885,8.885,0,0,0,10.143,1.268Zm0,0"
                          fill="#ffffff"
                        />
                        <path
                          id="Path_2"
                          className="svg_btn2"
                          data-name="Path 2"
                          d="M137.509,241.268h-8.875a.634.634,0,0,1,0-1.268h8.875a.634.634,0,1,1,0,1.268Zm0,0"
                          transform="translate(-122.929 -230.491)"
                          fill="#ffffff"
                        />
                        <path
                          id="Path_3"
                          className="svg_btn2"
                          data-name="Path 3"
                          d="M240.634,138.143a.634.634,0,0,1-.634-.634v-8.875a.634.634,0,1,1,1.268,0v8.875A.634.634,0,0,1,240.634,138.143Zm0,0"
                          transform="translate(-230.491 -122.929)"
                          fill="#ffffff"
                        />
                      </g>
                    </g>
                  </svg>
                </button>
              )}

              {/* Edit Trail */}
              {/* <button className="blob" onClick={e => this.openMenu('Make Edit')} data-title="Edit Trail">
								<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
									<g id="Group_471" data-name="Group 471" transform="translate(11697 4613)">
										<circle id="Ellipse_101" data-name="Ellipse 101" cx="24" cy="24" r="24" transform="translate(-11697 -4613)" fill="#fff"/>
										<g id="signs" transform="translate(-11683 -4599)">
										<path id="Path_1" className="svg_btn2" data-name="Path 1" d="M10.143,20.286A10.143,10.143,0,1,1,20.286,10.143,10.154,10.154,0,0,1,10.143,20.286Zm0-19.018a8.875,8.875,0,1,0,8.875,8.875A8.885,8.885,0,0,0,10.143,1.268Zm0,0" fill="#ffffff"/>
										<path id="Path_2" className="svg_btn2" data-name="Path 2" d="M137.509,241.268h-8.875a.634.634,0,0,1,0-1.268h8.875a.634.634,0,1,1,0,1.268Zm0,0" transform="translate(-122.929 -230.491)" fill="#ffffff"/>
										<path id="Path_3" className="svg_btn2" data-name="Path 3" d="M240.634,138.143a.634.634,0,0,1-.634-.634v-8.875a.634.634,0,1,1,1.268,0v8.875A.634.634,0,0,1,240.634,138.143Zm0,0" transform="translate(-230.491 -122.929)" fill="#ffffff"/>
										</g>
									</g>
								</svg>
							</button> */}
              <button
                className="blob"
                data-title="Edit"
                onClick={(e) => this.openMenu("Make Edit")}
                disabled={followedTrailUserData}
              >
                <svg
                  width="40"
                  height="29"
                  viewBox="0 0 40 29"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 0V4.12698H24.1631V0H0ZM0 8.25397V12.381H24.1631V8.25397H0ZM36.3252 8.52222C36.0433 8.52222 35.7614 8.64603 35.5399 8.87302L33.5263 10.9365L37.6542 15.1667L39.6678 13.1032C40.1107 12.6698 40.1107 11.9476 39.6678 11.5143L37.0904 8.87302C36.9923 8.76493 36.874 8.67817 36.7426 8.6179C36.6111 8.55763 36.4692 8.52509 36.3252 8.52222ZM32.3584 12.1333L20.1359 24.6381V28.8889H24.2839L36.4863 16.3635L32.3584 12.1333ZM0 16.5079V20.6349H16.1087V16.5079H0Z"
                    fill="white"
                  />
                </svg>
              </button>

              {/* Share Trail Button */}
              {/* <button className="blob" onClick={this.copyWebApplink} data-title="Share Trail">
								<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
									<g id="Group_471" data-name="Group 471" transform="translate(11697 4613)">
										<circle id="Ellipse_101" data-name="Ellipse 101" cx="24" cy="24" r="24" transform="translate(-11697 -4613)" fill="#fff"/>
										<g id="signs" transform="translate(-11683 -4599)">
										<path id="Path_1" className="svg_btn2" data-name="Path 1" d="M10.143,20.286A10.143,10.143,0,1,1,20.286,10.143,10.154,10.154,0,0,1,10.143,20.286Zm0-19.018a8.875,8.875,0,1,0,8.875,8.875A8.885,8.885,0,0,0,10.143,1.268Zm0,0" fill="#ffffff"/>
										<path id="Path_2" className="svg_btn2" data-name="Path 2" d="M137.509,241.268h-8.875a.634.634,0,0,1,0-1.268h8.875a.634.634,0,1,1,0,1.268Zm0,0" transform="translate(-122.929 -230.491)" fill="#ffffff"/>
										<path id="Path_3" className="svg_btn2" data-name="Path 3" d="M240.634,138.143a.634.634,0,0,1-.634-.634v-8.875a.634.634,0,1,1,1.268,0v8.875A.634.634,0,0,1,240.634,138.143Zm0,0" transform="translate(-230.491 -122.929)" fill="#ffffff"/>
										</g>
									</g>
								</svg>
							</button> */}
              <button
                className="blob"
                onClick={this.copyWebApplink}
                data-title="Share"
              >
                <svg
                  width="40"
                  height="36"
                  viewBox="0 0 40 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.75 0C1.7 0 0 1.70201 0 3.75443V31.2869C0 33.3393 1.7 35.0413 3.75 35.0413H26.25C28.3 35.0413 30 33.3393 30 31.2869V25.0295H25V30.0354H5V5.0059H15V0H3.75ZM30 0V5.0059C19.75 5.0059 11.5 12.715 10.3 22.6767C11.35 18.2715 15.25 15.0177 20 15.0177H30V20.0236L40 10.0118L30 0Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

let popoverCount = 0;

// function getBase64(img, callback) {
// 	const reader = new FileReader();
// 	reader.addEventListener('load', () => callback(reader.result));
// 	reader.readAsDataURL(img);
// }

// function beforeUpload(file) {
// 	const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
// 	if (!isJpgOrPng) {
// 		message.error('You can only upload JPG/PNG file!');
// 	}
// 	const isLt2M = file.size / 1024 / 1024 < 2;
// 	if (!isLt2M) {
// 		message.error('Image must smaller than 2MB!');
// 	}
// 	return isJpgOrPng && isLt2M;
// }

let defaultComp;
let flipped;
let tourUrl;

class DefaultButton extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      trailList: [],
      tourStatus: "continue",
      tourType: "",
      tourStep: "",
      stepType: "",
      currentTourType: "",
      web_url: "",
      tourSide: "next",
      message: "",
      overlay: false,
      loading: false,
      fileLoading: false,
      fileAddStatus: false,
      title: "",
      currUserId: null,
      follow: false,
      publishButtonShow: false,
      publishLoader: false,
      count: 0,
      saveSort: false,
      fileName: "",
      createModalOpen: false,
      hideNav: false,
      rowData: {},
      MobileTargetNotFound: {},
      deleteModal: {
        show: false,
        title: null,
        id: null,
      },
      sendTipModal: false,
      isLoading: false,
      sendLoader: false,
      isSuccess: false,
      onDone: false,
      setError: null,
      isDraggable: false,
      draggable: true,
      dragPosition: { x: 0, y: 0 },
      dynamicPopupButton: true,
      trailName: "",
      openSidebar: false,
      currentTrailsTab: "My Trails",
      previewModalRef: false,
      audioRef: false,
      videoRef: false,
      tooltipRef: false,
    };

    this.previewModalRef = React.createRef();

    this.onDeleteButtonClick = this.onDeleteButtonClick.bind(this);
  }

  // Hide send tip modal
  onSendTipModalClose = () => {
    // Hide send tip modal
    this.setState({
      sendTipModal: false,
      sendLoader: false,
      isLoading: false,
    });
  };

  // Show send tip modal
  onSendTipModalOpen = () => {
    // Show send tip modal
    this.setState({ sendTipModal: true });
  };

  // Hide delete modal
  onDeleteModalClose = () => {
    // Delete modal state to false
    this.setState({
      deleteModal: {
        show: false,
        title: null,
        id: null,
      },
    });
  };

  // Show delete modal
  onDeleteModalOpen = (title, id) => {
    // Delete modal state to true
    this.setState({
      deleteModal: {
        show: true,
        title,
        id,
      },
    });
  };

  // On delete button click
  async onDeleteButtonClick(e) {
    try {
      const { id } = this.state.deleteModal;

      // Delete trail by id
      const { data } = await deleteTrail(id);

      if (data.response && data.response.statusCode === "200") {
        chrome.storage.local.get(
          [
            "userData",
            "trail_id",
            "trail_web_user_tour",
            "noStepsToWatch",
            "isPreview",
          ],
          async (items) => {
            // console.log("line 1873");

            // Call common get user data function
            await this.getCurrUserDataCommon(items);
          }
        );
      }

      // Call on delete modal close to hide modal
      this.onDeleteModalClose();
    } catch (err) {}
  }

  async getSingleTrail(data) {
    let res;
    try {
      res = await getSingleTrailData(data.trail_id, data.trail_data_id);
    } catch (err) {}

    if (
      res.data &&
      res.data.response &&
      res.data.response.statusCode === "200"
    ) {
      let response = { ...res.data.response.result };
      let payload = {
        userId: data.userData.user_id,
        trail_data_id: response.trail_data_id,
        url: response.url,
        path: response.path,
        selector: response.selector,
        class: response.class,
        title: response.title,
        description: response.description,
        web_url: response.web_url,
        trail_id: response.trail_id,
        type: response.type,
        uniqueTarget: response.unique_target,
        unique_target_one: response.unique_target_one,
        mobile_media_type: response.mobile_media_type,
        mobile_title: response.mobile_title,
        mobile_description: response.mobile_description,
        mediaType: response.media_type,
        created: response.created,
        sortId: response.trail_sortId ? response.trail_sortId : "",
        flag: response.flag,
      };

      chrome.storage.local.get(
        ["trail_id", "userData", "tourStep", "isPreviewSingleTrail"],
        (storage) => {
          if (data.loggedInData) {
            chrome.storage.local.set({
              trail_web_user_tour: [payload],
              tourStep: storage.tourStep ? storage.tourStep : "",
              trail_id: data.trail_id,
              old_trail_id: storage.trail_id,
              old_user_data: { ...storage.userData },
              isPreviewSingleTrail: false,
              trail_data_id: data.trail_data_id,
              webUrl: "",
              userData: { ...data.loggedInData },
              authorData: { ...data.userData },
            });
          } else {
            chrome.storage.local.set({
              tourStep: data.tourStep ? data.tourStep : "",
              trail_id: data.trail_id,
            });
          }
        }
      );

      return payload;
    }
  }

  async getCurrUserDataCommon(items) {
    const user_id = items.userData._id;
    let res,
      continueFlag = false,
      trail_id = items.trail_id;

    try {
      // Get user's trails from database
      let screen = resizeScreen() ? "mobile" : "web";

      res = await getUserOneTrail(trail_id, screen);

      trailWebUserTour = items.trail_web_user_tour;
    } catch (err) {
      console.log("err", err);
    }

    // if (items.trail_web_user_tour && items.trail_web_user_tour.length > 0) {
    // 	items.trail_web_user_tour.forEach(el => {
    // 		if (!el.trail_id) {
    // 			allTrails.push(el);
    // 		}
    // 	});
    // }
    const handleSteps = (result) => {
      if (get(["response", "result", "steps"], result)) {
        return result.response.result.steps;
      } else {
        return result.response.result || [];
      }
    };

    const result = res.data;

    if (
      result.response &&
      result.response.statusCode !== 404 &&
      handleSteps(result).length > 0
    ) {
      allTrails = handleSteps(result).map((el) => {
        if (el.flag === "continue") {
          continueFlag = true;
        }

        return {
          userId: user_id,
          trail_data_id: el.trail_data_id,
          url: el.url,
          path: el.path,
          selector: el.selector,
          class: el.class,
          title: el.title,
          description: el.description,
          web_url: el.web_url,
          trail_id: el.trail_id,
          type: el.type,
          uniqueTarget: el.unique_target,
          unique_target_one: el.unique_target_one,
          mobile_media_type: el.mobile_media_type,
          mobile_title: el.mobile_title,
          mobile_description: el.mobile_description,
          mediaType: el.media_type,
          created: el.created,
          sortId: el.trail_sortId ? el.trail_sortId : "",
          flag: el.flag,
        };
      });
    } else {
      trailWebUserTour = [];
      allTrails = [];
    }

    // if (allTrails.length > 0) {
    // 	allTrails.sort((a, b) => {
    // 		if (a.sortId !== '') {
    // 			return (+a.sortId) - (+b.sortId);
    // 		} else {
    // 			return (+a.created) - (+b.created);
    // 		}
    // 	});
    // }

    trailWebUserTour = allTrails;
    obj.trailList = allTrails;

    this.setState({ trail_web_user_tour: trailWebUserTour });

    chrome.storage.local.get(
      ["trail_id", "userData", "tourStep", "isPreview"],
      (storage) => {
        if (items.loggedInData) {
          chrome.storage.local.set({
            trail_web_user_tour: allTrails,
            tourStep: storage.tourStep ? storage.tourStep : "",
            trail_id,
            old_trail_id: storage.trail_id,
            isPreview: false,
            isGuest: false,
            continueTourStepId: "",
            old_user_data: { ...storage.userData },
            webUrl: "",
            userData: { ...items.loggedInData },
            authorData: { ...items.userData },
            noStepsToWatch: items.noStepsToWatch,
          });
        } else {
          chrome.storage.local.set({
            trail_web_user_tour: allTrails,
            tourStep: items.tourStep ? items.tourStep : "",
            trail_id,
            closeContinue: continueFlag,
          });
        }
      }
    );
  }

  async handlePreviewFromWeb(msg) {
    if (msg.message === "preview_all") {
      // Call common get user data function
      await this.getCurrUserDataCommon({
        userData: msg.payload.userData,
        trail_id: msg.payload.trail_id,
        trail_web_user_tour: [],
        loggedInData: msg.payload.loggedInData,
      });
      chrome.storage.local.get(["trail_id"], (items) => {
        chrome.storage.local.set({
          isPreview: true,
          closeContinue: false,
          webUrl: msg.payload.url,
          old_trail_id: items.trail_id,
        });
      });
    } else if (msg.message === "continue_preview") {
      // Call common get user data function
      await this.getCurrUserDataCommon({
        userData: msg.payload.userData,
        trail_id: msg.payload.trail_id,
        trail_web_user_tour: [],
        loggedInData: msg.payload.loggedInData,
      });
      chrome.storage.local.get(["trail_id"], (items) => {
        chrome.storage.local.set({
          isPreview: true,
          closeContinue: false,
          continueTourStepId: msg.payload.tourStep,
          webUrl: msg.payload.url,
          old_trail_id: items.trail_id,
        });
      });
    } else if (msg.message === "preview_single") {
      await this.getSingleTrail({
        userData: msg.payload.userData,
        trail_id: msg.payload.trail_id,
        trail_data_id: msg.payload.trail_data_id,
        loggedInData: msg.payload.loggedInData,
      });
      chrome.storage.local.get(["trail_id", "userData"], (items) => {
        chrome.storage.local.set({
          isPreviewSingleTrail: true,
          isPreview: false,
          webUrl: msg.payload.url,
          old_trail_id: items.trail_id,
        });
      });
    } else if (msg.message === "preview_without_login") {
      await this.getCurrUserDataCommon({
        userData: msg.payload.userData,
        trail_id: msg.payload.trail_id,
        trail_web_user_tour: [],
        loggedInData: msg.payload.loggedInData,
        noStepsToWatch: msg.payload.noStepsToWatch,
        isPreview: true,
      });
      chrome.storage.local.get(["trail_id"], (items) => {
        chrome.storage.local.set({
          isPreview: true,
          closeContinue: false,
          webUrl: msg.payload.url,
          old_trail_id: items.trail_id,
          isGuest: true,
        });
      });
    }
  }

  cleanupStorage = () => {
    const { currentTourType, tourType, stepType } = this.state;

    if (
      currentTourType === "preview" &&
      (tourType === "audio" ||
        tourType === "video" ||
        tourType === "Make Edit" ||
        tourType === "tooltip")
    ) {
      chrome.storage.local.set({ tourType: "", currentTourType: "" });
    }

    if (
      currentTourType === "preview" &&
      tourType === "modal" &&
      (stepType === "audio" || stepType === "video")
    ) {
      chrome.storage.local.set({
        tourType: "",
        currentTourType: "",
        stepType: "",
      });
    }

    // Remove beforeunload event listener
    window.removeEventListener("beforeunload", this.cleanupStorage);
  };

  componentDidMount() {
    // window.onload=function(){
    // 	setTimeout(function(){
    // 		scrollTo(0,-1);
    // 	},0);
    // }

    const { currentTourType, tourType } = this.state;

    chrome.runtime.onMessage.addListener(this.handlePreviewFromWeb.bind(this));

    window.addEventListener("resize", this.resize);
    this.resize();

    this.setState({ overlay: true });
    this.onChromeStorageChange();
    this.onCreateTooltipHandle();

    window.addEventListener(
      "load",
      () => {
        this.setState({ overlay: false });
        this.onCreateTooltipHandle();
      },
      false
    );

    chrome.runtime.onMessage.addListener(this.handleMessage.bind(this));
    chrome.storage.onChanged.addListener(async (changes) => {
      console.log("changes2", changes);
      if (changes.currentTrailsTab && changes.currentTrailsTab.newValue) {
        // Set current trail tab state
        this.setState({ currentTrailsTab: changes.currentTrailsTab.newValue });
      }

      //
      //
      if (changes.tourType && changes.tourType.newValue === "") {
        // Set side bar state
        this.setState({ openSidebar: false, open: false });
      }

      if (
        changes.tourType &&
        (changes.tourType.newValue === "video" ||
          changes.tourType.newValue === "audio" ||
          changes.tourType.newValue === "Make Edit")
      ) {
        //
        // Set side bar state
        this.setState({ openSidebar: true, open: true });
      }

      if (changes.trail_name) {
        // Set state
        this.setState({ trailName: changes.trail_name.newValue });
      }

      if (changes.isDraggable) {
        // Set is draggable state
        this.setState({ isDraggable: changes.isDraggable.newValue });
      }

      if (
        (changes.tourType && changes.tourType.newValue === "preview") ||
        (changes.currentTourType &&
          changes.currentTourType.newValue === "preview") ||
        (changes.tourStep && changes.tourStep.newValue === 1)
      ) {
        this.onChromeStorageChange();
        this.setState({ overlay: false });
      } else if (
        changes.trail_web_user_tour &&
        changes.trail_web_user_tour.newValue &&
        changes.trail_web_user_tour.oldValue &&
        (changes.trail_web_user_tour.newValue.length > 0 ||
          changes.trail_web_user_tour.newValue.length !==
            changes.trail_web_user_tour.oldValue.length)
      ) {
        this.onChromeStorageChange();
        this.setState({ overlay: false });
      }
      //  else if (
      // 	changes.trail_web_user_tour &&
      // 	changes.trail_web_user_tour.newValue.length !== changes.trail_web_user_tour.oldValue.length
      // ) {
      // 	this.onChromeStorageChange();
      // 	this.setState({ overlay: false });
      // }

      if (changes.openButton && changes.openButton.newValue === "CreateTrail") {
        this.onChromeStorageChange();
      }

      // if (
      //   changes.currentTourType &&
      //   changes.currentTourType.newValue === "preview" &&
      //   changes.tourType &&
      //   (changes.tourType.newValue === "audio" ||
      //     changes.tourType.newValue === "video")
      // ) {
      //   if (changes.tourType && changes.tourType.newValue === "tooltip") {
      //     this.setState({ open: false });
      //   } else {
      //     this.setState({ open: true });
      //   }
      // }

      // // For my extenstion root div draggable functionality
      // if (
      //   changes.tourType &&
      //   changes.tourType.newValue === "Make Edit" &&
      //   changes.currentTourType &&
      //   changes.currentTourType.newValue === "preview"
      // ) {
      //
      //   // Set draggable state
      //   this.setState({ isDraggable: false });
      // } else {
      //   chrome.storage.local.get(["isDraggable"], (items) => {
      //     if (items.isDraggable !== undefined && items.isDraggable !== null) {
      //
      //       // Set draggable state
      //       this.setState({ isDraggable: items.isDraggable });
      //     }
      //   });
      // }

      // if (
      //   changes.tourType &&
      //   (changes.tourType.newValue === "Make Edit" ||
      //     changes.tourType.newValue === "preview") &&
      //   changes.currentTourType &&
      //   (changes.currentTourType.newValue === "preview" ||
      //     changes.currentTourType.newValue === "video" ||
      //     changes.currentTourType.newValue === "audio")
      // ) {
      //
      //   // Set draggable state
      //   this.setState({ isDraggable: false, dragPosition: { x: 0, y: 0 } });
      // } else {
      //   chrome.storage.local.get(["isDraggable"], (items) => {
      //     if (items.isDraggable !== undefined && items.isDraggable !== null) {
      //
      //       // Set draggable state
      //       this.setState({
      //         isDraggable: items.isDraggable,
      //         dragPosition: { x: 0, y: 0 },
      //       });
      //     }
      //   });
      // }

      // if (changes.tourStep && changes.tourStep.newValue && changes.tourStep.newValue > 0) {
      // 	// this.setLoadingState(false);

      // 	// Add trailit logo when trail menu open
      // 	this.addTrailitLogo();

      // } else {
      // 	if (changes.currentTourType && changes.currentTourType.newValue === '') {
      // 		// Remove trailit logo function
      // 		this.removeTrailitLogo();
      // 	}
      // }

      if (
        changes.tourType &&
        (changes.tourType.newValue === "tooltip" ||
          changes.tourType.newValue === "audio" ||
          changes.tourType.newValue === "video" ||
          changes.tourType.newValue === "modal") &&
        changes.currentTourType &&
        changes.currentTourType.newValue === "preview"
      ) {
        // this.setLoadingState(false);

        // Add trailit logo when trail menu open
        addTrailitLogo();
      } else {
        if (
          changes.currentTourType &&
          changes.currentTourType.newValue === ""
        ) {
          // Remove trailit logo function
          removeTrailitLogo();
        }
      }

      //

      // if (
      //   changes.tourType &&
      //   (changes.tourType.newValue === "audio" ||
      //     changes.tourType.newValue === "video" ||
      //     changes.tourType.newValue === "Make Edit")
      // ) {
      //   const sidepopup = document
      //     .getElementById("extension-div")
      //     .shadowRoot.querySelector(".sidepopup");
      //
      //   if (sidepopup) {
      //     // Add white background
      //     sidepopup.style.background = "#ffffff";
      //   }
      // } else {
      //   const sidepopup = document
      //     .getElementById("extension-div")
      //     .shadowRoot.querySelector(".sidepopup");
      //   if (sidepopup) {
      //     // Add white background
      //     sidepopup.style.background = "transparent";
      //   }
      // }
    });

    chrome.storage.local.get(
      ["isPreview", "isPreviewSingleTrail", "isDraggable"],
      (items) => {
        if (items.isPreview || items.isPreviewSingleTrail) {
          this.setState({ dynamicPopupButton: false });
        }

        if (items.isDraggable !== undefined && items.isDraggable !== null) {
          // Set draggable state
          this.setState({
            isDraggable: items.isDraggable,
          });
        }
      }
    );

    // Cleanup function
    window.addEventListener("beforeunload", this.cleanupStorage);
  }

  handleMessage(msg) {
    // Handle received messages
    // if (msg.target === 'app') {
    //  if (msg.type === 'setMessage') {
    if (msg.message === "chrome_modal") {
      this.onToggleCreateModal(true);
    }
    this.setState({ message: msg.body });
    //  }
    // }
  }

  componentWillUnmount() {
    // Remove listener when this component unmounts
    window.removeEventListener("resize", this.resize);
    chrome.runtime.onMessage.removeListener(this.handleMessage);
  }

  // Copy Web app link
  copyWebApplink = (e) => {
    const { trailList, currUserId } = this.state;

    if (trailList.length == 0) {
      alert("Please create trail");
      return null;
    }

    const trailId = trailList[trailList.length - 1].trail_id;
    const URL = trailList[0].url;
    let qryString = URL.split("?").length > 1 ? "&" : "?";
    const trailUrl = `http://go.trialit.co/live/${URL}${qryString}trailUserId=${currUserId}&trailId=${trailId}&trailPreview=true&tourStep=1`;

    function copyStringToClipboard(str) {
      // Create new element
      var el = document.createElement("textarea");

      // Set value (string to be copied)
      el.value = str;

      // Set non-editable to avoid focus and move outside of view
      el.setAttribute("readonly", "");
      el.style = { position: "absolute", left: "-9999px" };
      document.body.appendChild(el);

      // Select text inside element
      el.select();

      // Copy text to clipboard
      document.execCommand("copy");

      // Remove temporary element
      document.body.removeChild(el);
    }

    alert("Successfully copied");
    copyStringToClipboard(trailUrl);
  };

  followTrail = (e) => {
    e.preventDefault();
    const previewUserId = this.state.trailList[this.state.tourStep - 1].userId;

    const followData = {
      follower_id: this.state.currUserId,
      previewUserId,
    };

    followTrails(followData)
      .then((res) => {
        if (res.data.response && res.data.response.statusCode !== "201") {
          throw new Error("Error while following trail!");
        }

        // Set followData into chrome storage
        chrome.storage.local.set({
          followData: { previewUserId, follow: true },
        });
        this.setState({ follow: true });
      })
      .catch((err) => {});
  };

  onCreateTooltipHandle = () => {
    // to handle border add on mousover event
    // document.querySelector('.a4bIc .gLFyf.gsfi').style.background = 'green';
    document.querySelector("body").addEventListener("mouseover", (e) => {
      chrome.storage.local.get(
        [
          "tourStatus",
          "tourType",
          "tourStep",
          "currentTourType",
          "closeContinue",
        ],
        function (items) {
          //
          if (
            items.tourType !== undefined &&
            this.state.tourType !== items.tourType
          ) {
            if (items.tourType === "preview") {
              if (this.state.trailList.length > 0) {
                let tourStape = items.tourStep === "" ? 1 : items.tourStep;
                this.setState({
                  tourStep: tourStape,
                  tourType: items.tourType,
                  currentTourType: this.state.trailList[tourStape - 1].type,
                });
              } else {
                this.setState({ tourType: items.tourType });
              }
            }
            //  else {
            //   if (items.tourType === "tooltip") {
            //     this.setState({
            //       tourType: items.tourType,
            //       open: false,
            //       openSidebar: false,
            //     });
            //   } else if (items.tourType === "Make Edit") {
            //
            //     this.setState({
            //       tourType: items.tourType,
            //       // open: true,
            //       // openSidebar: true,
            //     });
            //   } else {
            //     this.setState({ tourType: items.tourType });
            //   }
            // }
          }
        }.bind(this)
      );

      const trailOverlay = document
        .getElementById("extension-div")
        .shadowRoot.querySelector(".trail_overlay");
      if (!trailOverlay) {
        if (
          this.state.tourStatus === "continue" &&
          (this.state.tourType === "tooltip" ||
            (this.state.tourType === "Make Edit" &&
              !_.isEmpty(this.state.rowData)))
        ) {
          // let parentElement = queryParentElement(e.target, '.sidepanal');
          let parentElement = queryParentElement(e.target, "#extension-div");
          let parentElement1 = queryParentElement(e.target, ".trail_tooltip");
          let getClass =
            parentElement == null ? "" : parentElement.getAttribute("class");
          let getClass1 =
            parentElement1 == null ? "" : parentElement1.getAttribute("class");

          if (root1 === "block" && getClass === "" && getClass1 === "") {
            e.target.classList.add("trail_select_bx");
          }
        }
      }
    });

    // to handle on click event to add tooltip
    document.querySelector("body").addEventListener(
      "click",
      (e) => {
        e.target.classList.remove("trail_select_bx");
        let uniqueTarget = $.trim(unique(e.target));

        if (
          this.state.tourStatus === "continue" &&
          (this.state.tourType === "tooltip" ||
            this.state.tourType === "Make Edit")
        ) {
          if (
            this.state.tourType === "tooltip" ||
            (this.state.tourType === "Make Edit" &&
              !_.isEmpty(this.state.rowData))
          ) {
            // let parentElement = queryParentElement(e.target, '.sidepanal');
            let parentElement = queryParentElement(e.target, "#extension-div");
            let parentElement1 = queryParentElement(e.target, ".trail_tooltip");
            let getClass =
              parentElement == null ? "" : parentElement.getAttribute("class");
            let getClass1 =
              parentElement1 == null
                ? ""
                : parentElement1.getAttribute("class");
            let getClass2;

            const trailOverlay = document
              .getElementById("extension-div")
              .shadowRoot.querySelector(".trail_overlay");
            if (trailOverlay) {
              getClass2 = trailOverlay.getAttribute("class");
            }
            // let root1 = ReactDOM.findDOMNode(this).parentNode.style.display;

            if (
              root1 === "block" &&
              getClass === "" &&
              getClass1 === "" &&
              getClass2 === undefined
            ) {
              e.preventDefault();
              e.stopPropagation();
              e.target.classList.add("trail_web_user");
              e.target.classList.add("trail_tour_tooltip");
              let original = document.querySelector(uniqueTarget);
              let bounding = original.getBoundingClientRect();
              let offset = $(uniqueTarget).offset();
              let leftPosition = offset.left;
              let topPosition = offset.top;
              var docHeight = document.documentElement.scrollHeight;
              $(".trail_tour_tooltip").prepend(
                "<span class='trail_user_tooltip trail_tour_ToolTipExtend'></span>"
              );
              let node = document.querySelector(".trail_user_tooltip");

              let elementIndex = Array.from(
                e.target.parentElement.children
              ).indexOf(e.target);

              // Call add overlay function
              addOverlay();

              // $('body').append("<div class='trail_overlay'></div>");
              // let bodyElement = $(unique(getScrollParent(document.querySelector(uniqueTarget)))).scrollHeight;

              // Call set overlay html function
              setOverlayHtml(
                window,
                docHeight,
                topPosition,
                bounding,
                leftPosition
              );

              const updateOverlay = () => {
                if (
                  root1 === "block" &&
                  getClass === "" &&
                  getClass1 === "" &&
                  getClass2 === undefined
                ) {
                  let docHeight = document.documentElement.scrollHeight;
                  let bounding = original.getBoundingClientRect();
                  let offset = $(uniqueTarget).offset();
                  let leftPosition = offset.left;
                  let topPosition = offset.top;

                  // Call add overlay function
                  addOverlay();

                  // Call set overlay html function
                  setOverlayHtml(
                    window,
                    docHeight,
                    topPosition,
                    bounding,
                    leftPosition
                  );
                }
              };

              window.addEventListener("resize", () => {
                // Update overlay
                updateOverlay();
              });

              // document.onchange = () => {
              //
              //   // Update overlay
              //   updateOverlay();
              // };

              // $(".trail_overlay").append(`
              // 	<svg height="100%" width="100%">
              // 		<polygon points="0,0 ${window.innerWidth},0 ${window.innerWidth},${docHeight} 0,${docHeight} 0,${topPosition + bounding.height + 10} ${leftPosition + bounding.width + 10},${topPosition + bounding.height + 10} ${leftPosition + bounding.width + 10},${topPosition - 10} ${leftPosition - 10},${topPosition - 10} ${leftPosition - 10},${topPosition + bounding.height + 10} 0,${topPosition + bounding.height + 10}" style="fill:rgba(0,0,0,0.8);"/>
              // 		Sorry, your browser does not support inline SVG.
              // 	</svg>`
              // );

              // document.querySelector("body").classList.add('trail_body');
              // $(".trail_overlay")
              // 	.height(docHeight)
              // 	.css({
              // 		'position': 'absolute',
              // 		'top': 0,
              // 		'left': 0,
              // 		'width': '100%',
              // 		'z-index': 99999999
              // 	});

              ReactDOM.render(
                <Tooltip
                  uniqueTarget={uniqueTarget}
                  target={e.target}
                  elementIndex={elementIndex}
                  path={e.path}
                  type={this.state.tourType}
                  rowData={this.state.rowData}
                  count={popoverCount}
                  onSave={
                    this.state.tourType === "Make Edit"
                      ? this.onUpdateTrail
                      : this.onSaveTrail
                  }
                  onCancel={this.onCancelTooltip}
                  onHandleChange={this.handleChange}
                />,
                node
              );
              popoverCount++;
            }
          }
        }
      },
      true
    );

    // to handle border remove on mousout event
    document.querySelector("body").addEventListener("mouseout", (e) => {
      e.preventDefault();
      if (
        this.state.tourStatus === "continue" &&
        (this.state.tourType === "tooltip" ||
          this.state.tourType === "Make Edit")
      ) {
        // let parentElement = queryParentElement(e.target, '.sidepanal');
        let parentElement = queryParentElement(e.target, "#extension-div");
        let parentElement1 = queryParentElement(e.target, ".trail_tooltip");
        let getClass =
          parentElement == null ? "" : parentElement.getAttribute("class");
        let getClass1 =
          parentElement1 == null ? "" : parentElement1.getAttribute("class");
        // let root1 = ReactDOM.findDOMNode(this).parentNode.style.display;
        if (root1 === "block" && getClass === "" && getClass1 === "") {
          e.target.classList.remove("trail_select_bx");
        }
      }
    });
  };

  resize = () => {
    this.setState({ hideNav: window.innerWidth <= 760 });
  };

  onNotFoundTarget = (data) => {
    this.setState({ MobileTargetNotFound: data });
    chrome.storage.local.set({ MobileTargetNotFound: data });
  };

  onChromeStorageChange = () => {
    chrome.storage.local.get(
      [
        "trail_web_user_tour",
        "tourStatus",
        "tourType",
        "stepType",
        "tourStep",
        "currentTourType",
        "userData",
        "previewUserId",
        "followData",
        "saveSort",
        "loading",
        "MobileTargetNotFound",
        "isDraggable",
        "trail_name",
        "currentTrailsTab",
      ],
      async function (items) {
        if (items.currentTrailsTab) {
          obj.currentTrailsTab = items.currentTrailsTab;
        }

        if (items.trail_name) {
          obj.trail_name = items.trail_name;
        }

        if (items.followData) {
          obj.followingData = items.followData;
        }

        if (items.isDraggable !== undefined && items.isDraggable !== null) {
          obj.isDraggable = items.isDraggable;
        }

        if (items.previewUserId && items.previewUserId !== "") {
          obj.previewUserId = items.previewUserId;
        } else {
          obj.previewUserId = undefined;
        }

        if (items.trail_web_user_tour) {
          obj.trailList = items.trail_web_user_tour;
        }

        if (items.tourStatus !== undefined) {
          obj.tourStatus = items.tourStatus;
        }

        if (items.tourType !== undefined) {
          obj.tourType = items.tourType;
          // if(items.tourType === 'modal') {
          // 	this.onToggleCreateModal(true);

          // }
        }

        if (items.currentTourType !== undefined) {
          obj.currentTourType = items.currentTourType;
          // if (obj.currentTourType == 'tooltip' || obj.currentTourType == 'video' || obj.currentTourType == 'audio') {
        }

        if (
          items.currentTourType === "tooltip" ||
          items.tourType === "tooltip"
        ) {
          this.setState({ open: false, openSidebar: false });
        }

        //

        if (
          items.currentTourType === "Make Edit" ||
          items.tourType === "Make Edit" ||
          items.tourType === "video" ||
          items.tourType === "audio"
        ) {
          //
          // this.setState({ open: true, openSidebar: true });
        }

        if (
          items.MobileTargetNotFound != undefined &&
          !_.isEmpty(items.MobileTargetNotFound)
        ) {
          this.setState({ MobileTargetNotFound: items.MobileTargetNotFound });
        } else {
          this.setState({ MobileTargetNotFound: {} });
        }

        if (items.tourStep !== undefined) {
          obj.tourStep = items.tourStep;
        }

        if (items.stepType !== undefined) {
          obj.stepType = items.stepType;
        }

        if (items.userData && items.userData._id !== undefined) {
          obj.currUserId = items.userData._id;
        }

        if (
          (obj.currentTourType === "video" ||
            obj.currentTourType === "audio") &&
          obj.tourType === "preview"
        ) {
          let myExtensionDefaultroot = $("#my-extension-defaultroot").css(
            "display"
          );
          let myExtensionRoot = $("#my-extension-root").css("display");

          if (myExtensionRoot === "none" && myExtensionDefaultroot === "none") {
            if (obj.trailList[obj.tourStep - 1].url === document.URL) {
              $("#my-extension-defaultroot").css("display", "block");
            }
          }
        }

        if (items.loading !== undefined && items.loading === "false") {
          obj.loading = false;
        }

        if (items.loading !== undefined && items.loading === "true") {
          obj.loading = true;
        }

        this.setState({
          trailList: obj.trailList ? obj.trailList : [],
          tourStatus: obj.tourStatus ? obj.tourStatus : "continue",
          tourType: obj.tourType ? obj.tourType : "",
          currentTourType: obj.currentTourType ? obj.currentTourType : "",
          tourStep: obj.tourStep ? obj.tourStep : "",
          stepType: obj.stepType ? obj.stepType : "",
          currUserId: obj.currUserId ? obj.currUserId : null,
          follow: obj.followingData ? obj.followingData.follow : false,
          count: this.state.count++,
          saveSort: items.saveSort ? items.saveSort : false,
          loading: obj.loading ? obj.loading : false,
          isDraggable: obj.isDraggable ? obj.isDraggable : false,
          trailName: obj.trail_name ? obj.trail_name : "",
          currentTrailsTab: obj.currentTrailsTab
            ? obj.currentTrailsTab
            : "My Trails",
          // publishButtonShow: localStorageCount && +localStorageCount !== trailListCount
        });

        // this.setState({...this.state, obj}, () => {
        //
        // });
      }.bind(this)
    );
  };

  /**
   * on cancel tooltip data
   */
  onCancelTooltip = (target, count) => {
    // Call init button position function
    initButtonPosition();

    $(".trail_tour_tooltip").parents().css("z-index", "");
    target.classList.remove("trail_web_user");
    target.classList.remove(`trail_tour_tooltip`);
    // trail_user_tooltip1
    // trail_tooltip
    // $('.trail_tooltip').remove();

    // Call remove overlay function
    removeOverlay();

    // $('.trail_overlay').remove();
    $(`.trail_user_tooltip`).remove();
    $(`.trail_tour_ToolTipExtend`).remove();

    chrome.storage.local.set({
      tourType: "",
      currentTourType: "",
      tourStep: "",
    });
    this.setState({
      web_url: "",
      tourType: "",
      currentTourType: "",
      tourStep: "",
      overlay: false,
      rowData: {},
      draggable: false,
      open: false,
    });
    this.props.mainToggle();
    this.props.onChangeTourType("");
  };

  /**
   * on click to Update tour
   */
  onUpdateTrail = async (data) => {
    // Call init button position function
    initButtonPosition();

    let res = await UpdateTrailData(data);
    if (res.status === 200) {
      let resultData = res.data.response[0];
      resultData.uniqueTarget = resultData.unique_target;
      resultData.mediaType = resultData.media_type;
      let rowInd = this.state.trailList.findIndex(
        (r) => r.trail_data_id == resultData.trail_data_id
      );
      this.state.trailList[rowInd] = resultData;
      let rows = this.state.trailList;
      chrome.storage.local.set({ trail_web_user_tour: rows });
      this.setState({ trailList: rows, draggable: false });
    }

    // chrome.storage.local.set({ trail_web_user_tour: newDataArray });
    // this.setState({ trailList: newDataArray });
    this.onCancelTooltip();
    // this.setState({ trailList: trailData, web_url: '', fileAddStatus: false, fileName: '' });
  };

  /**
   * on click to save tour in local system
   */
  onSaveTrail = async (data) => {
    let trailData = [];
    let obj = {};
    let responsive = "web";
    chrome.storage.local.get(
      ["trail_web_user_tour", "userData", "trail_id"],
      function (items) {
        const trail_id = items.trail_id;
        if (items.trail_web_user_tour !== undefined) {
          trailData = items.trail_web_user_tour;
        }

        let timeStamp = new Date().getTime();

        // This if check work on tooltip audio video upload
        if (data.type === "tooltip" && data.mediaType !== "text") {
          obj = {
            trail_id,
            userId: items.userData._id,
            url: data.url,
            path: data.path,
            selector: data.selector,
            class: data.class,
            title: data.title,
            web_url: data.web_url,
            type: data.type,
            responsive,
            uniqueTarget: data.uniqueTarget,
            mediaType: data.mediaType,
            created: timeStamp,
            trailIndex: items.trail_web_user_tour.length + 1,
            flag: "",
          };

          trailData.push(obj);
        } else if (
          this.state.tourType === "video" ||
          this.state.tourType === "audio"
        ) {
          obj = {
            trail_id,
            userId: items.userData._id,
            url: document.URL,
            path: "",
            selector: "",
            class: "",
            responsive,
            title: this.state.title,
            web_url: this.state.web_url,
            type: this.state.tourType,
            mediaType: this.state.tourType,
            created: timeStamp,
            trailIndex: items.trail_web_user_tour.length + 1,
            flag: "",
          };

          trailData.push(obj);
        } else if (data.type === "modal" && data.mediaType === "modal") {
          obj = {
            trail_id,
            userId: items.userData._id,
            url: data.url,
            path: "",
            selector: "",
            class: "",
            responsive,
            title: data.title,
            description: data.description,
            web_url: "",
            type: data.type,
            uniqueTarget: "",
            mediaType: data.mediaType,
            created: timeStamp,
            trailIndex: items.trail_web_user_tour.length + 1,
            flag: "",
          };

          trailData.push(obj);
        } else {
          obj = {
            ...data,
            trail_id,
            responsive,
            userId: items.userData._id,
            created: timeStamp,
            // web_url: '',
            trailIndex: items.trail_web_user_tour.length + 1,
            flag: "",
          };

          trailData.push(obj);
        }

        this.setState({
          trailList: trailData,
          web_url: "",
          fileAddStatus: false,
          fileName: "",
          open: false,
          draggable: false,
        });
        chrome.storage.local.set({
          trail_web_user_tour: trailData,
          tourType: "",
        });

        // Call init button position function
        initButtonPosition();

        // Save trail into database
        this.publishTrails(obj);
      }.bind(this)
    );

    // this.props.this.props,mainToggle();
    this.props.onChangeTourType("");
    this.props.mainToggle();
  };

  /**
   * on click to submit tour into the database
   */
  onClickToSubmitTour = () => {
    chrome.storage.local.set({ tourStatus: "done" });
    this.setState({ tourStatus: "done" });
  };

  /**
   * on clear tour
   */
  onClearToggle = async () => {
    let userId;
    let isPreview, isPreviewSingleTrail;
    let followedTrailUserData;

    // new Promise((resolve, reject) => {
    //   chrome.storage.local.get(
    //     [
    //       "previewUserId",
    //       "trail_web_user_tour",
    //       "userData",
    //       "isPreview",
    //       "isPreviewSingleTrail",
    //       "followedTrailUserData",
    //     ],
    //     function (items) {
    //
    //       userId = items.userData._id;
    //       isPreview = items.isPreview;
    //       isPreviewSingleTrail = items.isPreviewSingleTrail;
    //       followedTrailUserData = items.followedTrailUserData;

    //       if (items.previewUserId !== "" || items.previewUserId !== undefined) {
    //         const userTrails = items.trail_web_user_tour.filter((el) => {
    //           if (el.userId !== items.previewUserId) {
    //             return el;
    //           }
    //         });

    //         chrome.storage.local.set({
    //           previewUserId: "",
    //           trail_web_user_tour: userTrails,
    //         });
    //       }
    //     }
    //   );
    // });

    // Call init button position function
    initButtonPosition();

    try {
      const trail = this.state.trailList[this.state.tourStep - 1];
      chrome.storage.local.get(
        [
          "webUrl",
          "userData",
          "isPreview",
          "old_trail_id",
          "old_user_data",
          "previewUserId",
          "trail_web_user_tour",
          "tourStep",
          "isPreviewSingleTrail",
          "followedTrailUserData",
          "isGuest",
          "currentTrailsTab",
        ],
        async (items) => {
          // Update trail flag if user not viewing followed trail preview
          if (
            !items.followedTrailUserData &&
            !items.isPreview &&
            !items.isPreviewSingleTrail
          ) {
            const data = {
              trail_data_id: trail.trail_data_id,
              flag: "",
            };

            // Call update trail api to add flag into table
            await updateTrailFlag(data);
          }

          if (items.previewUserId !== "" || items.previewUserId !== undefined) {
            const userTrails = items.trail_web_user_tour.filter((el) => {
              if (el.userId !== items.previewUserId) {
                return el;
              }
            });

            chrome.storage.local.set({
              previewUserId: "",
              trail_web_user_tour: userTrails,
            });
          }

          if (items.isPreview || items.isPreviewSingleTrail) {
            // const trackData = {
            //   user_id: items.userData._id,
            //   trail_id: trail.trail_id,
            //   steps_visited: trail.trail_data_id,
            // };

            // // Call update track data function
            // await updateTrailTrack(trackData);

            // Call update track data function
            await this.updateUserTrailTrack(items);

            this.props.onChangeTourType("");
            this.props.mainToggle();

            if (items.isGuest) {
              window.location.href = items.webUrl + "#signin-to-continue";
            } else {
              window.location.href = items.webUrl.split("#")[0];
            }

            chrome.storage.local.set({
              isPreview: false,
              isGuest: false,
              isPreviewSingleTrail: false,
              continueTourStepId: "",
              tourType: "",
              currentTourType: "",
              trail_id: items.old_trail_id,
              trail_data_id: "",
              guest_id: "",
              trail_web_user_tour: [],
              noStepsToWatch: "",
              userData: { ...items.old_user_data },
            });
          } else if (
            items.followedTrailUserData &&
            items.currentTrailsTab === "Followed"
          ) {
            // Call update track data function
            await this.updateUserTrailTrack(items);

            // chrome.storage.local.set({
            //   tourStep: "",
            //   tourType: "",
            //   currentTourType: "",
            // });
          }
        }
      );

      // // Update step data when guest visit trail
      // if (isPreview || isPreviewSingleTrail) {

      // }

      // Call back arrow click handler function
      // Remove overlay and other added element
      $(".trail_web_user_tour").parents().css("z-index", "");
      $(`.trail_tour_ToolTipExtend`).remove();
      $(".trail_tooltip_done").remove();
      $(".trail_web_user_tour").removeAttr("trail_web_user_tour");
      $(`traiil_stop${this.state.tourStep}`).removeAttr(
        `traiil_stop${this.state.tourStep}`
      );

      // Call remove overlay function
      removeOverlay();
    } catch (err) {}

    chrome.storage.local.set({
      tourType: "",
      currentTourType: "",
      tourStep: "",
    });
    this.setState({
      web_url: "",
      tourType: "",
      currentTourType: "",
      tourStep: "",
      overlay: false,
      loading: false,
      draggable: false,
    });
    this.props.onChangeTourType("");
    this.props.mainToggle();
  };

  openPopup = () => {
    //
    this.setState({
      open: !this.state.open,
      openSidebar: !this.state.openSidebar,
    });
  };

  /**
   * on change input value
   */
  onChangeToInput = (e) => {
    e.stopPropagation();

    // Set state
    this.setState({ [e.target.name]: e.target.value });
  };

  /**
   * tour step and type manage
   * tourStep -> step
   * tourType -> type
   */
  // tourManage = (step, type, tourSide) => {
  //   chrome.storage.local.get(["isPreview", "userData"], async (items) => {
  //     const trail = this.state.trailList[this.state.tourStep - 1];
  //     // Update step data when guest visit trail
  //     if (items.isPreview) {
  //       const trackData = {
  //         trail_id: trail.trail_id,
  //         user_id: items.userData._id,
  //         steps_visited: trail.trail_data_id,
  //       };

  //       // Call update track data function
  //       await updateTrailTrack(trackData);
  //     }
  //   });
  //   chrome.storage.local.set({ currentTourType: type, tourStep: step });
  //   this.setState({ currentTourType: type, tourStep: step, tourSide });
  // };

  updateUserTrailTrack = async (items) => {
    try {
      const trail = items.trail_web_user_tour[items.tourStep - 1];

      const trackData = {
        trail_id: trail.trail_id,
        user_id: items.userData._id,
        steps_visited: trail.trail_data_id,
      };

      // Call update track data function
      await updateTrailTrack(trackData);
    } catch (err) {
      console.log(err);
    }
  };

  tourManage = (step, type, tourSide) => {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(
        [
          "isPreview",
          "userData",
          "isPreviewSingleTrail",
          "currentTrailsTab",
          "followedTrailUserData",
          "trail_web_user_tour",
          "tourStep",
        ],
        async (items) => {
          // Update step data when guest visit trail
          if (items.isPreview || items.isPreviewSingleTrail) {
            // Call update track data function
            await this.updateUserTrailTrack(items);

            chrome.storage.local.set({ currentTourType: type, tourStep: step });
            this.setState({ currentTourType: type, tourStep: step, tourSide });

            resolve();
          } else if (
            items.currentTrailsTab === "Followed" &&
            items.followedTrailUserData
          ) {
            // Call update track data function
            await this.updateUserTrailTrack(items);

            chrome.storage.local.set({ currentTourType: type, tourStep: step });
            this.setState({ currentTourType: type, tourStep: step, tourSide });

            resolve();
          } else {
            chrome.storage.local.set({ currentTourType: type, tourStep: step });
            this.setState({ currentTourType: type, tourStep: step, tourSide });

            resolve();
          }
        }
      );
    });
  };

  /**
   * on trail video trail next, previos manage
   * @step tourStep
   */
  onTourVideoTrail = (step) => {
    if (this.state.trailList[step - 1]) {
      let type = this.state.trailList[step - 1].type;
      chrome.storage.local.set({ currentTourType: type, tourStep: step });
      this.setState({ currentTourType: type, tourStep: step });
      if (this.state.trailList[step - 1].url !== document.URL) {
        window.location.href = this.state.trailList[step - 1].url;
      }
    }
  };

  uploadFile = (file) => {
    this.setState({ fileLoading: true });

    handleFileUpload(file)
      .then((response) => {
        return response;
      })
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        this.setState({
          showPreview: true,
          fileLoading: false,
          fileName: file.name,
          web_url: data.response.result.fileUrl,
          fileAddStatus: true,
        });
      })
      .catch((err) => {
        this.setState({ fileLoading: false });
      });
  };

  handleChange = (e) => {
    const { tourType } = this.state;
    const file = e.target.files[0];
    const fileType = file.type.split("/");
    e.target.value = null;

    if (tourType === "audio" && fileType[1] === "mp4") {
      // Upload file function
      this.uploadFile(file);
    } else if (tourType !== fileType[0]) {
      // Return alert
      return alert(`Please upload ${tourType} file!`);
    } else if (tourType === "video" && fileType[1] === "x-matroska") {
      // Return alert
      return alert("MKV format suport coming soon.");
    } else {
      // Upload file function
      this.uploadFile(file);
    }
  };

  /**
   * It will invoked on step drag and drop.
   */
  onSectionDragAndDrop = async ({ oldIndex, newIndex }) => {
    // this.props.onDashboardSectionSort(
    // 	arrayMove(this.state.trailList, oldIndex, newIndex).map(r => ({ id: r.id })),
    // 	this.props.usersData._id
    // );

    const sorted = arrayMove(this.state.trailList, oldIndex, newIndex);

    this.setState({ trail_web_user_tour: sorted, trailList: sorted });
    chrome.storage.local.set({ trail_web_user_tour: sorted });

    // Update sorted array in database
    const res = await arraySorting(sorted);

    if (!res.data.response || !res.data.response.result) {
      alert("Something went wrong!");
    }
  };

  saveSortedTrails = async (e) => {
    e.preventDefault();

    // Update sorted array in database
    const res = await arraySorting(this.state.trailList);

    if (!res.data.response || !res.data.response.result) {
      alert("Something went wrong!");
    }

    this.setState({ saveSort: false });
    chrome.storage.local.set({ saveSort: false });
  };

  // Save trails into database
  publishTrails = async (data) => {
    try {
      const res = await uploadTrails(data);
      this.setState({ publishLoader: false });
      if (!res.data.response) {
        throw new Error("Saving trails failed!");
      }

      /// const result = res.data.response.result.map(el => {
      // 	return {
      // 		trail_data_id: el.trail_data_id,
      // 		url: el.url,
      // 		path: el.path,
      // 		selector: el.selector,
      // 		class: el.class,
      // 		title: el.title,
      // 		description: el.description,
      // 		web_url: el.web_url,
      // 		trail_id: el.trail_id,
      // 		type: el.type,
      // 		uniqueTarget: el.unique_target,
      // 		mediaType: el.media_type,
      // 		created: el.created,
      // 		trailIndex: el.trailIndex
      // 	}
      // });

      // let newArray = [];

      // this.state.trailList.forEach(el => {
      // 	if (el.trail_id) {
      // 		newArray.push(el);
      // 	}
      // });

      // newArray = newArray.concat(result);

      // newArray.sort((a, b) => {
      // 	return (+a.trailIndex) - (+b.trailIndex);
      // });

      chrome.storage.local.get(
        ["trail_id"],
        async function (items) {
          // Get all trail from database
          let screen = resizeScreen() ? "mobile" : "web";
          const allDataRes = await getUserOneTrail(items.trail_id, screen);
          const newDataArray = allDataRes.data.response.result.map((el) => {
            return {
              userId: this.state.currUserId,
              trail_data_id: el.trail_data_id,
              url: el.url,
              path: el.path,
              selector: el.selector,
              class: el.class,
              title: el.title,
              description: el.description,
              web_url: el.web_url,
              trail_id: el.trail_id,
              type: el.type,
              uniqueTarget: el.unique_target,
              unique_target_one: el.unique_target_one,
              mobile_media_type: el.mobile_media_type,
              mobile_title: el.mobile_title,
              mobile_description: el.mobile_description,
              mediaType: el.media_type,
              created: el.created,
              trailIndex: el.trailIndex,
            };
          });

          chrome.storage.local.set({ trail_web_user_tour: newDataArray });
          this.setState({ trailList: newDataArray });
        }.bind(this)
      );
    } catch (err) {
      this.setState({ publishLoader: false });
    }
  };

  tooltipShareBtn = (e) => {
    const { trailList } = this.state;
    const trailDataId = trailList[trailList.length - 1].trail_data_id;
    const trailId = trailList[trailList.length - 1].trail_id;
    const trailUrl = `${process.env.REACT_APP_MS4_URL}userTourDataDetail/readTrailit_trail_data_tour/${trailDataId}?trailId=${trailId}&user_id=${this.state.currUserId}`;

    function copyStringToClipboard(str) {
      // Create new element
      var el = document.createElement("textarea");

      // Set value (string to be copied)
      el.value = str;

      // Set non-editable to avoid focus and move outside of view
      el.setAttribute("readonly", "");
      el.style = { position: "absolute", left: "-9999px" };
      document.body.appendChild(el);

      // Select text inside element
      el.select();

      // Copy text to clipboard
      document.execCommand("copy");

      // Remove temporary element
      document.body.removeChild(el);
    }

    alert("Successfully copied");
    copyStringToClipboard(trailUrl);
  };

  // Copy Web app link
  copyWebApplink = (e) => {
    const { trailList, currUserId } = this.state;

    if (trailList.length == 0) {
      alert("Please create trail");
      return null;
    }

    const trailId = trailList[trailList.length - 1].trail_id;
    const URL = trailList[0].url;
    let qryString = URL.split("?").length > 1 ? "&" : "?";
    const trailUrl = `http://go.trialit.co/live/${URL}${qryString}trailUserId=${currUserId}&trailId=${trailId}&trailPreview=true&tourStep=1`;

    function copyStringToClipboard(str) {
      // Create new element
      var el = document.createElement("textarea");

      // Set value (string to be copied)
      el.value = str;

      // Set non-editable to avoid focus and move outside of view
      el.setAttribute("readonly", "");
      el.style = { position: "absolute", left: "-9999px" };
      document.body.appendChild(el);

      // Select text inside element
      el.select();

      // Copy text to clipboard
      document.execCommand("copy");

      // Remove temporary element
      document.body.removeChild(el);
    }

    alert("Successfully copied");
    copyStringToClipboard(trailUrl);
  };

  followTrail = (e) => {
    e.preventDefault();
    const previewUserId = this.state.trailList[this.state.tourStep - 1].userId;

    const followData = {
      follower_id: this.state.currUserId,
      previewUserId,
    };

    followTrails(followData)
      .then((res) => {
        if (res.data.response && res.data.response.statusCode !== "201") {
          throw new Error("Error while following trail!");
        }

        // Set followData into chrome storage
        chrome.storage.local.set({
          followData: { previewUserId, follow: true },
        });
        this.setState({ follow: true });
      })
      .catch((err) => {});
  };

  unFollowTrail = (e) => {
    e.preventDefault();
    const previewUserId = this.state.trailList[this.state.tourStep - 1].userId;

    const followData = {
      follower_id: this.state.currUserId,
      previewUserId,
    };

    unFollowTrailOfUser(followData)
      .then((res) => {
        if (res.data.response && res.data.response.statusCode !== "200") {
          throw new Error("Error while unfollowing trail!");
        }

        // Set followData into chrome storage
        chrome.storage.local.set({ followData: {} });
        this.setState({ follow: false });
      })
      .catch((err) => {});
  };

  // Send notification to follower when publish button clicked
  sendNotification = (e) => {
    e.preventDefault();
    this.setState({ publishLoader: true });

    // Socket notification
    socket.emit("sendNotification", this.state.currUserId);

    setTimeout(() => {
      this.setState({ publishLoader: false });
    }, 1000);

    localStorage.setItem(
      process.env.REACT_APP_LOCALSTORAGE,
      this.state.trailList.length
    );
  };

  // Save last show preview trail
  onBackArrowClickHandler = async (e, close) => {
    chrome.storage.local.get(
      [
        "isPreview",
        "userData",
        "webUrl",
        "old_trail_id",
        "old_user_data",
        "isPreviewSingleTrail",
        "isGuest",
        "followedTrailUserData",
        "currentTrailsTab",
        "trail_web_user_tour",
        "tourStep",
      ],
      async (items) => {
        const trail = this.state.trailList[this.state.tourStep - 1];

        // Update step data when guest visit trail
        if (
          (items.isPreview || items.isPreviewSingleTrail) &&
          this.state.tourType === "preview"
        ) {
          // const trackData = {
          //   trail_id: trail.trail_id,
          //   user_id: items.userData._id,
          //   steps_visited: trail.trail_data_id,
          // };

          // // Call update track data function
          // await updateTrailTrack(trackData);

          // Call update track data function
          await this.updateUserTrailTrack(items);

          this.props.onChangeTourType("");
          this.props.mainToggle();

          if (items.isGuest) {
            let url = items.webUrl + "#signin-to-continue";
            window.location.href = url;
          } else {
            window.location.href = items.webUrl.split("#")[0];
          }

          chrome.storage.local.set({
            isPreview: false,
            isGuest: false,
            isPreviewSingleTrail: false,
            tourType: "",
            currentTourType: "",
            continueTourStepId: "",
            trail_id: items.old_trail_id,
            trail_data_id: "",
            guest_id: "",
            trail_web_user_tour: [],
            noStepsToWatch: "",

            userData: { ...items.old_user_data },
          });
        } else if (
          items.followedTrailUserData &&
          items.currentTrailsTab === "Followed"
        ) {
          // Call update track data function
          await this.updateUserTrailTrack(items);
        }
      }
    );
    const shadowRoot = document.getElementById("extension-div").shadowRoot;

    // if (close === undefined) {
    //   chrome.storage.local.set({ closeContinue: false });
    // }

    // Call init button position function
    initButtonPosition();

    if (!this.state.onDone) {
      // Set onDone state
      this.setState({ onDone: true });
    }

    const removeThisElements = () => {
      // Remove overlay and other added element
      $(".trail_web_user_tour").parents().css("z-index", "");
      $(`.trail_tour_ToolTipExtend`).remove();
      $(".trail_tooltip_done").remove();
      $(".trail_web_user_tour").removeAttr("trail_web_user_tour");
      $(`traiil_stop${this.state.tourStep}`).removeAttr(
        `traiil_stop${this.state.tourStep}`
      );
      $(".trail_select_bx").removeClass("trail_select_bx");

      const tooltip = shadowRoot.querySelector(".trail_tooltip");
      if (tooltip) {
        tooltip.parentNode.removeChild(tooltip);
      }

      // Call remove overlay function
      removeOverlay();
    };

    return new Promise((resolve, reject) => {
      chrome.storage.local.get(
        [
          "previewUserId",
          "isPreview",
          "isPreviewSingleTrail",
          "followedTrailUserData",
        ],
        async (items) => {
          if (
            (!items.previewUserId || items.previewUserId === "") &&
            !items.followedTrailUserData
          ) {
            const { currentTourType, tourType } = this.state;

            if (
              (currentTourType === "tooltip" ||
                currentTourType === "audio" ||
                currentTourType === "video" ||
                currentTourType === "modal") &&
              tourType === "preview"
            ) {
              if (this.state.trailList.length > 0) {
                if (!items.isPreview || !items.isPreviewSingleTrail) {
                  try {
                    const data = {
                      trail_data_id: this.state.trailList[
                        this.state.tourStep - 1
                      ].trail_data_id,
                      flag: "continue",
                    };

                    // Call update trail api to add flag into table
                    await updateTrailFlag(data);
                  } catch (err) {}
                }

                // Remove elements
                await removeThisElements();

                // Call toggle function
                chrome.storage.local.set({
                  tourType: "",
                  currentTourType: "",
                  tourStep: "",
                });
                this.setState({
                  web_url: "",
                  tourType: "",
                  currentTourType: "",
                  tourStep: "",
                  overlay: false,
                  loading: false,
                  open: false,
                  openSidebar: false,
                  draggable: false,
                });
                this.props.onChangeTourType("");
                this.props.mainToggle();
              }

              // // Remove elements
              // await removeThisElements();
            } else if (currentTourType === "preview" && tourType === "modal") {
              this.props.mainToggle();
              this.props.onChangeTourType("");
              this.setState({
                web_url: "",
                tourType: "",
                currentTourType: "",
                tourStep: "",
                overlay: false,
                createModalOpen: false,
                loading: false,
                stepType: "",
                open: false,
                openSidebar: false,
                draggable: false,
              });
              chrome.storage.local.set({
                tourType: "",
                currentTourType: "",
                tourStep: "",
                stepType: "",
              });
            } else {
              // Remove elements
              await removeThisElements();
              //

              this.props.mainToggle();
              this.props.onChangeTourType("");
              this.setState({
                web_url: "",
                tourType: "",
                currentTourType: "",
                tourStep: "",
                overlay: false,
                fileName: "",
                loading: false,
                stepType: "",
                open: false,
                openSidebar: false,
                draggable: false,
              });
            }

            chrome.storage.local.set({
              tourType: "",
              currentTourType: "",
              tourStep: "",
              stepType: "",
            });

            if (this.state.deleteModal.show) {
              // Hide delete modal
              this.onDeleteModalClose();
            }

            if (this.state.onDone) {
              // Set onDone state
              this.setState({ onDone: false });
            }

            resolve();
          } else {
            // Remove elements
            await removeThisElements();
            this.props.mainToggle();
            this.props.onChangeTourType("");
            chrome.storage.local.set({
              tourType: "",
              currentTourType: "",
              tourStep: "",
            });
            this.setState({
              web_url: "",
              tourType: "",
              currentTourType: "",
              tourStep: "",
              overlay: false,
              loading: false,
              open: false,
              openSidebar: false,
              draggable: false,
            });

            if (this.state.onDone) {
              // Set onDone state
              this.setState({ onDone: false });
            }

            resolve();
          }
        }
      );
    });
  };

  onToggleCreateModal = (status) => {
    if (!status) {
      // Call init button position function
      initButtonPosition();
    }

    if (!status) {
      chrome.storage.local.set({
        tourType: "",
        stepType: "",
        currentTourType: "",
        tourStep: "",
      });
      this.setState({
        web_url: "",
        tourType: "",
        stepType: "",
        open: false,
        currentTourType: "",
        tourStep: "",
        overlay: false,
        createModalOpen: status,
        draggable: false,
      });
      this.props.mainToggle();
      this.props.onChangeTourType("");
    } else {
      this.setState({ createModalOpen: status });
    }

    // ReactDOM.render(
    // 	<CreateModalComponent
    // 		open={status}
    // 		toggle={this.onToggleCreateModal}
    // 		onSave={this.onSaveTrail}
    // 	/>
    // , document.querySelector('body'));
  };

  onNextClick = () => {
    console.log("this.previewModalRef", this.previewModalRef);
  };

  onCloseTooltipHandle = async (e) => {
    // Call init button position function
    initButtonPosition();

    // Hide continue button
    chrome.storage.local.set({ closeContinue: false });

    // Set onDone state
    this.setState({ onDone: true });

    const { trailList, tourStep } = this.state;

    if (trailList.length > 0 && trailList.length === tourStep) {
      // Call clear toggle function
      await this.onClearToggle();
    } else {
      chrome.storage.local.get(
        ["isPreview", "isPreviewSingleTrail", "followedTrailUserData"],
        (items) => {
          if (
            !items.isPreview &&
            !items.isPreviewSingleTrail &&
            !items.followedTrailUserData
          ) {
            chrome.storage.local.set({ closeContinue: true });
          }
        }
      );
      // Show continue button

      // Call back arrow click handler function
      await this.onBackArrowClickHandler(e, "close");
    }

    // Set onDone state
    this.setState({ onDone: false, draggable: false });
  };

  setLoadingState = (query) => {
    this.setState({ loading: query });
  };

  onClickToGetRow = (e, result, tourStep) => {
    e.preventDefault();
    this.setState({ MobileTargetNotFound: {} });
    chrome.storage.local.set({ MobileTargetNotFound: {} });
    this.setState({ rowData: result, tourStep, open: false });
  };

  // addTrailitLogo = () => {
  // 	const extensionDiv = document.getElementById('extension-div').shadowRoot;
  // 	const image = extensionDiv.querySelector('.trailit_logoLeftBottom');
  // 	// <img src={require('/images/trailit_logo.png')} className="trailit_logoLeftBottom" alt=".."/>
  // 	if (extensionDiv && !image) {
  // 		const element = document.createElement('img');
  // 		element.src = "https://trailit.co/wp-content/uploads/2020/04/logo.png";
  // 		element.className = 'trailit_logoLeftBottom';
  // 		element.alt = 'logo_image_in_preview';

  // 		// Append element in body
  // 		extensionDiv.appendChild(element);
  // 	}
  // };

  // removeTrailitLogo = () => {
  // 	const image = document.getElementById('extension-div').shadowRoot.querySelector('.trailit_logoLeftBottom');

  // 	if (image) {
  // 		// Remove image from perent node
  // 		image.parentNode.removeChild(image);
  // 	}
  // };

  // Send tip function
  sendTip = async (toAddress, amount) => {
    this.setState({ sendLoader: true });

    // const { privateKey } = this.state;
    const privateKey = undefined; // Need to send private key but for demos hard code in code
    sendTransection(privateKey, toAddress, amount)
      .then((res) => {
        if (res && res.code && res.code === 400) {
          throw new Error(res.err);
        }

        // Set is success state
        this.setState({ isSuccess: true });

        setTimeout(() => {
          // Hide modal
          this.onSendTipModalClose();

          // Set is success state
          this.setState({ isSuccess: false });
        }, 5000);
      })
      .catch((err) => {
        this.setState({ setError: err.message });

        setTimeout(() => {
          // Hide modal
          this.onSendTipModalClose();

          // Set is success state
          this.setState({ setError: false });
        }, 5000);
      });
    // await wallet.transfer(this.state.toAddress, this.state.amount);
    // let balance = await wallet.balance();
    // this.setState({
    //   toAddress: "",
    //   amount: "",
    //   balance,
    //   sendLoader: false,
    // });
  };

  dragStop(data) {
    const position = document
      .getElementById("extension-div")
      .shadowRoot.getElementById("my-extension-defaultroot");
    //
    //
    //
    //
  }

  render() {
    let {
      open,
      trailList,
      tourStatus,
      tourType,
      tourStep,
      currentTourType,
      web_url,
      overlay,
      follow,
      fileName,
      fileLoading,
      createModalOpen,
      stepType,
      onDone,
      isDraggable,
      trailName,
      openSidebar,
      currentTrailsTab,
    } = this.state;

    // console.log("tourType", tourType);
    console.log("tourStep", tourStep);
    // console.log("currentTourType", currentTourType);
    // console.log("currentTrailsTab", currentTrailsTab);

    const localStorageCount = localStorage.getItem(
      process.env.REACT_APP_LOCALSTORAGE
    );
    const stateCount = trailList.length;

    if (web_url !== "") {
      this.setState({ fileAddStatus: true });
    }

    tourUrl = false;

    if (tourStep !== "" && stateCount > 0) {
      tourUrl = trailList[tourStep - 1].url === document.URL;
      // if(trailList[tourStep - 1].url !== document.URL) {
      // 	window.location.href = trailList[tourStep - 1].url;
      // }
    }

    // let openPopup = openSidebar;

    // if (
    //   openSidebar &&
    //   (tourType === "audio" || tourType === "video" || tourType === "Make Edit")
    // ) {
    //   openPopup = true;
    // } else {
    //   openPopup = false;
    // }
    // console.log("openPopup", openPopup);

    //
    //

    // const sidepopup = document
    //   .getElementById("extension-div")
    //   .shadowRoot.querySelector(".sidepopup");
    // if (sidepopup) {
    //   if (
    //     tourType === "audio" ||
    //     tourType === "video" ||
    //     tourType === "Make Edit"
    //   ) {
    //     // Add white background
    //     sidepopup.style.background = "white";
    //   } else if (
    //     tourType === "modal" ||
    //     tourType === "tooltip" ||
    //     tourType === "preview"
    //   ) {
    //
    //     // Add transparent background
    //     sidepopup.style.background = "transparent";
    //   }
    // }

    if (!openSidebar && flipped && defaultComp) {
      const flipId = document
        .getElementById("extension-div")
        .shadowRoot.getElementById("my-extension-root-flip");
      flipId.setAttribute("class", "trail_flip_box");
    } else if (openSidebar || !flipped) {
      const trailFlipBox = document
        .getElementById("extension-div")
        .shadowRoot.querySelector(".trail_flip_box");
      if (trailFlipBox) {
        trailFlipBox.removeAttribute("class");
      }
    }

    // if (loading) {
    // 	ReactDOM.render(
    // 		<TooltipOverlay data={trailList} toggle={this.onClearToggle} tourStep={tourStep} tour={this.tourManage} tourSide={this.state.tourSide} />,
    // 		document.body.appendChild(document.createElement('div'))
    // 	);
    // }

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

        const modal = document
          .getElementById("extension-div")
          .shadowRoot.querySelector(".trial_create_modal_main .modal");
        //

        if (modal && resizeScreen()) {
          modal.style.height = "75%";
        }
      }

      // if (tourType && tourType !== '') {
      // 	document.getElementById('extension-div').shadowRoot.getElementById('my-extension-defaultroot').style.position = 'relative';
      // }
    });

    if (
      (currentTourType === "tooltip" ||
        currentTourType === "audio" ||
        currentTourType === "video" ||
        currentTourType === "modal" ||
        currentTourType === "Make Edit" ||
        currentTourType === "") &&
      (tourType === "preview" || tourType === "") &&
      (tourUrl || !tourUrl)
    ) {
      chrome.storage.local.set({ loading: "false" });
      this.setLoadingState(false);

      // // Add trailit logo when trail menu open
      // this.addTrailitLogo();
    }

    //
    //

    // if (!draggable) {
    //   //
    //   const menuButton = document
    //     .getElementById("extension-div")
    //     .shadowRoot.getElementById("my-extension-defaultroot");

    //   if (menuButton) {
    //     // menuButton.style.transform = 'translate(0px, 0px)';
    //   }
    // }

    // if ((currentTourType === 'preview' && (currentTourType !== 'video' && currentTourType !== 'audio')) &&
    // 	(tourType !== 'Make Edit' && tourType !== 'video' && tourType !== 'audio')
    // ) {
    // 	const menuButton = document.getElementById('extension-div').shadowRoot.getElementById('my-extension-defaultroot');
    // 	if (menuButton) {

    // 		// Make X button draggable
    // 		dragElement(menuButton);

    // 	} else {
    // 		// Make X button not draggable
    // 		dragElement('');
    // 	}

    // } else {
    // 	// Make X button not draggable
    // 	dragElement('');
    // }

    let mediaType = "";
    if (
      tourStatus !== "preview" &&
      (tourType === "audio" || tourType === "video")
    ) {
      if (tourType === "video") {
        mediaType = "video/*, .mkv, .mov";
      } else if (tourType === "audio") {
        mediaType = "audio/*";
      }
    }

    let sideBar = (
      <div>
        <div className="first_step">
          <div className="hdr">
            <div className="titleBack">
              <button
                disabled={onDone}
                className="trail_builder-back-button"
                onClick={this.onBackArrowClickHandler}
                onTouchEnd={this.onBackArrowClickHandler}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="7.734"
                  height="13.404"
                  viewBox="0 0 7.734 13.404"
                >
                  <g id="left-arrow" transform="translate(0.557 0.557)">
                    <path
                      id="Path_2"
                      data-name="Path 2"
                      d="M39.276,18.719a.437.437,0,0,0,.617,0,.437.437,0,0,0,0-.617l-5.428-5.428,5.428-5.428a.437.437,0,0,0-.617-.617l-5.748,5.737a.437.437,0,0,0,0,.617Z"
                      transform="translate(-33.4 -6.5)"
                      fill="#289728"
                      stroke="#fb542b"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1"
                    />
                  </g>
                </svg>
              </button>
              <span>Trail Builder</span>
            </div>
            {obj.previewUserId && obj.previewUserId !== "" && (
              <div className="optionBtn">
                {follow ? (
                  <Button type="primary" onClick={this.unFollowTrail}>
                    Unfollow
                  </Button>
                ) : (
                  <Button type="primary" onClick={this.followTrail}>
                    Follow
                  </Button>
                )}
              </div>
            )}
          </div>
          <div id="scroll" className="sidepopcontent scrollbar">
            {tourType === "audio" || tourType === "video" ? (
              <h4 className="title my-4">Upload Media</h4>
            ) : (
              // <h4 className="title my-4">Trail It, Curated Guided Tour</h4>
              <h4 className="title my-4">{trailName}</h4>
            )}
            <div className="pl-4 trail_video_frm">
              {tourStatus !== "preview" && tourType === "video" && (
                <input
                  type="text"
                  name="title"
                  onChange={this.onChangeToInput}
                  onKeyDown={(e) => e.stopPropagation()}
                  placeholder="Enter Video title"
                  className="ant-input mb-2"
                  autoComplete="off"
                />
              )}
              {tourStatus !== "preview" && tourType === "video" && (
                <input
                  type="text"
                  name="web_url"
                  value={fileName}
                  onChange={this.onChangeToInput}
                  onKeyDown={(e) => e.stopPropagation()}
                  placeholder="Add Video URL"
                  className="ant-input mb-2"
                  autoComplete="off"
                />
              )}
              {tourStatus !== "preview" && tourType === "video" && (
                <div className="upload_bx">
                  <div className="ant-upload">
                    <p className="ant-upload-drag-icon">
                      {fileLoading && (
                        <div class="trial_spinner">
                          <img
                            alt="ring1"
                            class="ring1"
                            src={require(`./images/loding1.png`)}
                          />
                          <img
                            alt="ring2"
                            class="ring2"
                            src={require(`./images/loding2.png`)}
                          />
                        </div>
                      )}
                      {!fileLoading && <CloudUploadOutlined />}
                    </p>
                    <p className="ant-upload-text">
                      {fileLoading ? "Uploading" : "Upload"} Video
                    </p>
                  </div>
                  <input
                    type="file"
                    name="media"
                    accept={mediaType}
                    onChange={this.handleChange}
                  />
                </div>
              )}
              {tourStatus !== "preview" && tourType === "video" && (
                <button
                  disabled={fileLoading}
                  onClick={this.onSaveTrail}
                  value="ADD"
                  className="ant-btn ant-btn-primary trail_add_step_btn"
                >
                  ADD STEP
                </button>
              )}
              {tourStatus === "preview" && tourType === "video" && (
                <input
                  type="submit"
                  onClick={() => this.onTourVideoTrail(this.state.tourStep - 1)}
                  value="Previous"
                  className="ant-btn ant-btn-primary"
                />
              )}
              {tourStatus === "preview" && tourType === "video" && (
                <input
                  type="submit"
                  onClick={() => this.onTourVideoTrail(this.state.tourStep + 1)}
                  value="Next"
                  className="ant-btn ant-btn-primary"
                />
              )}
              {tourStatus !== "preview" && tourType === "audio" && (
                <input
                  type="text"
                  name="title"
                  placeholder="Enter Audio Title"
                  className="ant-input mb-2"
                  onChange={this.onChangeToInput}
                  onKeyDown={(e) => e.stopPropagation()}
                  autoComplete="off"
                />
              )}
              {tourStatus !== "preview" && tourType === "audio" && (
                <input
                  type="text"
                  name="web_url"
                  value={fileName}
                  onKeyDown={(e) => e.stopPropagation()}
                  onChange={this.onChangeToInput}
                  placeholder="Add Audio URL"
                  className="ant-input mb-2"
                  autoComplete="off"
                />
              )}
              {tourStatus !== "preview" && tourType === "audio" && (
                <div className="upload_bx">
                  <div className="ant-upload">
                    <p className="ant-upload-drag-icon">
                      {fileLoading && (
                        <div class="trial_spinner">
                          <img
                            class="ring1"
                            src={require(`./images/loding1.png`)}
                          />
                          <img
                            class="ring2"
                            src={require(`./images/loding2.png`)}
                          />
                        </div>
                      )}
                      {!fileLoading && <CloudUploadOutlined />}
                    </p>
                    <p className="ant-upload-text">
                      {fileLoading ? "Uploading" : "Upload"} Audio
                    </p>
                  </div>
                  <input
                    type="file"
                    name="media"
                    accept={mediaType}
                    onChange={this.handleChange}
                  />
                </div>
              )}
              {tourStatus !== "preview" && tourType === "audio" && (
                <button
                  disabled={fileLoading}
                  onClick={this.onSaveTrail}
                  value="ADD"
                  className="ant-btn ant-btn-primary trail_add_step_btn"
                >
                  ADD STEP
                </button>
              )}
              {tourStatus === "preview" && tourType === "audio" && (
                <input
                  type="submit"
                  onClick={() => this.onTourVideoTrail(this.state.tourStep - 1)}
                  value="Previous"
                  className="ant-btn ant-btn-primary"
                />
              )}
              {tourStatus === "preview" && tourType === "audio" && (
                <input
                  type="submit"
                  onClick={() => this.onTourVideoTrail(this.state.tourStep + 1)}
                  value="Next"
                  className="ant-btn ant-btn-primary"
                />
              )}
            </div>
            <form className="flow tr_side_form" id="">
              <SortableContainer
                onSortEnd={this.onSectionDragAndDrop}
                useDragHandle
              >
                {this.state.trailList.map((result, index) => (
                  <SortableItem
                    key={`item-${index}`}
                    tourType={this.state.tourType}
                    onClick={this.onClickToGetRow}
                    index={index}
                    i={index}
                    tourStep={tourStep}
                    result={result}
                    isDeleteModalOpen={this.state.deleteModal.show}
                    onDeleteModalOpen={this.onDeleteModalOpen}
                    MobileTargetNotFound={this.state.MobileTargetNotFound}
                    currentTrailsTab={currentTrailsTab}
                  />
                ))}
              </SortableContainer>
            </form>
            <div>
              {this.state.saveSort && (
                <div className="trailButtonsWrapper">
                  <Button type="primary" onClick={this.saveSortedTrails}>
                    Save
                  </Button>
                </div>
              )}
              {this.state.trailList.length > 0 && (
                <div className="trailButtonsWrapper">
                  <Button type="primary" onClick={this.tooltipShareBtn}>
                    Share
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );

    if (tourType === "preview") {
      sideBar = (
        <form className="flow tr_side_form" id="">
          <SortableContainer
            onSortEnd={this.onSectionDragAndDrop}
            useDragHandle
          >
            {this.state.trailList.map((result, index) => (
              <SortableItem
                currentTrailsTab={currentTrailsTab}
                key={`item-${index}`}
                tourType={this.state.tourType}
                onClick={this.onClickToGetRow}
                index={index}
                i={index}
                tourStep={tourStep}
                result={result}
                isDeleteModalOpen={this.state.deleteModal.show}
                onDeleteModalOpen={this.onDeleteModalOpen}
                MobileTargetNotFound={this.state.MobileTargetNotFound}
              />
            ))}
          </SortableContainer>
        </form>
      );
    }

    let componentData = (
      <div id="my-extension-defaultroot">
        {/* Delete modal */}
        {this.state.deleteModal.show && (
          <TrailDeleteModal
            deleteModal={this.state.deleteModal}
            onDeleteModalClose={this.onDeleteModalClose}
            onDeleteButtonClick={this.onDeleteButtonClick}
          />
        )}

        {/* Send tip modal */}
        {this.state.sendTipModal && (
          <SendTipModal
            sendTip={this.sendTip}
            setError={this.state.setError}
            isSuccess={this.state.isSuccess}
            isLoading={this.state.isSuccess}
            sendLoader={this.state.sendLoader}
            sendTipModal={this.state.sendTipModal}
            onSendTipModalClose={this.onSendTipModalClose}
          />
        )}

        <div className="sidepanal adadad trail_sidepanel_overlay">
          {createModalOpen && (
            <CreateModalComponent
              stepType={stepType}
              open={createModalOpen}
              screenSize={resizeScreen}
              toggle={this.onToggleCreateModal}
              closeButtonHandler={this.onBackArrowClickHandler}
              onSave={this.onSaveTrail}
            />
          )}
          <div>
            {/* {currentTourType === 'tooltip' && tourType === 'preview' && !overlay && tourStep!=='' && tourUrl && <TooltipOverlay data={trailList} toggle={this.onClearToggle} tourStep={tourStep} tour={this.tourManage} tourSide={this.state.tourSide} />} */}
            {/* <TooltipOverlay data={trailList} toggle={this.onClearToggle} tourStep={tourStep} tour={this.tourManage} tourSide={this.state.tourSide} /> */}
            {currentTourType === "tooltip" &&
              tourType === "preview" &&
              !overlay &&
              tourStep !== "" &&
              tourUrl && (
                <WebUserTour
                  tooltipRef={this.state.tooltipRef}
                  tooltipToggle={() =>
                    this.setState({
                      tooltipRef: !this.state.tooltipRef,
                    })
                  }
                  onDone={onDone}
                  data={trailList}
                  toggle={this.onClearToggle}
                  tourStep={tourStep}
                  tour={this.tourManage}
                  closeButtonHandler={this.onCloseTooltipHandle}
                  setLoadingState={this.setLoadingState}
                  onNotFoundTarget={this.onNotFoundTarget}
                  onSendTipModalOpen={this.onSendTipModalOpen}
                  onChangeTourType={this.props.onChangeTourType}
                  mainToggle={this.props.mainToggle}
                />
              )}
            {currentTourType === "video" &&
              tourType === "preview" &&
              !overlay &&
              tourStep !== "" &&
              tourUrl && (
                <VideoTour
                  videoRef={this.state.videoRef}
                  videoToggle={() =>
                    this.setState({
                      videoRef: !this.state.videoRef,
                    })
                  }
                  onDone={onDone}
                  data={trailList}
                  toggle={this.onClearToggle}
                  tourStep={tourStep}
                  tour={this.tourManage}
                  tourSide={this.state.tourSide}
                  closeButtonHandler={this.onCloseTooltipHandle}
                  setLoadingState={this.setLoadingState}
                />
              )}
            {currentTourType === "audio" &&
              tourType === "preview" &&
              !overlay &&
              tourStep !== "" &&
              tourUrl && (
                <AudioTour
                  audioRef={this.state.audioRef}
                  audioToggle={() =>
                    this.setState({
                      audioRef: !this.state.audioRef,
                    })
                  }
                  onDone={onDone}
                  data={trailList}
                  toggle={this.onClearToggle}
                  tourStep={tourStep}
                  tour={this.tourManage}
                  tourSide={this.state.tourSide}
                  closeButtonHandler={this.onCloseTooltipHandle}
                  setLoadingState={this.setLoadingState}
                />
              )}
            {currentTourType === "modal" &&
              tourType === "preview" &&
              !overlay &&
              tourStep !== "" &&
              tourUrl && (
                <PreviewModalComponent
                  ref={this.previewModalRef}
                  onNextClick={this.onNextClick}
                  previewModalRef={this.state.previewModalRef}
                  previewModalToggle={() =>
                    this.setState({
                      previewModalRef: !this.state.previewModalRef,
                    })
                  }
                  onDone={onDone}
                  data={trailList}
                  toggle={this.onClearToggle}
                  tourStep={tourStep}
                  tour={this.tourManage}
                  tourSide={this.state.tourSide}
                  closeButtonHandler={this.onCloseTooltipHandle}
                  setLoadingState={this.setLoadingState}
                  onSendTipModalOpen={this.onSendTipModalOpen}
                />
              )}
            {/* <img src={require('./images/trailit_logo.png')} className="trailit_logoLeftBottom" alt=".."/> */}
          </div>
          <div
            className={`sidepopup ${
              openSidebar ? "open trail_builder_side_panel_open" : ""
            } ${
              tourType === "audio" ||
              tourType === "video" ||
              tourType === "Make Edit"
                ? "white_background"
                : "transparent_background"
            }`}
          >
            <div className="space"></div>
            {/* <div className="preview">.
              Preview
            </div>
            <div className="createToolTip">.
              Create Tool Tip
            </div> */}

            {sideBar}

            {/* <div className="audio">.
          Create Audio
        </div>
        <div className="savedTrails">.
          Saved Trails
        </div> */}
            <div className="space"></div>
          </div>
          {this.state.dynamicPopupButton && (
            <button className="menu pop" onClick={this.openPopup}>
              <img alt="" src={require("./images/trailit_X_button_new.png")} />
            </button>
          )}
        </div>
      </div>
    );

    if (
      isDraggable &&
      tourType !== "Make Edit" &&
      currentTourType !== "audio" &&
      currentTourType !== "video"
    ) {
      componentData = (
        <Draggable
          disabled={!isDraggable}
          // onStart={ (data) => {
          // 	//
          // } }
          // onDrag={ (data) => {
          // 	//
          // } }
          // onStop={(data) => {
          //

          // 	this.dragStop(data);
          // 	// this.setState({ dragPosition: { x: data.x, y: data.y } });
          // }}
          position={null}
          // // defaultPosition={ { x: 0, y: 0 } }
        >
          <div>
            <div id="my-extension-defaultroot">
              {/* Delete modal */}
              {this.state.deleteModal.show && (
                <TrailDeleteModal
                  deleteModal={this.state.deleteModal}
                  onDeleteModalClose={this.onDeleteModalClose}
                  onDeleteButtonClick={this.onDeleteButtonClick}
                />
              )}

              {/* Send tip modal */}
              {this.state.sendTipModal && (
                <SendTipModal
                  sendTip={this.sendTip}
                  setError={this.state.setError}
                  isSuccess={this.state.isSuccess}
                  isLoading={this.state.isSuccess}
                  sendLoader={this.state.sendLoader}
                  sendTipModal={this.state.sendTipModal}
                  onSendTipModalClose={this.onSendTipModalClose}
                />
              )}

              <div className="sidepanal adadad trail_sidepanel_overlay">
                {createModalOpen && (
                  <CreateModalComponent
                    stepType={stepType}
                    open={createModalOpen}
                    screenSize={resizeScreen}
                    toggle={this.onToggleCreateModal}
                    closeButtonHandler={this.onBackArrowClickHandler}
                    onSave={this.onSaveTrail}
                  />
                )}
                <div>
                  {/* {currentTourType === 'tooltip' && tourType === 'preview' && !overlay && tourStep!=='' && tourUrl && <TooltipOverlay data={trailList} toggle={this.onClearToggle} tourStep={tourStep} tour={this.tourManage} tourSide={this.state.tourSide} />} */}
                  {/* <TooltipOverlay data={trailList} toggle={this.onClearToggle} tourStep={tourStep} tour={this.tourManage} tourSide={this.state.tourSide} /> */}
                  {currentTourType === "tooltip" &&
                    tourType === "preview" &&
                    !overlay &&
                    tourStep !== "" &&
                    tourUrl && (
                      <WebUserTour
                        tooltipRef={this.state.tooltipRef}
                        tooltipToggle={() =>
                          this.setState({
                            tooltipRef: !this.state.tooltipRef,
                          })
                        }
                        onDone={onDone}
                        data={trailList}
                        toggle={this.onClearToggle}
                        tourStep={tourStep}
                        tour={this.tourManage}
                        closeButtonHandler={this.onCloseTooltipHandle}
                        setLoadingState={this.setLoadingState}
                        onNotFoundTarget={this.onNotFoundTarget}
                        onSendTipModalOpen={this.onSendTipModalOpen}
                        onChangeTourType={this.props.onChangeTourType}
                        mainToggle={this.props.mainToggle}
                      />
                    )}
                  {currentTourType === "video" &&
                    tourType === "preview" &&
                    !overlay &&
                    tourStep !== "" &&
                    tourUrl && (
                      <VideoTour
                        audioRef={this.state.audioRef}
                        audioToggle={() =>
                          this.setState({
                            audioRef: !this.state.audioRef,
                          })
                        }
                        onDone={onDone}
                        data={trailList}
                        toggle={this.onClearToggle}
                        tourStep={tourStep}
                        tour={this.tourManage}
                        tourSide={this.state.tourSide}
                        closeButtonHandler={this.onCloseTooltipHandle}
                        setLoadingState={this.setLoadingState}
                      />
                    )}
                  {currentTourType === "audio" &&
                    tourType === "preview" &&
                    !overlay &&
                    tourStep !== "" &&
                    tourUrl && (
                      <AudioTour
                        videoRef={this.state.videoRef}
                        videoToggle={() =>
                          this.setState({
                            videoRef: !this.state.videoRef,
                          })
                        }
                        onDone={onDone}
                        data={trailList}
                        toggle={this.onClearToggle}
                        tourStep={tourStep}
                        tour={this.tourManage}
                        tourSide={this.state.tourSide}
                        closeButtonHandler={this.onCloseTooltipHandle}
                        setLoadingState={this.setLoadingState}
                      />
                    )}
                  {currentTourType === "modal" &&
                    tourType === "preview" &&
                    !overlay &&
                    tourStep !== "" &&
                    tourUrl && (
                      <PreviewModalComponent
                        previewModalRef={this.state.previewModalRef}
                        previewModalToggle={() =>
                          this.setState({
                            previewModalRef: !this.state.previewModalRef,
                          })
                        }
                        onDone={onDone}
                        data={trailList}
                        toggle={this.onClearToggle}
                        tourStep={tourStep}
                        tour={this.tourManage}
                        tourSide={this.state.tourSide}
                        closeButtonHandler={this.onCloseTooltipHandle}
                        setLoadingState={this.setLoadingState}
                        onSendTipModalOpen={this.onSendTipModalOpen}
                      />
                    )}
                  {/* <img src={require('./images/trailit_logo.png')} className="trailit_logoLeftBottom" alt=".."/> */}
                </div>
                <div
                  className={`sidepopup ${
                    openSidebar ? "open trail_builder_side_panel_open" : ""
                  } ${
                    tourType === "audio" ||
                    tourType === "video" ||
                    tourType === "Make Edit"
                      ? "white_background"
                      : "transparent_background"
                  }`}
                >
                  <div className="space"></div>
                  {/* <div className="preview">.
                Preview
              </div>
              <div className="createToolTip">.
                Create Tool Tip
              </div> */}

                  {sideBar}

                  {/* <div className="audio">.
            Create Audio
          </div>
          <div className="savedTrails">.
            Saved Trails
          </div> */}
                  <div className="space"></div>
                </div>
                {this.state.dynamicPopupButton && (
                  <button
                    onTouchEnd={this.openPopup}
                    className="menu pop"
                    onClick={this.openPopup}
                  >
                    <img
                      alt=""
                      src={require("./images/trailit_X_button_new.png")}
                    />
                  </button>
                )}
              </div>
            </div>
          </div>
        </Draggable>
      );
    }

    return (
      <>
        <style>{defaultButtonCss1}</style>
        <style>{defaultButtonCss2}</style>
        <style>{defaultButtonCss3}</style>

        {componentData}
      </>
    );
  }
}

// app = document.createElement('div');
// app.id = 'my-extension-root-flip';
// app.href = chrome.extension.getURL('/static/css/content.css');

// document.body.appendChild(app);

// extension-test(content.js)
const extensionTestID = "extension-div";
let extensionTest = document.getElementById(extensionTestID);

if (!extensionTest) {
  extensionTest = document.createElement("div");
  extensionTest.setAttribute("id", extensionTestID);
  window.document.body.append(extensionTest);
  extensionTest.attachShadow({ mode: "open" });
}

// Select our shadow host
let extensionRoot = document.getElementById("extension-div");
if (extensionRoot) {
  // Create the shadow root
  const shadowRoot = extensionRoot.shadowRoot;

  if (shadowRoot) {
    app = shadowRoot.getElementById("my-extension-root-flip");
    if (!app) {
      // Create a div element
      app = document.createElement("div");
      app.setAttribute("id", "my-extension-root-flip");

      const modalOpen = document.createElement("div");
      modalOpen.setAttribute("class", "modal-open");

      const style0 = document.createElement("style");
      style0.textContent = myExtensionRootFlipCss0;

      const style1 = document.createElement("style");
      style1.textContent = myExtensionRootFlipCss1;

      const style2 = document.createElement("style");
      style2.textContent = myExtensionRootFlipCss2;

      const style3 = document.createElement("style");
      style3.textContent = myExtensionRootFlipCss3;

      const style4 = document.createElement("style");
      style4.textContent = myExtensionRootFlipCss4;

      const style5 = document.createElement("style");
      style5.textContent = myExtensionRootFlipCss5;

      const tooltipStyle1 = document.createElement("style");
      tooltipStyle1.textContent = tooltipCss1;

      // Append div to shadow DOM
      shadowRoot.appendChild(app);
      extensionRoot.shadowRoot.appendChild(app);
      extensionRoot.shadowRoot.appendChild(style1);
      extensionRoot.shadowRoot.appendChild(style2);
      extensionRoot.shadowRoot.appendChild(style3);
      extensionRoot.shadowRoot.appendChild(style4);
      extensionRoot.shadowRoot.appendChild(style5);
      extensionRoot.shadowRoot.appendChild(tooltipStyle1);
      shadowRoot.appendChild(modalOpen);
    }
  }
}

class MainFlip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainComponent: false,
      defaultComponent: false,
      isFlipped: false,
      tourType: "",
    };

    this.onStorageHandleChange = this.onStorageHandleChange.bind(this);
  }

  componentDidMount() {
    document.addEventListener(
      "visibilitychange",
      function () {
        if (document.hidden) {
          //...
        }
      },
      false
    );

    chrome.storage.local.get(
      ["openButton", "tourType"],
      function (items) {
        this.onChangeTourType(items.tourType);
        if (items.tourType !== "preview") {
          this.setState({
            defaultComponent: false,
            mainComponent: false,
            isFlipped: false,
          });
        } else {
          toggle();
          this.setState({
            defaultComponent: true,
            mainComponent: false,
            isFlipped: true,
          });
        }
      }.bind(this)
    );
  }

  onStorageHandleChange = (changes) => {
    if (
      changes.newValue.tourType !== undefined &&
      changes.newValue.tourType === ""
    ) {
      this.setState({ isFlipped: false });
    } else if (
      changes.newValue.tourType !== undefined &&
      changes.newValue.tourType !== ""
    ) {
      this.setState({ isFlipped: true });
    }
  };

  mainToggle = (isTrue) => {
    if (this.state.mainComponent || isTrue) {
      root1 = "block";
      this.setState({
        defaultComponent: true,
        mainComponent: false,
        isFlipped: true,
      });
    } else {
      root1 = "none";
      this.setState({
        defaultComponent: false,
        mainComponent: true,
        isFlipped: false,
      });
    }
  };

  downToggleButton = (status) => {
    if (status) {
      root1 = "block";
      this.setState({ defaultComponent: true, mainComponent: false });
    } else {
      root1 = "none";
      this.setState({ defaultComponent: false, mainComponent: true });
    }
  };

  onChangeTourType = (type) => {
    if (type === "" || type === undefined) {
      this.setState({ isFlipped: false, tourType: "" });
    } else {
      this.setState({ isFlipped: true, tourType: type });
    }
  };

  render() {
    const { defaultComponent, mainComponent, isFlipped, tourType } = this.state;
    defaultComp = defaultComponent;
    flipped = isFlipped;

    return (
      <React.Fragment>
        <style>{mainFlipCss}</style>
        <div className={`trail_card ${isFlipped ? "trail_flipped" : ""}`}>
          <div className={"trail_card__face trail_card__face--front"}>
            <Main
              mainToggle={this.mainToggle}
              onChangeTourType={this.onChangeTourType}
              downToggleButton={this.downToggleButton}
            />
          </div>
          <div className={"trail_card__face trail_card__face--back"}>
            <DefaultButton
              mainToggle={this.mainToggle}
              onChangeTourType={this.onChangeTourType}
              downToggleButton={this.downToggleButton}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

chrome.storage.local.get(
  ["isAuth", "auth_Tokan", "userData"],
  function (items) {
    if (items.isAuth) {
      ReactDOM.render(<MainFlip />, app);
      // ReactDOM.render(<Main />, app);
      // ReactDOM.render(<DefaultButton />, appd);
    }
  }
);

app.style.display = "none";

// app = document.createElement('div');
// app.id = 'my-extension-root';
// app.href = chrome.extension.getURL('/static/css/content.css');
// appd = document.createElement('div');
// appd.id = 'my-extension-defaultroot';
// appd.href = chrome.extension.getURL('/static/css/content.css');

// document.body.appendChild(app);
// document.body.appendChild(appd);
// chrome.storage.local.get(['isAuth', 'auth_Tokan', 'userData'], function (items) {
// 	if (items.isAuth) {
// 		ReactDOM.render(<Main />, app);
// 		ReactDOM.render(<DefaultButton />, appd);
// 	}
// });
// appd.style.display = 'none';
chrome.runtime.onConnect.addListener((port) => {
  port.onMessage.addListener((msgObj, sender, sendResponse) => {
    if (msgObj.message === "check_login_status") {
      chrome.storage.local.get(["isAuth"], (items) => {
        if (items.isAuth) {
          port.postMessage({ response: true });
        } else {
          port.postMessage({ response: false });
        }
      });
    }
  });
});

chrome.runtime.onMessage.addListener((msgObj, sender, sendResponse) => {
  if (msgObj.status === "logout") {
    app.style.display = "none";
    // appd.style.display = 'none';
  } else {
    if (
      msgObj.subject !== "DOMObj" &&
      msgObj !== "chrome_modal" &&
      msgObj.subject !== "CreateTrail" &&
      msgObj.message !== "urlChanged"
    ) {
      setTimeout(() => {
        // to handle open tab in entire tab
        chrome.storage.local.get(["openButton", "tourType"], function (items) {
          // if(items.openButton === 'CreateTrail') {
          // 	appd.style.display = 'block';
          // } else {
          if (app.style.display === "none") {
            // this.props.toggle();
            app.style.display = "block";
            // toggle()
          }
          // }
        });
      });
    }
  }
});

const toggle = () => {
  if (app.style.display === "none") {
    app.style.display = "block";
    // appd.style.display = 'none';
  } else {
    app.style.display = "none";
    // appd.style.display = 'block';
  }
};

// const downToggleButton = (status) => {
// 	if (status) {
// 		appd.style.display = 'block';
// 	} else {
// 		appd.style.display = 'none';
// 	}
// }
