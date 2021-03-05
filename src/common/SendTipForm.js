import React, { Component } from "react";
import { Form, Input, Button } from "antd";

class SendTipForm extends Component {
  // Antd form reference
  formRef = React.createRef();

  constructor(props) {
    super();

    this.state = {
      toAddress: "",
      amount: "",
    };
  }

  onChangeInput = (e) => {
    e.stopPropagation();

    this.setState({ [e.target.name]: e.target.value });
  };

  onCancelButtonClick = (e) => {
    e.preventDefault();
    // Reset form fields
    this.formRef.current.resetFields();

    // Set state to init value
    this.setState({
      toAddress: "",
      amount: "",
    });

    // Call on cancel function
    this.props.onCancel();
  };

  render() {
    const { toAddress, amount } = this.state;
    const { isLoading, sendLoader } = this.props;

    return (
      <div>
        {isLoading && (
          <div className="trailit_loaderBox">
            <div class="trial_spinner">
              <img
                class="ring1"
                src={require(`../images/loding1.png`)}
                alt="loader"
              />
              <img
                class="ring2"
                src={require(`../images/loding2.png`)}
                alt="loader"
              />
            </div>
          </div>
        )}
        {/* <div className="tr_description">
          <p>Microtipping enabled through Celo Blockchain cUSD</p>
        </div> */}
        <Form
          ref={this.formRef}
          // onFinishFailed={(error) => console.log("error", error)}
          onFinish={() => this.props.sendTip(toAddress, amount)}
          initialValues={{
            toAddress,
            amount,
          }}
        >
          <Form.Item
            className="mb-2"
            name="toAddress"
            rules={[
              {
                required: true,
                message: "Please enter address!",
              },
            ]}
          >
            <Input
              type="text"
              placeholder="Enter address"
              autoComplete="off"
              onKeyDown={this.onChangeInput}
            />
          </Form.Item>
          <Form.Item
            name="amount"
            rules={[
              {
                required: true,
                message: "Please enter amount!",
              },
            ]}
          >
            <Input
              type="text"
              placeholder="Enter amount"
              autoComplete="off"
              onKeyDown={this.onChangeInput}
            />
          </Form.Item>
          <div className="trailButtonsWrapper">
            <button
              type="primary"
              htmlType="button"
              disabled={sendLoader}
              className={`${
                this.props.modal
                  ? "ant-btn ant-btn-primary trail_add_step_btn"
                  : "trailit_btnGray"
              }`}
              onClick={this.onCancelButtonClick}
              // className="ant-btn ant-btn-primary trail_add_step_btn"
            >
              Cancel
            </button>

            <button
              type="primary"
              htmlType="submit"
              className={`${
                this.props.modal
                  ? "ant-btn ant-btn-primary trail_add_step_btn"
                  : "trailit_btnPink"
              }`}
              // className="ant-btn ant-btn-primary trail_add_step_btn"
              // onClick={ (e) => this.props.sendTip(toAddress, amount) }
              disabled={sendLoader}
            >
              Send Tip
              {/* {sendLoader ? "Sending..." : "Send Tip"} */}
            </button>
          </div>
        </Form>
        {/* <form> */}
        {/* <div className="d-block">
            <input
              type="text"
              className="trailit_inputIntro trailit_mb3"
              placeholder="Enter your to address"
              name="toAddress"
              onChange={this.onChangeInput}
              value={toAddress }
            />
          </div> */}

        {/* <div className="d-block">
            <input
              type="text"
              className="trailit_inputIntro trailit_mb3"
              placeholder="Enter your amount"
              name="amount"
              onChange={this.onChangeInput}
              value={amount}
            />
          </div> */}

        {/* <div className="trailit_userPanalFooterBox">
            <button 
              type="button" 
              className="ant-btn ant-btn-primary trail_add_step_btn"
              onClick={ this.onCancelButtonClick }
            >
              Cancel
            </button>
            <button
              type="submit"              
              onClick={ (e) => this.props.sendTip(e, toAddress, amount) }
              disabled={ sendLoader || ( !this.state.amount.length > 0 && !this.state.length > 0 ) }
              className="ant-btn ant-btn-primary trail_add_step_btn"
            >
              {sendLoader ? "Loading..." : "Send Tip"}
            </button>
          </div> */}
        {/* </form> */}
      </div>
    );
  }
}

export default SendTipForm;
