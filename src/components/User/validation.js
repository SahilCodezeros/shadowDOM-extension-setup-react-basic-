import _ from "lodash";

export const isValidated = (data) => {
  const errors = {};

  if (data.hasOwnProperty("trail_title") && _.isEmpty(data.trail_title)) {
    errors.trail_title = "Please enter trail title";
  } else if (
    data.hasOwnProperty("trail_title") &&
    !_.isEmpty(data.trail_title) &&
    data.trail_title.length > 200
  ) {
    errors.trail_title = "Title limit exceeded!";
  } else {
    delete errors.trail_title;
  }

  if (
    data.hasOwnProperty("trail_categor_id") &&
    _.isEmpty(data.trail_categor_id) &&
    !Number(data.trail_categor_id)
  ) {
    errors.trail_categor_id = "Please select category";
  } else {
    delete errors.trail_categor_id;
  }

  if (
    data.hasOwnProperty("cover_image_url") &&
    data.cover_image_url &&
    data.cover_image_url.size > 1024 * 1024 * 8
  ) {
    errors.cover_image_url = "Image size limit exceeded!";
  } else {
    delete errors.cover_image_url;
  }

  if (
    data.hasOwnProperty("trail_intro_url") &&
    data.trail_intro_url &&
    data.trail_intro_url.size > 1024 * 1024 * 8
  ) {
    errors.trail_intro_url = "Image size limit exceeded!";
  } else {
    delete errors.trail_intro_url;
  }

  return {
    errors,
    isValid: _.isEmpty(errors),
  };
};
