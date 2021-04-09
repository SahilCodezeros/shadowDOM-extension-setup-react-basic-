import React from "react";
import { Form, Input, Button } from "antd";
import { CloudUploadOutlined } from "@ant-design/icons";

import TextEditor from "../common/textEditor";
import ImageTools from "../common/imageResizer";
import { handleFileUpload } from "../common/audAndVidCommon";

const chrome = window.chrome;

export function collectionHas(a, b) {
  //helper function (see below)
  for (var i = 0, len = a.length; i < len; i++) {
    if (a[i] == b) return true;
  }
  return false;
}

export function findParentBySelector(elm, selector) {
  var all = document.querySelectorAll(selector);
  var cur = elm.parentNode;
  while (cur && !collectionHas(all, cur)) {
    //keep going up until you find a match
    cur = cur.parentNode; //go up
  }
  return cur; //will return null if not found
}

export function queryParentElement(el, selector) {
  el = el;
  let isIDSelector = selector.indexOf("#") === 0;

  if (selector.indexOf(".") === 0 || selector.indexOf("#") === 0) {
    selector = selector.slice(1);
  }

  while (el) {
    if (isIDSelector) {
      if (el.id === selector) {
        return el;
      }
    } else if (el.classList.contains(selector)) {
      return el;
    }
    el = el.parentElement;
  }
  return null;
}

export function urlStingCheck(url, array) {
  let status = false;
  array.map((res) => {
    if (url.includes(res) && !url.includes("/#/")) {
      status = true;
    }
  });

  return status;
}

// export function getScrollParent(node) {
//     if (node == null) {
//       return null;
//     }

//     if (node.scrollHeight > node.clientHeight) {
//       return node;
//     } else {
//       return getScrollParent(node.parentNode);
//     }
//   }

export const getScrollParent = (node) => {
  const regex = /(auto|scroll)/;
  const parents = (_node, ps) => {
    if (_node.parentNode === null) {
      return ps;
    }
    return parents(_node.parentNode, ps.concat([_node]));
  };

  const style = (_node, prop) =>
    getComputedStyle(_node, null).getPropertyValue(prop);
  const overflow = (_node) =>
    style(_node, "overflow") +
    style(_node, "overflow-y") +
    style(_node, "overflow-x");
  const scroll = (_node) => regex.test(overflow(_node));

  /* eslint-disable consistent-return */
  const scrollParent = (_node) => {
    if (!(_node instanceof HTMLElement || _node instanceof SVGElement)) {
      return;
    }

    const ps = parents(_node.parentNode, []);

    for (let i = 0; i < ps.length; i += 1) {
      if (scroll(ps[i])) {
        return ps[i];
      }
    }

    return document.scrollingElement || document.documentElement;
  };

  return scrollParent(node);
  /* eslint-enable consistent-return */
};

// Common file upload function
export const commonFileUploadFunction = (file) => {
  return handleFileUpload(file);
};

// Handler file change function
export const handleFileChange = (e, trailStatus, uploadFile) => {
  const file = e.target.files[0];
  const fileType = file.type.split("/");
  e.target.value = null;

  if (trailStatus === "audio" && fileType[1] === "mp4") {
    // Upload file function
    uploadFile(file);
  } else if (trailStatus !== fileType[0]) {
    // Return alert
    return alert(`Please upload ${trailStatus} file!`);
  } else if (trailStatus === "video" && fileType[1] === "x-matroska") {
    // Return alert
    return alert("MKV format suport coming soon.");
  } else if (trailStatus === "image" && fileType[0] === "image") {
    // const size = { width: 380, height: 214 };
    // const imageTool = new ImageTools();
    // imageTool
    //   .crop(file, size)
    //   .then((blob) => {
    //     const date = new Date().getTime();
    //     const resizedFile = new File([blob], `trail_image_${date}`, {
    //       lastModified: date,
    //       type: file.type,
    //     });

    //     // Upload file function
    //     uploadFile(resizedFile);
    //   })
    //   .catch((err) => {
    //     console.log("err", err);
    //     alert("Error while resizing image. Please uplaod again.");
    //   });

    // Upload file function
    uploadFile(file);
  } else {
    // Upload file function
    uploadFile(file);
  }
};

// On cancel click handler function
// export const onCancelClickHandler = (onCancel, target, count) => {
//     document.designMode = 'off';
//     onCancel(target, count);
// };

