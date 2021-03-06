import React from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import $ from "jquery";

const chrome = window.chrome;

class MySubscription extends React.Component {
  toggle = () => {
    this.props.toggle(false);
  };

  render() {
    const { open, followerList } = this.props;

    $(document).ready(() => {
      const modalDiv = document.querySelector(".tr_modal");

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
          className="tr_modal"
          centered={true}
        >
          <ModalHeader toggle={this.toggle}>My Subscription</ModalHeader>
          <ModalBody>
            <ul className="tr_notification_bx">
              {followerList && followerList.length <= 0 && (
                <li class="tr_notFound_subscription">No data found</li>
              )}
              {followerList.map((res) => (
                <li>
                  <a href="javascript:void(0);">
                    <img src="https://ca.slack-edge.com/TC9UZTSLX-UC8UK8ECS-96ca73a9bdf0-512" />
                    <div>
                      <h4>{res}</h4>
                      <p>2 hrs ago</p>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
            <div className="trailButtonsWrapper">
              <Button className="custom-button" onClick={this.toggle}>
                Cancel
              </Button>
            </div>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

export default MySubscription;
