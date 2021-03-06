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
            onColor="#EF699D"
            offColor="#BCBCBC"
            offHandleColor="#FFFFFF"
            onHandleColor="#D41E79"
            handleDiameter={30}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="2px 2px 15px rgba(0, 0, 0, 0.5)"
            activeBoxShadow="2px 2px 15px rgba(0, 0, 0, 0.5)"
            height={20}
            width={48}
          />
        </div>
        <div className="trail_settings">
          <span>Media Autoplay</span>
          <Switch
            onChange={this.onChangeSwitch}
            checked={this.state.checked}
            onColor="#EF699D"
            offColor="#BCBCBC"
            offHandleColor="#FFFFFF"
            onHandleColor="#D41E79"
            handleDiameter={30}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="2px 2px 15px rgba(0, 0, 0, 0.5)"
            activeBoxShadow="2px 2px 15px rgba(0, 0, 0, 0.5)"
            height={20}
            width={48}
          />
        </div>
      </div>
    );
  }
}

export default SettingsComponents;
