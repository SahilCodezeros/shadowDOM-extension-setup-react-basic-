import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import $ from "jquery";
import { Button } from "antd";

class ContinueTourConfirmation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trailStatus: true,
      trail_id: null,
      userTrailList: [],
    };
  }

  toggle = () => {
    this.props.toggle(false);
  };

  render() {
    const { open, continueTrail, toSignIn } = this.props;

    $(document).ready(() => {
      const modalDiv = document
        .getElementById("extension-div")
        .shadowRoot.querySelector(".trail_continue_modal");
      if (modalDiv) {
        if (!modalDiv.parentNode.parentNode.parentNode.getAttribute("class")) {
          modalDiv.parentNode.parentNode.parentNode.setAttribute(
            "class",
            "trial_modal_show trial_create_modal_main"
          );
        }
      }
    });

    return (
      <React.Fragment>
        <Modal
          isOpen={open}
          toggle={this.toggle}
          className="tr_modal trail_continue_modal"
          centered={true}
          container={document.getElementById("extension-div").shadowRoot}
        >
          <ModalHeader className="tr_modal_trail_modal_header">
            Reminder
          </ModalHeader>
          <ModalBody>
            <div className="tr_new_trail_create_modal">
              <div className="trailButtonsWrapper">
                <Button type="primary" onClick={continueTrail}>
                  Continue Trail
                </Button>
                <Button
                  className="outlined-btn"
                  onClick={(e) => toSignIn()}
                  style={{ marginLeft: 5 }}
                >
                  SignIn
                </Button>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

export default ContinueTourConfirmation;
