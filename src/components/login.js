/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import { Form, Input, Button, Col } from "antd";
import axios from "axios";
import * as nearAPI from "near-api-js";
import { Near } from "near-api-js";

import { keyPairGenerate } from "../code/generateKey";

const chrome = window.chrome;
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

const NearConfig = {
  networkId: "testnet",
  nodeUrl: "https://rpc.testnet.near.org",
  contractName: "trail.testnet",
  walletUrl: "https://wallet.testnet.near.org",
  helperUrl: "https://helper.testnet.near.org",
};

const { networkId, nodeUrl, walletUrl } = NearConfig;

const near = new Near({
  networkId,
  nodeUrl,
  walletUrl,
  deps: { keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore() },
});
const wallet = new nearAPI.WalletAccount(near);

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: "",
      isAuth: false,
      isLoading: false,
    };
  }

  // Antd form reference
  formRef = React.createRef();

  // Facebook response function
  responseFacebook = (response) => {
    console.log(response);
  };

  // On click to submit function
  onClickToSubmit = (values) => {
    this.setState({ isLoading: true });

    axios
      .post(`${process.env.REACT_APP_NEW_MS2_DOMAIN}user/login`, values, {
        withCredentials: true,
      })
      .then((res, err) => {
        if (res.status === 200) {
          const { responseCode, responseMessage } = res.data.data.response;

          if (responseCode === 208 || responseCode === 404) {
            this.setState({ errors: responseMessage });

            setTimeout(() => {
              this.setState({ errors: "" });
            }, 3000);
          } else {
            const { jwt, user } = res.data.data.response.data;

            chrome.storage.local.set(
              {
                isAuth: true,
                reload: true,
                userData: user,
                authToken: jwt,
                keypair: keyPairGenerate(),
                trailDeleteModal: { value: null },
              },
              function () {
                // bkg.console.log("JWT, USER", jwt, user)
              }
            );

            this.props.clickToRedirect("userProfile");

            chrome.storage.local.set({ notification: true });

            this.setState({ isAuth: true });
          }
        }

        this.setState({ isLoading: false });
      })
      .catch((err) => {
        console.log("err", err);

        this.setState({ isLoading: false });
      });
  };

  onNearLoginCilck = async () => {
    const appTitle = "Trail Web App";
    await wallet.requestSignIn(NearConfig.contractName, appTitle);
  };

  // Validate password with regular expression function
  validateToNextPassword = (rule, value, callback) => {
    var digit = /^(.*[0-9]+.*)$/;
    var upper = /^(.*[A-Z]+.*)$/;
    var lower = /^(.*[a-z]+.*)$/;

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

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  render() {
    return (
      <div className="trailMain">
        <div className="auth_tr_wrapper">
          <div className="trailit_userPanal trailit_Big">
            <div className="trailit_userPanalRightBox">
              <div className="trailit_userPanalHeaderBox login_header">
                <img
                  width="62px"
                  height="70px"
                  alt="white_logo"
                  src={require("../images/trailit_logo-white-not-next-01.svg")}
                />
                <span className="welcome_text">Welcome to Trailit</span>
              </div>
              <div className="trailit_userPanalContentBox">
                {this.state.errors && (
                  <p className="tr_error">{this.state.errors}</p>
                )}
                <div className="pt-5">
                  <Form
                    className="row"
                    ref={this.formRef}
                    name="control-ref"
                    onFinish={this.onClickToSubmit}
                    onFinishFailed={this.onFinishFailed}
                  >
                    <div className="signup_message">
                      Enter your details to login. If you have not registered in
                      please{" "}
                      <b>
                        <a
                          className="tr_link"
                          target="_blank"
                          href="http://169.61.16.14#signup"
                        >
                          Sign Up Now
                        </a>
                      </b>
                    </div>
                    <Col md={12}>
                      <button
                        type="button"
                        className="trailit_near"
                        onClick={() =>
                          window.open("http://169.61.16.14#signin")
                        }
                      >
                        Sign In with Near
                      </button>
                    </Col>
                    <Col md={12} className="text-center">
                      <Button
                        className="py-2 px-3 btn-sm btn-pink trailit_signin"
                        onClick={() =>
                          window.open("http://169.61.16.14#signin")
                        }
                      >
                        Sign in
                      </Button>
                      {/* <button type="button" className="trailit_facebook">
                        Sign In with Facebook
                      </button>
                      <button type="button" className="trailit_google">
                        Sign In with Google
                      </button> */}
                      {/* <hr className="trailit_dark trail_or" /> */}
                    </Col>
                    {/* <Col md={12}>
                      <Form.Item
                        name="email"
                        className="form-input"
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
                        <Input placeholder="Email" className="tr_input" />
                      </Form.Item>
                    </Col>
                    <Col md={12}>
                      <Form.Item
                        name="password"
                        className="form-input"
                        rules={[
                          {
                            // min: 3,
                            required: true,
                            message: "Please enter password!",
                          },
                        ]}
                      >
                        <Input
                          type="password"
                          placeholder="Password"
                          className="tr_input"
                        />
                      </Form.Item>
                    </Col>
                    <Col md={12} className="text-center mb-3 mb-1">
                      <Button
                        disabled={this.state.isLoading}
                        htmlType="submit"
                        className="py-2 px-3 btn-sm btn-pink"
                      >
                        Sign in
                      </Button>
                    </Col> */}
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
