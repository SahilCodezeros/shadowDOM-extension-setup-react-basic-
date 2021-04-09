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
      selectedOption: { value: "text", label: "Text" },
      trailStatus: "text",
      showPreview: false,
      fileName: "",
    };
  }

  onSelectOption = (trailStatus) => {
    this.setState({ trailStatus });
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
    // Call on tour loading function
    this.props.onTourLoading(true);

    let obj = {};
    const { onCancel, onSave, rowData, target, count } = this.props;

    if (this.state.trailStatus === "text") {
      if (this.props.type === "Make Edit") {
        obj = {
          ...rowData,
          url: document.URL,
          unique_target_one: this.props.uniqueTarget,
          type: "tooltip",
          responsive: "mobile",
          mobile_media_type: this.state.trailStatus,
          mobile_title: this.state.title,
          mobile_description: this.state.description,
          web_url: this.state.web_url,
        };
      } else {
        obj = {
          url: document.URL,
          uniqueTarget: this.props.uniqueTarget,
          type: "tooltip",
          mediaType: this.state.trailStatus,
          title: this.state.title,
          description: this.state.description,
          web_url: this.state.web_url,
        };
      }
    } else {
      if (this.state.title === "" && this.state.web_url === "") {
        return;
      }

      if (this.props.type === "Make Edit") {
        obj = {
          ...rowData,
          type: "tooltip",
          mediaType: this.state.trailStatus,
          unique_target_one: this.props.uniqueTarget,
          responsive: "mobile",
          mobile_media_type: this.state.trailStatus,
          mobile_title: this.state.title,
          mobile_description: this.state.description,
          web_url: this.state.web_url,
        };
      } else {
        obj = {
          ...rowData,
          type: "tooltip",
          mediaType: this.state.trailStatus,
          uniqueTarget: this.props.uniqueTarget,
          url: document.URL,
          title: this.state.title,
          web_url: this.state.web_url,
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

    // this.setState({ [e.target.name]: e.target.value });
    this.setState({ title: e.target.value });
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
          web_url: data.response.result.fileUrl,
          fileAddStatus: true,
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

  // onSaveTrail = (e, data) => {
  //     // saveTrail(this.state.tourType, this.state.title, this.state.web_url, data, (trailData) => {
  //     //     console.log('from line: 154', trailData);
  // 	// 	this.setState({ web_url: '', fileAddStatus: false });
  // 	// 	chrome.storage.local.set({ trail_web_user_tour: trailData, tourType: '' });
  //  // });
  //     this.onClickToSubmit(e);
  // };

  selectedTooltipForm = (mediaType) => {
    const { trailStatus, title, fileName, fileLoading } = this.state;

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
      mediaType
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