// Tooltip form selection function
export const commonTooltipFormFunction = (
  trailStatus,
  title,
  fileName,
  fileLoading,
  onClickToVisiblePopover,
  onClickToSubmit,
  onChangeToInput,
  handleChange,
  media
) => {
  const buttons = (
    <div className="trailButtonsWrapper mt-13">
      <button className="custom-button" onClick={onClickToVisiblePopover}>
        Cancel
      </button>

      <button
        htmlType="submit"
        disabled={fileLoading}
        className="custom-button"
      >
        ADD STEP
      </button>
    </div>
  );

  let mediaType = "";

  if (media === "video") {
    mediaType = "video/*, .mkv, .mov";
  } else if (media === "audio") {
    mediaType = "audio/*";
  } else if (media === "image") {
    mediaType = "image/*";
  }

  return (
    <div>
      <div className="pl-4 trail_video_frm">
        <Form
          onFinish={onClickToSubmit}
          initialValues={{
            title,
          }}
        >
          <Form.Item
            name="title"
            rules={[
              {
                required: true,
                message: "Please enter title!",
              },
            ]}
          >
            <Input
              type="text"
              autoComplete="off"
              // onKeyDown={onChangeToInput}
              onChange={onChangeToInput}
              onKeyDown={(e) => e.stopPropagation()}
              placeholder={`Enter ${trailStatus} Title`}
            />
          </Form.Item>

          {/* <input 
              type="text" 
              name="title" 
              value={title} 
              placeholder={`Enter ${trailStatus} Title`} 
              className="ant-input mb-2" 
              onKeyDown={onChangeToInput} 
              autoComplete="off" 
          /> */}
          <input
            type="text"
            name="web_url"
            value={fileName}
            disabled={true}
            // onKeyDown={onChangeToInput}
            onChange={onChangeToInput}
            onKeyDown={(e) => e.stopPropagation()}
            placeholder={`Add ${trailStatus} URL`}
            className="ant-input mb-2"
          />

          <div className="upload_bx">
            <div className="ant-upload">
              <p className="ant-upload-drag-icon">
                {fileLoading && (
                  <div class="trial_spinner">
                    <img
                      class="ring1"
                      src={require(`../images/loding1.png`)}
                      alt="ring1"
                    />
                    <img
                      class="ring2"
                      src={require(`../images/loding2.png`)}
                      alt="ring2"
                    />
                  </div>
                )}
                {!fileLoading && <CloudUploadOutlined />}
              </p>
              <p className="ant-upload-text">
                {fileLoading ? "Uploading" : "Upload"} {trailStatus}
              </p>
            </div>
            <input
              type="file"
              name="media"
              style={{ padding: 0 }}
              onChange={handleChange}
              accept={mediaType}
            />
          </div>

          {buttons}
        </Form>
      </div>
    </div>
  );
};

// Common initial render function
export const commonInitialRenderFunction = (
  trailStatus,
  title,
  description,
  onTitleChangeHandler,
  onDescriptionChangeHandler,
  onClickToVisiblePopover,
  onClickToSubmit,
  selectedTooltipForm,
  fileLoading
) => {
  let tooltipForm = null;

  // Select form according button clicked
  if (trailStatus === "text") {
    tooltipForm = (
      <Form
        onFinish={onClickToSubmit}
        initialValues={{
          title,
          description,
        }}
      >
        <Form.Item
          name="title"
          rules={[
            {
              required: true,
              message: "Please enter title!",
            },
          ]}
        >
          <Input
            type="text"
            // // onChange={ onTitleChangeHandler }
            // onKeyDown={ onTitleChangeHandler }
            onChange={onTitleChangeHandler}
            onKeyDown={(e) => e.stopPropagation()}
            placeholder="Enter Title"
            autoComplete="off"
          />
        </Form.Item>
        <Form.Item
          name="description"
          rules={[{ required: true, message: "Please Enter description!" }]}
        >
          <TextEditor onChange={onDescriptionChangeHandler} />
        </Form.Item>
        <Form.Item className="m-0">
          <div className="trailButtonsWrapper mt-8">
            <button className="custom-button" onClick={onClickToVisiblePopover}>
              Cancel
            </button>

            <button
              disabled={fileLoading}
              className="custom-button"
              htmlType="submit"
            >
              Add Step
            </button>
          </div>
        </Form.Item>
      </Form>
    );
  } else if (trailStatus === "audio") {
    tooltipForm = selectedTooltipForm(trailStatus);
  } else if (trailStatus === "video") {
    tooltipForm = selectedTooltipForm(trailStatus);
  } else if (trailStatus === "image") {
    tooltipForm = selectedTooltipForm(trailStatus);
  }

  return tooltipForm;
};

