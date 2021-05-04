import React, { PureComponent } from "react";
import $ from "jquery";

import { isValidated } from "./validation";
import { UpdateSingleTrail } from "../../common/axios";
import { handleFileUpload } from "../../common/audAndVidCommon";
import _ from "lodash";

const chrome = window.chrome;
class UserProfileEdit extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      categoryList: [],
      cover_image_url: "",
      trail_categor_id: "",
      trail_description: "",
      trail_id: "",
      trail_title: "",
      trail_user_status: "",
      errors: {},
      isSubmit: false,
      isLoading: false,
      fileLoading: false,
    };
  }

  async componentDidMount() {
    // let categoryResult = await getAllCategory();
    // if(categoryResult.status == 200) {
    //     this.setState({categoryList: categoryResult.data.response});
    // }

    const { data, categoryList } = this.props;

    this.setState({
      categoryList: categoryList,
      cover_image_url: data.cover_image_url,
      trail_intro_url: data.trail_intro_url,
      trail_categor_id: data.trail_categor_id,
      trail_description: data.trail_description,
      trail_id: data.trail_id,
      trail_title: data.trail_name,
      trail_user_status: data.trail_user_status,
    });
  }

  componentWillReceiveProps(nextProps, prevState) {
    const { data, categoryList } = nextProps;

    this.setState({
      categoryList: categoryList,
      cover_image_url: data.cover_image_url,
      trail_categor_id: data.trail_categor_id,
      trail_description: data.trail_description,
      trail_id: data.trail_id,
      trail_title: data.trail_name,
      trail_user_status: data.trail_user_status,
    });
  }

  onChangeInput = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      const { errors } = isValidated(this.state);
      this.setState({ errors });
      // if(this.state.isSubmit) {
      // }
    });
  };

  uploadFile = (file, fieldLabel) => {
    const { errors } = isValidated({ [fieldLabel]:file });

    console.log({errors});

    if (errors.hasOwnProperty(fieldLabel)) {
      this.setState((prevState) => {
        return {
          errors: { ...prevState.errors, ...errors },
        };
      });

      return;
    }

    this.setState({ isLoading: true });

    handleFileUpload(file)
      .then((response) => {
        return response;
      })
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        console.log("reponse", {
          [fieldLabel]: data.response.result.fileUrl,
          [fieldLabel+"_name"]: file.name,
          isLoading: false,
        });
        this.setState({
          [fieldLabel]: data.response.result.fileUrl,
          [fieldLabel+"_name"]: file.name,
          isLoading: false,
        });
      })
      .catch((err) => {
        this.setState({ isLoading: false });
        console.log("Error fetching profile " + err);
      });
  };

  handleChange = (e, fieldLabel) => {
    // const { tourType } = this.state;
    const file = e.target.files[0];
    // const fileType = file.type.split("/");
    e.target.value = null;
    // Upload file function
    this.uploadFile(file,fieldLabel);
  };

  onCheckedUserPrivate = async (e) => {
    if (e.target.value == null || e.target.value === "") {
      e.target.value = "public";
    }

    let trail_user_status = e.target.value === "public" ? "private" : "public";

    await this.setState({ trail_user_status: trail_user_status }, () => {
      //   console.log("trail_user_statusfffffffff", this.state.trail_user_status);
    });
  };

  onChangeSelect = async (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      const { errors } = isValidated(this.state);
      this.setState({ errors });
    });
  };

  onClear = () => {
    this.setState({
      categoryList: [],
      cover_image_url: "",
      trail_intro_url: "",
      cover_image_url_name: "",
      trail_intro_url_name: "",
      trail_categor_id: "",
      trail_description: "",
      trail_id: "",
      trail_title: "",
      trail_user_status: "",
      errors: {},
      isSubmit: false,
      isLoading: false,
      fileLoading: false,
    });

    $("body").attr("class", "");
  };

  onClickToSubmit = async (e) => {
    e.preventDefault();
    const { errors, isValid } = isValidated(this.state);

    if (!isValid || _.keys(this.state.errors).length > 0) {
      this.setState({ errors });
    } else {
      this.setState({ isSubmit: true, isLoading: true });

      chrome.storage.local.get(
        ["userData"],
        async function (items) {
          // Update single trail function
          const { data, status } = await UpdateSingleTrail(
            items.userData._id,
            this.state.trail_id,
            this.state
          );

          this.setState({ isLoading: false });

          if (status === 200) {
            if (data.response.statusCode == 400) {
              this.setState({
                errors: { trail_already_exist: data.response.result },
              });
              setTimeout(() => {
                this.setState({ errors: {} });
              }, 2000);
            } else {
              this.props.getEditData(data.response.result);
              this.onClear();
              $("body").attr("class", "");
            }
          }
        }.bind(this)
      );
    }
  };

  updateErrorState = (errors) => {
    this.setState({ errors });
  };

  componentDidUpdate(prevProps, prevState) {
    const { errors } = this.state;

    if (errors && errors.file) {
      setTimeout(() => {
        const errorState = { ...errors };
        delete errorState.file;

        this.setState({ errors: errorState });
      }, 5000);
    }
  }

  render() {
    const {
      isLoading,
      cover_image_url,
      trail_intro_url,
      cover_image_url_name,
      trail_intro_url_name,
      trail_categor_id,
      trail_description,
      trail_title,
      trail_user_status,
      errors,
    } = this.state;
    const { categoryList } = this.props;

    return (
      <div className="trailit_userPanalLeftBox">
        {isLoading && (
          <div className="trailit_loaderBox">
            <div class="trial_spinner">
              <img
                class="ring1"
                src={require(`../../images/loding1.png`)}
                alt="spinner-ring1"
              />
              <img
                class="ring2"
                src={require(`../../images/loding2.png`)}
                alt="spinner-ring2"
              />
            </div>
          </div>
        )}
        <div className="trailit_editZTitle trialit_mb4">Edit Trail</div>
        <form>
          {errors.trail_already_exist !== undefined && (
            <div className="trailit-already-exist-error">
              {errors.trail_already_exist}
            </div>
          )}
          <div className="d-block">
            <input
              type="text"
              className="trailit_inputTitle trailit_mb3"
              placeholder="Trail Title"
              name="trail_title"
              value={trail_title}
              onChange={this.onChangeInput}
            />
            {errors.trail_title !== undefined && (
              <div className="trailit-validation-error">
                {errors.trail_title}
              </div>
            )}
          </div>
          <div className="d-block">
            <textarea
              rows="5"
              className="trailit_inputIntro trailit_mb3"
              placeholder="Type Introduction here ..."
              name="trail_description"
              value={trail_description}
              onChange={this.onChangeInput}
            ></textarea>
          </div>
          <div className="d-block">
            <select
              className="trailit_selectBox trailit_mb3"
              name="trail_categor_id"
              value={trail_categor_id}
              onChange={this.onChangeSelect}
            >
              <option value="">Select your category</option>
              {categoryList.map((res) => (
                <option value={parseInt(res.trail_category_id)}>
                  {res.trail_category_name}
                </option>
              ))}
            </select>
            {errors.trail_categor_id !== undefined && (
              <div className="trailit-validation-error">
                {errors.trail_categor_id}
              </div>
            )}
          </div>
          <label className="trailit_12700 d-block trailit_mb3">
            COVER IMAGE
          </label>
          <label className="trailit_12500 d-block trialit_mb1">
            {!cover_image_url 
              ? `Choose a photo that represents your trail. Max 8MB.`
              : cover_image_url_name
              ? cover_image_url_name
              : cover_image_url.split("/")[3]}
          </label>
          <div className="trailit_uploadImage trialit_mb4">
            <input
              type="file"
              name="media"
              accept="image/*"
              onChange={(e)=>this.handleChange(e, "cover_image_url")}
            />
            <span className="d-block cursor">Upload Image</span>
          </div>
          {errors.cover_image_url && (
            <div className="trailit-validation-error">{errors.cover_image_url}</div>
          )}

<label className="trailit_12700 d-block trailit_mb3">
           Intro Image/ Video
          </label>
          <label className="trailit_12500 d-block trialit_mb1">
            {!trail_intro_url
              ? `Choose a photo that represents your trail. Max 8MB.`
              : trail_intro_url_name
              ? trail_intro_url_name
              : trail_intro_url.split("/")[3]}
          </label>
          <div className="trailit_uploadImage trialit_mb4">
            <input
              type="file"
              name="media"
              accept="image/*, video/*"
              onChange={(e)=>this.handleChange(e, "trail_intro_url")}
            />
            <span className="d-block cursor">Upload Image/ Video</span>
          </div>
          {errors.trail_intro_url && (
            <div className="trailit-validation-error">{errors.trail_intro_url}</div>
          )}
          <div className="d-block trailit_checkbox trailit_mb3">
            <input
              type="checkbox"
              name=""
              value={trail_user_status}
              checked={trail_user_status === "private"}
              onClick={this.onCheckedUserPrivate}
            />
            <span></span>
            <label>Make this trail private</label>
          </div>
          {trail_user_status === "public" && (
            <div style={{ marginBottom: 5 }}>
              {" "}
              By deselecting this, your Trail will be visible on Trailit.co's
              main website. Are you sure you're ready to go live? If so, click
              on 'Save' to publish{" "}
            </div>
          )}
          <div className="trailit_userPanalFooterBox">
            <button
              type="button"
              className="trailit_btnGray"
              onClick={this.onClear}
            >
              Cancel
            </button>
            <button
              type="button"
              className="trailit_btnPink"
              onClick={this.onClickToSubmit}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default UserProfileEdit;
