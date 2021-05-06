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
        <Form
          ref={this.formRef}
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
              autoComplete="off"
              placeholder="Enter address"
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
              min="0"
              type="number"
              autoComplete="off"
              placeholder="Enter amount"
              onKeyDown={this.onChangeInput}
            />
          </Form.Item>
          <div className={`trailButtonsWrapper ${this.props.modal && "mt-8"}`}>
            <button
              type="primary"
              htmlType="button"
              disabled={sendLoader}
              className={`${
                this.props.modal ? "custom-button" : "trailit_btnGray"
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
                this.props.modal ? "custom-button" : "trailit_btnPink"
              }`}
              disabled={sendLoader}
            >
              Send Tip
            </button>
          </div>
        </Form>
      </div>
    );
  }
}

export default SendTipForm;
