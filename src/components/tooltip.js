import React from "react";
import { Popover, PopoverBody } from "reactstrap";
import $ from "jquery";

import {
  commonTypeSelectonButton,
  commonInitialRenderFunction,
  commonTooltipFormFunction,
  handleFileChange,
  commonFileUploadFunction,
} from "./common";

class Tooltip extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      selectedForm: "text",
      fileLoading: false,
      fileAddStatus: false,
      title: "",
      description: "",
      web_url: "",
      tourType: "",
      trailStatus: "text",
      showPreview: false,
      fileName: "",
      titleInvalid: false,
      fileNameInvalid: false,
    };
  }

  onSelectOption = (trailStatus) => {
    this.setState({
      trailStatus,
      title: "",
      fileName: "",
      description: "",
      titleInvalid: false,
      fileNameInvalid: false,
    });
  };

  componentDidMount() {
    let bounding = document
      .querySelector(this.props.uniqueTarget)
      .getBoundingClientRect();
    let targetElement = "html, body";
    const y =
      document.querySelector(this.props.uniqueTarget).getBoundingClientRect()
        .top +
      document.querySelector(targetElement).scrollTop +
      bounding.height -
      300;
    $(targetElement).stop().animate(
      {
        scrollTop: y,
      },
      1000
    );
  }

  /**
   * on click to save tooltip
   */
  onClickToSubmit = async (e) => {
    const { trailStatus, title, web_url, description, fileName } = this.state;

    if (trailStatus !== "text" && (fileName === "" || title === "")) {
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

    let obj = {};
    const { onCancel, onSave, rowData, target, count } = this.props;

    if (trailStatus === "text") {
      if (this.props.type === "Make Edit") {
        obj = {
          ...rowData,
          url: document.URL,
          unique_target_one: this.props.uniqueTarget,
          type: "tooltip",
          responsive: "mobile",
          mobile_media_type: trailStatus,
          mobile_title: title,
          mobile_description: description,
          web_url: web_url,
        };
      } else {
        obj = {
          url: document.URL,
          uniqueTarget: this.props.uniqueTarget,
          type: "tooltip",
          mediaType: trailStatus,
          title: title,
          description: description,
          web_url: web_url,
        };
      }
    } else {
      if (title === "" && web_url === "") {
        return;
      }

      if (this.props.type === "Make Edit") {
        obj = {
          ...rowData,
          type: "tooltip",
          mediaType: trailStatus,
          unique_target_one: this.props.uniqueTarget,
          responsive: "mobile",
          mobile_media_type: trailStatus,
          mobile_title: title,
          mobile_description: description,
          web_url: web_url,
        };
      } else {
        obj = {
          ...rowData,
          type: "tooltip",
          mediaType: trailStatus,
          uniqueTarget: this.props.uniqueTarget,
          url: document.URL,
          title: title,
          web_url: web_url,
        };
      }
    }

    try {
      // Save trail data
      await onSave(obj);

      // Call on tour loading function
      this.props.onTourLoading(false);

      // Remove tooltip selected area from window or browser tab
      onCancel(target, count);

      // Remove tooltip
      this.setState({
        visible: false,
      });
    } catch (err) {
      console.log("err", err);
      // Call on tour loading function
      this.props.onTourLoading(false);

      alert("Error while creating tour!");
    }
  };

  /**
   * on click visible popover
   */
  onClickToVisiblePopover = (e) => {
    const { onCancel, target, count } = this.props;

    this.setState({
      visible: false,
    });

    document.designMode = "off";
    onCancel(target, count);
  };

  // Input change handler
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
          fileAddStatus: true,
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
      this.onClickToVisiblePopover,
      this.onClickToSubmit,
      this.onChangeToInput,
      this.handleChange,
      mediaType,
      titleInvalid,
      fileNameInvalid
    );
  };

  onTitleChangeHandler = (e) => {
    e.stopPropagation();

    this.setState({ title: e.target.value });
  };

  onDescriptionChangeHandler = (value) => {
    this.setState({ description: value });
  };

  render() {
    const { title, description, fileName, fileLoading } = this.state;
    let tourType = "tooltip";

    let tooltipForm = commonInitialRenderFunction(
      this.state.trailStatus,
      title,
      description,
      this.onTitleChangeHandler,
      this.onDescriptionChangeHandler,
      this.onClickToVisiblePopover,
      this.onClickToSubmit,
      this.selectedTooltipForm
    );

    const { trailStatus } = this.state;

    return (
      <React.Fragment>
        <Popover
          placement="top"
          className="trail_tooltip"
          isOpen={this.state.visible}
          target={".trail_tour_tooltip"}
          // modifiers={ { arrow: '' } }
          container={document.getElementById("extension-div").shadowRoot}
        >
          <PopoverBody>
            {commonTypeSelectonButton(
              trailStatus,
              this.onSelectOption,
              tooltipForm,
              fileName,
              fileLoading,
              tourType
            )}
          </PopoverBody>
        </Popover>
      </React.Fragment>
    );
  }
}

export default Tooltip;
