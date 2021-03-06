import React, { Component } from "react";
import $ from "jquery";

import { isValidated } from "./validation";
import { getAllCategory, createTrailId } from "../../common/axios";

const chrome = window.chrome;
class userProfileAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryList: [],
      trail_description: "",
      trail_title: "",
      errors: {},
      isSubmit: false,
      isLoading: false,
    };
  }

  async componentDidMount() {
    let categoryResult = await getAllCategory();

    if (categoryResult.status == 200) {
      this.setState({ categoryList: categoryResult.data.response });
    }
  }

  onClear = () => {
    this.setState({
      trail_description: "",
      trail_title: "",
      errors: {},
      isSubmit: false,
      isLoading: false,
    });

    $("body").attr("class", "");
  };

  onClickToSubmit = (e) => {
    e.preventDefault();
    const { errors, isValid } = isValidated(this.state);
    console.log("error", errors);
    console.log("isValid", isValid);

    if (!isValid) {
      this.setState({ errors });
    } else {
      this.setState({ isSubmit: true, isLoading: true });

      const { trail_title, trail_description } = this.state;
      chrome.storage.local.get(
        ["trail_web_user_tour", "userData"],
        async function (items) {
          let obj = {
            // user_id: items.userData._id,
            trail_name: trail_title,
            trail_description,
            trail_category_id: 1,
            trail_user_status: "private",
            cover_image_url: "",
          };

          const result = await createTrailId(obj);

          this.setState({ isLoading: false });
          if (result.status == 200) {
            if (result.data.response.statusCode == 400) {
              this.setState({
                errors: { trail_already_exist: result.data.response.result },
              });
              setTimeout(() => {
                this.setState({ errors: {} });
              }, 2000);
            } else {
              this.onClear();
              this.props.onAddRaw(result.data.response[0]);
              $("body").attr("class", "");
            }
          }
        }.bind(this)
      );
    }
  };

  onChangeInput = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      const { errors, isValid } = isValidated(this.state);
      this.setState({ errors });
      // if(this.state.isSubmit) {
      // }
    });
  };

  render() {
    const {
      isLoading,
      categoryList,
      trail_title,
      trail_description,
      errors,
    } = this.state;

    return (
      <div className="trailit_userPanalLeftBox">
        {isLoading && (
          <div className="trailit_loaderBox">
            <div class="trial_spinner">
              <img
                alt="loading1"
                class="ring1"
                src={require(`../../images/loding1.png`)}
              />
              <img
                alt="loading2"
                class="ring2"
                src={require(`../../images/loding2.png`)}
              />
            </div>
          </div>
        )}
        <div className="trailit_editZTitle trialit_mb4">Add Trail</div>
        <form name="add-trail-frm">
          {errors.trail_already_exist !== undefined && (
            <div className="trailit-already-exist-error">
              {errors.trail_already_exist}
            </div>
          )}
          <div className="d-block">
            <input
              type="text"
              className="trailit_inputTitle trailit_mb3"
              name="trail_title"
              value={trail_title}
              onChange={this.onChangeInput}
              placeholder="Trail Title"
            />
            {errors.trail_title != undefined && (
              <div className="trailit-validation-error">
                {errors.trail_title}
              </div>
            )}
          </div>
          <div className="d-block">
            <textarea
              rows="5"
              className="trailit_inputIntro trailit_mb3"
              name="trail_description"
              value={trail_description}
              onChange={this.onChangeInput}
              placeholder="Type Introduction here ..."
            ></textarea>
          </div>
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
              onClick={this.onClickToSubmit}
              className="trailit_btnPink"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default userProfileAdd;
