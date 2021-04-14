import React from "react";
import { Form, Upload, Input, Button, Avatar } from "antd";
import Icon, { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

import { createTrailId } from "../common/axios";
import { handleFileUpload } from "../common/audAndVidCommon";

const chrome = window.chrome;
// let bkg = chrome.extension.getBackgroundPage();
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: "",
      fileLoading: false,
      profileImage: "",
      filename: "",
      isLoading: false,
    };
  }

  // Antd form reference
  formRef = React.createRef();

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  /**
   * onClick to submit
   */
  onClickToSubmit = (values) => {
    this.setState({ isLoading: true });

    values = { ...values, profileImage: this.state.profileImage };
    axios
      .post(`${process.env.REACT_APP_NEW_MS2_DOMAIN}user/register`, values, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status == 200) {
          const { responseCode, responseMessage } = res.data.data.response;

          if (responseCode === 208) {
            this.setState({ errors: responseMessage });
            setTimeout(() => {
              this.setState({ errors: "" });
            }, 3000);
          } else {
            const user_id = res.data.data.response.userProfile.id;
            const trail_name = "init trail";
            this.setState({ profileImage: "", filename: "" });
            // Use user_id to create trail_id in user_tour table
            // createTrailId(user_id, trail_name);

            this.props.clickToRedirect("userConfirmation");
          }
        }

        this.setState({ isLoading: false });
      })
      .catch((err) => {
        console.log("err", err);

        this.setState({ isLoading: false });
      });
  };

  /**
   * Validate password with regular expression
   */
  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;

    var digit = /^(.*[0-9]+.*)$/;
    var upper = /^(.*[A-Z]+.*)$/;
    var lower = /^(.*[a-z]+.*  )$/;

    if (value && !digit.test(value)) {
      callback("Password must contain one digit");
    }

    if (value && !upper.test(value)) {
      callback("Password must contain one uppercase letter");
    }

    if (value && !lower.test(value)) {
      callback("Password must contain one lowercase letter");
    }

    if (value && value.length <= 8) {
      callback("Password must be 8 digit");
    }

    if (value && this.state.confirmDirty) {
      this.formRef.validateFields(["confirm"], { force: true });
    }

    callback();
  };

  render() {
    return (
      <div className={"trailMain"}>
        <div className="tr_wrapper">
          {this.state.fileLoading && (
            <div className="trailit_loaderBox">
              <div class="trial_spinner">
                <img class="ring1" src={require(`../images/loding1.png`)} />
                <img class="ring2" src={require(`../images/loding2.png`)} />
              </div>
            </div>
          )}
          <img
            className="logo_login"
            src={require("../images/icon129.png")}
            alt="trailit_icon"
          />
          <div className="tr_title">Welcome to the Trailit.</div>
          <div className="tr_subtitle">
            Enter your details to signup. If you have already signup than
            <a
              href="javascript:;"
              onClick={(e) => this.props.clickToRedirect("login")}
              className="tr_link fw_400"
            >
              Signin Now
            </a>
          </div>
          {this.state.errors && <p className="tr_error">{this.state.errors}</p>}
          <div className="tr_label">Signup</div>
          <Form
            ref={this.formRef}
            name="normal_login"
            onFinish={this.onClickToSubmit}
            onFinishFailed={this.onFinishFailed}
          >
            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  message: "Please enter valid email!",
                },
                {
                  required: true,
                  message: "Please enter email!",
                },
              ]}
            >
              {/* {getFieldDecorator('email', {
                  rules: [
                  {
                    type: 'email',
                    message: 'Please enter valid email!',
                  },
                  {
                    required: true,
                    message: 'Please enter your email!',
                  },
                  ],
                })(
                <Input
                  placeholder="Enter your email" className="tr_input"
                />,
              )} */}
              <Input placeholder="Enter your email" className="tr_input" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please enter password!",
                },
              ]}
            >
              {/* {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: 'Please enter password!',
                  }
                ],
              })(
                <Input
                  type="password"
                  placeholder="Password" className="tr_input"
                />,
              )} */}
              <Input
                type="password"
                placeholder="Password"
                className="tr_input"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="tr_button"
                onClick={this.onClickToSubmit}
                disabled={this.state.isLoading}
              >
                Signup Now
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

export default Signup;
