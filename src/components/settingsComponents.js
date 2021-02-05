import React from "react";
import Switch from "react-switch";

const chrome = window.chrome;
class SettingsComponents extends React.PureComponent {
  state = {
    open: true,
    checked: true,
    draggableChecked: false,
  };

  componentDidMount() {
    chrome.storage.local.get(
      ["AutoPlayMediaToggle", "isDraggable"],
      (items) => {
        if (
          items.AutoPlayMediaToggle !== undefined &&
          items.AutoPlayMediaToggle !== null
        ) {
          this.setState({ checked: items.AutoPlayMediaToggle });
        }

        if (items.isDraggable !== undefined && items.isDraggable !== null) {
          this.setState({ draggableChecked: items.isDraggable });
        }
      }
    );
  }

  toggle = () => {
    this.setState({ open: !this.state.open });
  };

  onChangeSwitch = (checked) => {
    this.setState({ checked });
    chrome.storage.local.set({ AutoPlayMediaToggle: checked });
  };

  onChangeDraggableSwitch = (value) => {
    this.setState({ draggableChecked: value });
    chrome.storage.local.set({ isDraggable: value });
  };

  render() {
    return (
      <div className="trail_settings_container">
        <div className="trail_settings">
          <span>Draggable</span>
          <Switch
            onChange={this.onChangeDraggableSwitch}
            checked={this.state.draggableChecked}
            onColor="#FF7958"
            onHandleColor="#FB542B"
            handleDiameter={30}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            height={20}
            width={48}
          />
        </div>
        <div className="trail_settings">
          <span>Media Autoplay</span>
          <Switch
            onChange={this.onChangeSwitch}
            checked={this.state.checked}
            onColor="#FF7958"
            onHandleColor="#FB542B"
            handleDiameter={30}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            height={20}
            width={48}
          />
        </div>
      </div>
    );
  }
}

export default SettingsComponents;
