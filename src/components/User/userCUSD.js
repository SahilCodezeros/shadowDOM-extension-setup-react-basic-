import React, { Component } from "react";
import $ from "jquery";

import { wallet } from "../../common/celo";
import SendTipForm from "../../common/SendTipForm";
import { sendTransection } from "../../code/sendtx";

const chrome = window.chrome;

class userCUSD extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      toAddress: "",
      amount: "",
      sendLoader: false,
      privateKey: this.props.privateKey,
      isSuccess: false,
      setError: null,
    };
  }

  componentDidMount() {
    this.setState({ privateKey: this.props.privateKey });
  }

  onChangeInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  sendTip = async (toAddress, amount) => {
    this.setState({ sendLoader: true });

    const { privateKey } = this.state;
    sendTransection(privateKey, toAddress, amount)
      .then((res) => {
        if (res && res.code && res.code === 400) {
          throw new Error(res.err);
        }

        // Set is success state
        this.setState({ isSuccess: true });

        setTimeout(() => {
          // Hide side modal
          this.props.onHideSlide();

          // Set is success state
          this.setState({ isSuccess: false });
        }, 5000);
      })
      .catch((err) => {
        console.log("err", err);

        this.setState({ setError: err.message });

        setTimeout(() => {
          // Hide side modal
          this.props.onHideSlide();

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

  onClear = () => {
    $("body").attr("class", "");
  };
  onSlide = () => {
    this.setState({ slideBalance: !this.state.slideBalance });
  };

  render() {
    const { isLoading, toAddress, amount, sendLoader } = this.state;

    return (
      <div className="trailit_userPanalLeftBox">
        {this.state.isSuccess ? (
          <div className="tr_description">
            <p style={{ color: "#0c8026", textAlign: "center" }}>
              Transaction completed successfully.
            </p>
          </div>
        ) : !this.state.setError ? (
          <SendTipForm
            isLoading={isLoading}
            sendLoader={sendLoader}
            sendTip={this.sendTip}
            onCancel={this.onClear}
          />
        ) : (
          <div className="tr_description">
            <p style={{ color: "#d21e1e", textAlign: "center" }}>
              {this.state.setError}
            </p>
          </div>
        )}
      </div>
    );
  }
}

export default userCUSD;