// Selecting text, audio, video and image function
export const commonTypeSelectonButton = (
  trailStatus,
  onSelectOption,
  tooltipForm,
  fileName,
  fileLoading,
  tourType
) => {
  let buttons;
  if (tourType !== "modal") {
    buttons = (
      <div className="tr_icon_grp">
        <button
          id="text_tooltip"
          className={trailStatus === "text" ? "tr_active" : ""}
          onClick={() => onSelectOption("text")}
          // disabled={ (trailStatus !== 'text' && fileName !== '') || fileLoading }
        >
          {/* <img alt="Text_tooltip" src={require(`../images/text_tooltip.svg`)} /> */}

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
        </button>
        {!document.URL.includes("https://twitter.com") && (
          <React.Fragment>
            <button
              id="audio_tooltip"
              className={trailStatus === "audio" ? "tr_active" : ""}
              onClick={() => onSelectOption("audio")}
              // disabled={ (trailStatus !== 'audio' && fileName !== '') || fileLoading }
            >
              {/* <img
                alt="audio_tooltip"
                src={require(`../images/audio_tooltip.svg`)}
              /> */}

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
            </button>
            <button
              id="video_tooltip"
              className={trailStatus === "video" ? "tr_active" : ""}
              onClick={() => onSelectOption("video")}
              // disabled={ (trailStatus !== 'video' && fileName !== '') || fileLoading }
            >
              {/* <img
                alt="video_tooltip"
                src={require(`../images/video_tooltip.svg`)}
              /> */}

              <svg
                width="21"
                height="13"
                viewBox="0 0 21 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.6514 1.80298C20.5453 1.74282 20.425 1.71095 20.3024 1.71054C20.1798 1.71014 20.0592 1.74122 19.9527 1.80067L16.1 3.95251V3.42105C16.0989 2.51405 15.7298 1.6445 15.0737 1.00315C14.4176 0.361807 13.5279 0.00104125 12.6 0H1.4C1.02882 0.000407466 0.672971 0.144711 0.410511 0.401251C0.14805 0.657792 0.000416869 1.00562 0 1.36842V9.57895C0.00106528 10.4859 0.370156 11.3555 1.0263 11.9968C1.68245 12.6382 2.57207 12.999 3.5 13H14.7C15.0712 12.9996 15.427 12.8553 15.6895 12.5987C15.9519 12.3422 16.0996 11.9944 16.1 11.6316V9.04749L19.9527 11.1993C20.0592 11.2588 20.1797 11.2899 20.3023 11.2895C20.425 11.2891 20.5453 11.2572 20.6514 11.197C20.7574 11.1369 20.8454 11.0506 20.9066 10.9467C20.9678 10.8429 21 10.7251 21 10.6053V2.39474C21 2.2749 20.9678 2.15715 20.9066 2.0533C20.8455 1.94945 20.7574 1.86313 20.6514 1.80298ZM14.7 11.6316H3.5C2.94324 11.631 2.40946 11.4145 2.01577 11.0297C1.62208 10.6449 1.40063 10.1232 1.4 9.57895V1.36842H12.6C13.1568 1.36903 13.6905 1.58549 14.0842 1.9703C14.4779 2.35511 14.6994 2.87685 14.7 3.42105L14.7002 5.14176V5.14886L14.7004 7.84721C14.7003 7.85439 14.7004 7.86149 14.7004 7.86859L14.7009 11.6316H14.7ZM19.6 9.42628L16.1 7.47132V5.52868L19.6 3.57372V9.42628Z"
                  fill="white"
                />
              </svg>
            </button>
          </React.Fragment>
        )}
        <button
          id="picture_tooltip"
          className={trailStatus === "image" ? "tr_active" : ""}
          onClick={() => onSelectOption("image")}
          // disabled={ (trailStatus !== 'image' && fileName !== '') || fileLoading }
        >
          {/* <img
            alt="image_tooltip"
            src={require(`../images/picture_tooltip.svg`)}
          /> */}

          <svg
            width="16"
            height="14"
            viewBox="0 0 16 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 4.5C6 4.89782 5.84196 5.27936 5.56066 5.56066C5.27936 5.84196 4.89782 6 4.5 6C4.10217 6 3.72064 5.84196 3.43934 5.56066C3.15804 5.27936 3 4.89782 3 4.5C3 4.10218 3.15804 3.72064 3.43934 3.43934C3.72064 3.15804 4.10217 3 4.5 3C4.89782 3 5.27936 3.15804 5.56066 3.43934C5.84196 3.72064 6 4.10218 6 4.5Z"
              fill="white"
            />
            <path
              d="M2 0C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V12C0 12.5304 0.210714 13.0391 0.585786 13.4142C0.960859 13.7893 1.46957 14 2 14H14C14.5304 14 15.0391 13.7893 15.4142 13.4142C15.7893 13.0391 16 12.5304 16 12V2C16 1.46957 15.7893 0.960859 15.4142 0.585786C15.0391 0.210714 14.5304 0 14 0H2ZM14 1C14.2652 1 14.5196 1.10536 14.7071 1.29289C14.8946 1.48043 15 1.73478 15 2V8.5L11.223 6.553C11.1292 6.50602 11.023 6.48973 10.9195 6.50642C10.8159 6.52311 10.7203 6.57194 10.646 6.646L6.936 10.356L4.276 8.584C4.17996 8.52006 4.06476 8.4913 3.94994 8.5026C3.83512 8.5139 3.72773 8.56456 3.646 8.646L1 11V2C1 1.73478 1.10536 1.48043 1.29289 1.29289C1.48043 1.10536 1.73478 1 2 1H14Z"
              fill="white"
            />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div className="tr_select_type">
      {buttons}

      {tooltipForm}
    </div>
  );
};

export const getUrlVars = () => {
  let vars = [],
    hash;
  let hashes = window.location.href
    .slice(window.location.href.indexOf("?") + 1)
    .split("&");

  for (let i = 0; i < hashes.length; i++) {
    hash = hashes[i].split("=");
    vars.push(hash[0]);
    vars[hash[0]] = hash[1];
  }

  return vars;
};
