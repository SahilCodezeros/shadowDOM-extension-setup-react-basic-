import React from "react";
import {
  sortableContainer,
  sortableElement,
  sortableHandle,
} from "react-sortable-hoc";
import _ from "lodash";

const resizeScreen = () => {
  return window.innerWidth <= 760;
};

const onTitleClickHandler = (e) => {
  e.preventDefault();

  const titles = document.querySelectorAll(".en_title");

  titles.forEach((el) => {
    el.addEventListener("keydown", (e) => {
      e.stopPropagation();
    });
  });
};

const onDescriptionHandler = (e) => {
  e.preventDefault();

  const descriptions = document.querySelectorAll(".en_desc");
  descriptions.forEach((el) => {
    el.addEventListener("keydown", (e) => {
      e.stopPropagation();
    });
  });
};

/**
 * Draggable list handle
 */
const DragHandle = sortableHandle(() => (
  <span className="drag_icon trailit_draggable_icon">
    <img
      className="trail_draggable_icon_pic"
      src={require("../images/move.png")}
      alt="drag icon"
      width="25px"
    />
  </span>
));

/**
 * Draggable item sort
 */
class SortableItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      MobileTargetNotFound: {},
      result: [],
      showMenu: false,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      MobileTargetNotFound: nextProps.MobileTargetNotFound,
      result: nextProps.result,
    };
  }

  onClickToAddSubMenu = (e, result, tourStep) => {
    this.props.onClick(e, result, tourStep);
  };

  handleClickMenu = (e) => {
    e.stopPropagation();

    // Set show menu state
    this.setState({ showMenu: !this.state.showMenu }); // border: 1px solid black;
  };

  onMouseLeave = (e) => {
    if (this.state.showMenu) {
      // Set show menu state
      this.setState({ showMenu: false });
    }
  };

  // componentDidUpdate() {
  //   const trailBuilderElement = document.querySelector('.trail_builder_side_panel_open');
  //   console.log('trailBuilderElement', trailBuilderElement);
  //   console.log('this.state.showMenu', this.state.showMenu);
  //   console.log(this.state.showMenu && trailBuilderElement);

  //   if (this.state.showMenu && trailBuilderElement) {
  //     // Hide detele button
  //     this.setState({ showMenu: false });
  //   }
  // };

  render() {
    let { i, result, tourStep, tourType, currentTrailsTab, index } = this.props;

    const { MobileTargetNotFound } = this.state;
    let subStep = result.unique_target_one != "" ? true : false;
    let subStepStatus = false;

    if (!_.isEmpty(MobileTargetNotFound)) {
      subStepStatus =
        result.trail_data_id === MobileTargetNotFound.trail_data_id;
    }

    if (!resizeScreen()) {
      subStepStatus = false;
      subStep = false;
    }

    return (
      // <div key={i} className={`li done trailTourStep ${tourStep === (i + 1) ? 'active' : ''}`}>
      //     <DragHandle />
      //     <div className="counter"><span>{i + 1}</span></div>
      //     <div>
      //         <div className="en_title">
      //             {result.title}
      //         </div>
      //         <div className="en_desc mb-2">
      //             {(result.type !== 'audio' &&
      //             result.type !== 'video' &&
      //             result.mediaType === 'text') ? <span dangerouslySetInnerHTML={{ __html: result.description }}></span> : result.url}
      //         </div>
      //         {subStepStatus && <div>
      //             <button onClick={(e) => this.onClickToAddSubMenu(e, result, (i + 1))}>Add</button>
      //         </div>}
      //         {subStep && <div>
      //             <div className="en_title">
      //                 {result.mobile_title}
      //             </div>
      //             <div className="en_desc mb-2">
      //                 {(result.type !== 'audio' &&
      //                 result.type !== 'video' &&
      //                 result.mobile_media_type === 'text') ? <span dangerouslySetInnerHTML={{ __html: result.mobile_description }}></span> : result.url}
      //             </div>
      //         </div>}
      //     </div>
      // </div>

      //   <div className={`${
      //     this.state.showMenu
      //       ? "z-index-2"
      //       : ""
      //   }`}>
      <div className="mr-5">
        {tourType !== "Make Edit" ? (
          <div
            // onMouseLeave={this.onMouseLeave}
            className={`${
              currentTrailsTab === "Followed"
                ? result.visited
                  ? "info_bbx_gradient"
                  : "info_bbx_grey"
                : "info_bbx_gradient"
            } ${tourStep === i + 1 ? "active" : "inactive"} ${
              this.state.showMenu ? "z-index-2" : ""
            }`}
          >
            <div className="d-flex">
              <div className="d-flex-1">
                <h4>Step {i + 1}</h4>
                <div className="d-flex-image">
                  {result.mediaType === "video" && (
                    <img
                      width="16px"
                      src={require("../images/vd_ic.png")}
                      alt="dots"
                    />
                  )}
                  {result.mediaType === "audio" && (
                    <img
                      width="16px"
                      src={require("../images/mp3_ic.png")}
                      alt="dots"
                    />
                  )}
                  {result.mediaType === "image" && (
                    <img
                      width="16px"
                      src={require("../images/img_ic.png")}
                      alt="dots"
                    />
                  )}
                  {result.mediaType === "text" && (
                    <img
                      width="16px"
                      src={require("../images/txt_ic.png")}
                      alt="dots"
                    />
                  )}
                </div>
              </div>
              <div className="d-flex-2">
                <p>{result.title}</p>
              </div>
              <div className="d-flex-3">
                <div>
                  {this.props.tourType === "Make Edit" && (
                    <button
                      type="button"
                      className="trailit_dotsButton"
                      onClick={this.handleClickMenu}
                    >
                      <img
                        width="16px"
                        src={require("../images/trailit_dotsPink.png")}
                        alt="dots"
                      />
                    </button>
                  )}
                  {this.state.showMenu && (
                    <div className={`trailit_dotsMenuList`}>
                      <button
                        type="button"
                        onClick={(e) => {
                          // Set show state
                          this.setState({ showMenu: false });

                          // Show delete modal
                          this.props.onDeleteModalOpen(
                            result.title,
                            result.trail_data_id,
                            false
                          );
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            onMouseLeave={this.onMouseLeave}
            className={`trailitStepBox ${
              tourStep === i + 1 ? "active" : "inactive"
            } ${this.state.showMenu ? "z-index-2" : ""}`}
          >
            {/* {tourType !== "preview" && <DragHandle />} */}
            <div className="trailitStepTitle">
              Step {i + 1} <span>{result.title}</span>
            </div>
            <div className="trailitIconRight">
              <div className="trailit_right_container">
                {this.props.tourType === "Make Edit" && (
                  <button
                    type="button"
                    onClick={this.handleClickMenu}
                    className="trailit_dotsButton"
                  >
                    <svg
                      width="24"
                      height="6"
                      viewBox="0 0 24 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        r="2.66666"
                        transform="matrix(1 0 0 -1 2.66666 2.66671)"
                        fill="white"
                      />
                      <circle
                        r="2.66666"
                        transform="matrix(1 0 0 -1 11.9999 2.66671)"
                        fill="white"
                      />
                      <circle
                        r="2.66666"
                        transform="matrix(1 0 0 -1 21.3333 2.66671)"
                        fill="white"
                      />
                    </svg>

                    {/* <img
                      width="16px"
                      src={require("../images/trailit_dotsPink.png")}
                      alt="dots"
                    /> */}
                  </button>
                )}
                {this.state.showMenu && (
                  <div className={`trailit_dotsMenuList`}>
                    <button
                      type="button"
                      onClick={(e) => {
                        // Set show state
                        this.setState({ showMenu: false });

                        // Show delete modal
                        this.props.onDeleteModalOpen(
                          result.title,
                          result.trail_data_id,
                          false
                        );
                      }}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
              {result.mediaType === "image" && (
                <svg
                  width="24"
                  height="21"
                  viewBox="0 0 24 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 6.75C9 7.34674 8.76295 7.91903 8.34099 8.34099C7.91903 8.76295 7.34674 9 6.75 9C6.15326 9 5.58097 8.76295 5.15901 8.34099C4.73705 7.91903 4.5 7.34674 4.5 6.75C4.5 6.15326 4.73705 5.58097 5.15901 5.15901C5.58097 4.73705 6.15326 4.5 6.75 4.5C7.34674 4.5 7.91903 4.73705 8.34099 5.15901C8.76295 5.58097 9 6.15326 9 6.75Z"
                    fill="white"
                  />
                  <path
                    d="M3 0C2.20435 0 1.44129 0.316071 0.87868 0.87868C0.316071 1.44129 0 2.20435 0 3V18C0 18.7956 0.316071 19.5587 0.87868 20.1213C1.44129 20.6839 2.20435 21 3 21H21C21.7956 21 22.5587 20.6839 23.1213 20.1213C23.6839 19.5587 24 18.7956 24 18V3C24 2.20435 23.6839 1.44129 23.1213 0.87868C22.5587 0.316071 21.7956 0 21 0H3ZM21 1.5C21.3978 1.5 21.7794 1.65804 22.0607 1.93934C22.342 2.22064 22.5 2.60218 22.5 3V12.75L16.8345 9.8295C16.6938 9.75904 16.5346 9.73459 16.3792 9.75963C16.2239 9.78466 16.0804 9.85791 15.969 9.969L10.404 15.534L6.414 12.876C6.26994 12.7801 6.09714 12.737 5.92491 12.7539C5.75267 12.7709 5.5916 12.8468 5.469 12.969L1.5 16.5V3C1.5 2.60218 1.65804 2.22064 1.93934 1.93934C2.22064 1.65804 2.60218 1.5 3 1.5H21Z"
                    fill="white"
                  />
                </svg>

                // <img
                //   width="16px"
                //   height="14px"
                //   src={require("../images/trialit_image.png")}
                //   alt="dots"
                // />
              )}
              {result.mediaType === "video" && (
                <svg
                  width="27"
                  height="17"
                  viewBox="0 0 27 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M26.5518 2.35774C26.4154 2.27908 26.2607 2.23739 26.1031 2.23686C25.9454 2.23633 25.7904 2.27697 25.6535 2.35472L20.7 5.16867V4.47368C20.6986 3.28761 20.2241 2.1505 19.3805 1.31182C18.5368 0.473132 17.3931 0.00136164 16.2 0H1.8C1.32277 0.00053284 0.865249 0.189237 0.5278 0.524713C0.19035 0.860189 0.000535974 1.31504 0 1.78947V12.5263C0.00136965 13.7124 0.475915 14.8495 1.31953 15.6882C2.16315 16.5269 3.30695 16.9986 4.5 17H18.9C19.3772 16.9995 19.8347 16.8108 20.1722 16.4753C20.5096 16.1398 20.6995 15.685 20.7 15.2105V11.8313L25.6535 14.6453C25.7904 14.723 25.9454 14.7637 26.103 14.7632C26.2607 14.7626 26.4154 14.7209 26.5517 14.6423C26.6881 14.5636 26.8013 14.4507 26.8799 14.3149C26.9586 14.1791 27 14.0251 27 13.8684V3.13158C27 2.97486 26.9586 2.82089 26.88 2.68509C26.8013 2.54928 26.6881 2.43639 26.5518 2.35774ZM18.9 15.2105H4.5C3.78416 15.2097 3.09787 14.9267 2.5917 14.4235C2.08553 13.9202 1.8008 13.238 1.8 12.5263V1.78947H16.2C16.9158 1.79027 17.6021 2.07333 18.1083 2.57654C18.6145 3.07976 18.8992 3.76203 18.9 4.47368L18.9002 6.72384V6.73312L18.9006 10.2617C18.9003 10.2711 18.9006 10.2804 18.9006 10.2897L18.9011 15.2105H18.9ZM25.2 12.3267L20.7 9.77019V7.22981L25.2 4.67332V12.3267Z"
                    fill="white"
                  />
                </svg>

                // <img
                //   width="18px"
                //   height="18px"
                //   src={require("../images/trialit_video.png")}
                //   alt="dots"
                // />
              )}
              {result.mediaType === "text" && (
                // <img
                //   width="16px"
                //   height="14px"
                //   src={require("../images/trailit_text.png")}
                //   alt="dots"
                // />
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 19 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.474 3.40783L15.592 5.52483L13.474 3.40783ZM14.836 1.54283L9.109 7.26983C8.81309 7.56533 8.61128 7.94181 8.529 8.35183L8 10.9998L10.648 10.4698C11.058 10.3878 11.434 10.1868 11.73 9.89083L17.457 4.16383C17.6291 3.99173 17.7656 3.78742 17.8588 3.56256C17.9519 3.33771 17.9998 3.09671 17.9998 2.85333C17.9998 2.60994 17.9519 2.36895 17.8588 2.14409C17.7656 1.91923 17.6291 1.71492 17.457 1.54283C17.2849 1.37073 17.0806 1.23421 16.8557 1.14108C16.6309 1.04794 16.3899 1 16.1465 1C15.9031 1 15.6621 1.04794 15.4373 1.14108C15.2124 1.23421 15.0081 1.37073 14.836 1.54283V1.54283Z"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M16 12.9998V15.9998C16 16.5302 15.7893 17.039 15.4142 17.414C15.0391 17.7891 14.5304 17.9998 14 17.9998H3C2.46957 17.9998 1.96086 17.7891 1.58579 17.414C1.21071 17.039 1 16.5302 1 15.9998V4.99982C1 4.46938 1.21071 3.96068 1.58579 3.5856C1.96086 3.21053 2.46957 2.99982 3 2.99982H6"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              )}
              {result.mediaType === "audio" && (
                <svg
                  width="24"
                  height="19"
                  viewBox="0 0 24 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.3861 0.00321735C17.1829 0.0455981 17.0017 0.156542 16.8745 0.316414C16.7473 0.476286 16.6823 0.674778 16.6911 0.876763V18.0051C16.6705 18.1277 16.6775 18.2531 16.7116 18.3728C16.7458 18.4924 16.8063 18.6034 16.8889 18.698C16.9716 18.7927 17.0744 18.8687 17.1902 18.9209C17.3061 18.973 17.4322 19 17.5598 19C17.6875 19 17.8136 18.973 17.9295 18.9209C18.0453 18.8687 18.1481 18.7927 18.2308 18.698C18.3134 18.6034 18.3739 18.4924 18.408 18.3728C18.4422 18.2531 18.4492 18.1277 18.4286 18.0051V0.876763C18.4315 0.756365 18.4083 0.636717 18.3605 0.525631C18.3127 0.414545 18.2413 0.314518 18.1511 0.232082C18.0608 0.149646 17.9537 0.0866533 17.8368 0.0472172C17.7198 0.00778116 17.5956 -0.00721183 17.4723 0.00321735C17.4436 0.00184863 17.4148 0.00184863 17.3861 0.00321735ZM6.26641 0.904709C6.06322 0.94709 5.882 1.05803 5.7548 1.21791C5.62761 1.37778 5.56266 1.57627 5.57143 1.77826V17.1036C5.55079 17.2262 5.55779 17.3516 5.59195 17.4713C5.62611 17.5909 5.6866 17.7019 5.76924 17.7966C5.85188 17.8912 5.95469 17.9672 6.07054 18.0194C6.18639 18.0715 6.31251 18.0985 6.44015 18.0985C6.5678 18.0985 6.69392 18.0715 6.80977 18.0194C6.92562 17.9672 7.02842 17.8912 7.11107 17.7966C7.19371 17.7019 7.2542 17.5909 7.28836 17.4713C7.32252 17.3516 7.32952 17.2262 7.30888 17.1036V1.77826C7.31182 1.65786 7.28863 1.53821 7.24081 1.42712C7.193 1.31604 7.12164 1.21601 7.0314 1.13357C6.94115 1.05114 6.83405 0.988145 6.71708 0.948709C6.60011 0.909273 6.47591 0.89428 6.35259 0.904709C6.32388 0.903341 6.29512 0.903341 6.26641 0.904709ZM14.6062 3.60919C14.403 3.65157 14.2218 3.76251 14.0946 3.92238C13.9674 4.08225 13.9024 4.28075 13.9112 4.48273V14.3991C13.8901 14.5219 13.8968 14.6476 13.9307 14.7675C13.9646 14.8875 14.025 14.9988 14.1076 15.0937C14.1903 15.1887 14.2932 15.265 14.4092 15.3173C14.5252 15.3696 14.6516 15.3968 14.7795 15.3968C14.9073 15.3968 15.0337 15.3696 15.1497 15.3173C15.2657 15.265 15.3686 15.1887 15.4513 15.0937C15.5339 14.9988 15.5943 14.8875 15.6282 14.7675C15.6622 14.6476 15.6688 14.5219 15.6477 14.3991V4.48273C15.6506 4.3625 15.6275 4.24302 15.5798 4.13206C15.5321 4.02111 15.4609 3.92118 15.3709 3.83877C15.2808 3.75637 15.1739 3.69333 15.0572 3.65377C14.9405 3.61422 14.8165 3.59902 14.6933 3.60919C14.664 3.60776 14.6346 3.60776 14.6053 3.60919H14.6062ZM3.48649 4.51068C3.2833 4.55306 3.10207 4.664 2.97488 4.82387C2.84769 4.98375 2.78273 5.18224 2.79151 5.38422V13.4977C2.77042 13.6204 2.77707 13.7461 2.811 13.866C2.84492 13.986 2.9053 14.0973 2.98794 14.1923C3.07058 14.2872 3.17349 14.3635 3.28951 14.4158C3.40553 14.4682 3.53188 14.4953 3.65977 14.4953C3.78765 14.4953 3.914 14.4682 4.03003 14.4158C4.14605 14.3635 4.24896 14.2872 4.3316 14.1923C4.41424 14.0973 4.47462 13.986 4.50854 13.866C4.54246 13.7461 4.54911 13.6204 4.52803 13.4977V5.38422C4.53095 5.26399 4.5078 5.14451 4.46009 5.03356C4.41239 4.92261 4.3412 4.82267 4.25116 4.74026C4.16112 4.65786 4.05425 4.59482 3.93751 4.55527C3.82077 4.51571 3.69677 4.50052 3.57359 4.51068C3.54427 4.50925 3.51489 4.50925 3.48556 4.51068H3.48649ZM9.04633 5.41217C8.84314 5.45455 8.66192 5.56549 8.53473 5.72537C8.40753 5.88524 8.34258 6.08373 8.35135 6.28572V12.5962C8.33027 12.7189 8.33692 12.8446 8.37084 12.9645C8.40477 13.0845 8.46515 13.1958 8.54779 13.2908C8.63042 13.3857 8.73333 13.462 8.84936 13.5143C8.96538 13.5667 9.09173 13.5938 9.21961 13.5938C9.3475 13.5938 9.47385 13.5667 9.58987 13.5143C9.70589 13.462 9.8088 13.3857 9.89144 13.2908C9.97408 13.1958 10.0345 13.0845 10.0684 12.9645C10.1023 12.8446 10.109 12.7189 10.0879 12.5962V6.28572C10.0908 6.16548 10.0676 6.046 10.0199 5.93505C9.97224 5.8241 9.90105 5.72416 9.81101 5.64176C9.72097 5.55935 9.6141 5.49631 9.49736 5.45676C9.38061 5.4172 9.25662 5.40201 9.13344 5.41217C9.10411 5.41074 9.07473 5.41074 9.04541 5.41217H9.04633ZM20.166 5.41217C19.9628 5.45455 19.7816 5.56549 19.6544 5.72537C19.5272 5.88524 19.4623 6.08373 19.471 6.28572V12.5962C19.4504 12.7187 19.4574 12.8442 19.4916 12.9638C19.5257 13.0835 19.5862 13.1945 19.6689 13.2891C19.7515 13.3837 19.8543 13.4598 19.9702 13.5119C20.086 13.564 20.2121 13.591 20.3398 13.591C20.4674 13.591 20.5935 13.564 20.7094 13.5119C20.8252 13.4598 20.928 13.3837 21.0107 13.2891C21.0933 13.1945 21.1538 13.0835 21.188 12.9638C21.2221 12.8442 21.2291 12.7187 21.2085 12.5962V6.28572C21.2114 6.16532 21.1882 6.04567 21.1404 5.93458C21.0926 5.8235 21.0213 5.72347 20.931 5.64103C20.8408 5.5586 20.7337 5.4956 20.6167 5.45617C20.4997 5.41673 20.3755 5.40174 20.2522 5.41217C20.2235 5.4108 20.1947 5.4108 20.166 5.41217ZM0.706564 7.21515C0.503376 7.25753 0.322151 7.36848 0.194959 7.52835C0.0677665 7.68822 0.00280949 7.88671 0.0115831 8.0887V10.7932C-0.00905553 10.9157 -0.00205331 11.0412 0.0321043 11.1608C0.066262 11.2805 0.126758 11.3915 0.209398 11.4861C0.292039 11.5808 0.394847 11.6568 0.510696 11.7089C0.626545 11.7611 0.752664 11.7881 0.880309 11.7881C1.00795 11.7881 1.13407 11.7611 1.24992 11.7089C1.36577 11.6568 1.46858 11.5808 1.55122 11.4861C1.63386 11.3915 1.69436 11.2805 1.72851 11.1608C1.76267 11.0412 1.76967 10.9157 1.74903 10.7932V8.0887C1.75198 7.9683 1.72878 7.84865 1.68097 7.73757C1.63315 7.62648 1.5618 7.52645 1.47155 7.44402C1.3813 7.36158 1.2742 7.29859 1.15724 7.25915C1.04027 7.21972 0.916068 7.20472 0.792741 7.21515C0.763724 7.21376 0.734654 7.21376 0.705637 7.21515H0.706564ZM11.8263 7.21515C11.6231 7.25753 11.4418 7.36848 11.3146 7.52835C11.1875 7.68822 11.1225 7.88671 11.1313 8.0887V10.7932C11.1102 10.9159 11.1168 11.0416 11.1508 11.1616C11.1847 11.2815 11.2451 11.3928 11.3277 11.4878C11.4103 11.5827 11.5133 11.659 11.6293 11.7114C11.7453 11.7637 11.8717 11.7908 11.9995 11.7908C12.1274 11.7908 12.2538 11.7637 12.3698 11.7114C12.4858 11.659 12.5887 11.5827 12.6714 11.4878C12.754 11.3928 12.8144 11.2815 12.8483 11.1616C12.8822 11.0416 12.8889 10.9159 12.8678 10.7932V8.0887C12.8707 7.96847 12.8476 7.84899 12.7999 7.73803C12.7522 7.62708 12.681 7.52715 12.5909 7.44474C12.5009 7.36233 12.394 7.2993 12.2773 7.25974C12.1605 7.22019 12.0365 7.20499 11.9134 7.21515C11.884 7.21373 11.8547 7.21373 11.8253 7.21515H11.8263ZM22.9459 7.21515C22.7428 7.25753 22.5615 7.36848 22.4343 7.52835C22.3071 7.68822 22.2422 7.88671 22.251 8.0887V10.7932C22.2303 10.9157 22.2373 11.0412 22.2715 11.1608C22.3056 11.2805 22.3661 11.3915 22.4488 11.4861C22.5314 11.5808 22.6342 11.6568 22.7501 11.7089C22.8659 11.7611 22.992 11.7881 23.1197 11.7881C23.2473 11.7881 23.3735 11.7611 23.4893 11.7089C23.6052 11.6568 23.708 11.5808 23.7906 11.4861C23.8732 11.3915 23.9337 11.2805 23.9679 11.1608C24.0021 11.0412 24.0091 10.9157 23.9884 10.7932V8.0887C23.9914 7.9683 23.9682 7.84865 23.9203 7.73757C23.8725 7.62648 23.8012 7.52645 23.7109 7.44402C23.6207 7.36158 23.5136 7.29859 23.3966 7.25915C23.2797 7.21972 23.1554 7.20472 23.0321 7.21515C23.0034 7.21379 22.9747 7.21379 22.9459 7.21515Z"
                    fill="white"
                  />
                </svg>

                // <img
                //   width="18px"
                //   height="18px"
                //   src={require("../images/trailit_audio.png")}
                //   alt="dots"
                // />
              )}
            </div>
          </div>
        )}

        {subStep && (
          <div
            className={`trailitStepBox trailitSubStepBox ${
              tourStep === i + 1 ? "active" : "inactive"
            } ${this.state.showMenu ? "z-index-2" : ""}`}
          >
            {/* <DragHandle /> */}
            <div className="trailitStepTitle">
              Step {i + 1} - {result.title}
            </div>
            {/* <div>
            <button
              type="button"
              onClick={this.handleClickMenu}
              className="trailit_dotsButton"
            >
              <img
                width="16px"
                src={require("../images/trailit_dotsPink.png")}
                alt="dots"
              />
            </button>
            {this.state.showMenu && (
              <div className={`trailit_dotsMenuList`}>
                <button type="button">Edit</button>
                <button type="button">Delete</button>
              </div>
            )}
          </div> */}
          </div>
        )}
        {subStepStatus && tourType === "Make Edit" && (
          <div className="trailitAddSubStep">
            <button
              type="button"
              onClick={(e) => this.onClickToAddSubMenu(e, result, i + 1)}
            >
              <img
                width="10px"
                src={require("../images/imgpsh_fullsize_anim.png")}
                alt="..."
              />
              Substep
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default sortableElement(SortableItem);

/**
 * Draggable sort list
 */
export const SortableContainer = sortableContainer(({ children }) => {
  return <div>{children}</div>;
});
