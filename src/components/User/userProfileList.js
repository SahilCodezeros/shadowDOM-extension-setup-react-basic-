import React, { Component } from "react";
import $ from "jquery";
import _ from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faThLarge } from "@fortawesome/free-solid-svg-icons";

import { getUserOneTrail } from "../../common/axios";
import BgImage from "../../images/trailit_bx_img.png";

const chrome = window.chrome;

const resizeScreen = () => {
  return window.innerWidth <= 760;
};

class UserProfileList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
      isLoading: this.props.isLoading,
      list: this.props.list,
      isLoadingLink: false,
      isCopiedLink: false,
      isCopiedError: false,
      viewType: "grid",
    };
  }

  styleBgImg = {
    background: `linear-gradient(0deg, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url(${BgImage}) center center / cover no-repeat scroll`,
  };

  async componentWillReceiveProps(nextProps, prevState) {
    const { addRaw, getOneEditRow } = nextProps;

    let list = await nextProps.list;
    if (!_.isEmpty(addRaw) && this.props.title === "My Trails") {
      let findRow = await list.find((r) => r.trail_id == addRaw.trail_id);
      if (findRow == undefined) {
        list.push(addRaw);
      }
    }

    if (!_.isEmpty(getOneEditRow)) {
      let findInd = await list.findIndex(
        (r) => r.trail_id == getOneEditRow.trail_id
      );
      if (findInd != -1) {
        list[findInd] = getOneEditRow;
      }
    }

    this.setState({ isLoading: nextProps.isLoading, list: list });
  }

  onClickToEdit = (e, res) => {
    e.stopPropagation();
    $("body").attr("class", "trailit_EditTrailShow");
    this.props.getRow(res);
    this.props.onEdit(true);
    this.setState({ showMenu: false });
  };

  handleClickMenu = (e) => {
    e.stopPropagation();
    this.setState({ showMenu: !this.state.showMenu });
  };

  onMouseLeave = (e) => {
    if (this.state.showMenu) {
      // Set show menu state
      this.setState({ showMenu: false });
    }
  };

  onPublishLink = async (e, res) => {
    e.stopPropagation();
    // this.setState({ isLoadingLink: true });
    const { userId } = this.props;
    let screen = resizeScreen() ? "mobile" : "web";
    let result = await getUserOneTrail(res.trail_id, screen);

    if (result.status == 200) {
      if (result.data.response.statusCode == 200) {
        let trailList = result.data.response.result;
        if (
          result.data.response &&
          result.data.response.result &&
          result.data.response.result.length > 0
        ) {
          const trailId = res.trail_id;
          const URL = trailList[0].url;
          let qryString = URL.split("?").length > 1 ? "&" : "?";
          const trailUrl = `${process.env.REACT_APP_GO_TRAILIT_URL}/live/${URL}${qryString}trailUserId=${userId}&trailId=${trailId}&trailPreview=true&tourStep=1&singleStepPreview=undefined&trailDataId=undefined&previewUserId=undefined&redirectUrl=undefined`;

          function copyStringToClipboard(str) {
            // Create new element
            var el = document.createElement("textarea");

            // Set value (string to be copied)
            el.value = str;

            // Set non-editable to avoid focus and move outside of view
            el.setAttribute("readonly", "");
            el.style = {
              position: "absolute",
              left: "-9999px",
            };
            document.body.appendChild(el);

            // Select text inside element
            el.select();

            // Copy text to clipboard
            document.execCommand("copy");

            // Remove temporary element
            document.body.removeChild(el);
          }

          copyStringToClipboard(trailUrl);

          alert("Successfully copied");
        } else {
          this.setState({ isCopiedError: true });

          setTimeout(() => {
            this.setState({ isCopiedError: false });
          }, 2000);
        }
      }
    }
  };

  onBoxClick = (e, res) => {
    e.preventDefault();
    // ...query for the active tab...
    chrome.runtime.sendMessage("", {
      type: "DOMInfo",
      status: true,
    });

    this.setState((prevState) => {
      return {
        reload: !prevState.reload,
      };
    });

    let followedTrailUserData = null;

    if (res.userData) {
      followedTrailUserData = { ...res.userData };
    }

    chrome.storage.local.set({
      trail_id: res.trail_id,
      trail_name: res.trail_name,
      trail_web_user_tour: undefined,
      followedTrailUserData,
      trail_status: res.trail_user_status,
    });
    chrome.storage.local.get(
      ["authToken", "userData", "reload", "openButton"],
      function (items) {
        if (items.openButton === undefined) {
          chrome.storage.local.set({ openButton: "ManageTrail" });
        }
      }
    );

    window.close();
  };

  deleteButtonHandler = (e, trail) => {
    e.stopPropagation();

    chrome.storage.local.set({
      trailDeleteModal: {
        value: "open",
        title: trail.trail_name,
        id: trail.trail_id,
      },
    });
  };

  onListButtonHandler = () => {
    // Set state
    this.setState({ viewType: "list" });
  };

  onGridButtonHandler = () => {
    // Set state
    this.setState({ viewType: "grid" });
  };

  render() {
    const { isLoading, list, viewType } = this.state;
    const {
      profileImage,
      errorMsg,
      firstName,
      lastName,
      userName,
    } = this.props;

    // let userImage = "";
    // this.props.title === "Following" ? res.userData && res.userData.profileImage !== "" ? res.userData.profileImage : require("../../images/user.png")
    // : profileImage == "" ? require("../../images/user.png") : profileImage
    // if (
    //   this.props.title === "Following"
    // ) {
    //   if (res.userData && res.userData.profileImage !== "") {

    //   } else {

    //   }
    //   userImage = items.authorData.profileImage;
    // } else if (
    //   items.followedTrailUserData &&
    //   items.followedTrailUserData.profileImage
    // ) {
    //   userImage = items.followedTrailUserData.profileImage;
    // } else if (items.userData && items.userData.profileImage) {
    //   userImage = items.userData.profileImage;
    // }

    return (
      <div className="trailit_userPanalContentInnerBox">
        <div className="activeTab-list-grid-view">
          <div className="trailit_18600 trailit_mb3">{this.props.title}</div>
          <div className="list-grid-buttons">
            <button
              onClick={this.onListButtonHandler}
              className={`list-button ${viewType === "list" ? "active" : ""}`}
            >
              <FontAwesomeIcon icon={faList} size="sm" />
            </button>
            <button
              onClick={this.onGridButtonHandler}
              className={`grid-button ${viewType === "grid" ? "active" : ""}`}
            >
              <FontAwesomeIcon icon={faThLarge} size="sm" />
            </button>
          </div>
        </div>
        <div className="trailit_scrollBoxs" onScroll={this.props.onScroll}>
          <div className="trailit_Row">
            {list &&
              list.length === 0 &&
              !isLoading &&
              errorMsg.length === 0 && (
                <div className="trailit_noData">Data Not Available</div>
              )}
            {errorMsg.length > 0 && !isLoading && (
              <div className="trailit_errorData">{errorMsg}</div>
            )}
            {list &&
              list.length > 0 &&
              errorMsg.length === 0 &&
              list.map((res) => {
                let styles = "";
                let stlStatus = false;

                if (
                  res.cover_image_url !== "" &&
                  res.cover_image_url !== null &&
                  res.cover_image_url !== "undefined"
                ) {
                  stlStatus = true;

                  let fileUrl = res.cover_image_url;

                  if (fileUrl.includes("(") && fileUrl.includes(")")) {
                    fileUrl = `'${fileUrl}'`;
                  }

                  styles = {
                    background: `linear-gradient(0deg, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url(${fileUrl}) center center / cover no-repeat scroll`,
                  };
                }

                let user_name = "-";
                let user_image = require("../../images/user.png");

                if (this.props.title === "Following") {
                  if (
                    res.userData &&
                    res.userData.firstName &&
                    res.userData.lastName
                  ) {
                    user_name = `${res.userData.firstName} ${res.userData.lastName}`;
                  } else if (res.userData && res.userData.userName) {
                    user_name = res.userData.userName;
                  }

                  if (
                    res.userData &&
                    res.userData.profileImage &&
                    res.userData.profileImage !== ""
                  ) {
                    user_image = res.userData.profileImage;
                  }
                } else {
                  if (firstName && lastName) {
                    user_name = `${firstName} ${lastName}`;
                  } else if (userName) {
                    user_name = userName;
                  }

                  if (profileImage !== "") {
                    user_image = profileImage;
                  }
                }

                return (
                  <div
                    className={`trailit_col6 ${
                      viewType === "list" ? "width100" : ""
                    }`}
                  >
                    <div
                      className="trailit_bx"
                      onClick={(e) => this.onBoxClick(e, res)}
                      onMouseLeave={this.onMouseLeave}
                    >
                      <div className="img">
                        <span
                          className="img_bg"
                          style={stlStatus ? styles : this.styleBgImg}
                        >
                          <div className="trailit_img_content">
                            <div className="trailit_top">
                              {this.props.title !== "Following" && (
                                <div className="trailit_dotsMenu">
                                  <button
                                    type="button"
                                    onClick={this.handleClickMenu}
                                    className="trailit_dotsButton"
                                  >
                                    <img
                                      width="16px"
                                      src={require("../../images/dots.svg")}
                                      alt="dots"
                                    />
                                  </button>
                                  {this.state.showMenu && (
                                    <div className="trailit_dotsMenuList">
                                      <button
                                        type="button"
                                        onClick={(e) =>
                                          this.onPublishLink(e, res)
                                        }
                                      >
                                        Share
                                      </button>
                                      <button
                                        type="button"
                                        onClick={(e) =>
                                          this.onClickToEdit(e, res)
                                        }
                                      >
                                        Edit
                                      </button>
                                      {/* <button type="button">Publish</button> */}
                                      <button
                                        type="button"
                                        onClick={(e) =>
                                          this.deleteButtonHandler(e, res)
                                        }
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                            <div className="trailit_bottom">
                              <div className="trailit_bottom_content d-flex justify-content-between">
                                <div className="trailit_10_500_roboto trailit_text_white align-items-center d-flex">
                                  <img
                                    alt="user_image"
                                    className="trialit_user"
                                    src={user_image}
                                  />
                                  <span className="trailit_ml2 trailit_ellipsis_40">
                                    {user_name}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </span>
                      </div>
                      <div className="trailit_bx_title">
                        <div className="trailit_10_500 trailit_ellips_2line">
                          {res.trail_name}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}

export default UserProfileList;
