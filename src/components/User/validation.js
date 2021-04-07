import _ from "lodash";

export const isValidated = (data) => {
  const errors = {};
  let isValid = false;

  if (data.hasOwnProperty("trail_title") && _.isEmpty(data.trail_title)) {
    errors.trail_title = "Please enter trail title";
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

  return {
    errors,
    isValid: _.isEmpty(errors),
  };
};
