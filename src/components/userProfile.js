import React from "react";
import _ from "lodash";

import { socket } from "../common/socket";
import { getBalance } from "../code/getBalance";
import { getFollowTrails } from "../common/axios";
import { wallet, getAddress } from "../common/celo";
import { handleFileUpload } from "../common/audAndVidCommon";
import SettingsComponent from "../components/settingsComponents";

// import BgImage from "../images/trailit_bx_img.png";
import {
  getAllNotification,
  getUserSingleTrail,
  getAllUser,
  getAllCategory,
  UpdateProfilePicture,
} from "../common/axios";
import {
  UserProfileEdit,
  UserProfileList,
  UserProfileAdd,
  UserCUSD,
} from "./User";
import $ from "jquery";

import "../index.css";

const chrome = window.chrome;
// let bkg = chrome.extension.getBackgroundPage();

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      userName: "",
      firstName: "",
      lastName: "",
      isPreview: false,
      reload: false,
      response: false,
      balance: "0.00",
      address: "0.00",
      toAddress: "",
      amount: "",
      sendLoader: false,
      tab: "logout",
      notificationData: [],
      myTrilsListData: [],
      followerLength: 0,
      showMenu: false,
      getOneEditRow: {},
      addRaw: {},
      listTitle: "My Trails",
      editTrail: false,
      categoryList: [],
      isLoading: false,
      profileImage: "",
      slideBalance: false,
      privateKey: "",
      nearBalance: 0,
      showSetting: false,
    };
  }

  // Get NEAR account balance
  getNearAccountBalance() {
    // Get NEAR balance of user
    getBalance()
      .then((res) => {
        this.setState({ nearBalance: res });
      })
      .catch();
  }

  // On setting button click function
  onSettingButtonClick() {
    chrome.storage.local.set({ showSetting: true });
    // chrome.storage.local.get(["showSetting"], (items) => {
    //   if (!items.showSetting) {
    //     chrome.storage.local.set({ showSetting: true });
    //   } else {
    //     chrome.storage.local.set({ showSetting: false });
    //   }
    // });
  }

  async componentDidMount() {
    let balance = await wallet.balance();
    let address = await getAddress(
      "0x8920565d5Bc8cf942eD2E18df4B71b8695a22D9B"
    );
    this.setState({ isLoading: true });
    chrome.storage.local.get(
      ["auth_Tokan", "userData", "reload", "keypair", "isPreview"],
      async function (items) {
        // // Get NEAR balance of user
        this.getNearAccountBalance();
        // getBalance()
        //   .then(res => {
        //     console.log('res', res);
        //     this.setState({ nearBalance: res });
        //   })
        //   .catch();

        this.setState({
          profileImage: items.userData.profileImage
            ? items.userData.profileImage
            : "",
          privateKey: items.keypair,
          userName: items.userData.userName,
          firstName: items.userData.firstName ? items.userData.firstName : null,
          lastName: items.userData.lastName ? items.userData.lastName : null,
          isPreview: items.isPreview,
          // nearBalance: balance
        });

        let followerLength;
        socket.emit("userId", items.userData._id);
        socket.on("followerList", (data) => {
          followerLength = data.length;
          this.setState({
            email: items.userData.email,
            balance: balance,
            address,
            followerLength,
          });
        });

        const data = {
          user_id: items.userData._id,
          flag: "unread",
        };

        const result = await getUserSingleTrail(items.userData._id);

        if (result.status == 200) {
          this.setState({
            myTrilsListData: result.data.response,
            getOneEditRow: {},
            addRaw: {},
          });
        }

        this.setState({ isLoading: false });

        // getAllNotification(data).then(async (res) => {
        //   const data = res.data.response;

        //   if (data.result && _.isArray(data.result) && data.result.length > 0) {
        //     let user = await getAllUser();

        //     let filterdFollowers = data.result.map((el) => {
        //       for (let i = 0; i < user.data.data.response.length; i++) {
        //         if (el.creator_id === user.data.data.response[i]._id) {
        //           return {
        //             email: user.data.data.response[i].email,
        //             pictures: user.data.data.response[i].pictures,
        //             creator_id: user.data.data.response[i]._id,
        //             currUserId: el.user_id,
        //             created: el.created,
        //           };
        //         }
        //       }
        //     });

        //     filterdFollowers = filterdFollowers.sort((a, b) => {
        //       return b.created - a.created;
        //     });

        //     // Update notificationData state
        //     this.setState({
        //       notificationData: filterdFollowers,
        //       getOneEditRow: {},
        //       addRaw: {},
        //     });
        //   }
        // });

        this.setState({
          email: items.userData.email,
          balance: balance,
          address,
        });

        chrome.storage.local.set({ reload: false });

        if (items.reload) {
          chrome.tabs.query(
            { active: true, lastFocusedWindow: true },
            (tabs) => {
              chrome.tabs.reload();
            }
          );
        }
      }.bind(this)
    );

    // Get all category function
    let { data, status } = await getAllCategory();
    if (status === 200) {
      if (data.response && data.response.result) {
        this.setState({ categoryList: data.response.result });
      } else {
        this.setState({ categoryList: [] });
      }
    }

    if (document.querySelector("#my-extension-defaultroot")) {
      document.querySelector("#my-extension-defaultroot").style.display =
        "none";
    }

    if (document.querySelector("#my-extension-root-flip")) {
      document.querySelector("#my-extension-root-flip").style.display = "none";
    }
  }

  onClickToList = (listTitle) => {
    chrome.storage.local.get(
      ["auth_Tokan", "userData", "reload"],
      async function (items) {
        if (listTitle === "Followed") {
          // Get follow data of user from database
          const followData = await getFollowTrails(items.userData._id);
          const followedTrails = followData.data;
          console.log("followedTrails", followedTrails.response.result);
          if (
            followedTrails &&
            followedTrails.response &&
            followedTrails.response.statusCode === "200"
          ) {
            this.setState({
              myTrilsListData: followedTrails.response.result,
              isLoading: false,
            });
          }
        } else {
          const result = await getUserSingleTrail(items.userData._id);

          if (result.status == 200) {
            this.setState({
              myTrilsListData: result.data.response,
              isLoading: false,
            });
          }
        }
      }.bind(this)
    );

    this.setState({ listTitle, isLoading: true });
  };

  onChangeTrailEdit = (editTrail) => {
    this.setState({ editTrail, slideBalance: false });
  };

  onClickToCreateTrail = (e) => {
    this.onChangeTrailEdit(false);
    this.setState({ listTitle: "My Trails", slideBalance: false });
    $("body").attr("class", "trailit_EditTrailShow");
  };

  getEditData = (res) => {
    this.setState({ getOneEditRow: res });
  };

  handleClickMenu = (e, status) => {
    e.stopPropagation();
    this.setState({ showMenu: status });
  };

  onAddRaw = (data) => {
    this.setState({ addRaw: data });
  };

  uploadFile = (file) => {
    this.setState({ isLoading: true });

    handleFileUpload(file)
      .then((response) => {
        return response;
      })
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        this.setState({
          profileImage: data.response.result.fileUrl,
        });

        chrome.storage.local.get(
          ["auth_Tokan", "userData", "reload"],
          async function (items) {
            try {
              let r = await UpdateProfilePicture({
                email: items.userData.email,
                profileImage: data.response.result.fileUrl,
              });

              if (r.status == 200) {
                chrome.storage.local.set({
                  userData: {
                    ...items.userData,
                    profileImage: data.response.result.fileUrl,
                  },
                });
              }

              this.setState({
                isLoading: false,
              });
            } catch (e) {
              this.setState({
                isLoading: false,
              });
            }
          }.bind(this)
        );
      })
      .catch((err) => {
        this.setState({ isLoading: false });
        console.log("Error fetching profile " + err);
      });
  };

  handleChange = (e) => {
    const { tourType } = this.state;
    const file = e.target.files[0];
    const fileType = file.type.split("/");
    e.target.value = null;

    // Upload file function
    this.uploadFile(file);
  };

  onSlide = () => {
    this.onChangeTrailEdit(false);
    this.setState({ slideBalance: true });
    $("body").attr("class", "trailit_cUSDForm");
  };

  onHideSlide = () => {
    // Get NEAR balance of user
    this.getNearAccountBalance();

    this.setState({ slideBalance: false });
    $("body").attr("class", "");
  };

  render() {
    // console.log('getBalance', getBalance());
    const {
      userName,
      firstName,
      lastName,
      isPreview,
      isLoading,
      listTitle,
      showSetting,
      myTrilsListData,
      categoryList,
      notificationData,
      editTrail,
      getOneEditRow,
      addRaw,
      profileImage,
      slideBalance,
      nearBalance,
    } = this.state;

    let list = [];
    if (listTitle === "My Trails") {
      list = myTrilsListData;
    } else if (listTitle === "Followed") {
      list = myTrilsListData;
    }

    return (
      <div className="trailit_userPanal trailit_Big">
        {editTrail && (
          <UserProfileEdit
            categoryList={categoryList}
            data={getOneEditRow}
            getEditData={this.getEditData}
          />
        )}
        {!editTrail && !slideBalance && (
          <UserProfileAdd onAddRaw={this.onAddRaw} addRaw={addRaw} />
        )}
        {slideBalance && (
          <UserCUSD
            privateKey={this.state.privateKey}
            onHideSlide={this.onHideSlide}
          />
        )}
        {isLoading && (
          <div className="trailit_loaderBox">
            <div class="trial_spinner">
              <img class="ring1" src={require(`../images/loding1.png`)} />
              <img class="ring2" src={require(`../images/loding2.png`)} />
            </div>
          </div>
        )}
        <div className="trailit_userPanalRightBox">
          <div className="trailit_userPanalHeaderBox">
            <div className="trailit_userIMG">
              <img
                src={
                  profileImage == ""
                    ? require("../images/user.png")
                    : this.state.profileImage
                }
                alt="user"
              />
              <input type="file" name="media" onChange={this.handleChange} />
              <span className="trailitUploadICon">
                <img src={require("../images/edit.svg")} alt=".." />
              </span>
            </div>
            <div className="trailit_userBxs">
              <div className="trailit_userName trailit_ellips">
                {firstName && lastName ? `${firstName} ${lastName}` : userName}
              </div>
              <div className="trailit_userSubName trailit_ellips">
                Founder, Creator, Designer
              </div>
              <div
                className="trailit_userName cursor_pointer"
                onClick={this.onSlide}
              >
                {this.state.nearBalance}{" "}
                <span className="trailit_userSubName"> NEAR</span>
              </div>
              <div className="trailit_3Boxs">
                <div className="trailit_3Boxs1">
                  <div className="trailit_userName">100k</div>
                  <div className="trailit_userSubName">Likes</div>
                </div>
                <div className="trailit_3Boxs2">
                  <div className="trailit_userName">5.2k</div>
                  <div className="trailit_userSubName">Followers</div>
                </div>
                <div className="trailit_3Boxs3">
                  <div className="trailit_userName">120</div>
                  <div className="trailit_userSubName">Following</div>
                </div>
              </div>
              {showSetting && <SettingsComponent />}
            </div>
            <div
              className="trailit_dotsMenuMain"
              onMouseLeave={(e) => this.handleClickMenu(e, false)}
            >
              <div className="trailit_dotsMenu">
                <button
                  type="button"
                  onClick={(e) => this.handleClickMenu(e, true)}
                  className="trailit_dotsButton"
                >
                  <img src={require("../images/dots.svg")} alt="dots" />
                </button>
                {this.state.showMenu && (
                  <div className="trailit_dotsMenuList">
                    <button type="button" onClick={this.onSettingButtonClick}>
                      Settings
                    </button>
                    <button type="button">Notifications</button>
                    <button
                      type="button"
                      onClick={() => {
                        this.setState({ showMenu: false });
                        this.props.onClickToLogout();
                      }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="trailit_userPanalContentBox">
            <UserProfileList
              profileImage={profileImage}
              title={listTitle}
              list={list}
              getOneEditRow={getOneEditRow}
              addRaw={addRaw}
              onEdit={this.onChangeTrailEdit}
              getRow={this.getEditData}
              isLoading={false}
            />
            <div className="trailit_userPanalFooterBox">
              {listTitle == "My Trails" && (
                <button
                  type="button"
                  className="trailit_btnPink"
                  onClick={(e) => this.onClickToList("Followed")}
                >
                  Followed
                </button>
              )}
              {listTitle == "Followed" && (
                <button
                  type="button"
                  className="trailit_btnPink"
                  onClick={(e) => this.onClickToList("My Trails")}
                >
                  My Trails
                </button>
              )}
              {!isPreview && (
                <button
                  type="button"
                  className="trailit_btnPink"
                  onClick={this.onClickToCreateTrail}
                >
                  Create Trail
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserProfile;
