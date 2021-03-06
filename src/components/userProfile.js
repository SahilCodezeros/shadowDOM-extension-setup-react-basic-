import React from "react";
import { Button } from "antd";
import Cropper from "react-easy-crop";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";

import { socket } from "../common/socket";
import { getBalance } from "../code/getBalance";
import { getFollowTrails } from "../common/axios";
import { wallet, getAddress } from "../common/celo";
import getCroppedImg, { blobToFile } from "../AppUtill";
import { handleFileUpload } from "../common/audAndVidCommon";
import SettingsComponent from "../components/settingsComponents";

import {
  getUserSingleTrail,
  getAllCategory,
  UpdateProfilePicture,
  getUser,
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

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      userName: "",
      firstName: "",
      lastName: "",
      isPreview: false,
      isPreviewSingleTrail: false,
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
      listTitle: "Loading...",
      editTrail: false,
      categoryList: [],
      isLoading: false,
      profileImage: "",
      slideBalance: false,
      privateKey: "",
      nearBalance: "",
      showSetting: false,
      isDisabled: false,
      profilePreview: null,
      crop: { x: 0, y: 0 },
      zoom: 1,
      croppedAreaPixels: null,
      errorMsg: "",
      id: null,
      totalPages: 1,
      page: 1,
      loadMore: false,
    };
  }

  // Get NEAR account balance
  getNearAccountBalance() {
    // Get NEAR balance of user

    chrome.storage.local.get(["userData"], (items) => {
      if (items.userData && items.userData._id) {
        // getBalance(items.userData._id)
        //   .then((res) => {
        //     this.setState({ nearBalance: res });
        //   })
        //   .catch((err) => {
        //     this.setState({ nearBalance: null });
        //   });
      }
    });
  }

  // On setting button click function
  onSettingButtonClick() {
    chrome.storage.local.set({ showSetting: true });
  }

  // Get user's followed trail data
  userFollowedTrailData = async ({ page = 1 }) => {
    try {
      // Get follow data of user from database
      const followData = await getFollowTrails(page);
      const followedTrails = followData.data;

      if (
        followedTrails &&
        followedTrails.response &&
        followedTrails.response.statusCode === "200"
      ) {
        page === 1 && $(".trailit_scrollBoxs").animate({ scrollTop: 0 });

        this.setState({
          myTrilsListData:
            page > 1
              ? [
                  ...this.state.myTrilsListData,
                  ...followedTrails.response.result,
                ]
              : followedTrails.response.result,
          isLoading: false,
          errorMsg: "",
          totalPages: followedTrails.response.totalPages,
        });
      } else {
        this.setState({
          myTrilsListData: [],
          isLoading: false,
          errorMsg: "",
        });
      }
    } catch (err) {
      this.setState({
        isLoading: false,
        myTrilsListData: [],
        errorMsg: "Error while fetching data",
      });
    }
  };

  // Get user's trails data
  fetchUserTrailsData = async ({ page = 1 }) => {
    try {
      const { data } = await getUserSingleTrail(page);

      if (data?.response?.statusCode === "200") {
        page === 1 && $(".trailit_scrollBoxs").animate({ scrollTop: 0 });

        this.setState({
          myTrilsListData:
            page > 1
              ? [...this.state.myTrilsListData, ...data.response.result]
              : data.response.result,
          getOneEditRow: {},
          addRaw: {},
          totalPages: data?.response?.totalPages,
        });
      }

      this.setState({ isLoading: false, errorMsg: "" });
    } catch (err) {
      this.setState({
        isLoading: false,
        myTrilsListData: [],
        errorMsg: "Error while fetching data",
      });
    }
  };

  onScroll = (e) => {
    const el = e.target;

    if (el.scrollTop + el.clientHeight === el.scrollHeight) {
      if (this.state.totalPages > this.state.page) {
        this.setState({ loadMore: true, isLoading: true });
      }
    }
  };

  getData = () => {
    if (this.state.totalPages > this.state.page) {
      this.setState({ page: this.state.page + 1 });
    }

    this.setState({ loadMore: false });
  };

  updateAutologoutTime = async () => {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(["autoLogoutTime"], (items) => {
        const logoutTime = items.autoLogoutTime;
        if (logoutTime < Date.now()) {
          // Call auto logout function
          this.props.onClickToLogout();

          resolve();
        } else {
          chrome.runtime.sendMessage("", {
            type: "updateTimeout",
            status: true,
          });

          resolve();
        }
      });
    });
  };

  componentWillUnmount() {
    // Remove click event listener
    window.removeEventListener("click", this.updateAutologoutTime);
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.listTitle !== this.state.listTitle) {
      if (this.state.listTitle === "Following") {
        // Call user followed trail data function
        await this.userFollowedTrailData({ page: 1 });
      } else {
        await this.fetchUserTrailsData({ page: 1 });
      }
    }
    if (prevState.loadMore !== this.state.loadMore && this.state.loadMore) {
      this.getData();
    }

    if (prevState.page !== this.state.page) {
      if (this.state.listTitle === "Following") {
        // Call user followed trail data function
        await this.userFollowedTrailData({ page: this.state.page });
      } else {
        await this.fetchUserTrailsData({ page: this.state.page });
      }
    }
  }

  async componentDidMount() {
    // Call update auto logout time function
    await this.updateAutologoutTime();

    // Add click event listener
    window.addEventListener("click", this.updateAutologoutTime);

    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      if (tabs && tabs.length > 0) {
        const tab = tabs[0];
        if (tab.url.includes("chrome://newtab/") && tab.title === "New Tab") {
          chrome.tabs.update({ url: "http://169.61.16.14/" });
        }
      }
    });

    // let balance = 0;
    // let address = "";
    let balance = await wallet.balance();
    let address = await getAddress(
      "0x8920565d5Bc8cf942eD2E18df4B71b8695a22D9B"
    );
    this.setState({ isLoading: true });
    chrome.storage.local.get(
      [
        "authToken",
        "userData",
        "reload",
        "keypair",
        "isPreview",
        "isPreviewSingleTrail",
        "currentTrailsTab",
        "tourType",
        "currentTourType",
      ],
      async function (items) {
        // // Get NEAR balance of user
        this.getNearAccountBalance();
        // getBalance()
        //   .then(res => {
        //
        //     this.setState({ nearBalance: res });
        //   })
        //   .catch();

        let userData = { ...items.userData };

        // Get user data
        const { data, status } = await getUser(userData._id);

        if (status === 200 && data.data && data.data.response) {
          userData = { ...data.data.response };
        } else {
          // Logout if user not found
          this.props.onClickToLogout();
        }

        let disabledButton = false;
        if (
          items.currentTourType &&
          items.currentTourType !== "" &&
          items.tourType &&
          items.tourType === "preview"
        ) {
          disabledButton = true;
        }

        this.setState({
          profileImage: userData.profileImage ? userData.profileImage : "",
          privateKey: items.keypair,
          userName: userData.userName,
          id: userData._id ? userData._id : null,
          firstName: userData.firstName ? userData.firstName : null,
          lastName: userData.lastName ? userData.lastName : null,
          isPreview: items.isPreview,
          isPreviewSingleTrail: items.isPreviewSingleTrail,
          isDisabled: disabledButton,
          listTitle: items.currentTrailsTab
            ? items.currentTrailsTab
            : "My Trails",
          // nearBalance: balance
        });

        let followerLength;
        // socket.emit("userId", userData._id);
        // socket.on("followerList", (data) => {
        //   followerLength = data.length;
        //   this.setState({
        //     email: userData.email,
        //     balance: balance,
        //     address,
        //     followerLength,
        //   });
        // });

        // if (this.state.listTitle && this.state.listTitle  === "Following") {
        //   // Call user followed trail data function
        //   await this.userFollowedTrailData({ page: this.state.page });
        // } else {
        //   // Call fetch user's trail data function
        //   await this.fetchUserTrailsData({ page: this.state.page });
        // }

        this.setState({
          email: userData.email,
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

    chrome.storage.onChanged.addListener(this.handlerStorageChanges);
  }

  handlerStorageChanges = (changes) => {
    if (
      changes.tourType &&
      changes.tourType.newValue === "preview" &&
      changes.currentTourType &&
      changes.currentTourType.newValue !== ""
    ) {
      // Set isDisabled state
      this.setState({ isDisabled: true });
    }

    if (
      changes.tourType &&
      changes.tourType.newValue === "" &&
      changes.currentTourType &&
      changes.currentTourType.newValue === ""
    ) {
      // Set isDisabled state
      this.setState({ isDisabled: false });
    }
  };

  onClickToList = async (listTitle) => {
    this.setState({ listTitle, isLoading: true, page: 1 });
    chrome.storage.local.set({ currentTrailsTab: listTitle });
  };

  onChangeTrailEdit = (editTrail) => {
    this.setState({ editTrail, slideBalance: false });
  };

  onClickToCreateTrail = (e) => {
    this.onChangeTrailEdit(false);
    this.setState({ slideBalance: false });
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

  showCroppedImage = async () => {
    try {
      const croppedImage = await getCroppedImg(
        this.state.profilePreview,
        this.state.croppedAreaPixels,
        0
      );

      let file = blobToFile(croppedImage, "profile-picture.png");

      // Call upload file function
      await this.uploadFile(file);

      //
      chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
        if (
          tabs.length > 0 &&
          (tabs[0].url.includes("http://169.61.16.14") ||
            tabs[0].url.includes("http://localhost:"))
        ) {
          chrome.tabs.reload();
        }
      });

      // Call on cancel handler
      this.onCancelHandler();
    } catch (err) {}
  };

  uploadFile = (file) => {
    this.setState({ isLoading: true });

    return handleFileUpload(file)
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

        new Promise((resolve, reject) => {
          chrome.storage.local.get(
            ["authToken", "userData", "reload"],
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

                resolve();
              } catch (e) {
                this.setState({
                  isLoading: false,
                });

                resolve();
              }
            }.bind(this)
          );
        });
      })
      .catch((err) => {
        this.setState({ isLoading: false });
      });
  };

  handleImageUpload = (e) => {
    const [file] = e.target.files;
    if (file) {
      // Set profile preview state
      this.setState({ profilePreview: URL.createObjectURL(file) });
    }
  };

  handleChange = async (e) => {
    const file = e.target.files[0];
    e.target.value = null;

    // Upload file function
    await this.uploadFile(file);

    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      if (
        tabs.length > 0 &&
        (tabs[0].url.includes("http://169.61.16.14") ||
          tabs[0].url.includes("http://localhost:"))
      ) {
        chrome.tabs.reload();
      }
    });
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

  onCropComplete = (croppedArea, croppedAreaPixels) => {
    // Set cropped area pixels
    this.setState({ croppedAreaPixels });
  };

  setCrop = (data) => {
    // Set crop
    this.setState({ crop: data });
  };

  onCancelHandler = () => {
    // Set state
    this.setState({
      zoom: 1,
      crop: { x: 0, y: 0 },
      profilePreview: null,
      croppedAreaPixels: null,
    });
  };

  render() {
    //
    const {
      id,
      userName,
      firstName,
      lastName,
      isLoading,
      listTitle,
      showSetting,
      myTrilsListData,
      categoryList,
      editTrail,
      getOneEditRow,
      addRaw,
      profileImage,
      slideBalance,
      nearBalance,
      isDisabled,
      profilePreview,
      crop,
      zoom,
      errorMsg,
    } = this.state;

    let list = [];
    if (listTitle === "My Trails") {
      list = myTrilsListData;
    } else if (listTitle === "Following") {
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
              <img
                alt="loading1"
                class="ring1"
                src={require(`../images/loding1.png`)}
              />
              <img
                alt="loading2"
                class="ring2"
                src={require(`../images/loding2.png`)}
              />
            </div>
          </div>
        )}
        <div className="trailit_userPanalRightBox">
          <div className="trailit_userPanalHeaderBox">
            <div className="trailit_userIMG">
              <div className="trailit-image-and-input">
                {profilePreview && (
                  <Cropper
                    aspect={1}
                    crop={crop}
                    zoom={zoom}
                    cropShape={"round"}
                    image={profilePreview}
                    onCropComplete={this.onCropComplete}
                    onCropChange={(data) => this.setState({ crop: data })}
                    onZoomChange={(data) => this.setState({ zoom: data })}
                  />
                )}

                <img
                  className="trailit-user-profile-image"
                  src={
                    profileImage == ""
                      ? require("../images/user.png")
                      : profileImage
                  }
                  alt="user"
                />

                {!profilePreview && (
                  <div>
                    <input
                      type="file"
                      name="media"
                      // accept="image/*"
                      accept=".png, .jpg, .jpeg"
                      // onChange={this.handleChange}
                      onChange={this.handleImageUpload}
                    />

                    <span className="trailitUploadICon">
                      <img src={require("../images/edit.svg")} alt=".." />
                    </span>
                  </div>
                )}
              </div>

              {profilePreview && (
                <div className="text-center trailit-image-button-container">
                  <Button
                    size="small"
                    icon={<CloseOutlined />}
                    onClick={this.onCancelHandler}
                    className="trailit-close-button"
                  />
                  <Button
                    size="small"
                    icon={<CheckOutlined />}
                    onClick={this.showCroppedImage}
                    className="trailit-check-button"
                  />
                </div>
              )}
            </div>
            <div className="trailit_userBxs">
              <div className="trailit_userName trailit_ellips">
                {firstName && lastName ? `${firstName} ${lastName}` : userName}
              </div>
              {nearBalance && (
                <div
                  className="trailit_userName cursor_pointer"
                  onClick={this.onSlide}
                >
                  {nearBalance}{" "}
                  <span className="trailit_userSubName"> NEAR</span>
                </div>
              )}
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
              onScroll={this.onScroll}
              userId={id}
              list={list}
              addRaw={addRaw}
              title={listTitle}
              errorMsg={errorMsg}
              lastName={lastName}
              userName={userName}
              firstName={firstName}
              isLoading={isLoading}
              getRow={this.getEditData}
              profileImage={profileImage}
              getOneEditRow={getOneEditRow}
              onEdit={this.onChangeTrailEdit}
            />
            <div className="trailit_userPanalFooterBox">
              {listTitle === "My Trails" && (
                <button
                  type="button"
                  disabled={isDisabled}
                  className={`${
                    isDisabled ? "trailit_btnGray" : "trailit_btnPink"
                  }`}
                  onClick={(e) => this.onClickToList("Following")}
                >
                  Following
                </button>
              )}
              {listTitle === "Following" && (
                <button
                  type="button"
                  className="trailit_btnPink"
                  onClick={(e) => this.onClickToList("My Trails")}
                >
                  My Trails
                </button>
              )}
              {listTitle === "Loading..." && (
                <button disabled type="button" className="trailit_btnPink">
                  {listTitle}
                </button>
              )}
              <button
                type="button"
                className="trailit_btnPink"
                onClick={this.onClickToCreateTrail}
              >
                Create Trail
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserProfile;
