import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Form, Input } from "antd";
import Icon from "@ant-design/icons";
import $ from "jquery";

import {
  commonTypeSelectonButton,
  commonInitialRenderFunction,
  commonTooltipFormFunction,
  handleFileChange,
  commonFileUploadFunction,
} from "../common";

let modalOpen;

class CreateModalComponent extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      web_url: "",
      trailStatus: "text",
      fileName: "",
      fileLoading: false,
      showPreview: false,
      titleInvalid: false,
      fileNameInvalid: false,
    };
  }

  componentDidMount() {
    // window.scrollTo(0, 0);
    const scrollTop = $(window).scrollTop();
    $("html, body").animate({ scrollTop: scrollTop });

    // Set trail status state
    this.setState({ trailStatus: this.props.stepType });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.stepType !== this.props.stepType) {
      // Set trail status state
      this.setState({ trailStatus: this.props.stepType });
    }
  }

  onChangeToInput = (e) => {
    e.stopPropagation();

    const value = e.target.value;
    const isInvalid = value.length === 0 ? true : false;

    // Set state
    this.setState({
      title: value,
      titleInvalid: isInvalid,
    });
  };

  onTitleChangeHandler = (e) => {
    e.stopPropagation();

    this.setState({ title: e.target.value });
  };

  onDescriptionChangeHandler = (value) => {
    this.setState({ description: value });
  };

  onAddStep = async () => {
    const { trailStatus, title, web_url, description, fileName } = this.state;

    if (fileName === "" || title === "") {
      this.setState({
        fileNameInvalid: true,
        titleInvalid: true,
      });

      return;
    } else {
      this.setState({
        fileNameInvalid: false,
        titleInvalid: false,
      });
    }

    // Call on tour loading function
    this.props.onTourLoading(true);

    let obj;

    if (trailStatus === "text") {
      obj = {
        url: document.URL,
        type: "modal",
        mediaType: "modal",
        title: title,
        description,
      };
      // });
    } else {
      if (this.state.title === "" && this.state.web_url === "") {
        return;
      }

      obj = {
        url: document.URL,
        type: "modal",
        mediaType: trailStatus,
        title,
        web_url,
      };
    }

    try {
      await this.props.onSave(obj);
      this.toggle();

      // Call on tour loading function
      this.props.onTourLoading(false);
    } catch (err) {
      console.log("err", err);
      // Call on tour loading function
      this.props.onTourLoading(false);

      alert("Error while creating tour!");
    }
  };

  toggle = () => {
    this.setState({
      title: "",
      description: "",
      web_url: "",
      fileName: "",
      trailStatus: "text",
    });

    this.props.toggle(false);
  };

  onSelectOption = (status) => {
    this.setState({ trailStatus: status });
  };

  uploadFile = (file) => {
    this.setState({ fileLoading: true });

    commonFileUploadFunction(file)
      .then((response) => {
        return response;
      })
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        this.setState({
          showPreview: true,
          fileLoading: false,
          fileName: file.name,
          fileNameInvalid: false,
          web_url: data.response.result.fileUrl,
        });
      })
      .catch((err) => {
        this.setState({ fileLoading: false });
        console.log("Error fetching profile " + err);
      });
  };

  handleChange = (e) => {
    const { trailStatus } = this.state;

    // Call common hadler file change function in common file
    handleFileChange(e, trailStatus, this.uploadFile);
  };

  selectedTooltipForm = (mediaType) => {
    const {
      trailStatus,
      title,
      fileName,
      fileLoading,
      titleInvalid,
      fileNameInvalid,
    } = this.state;

    // Common tooltip form function imported from common file
    return commonTooltipFormFunction(
      trailStatus,
      title,
      fileName,
      fileLoading,
      this.toggle,
      this.onAddStep,
      this.onChangeToInput,
      this.handleChange,
      mediaType,
      titleInvalid,
      fileNameInvalid
    );
  };

  onButtonCloseHandler = async (e) => {
    // Call parent component function to close tooltip preview
    await this.props.closeButtonHandler(e);
  };

  render() {
    modalOpen = this.props.open;
    const { title, description, fileName, fileLoading } = this.state;
    let tourType = "modal";

    let tooltipForm = commonInitialRenderFunction(
      this.state.trailStatus,
      title,
      description,
      this.onTitleChangeHandler,
      this.onDescriptionChangeHandler,
      this.toggle,
      this.onAddStep,
      this.selectedTooltipForm,
      fileLoading
    );

    const { trailStatus } = this.state;

    if (
      document
        .getElementById("extension-div")
        .shadowRoot.getElementById("my-extension-root-flip").style.display ===
      "none"
    ) {
      modalOpen = false;
    } else if (
      document
        .getElementById("extension-div")
        .shadowRoot.getElementById("my-extension-root-flip").style.display ===
      "block"
    ) {
      modalOpen = true;
    }

    $(document).ready(() => {
      const modalDiv = document
        .getElementById("extension-div")
        .shadowRoot.querySelector(".trail_create_modal");
      if (modalDiv) {
        if (!modalDiv.parentNode.parentNode.parentNode.getAttribute("class")) {
          modalDiv.parentNode.parentNode.parentNode.setAttribute(
            "class",
            "trial_modal_show trial_create_modal_main"
          );
        }
      }
    });

    let headerTitle = "";

    if (trailStatus === "video") {
      headerTitle = "Video";
    } else if (trailStatus === "audio") {
      headerTitle = "Audio";
    }

    return (
      <React.Fragment>
        <Modal
          centered={true}
          isOpen={modalOpen}
          toggle={this.onButtonCloseHandler}
          className={`tr_modal trail_create_modal ${
            this.props.screenSize() && "responsive_modal"
          }`}
          container={document
            .getElementById("extension-div")
            .shadowRoot.querySelector(".modal-open")}
        >
          <ModalHeader
            toggle={this.toggle}
            className="tr_modal_trail_modal_header"
          >
            Create {headerTitle} Overlay
          </ModalHeader>
          <ModalBody>
            {commonTypeSelectonButton(
              trailStatus,
              this.onSelectOption,
              tooltipForm,
              fileName,
              fileLoading,
              tourType
            )}
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

export default CreateModalComponent;
