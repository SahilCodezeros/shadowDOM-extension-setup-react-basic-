import axios from "./interceptor";
import { get } from "../AppUtill";

// Upload media files
export const uploadMediaFile = async (formData) => {
  return await axios.post(
    `${process.env.REACT_APP_NEW_MS1_DOMAIN}userTourDataDetail/uploadTrail_file_media`,
    formData,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Content-Type": "multipart/form-data",
        "X-Content-Type-Options": "nosniff",
        "Access-Control-Allow-Methods": "POST",
        Accept: "application/json, text/plain, */*",
      },
    }
  );
};

// Create trails
export const uploadTrails = async (trails) => {
  return await axios.post(
    `${process.env.REACT_APP_NEW_MS1_DOMAIN}userTourDataDetail/createTrailit_trail_data_tour`,
    trails
  );
};

// Get all trails
export const getTrails = async (userId) => {
  return await axios.get(
    `${process.env.REACT_APP_NEW_MS1_DOMAIN}userTourDataDetail/readTrailit_trails_data_tour`
  );
};

// For follow
export const followTrails = async (data) => {
  return await axios.post(
    `${process.env.REACT_APP_NEW_MS1_DOMAIN}userTourFollow/createTrailit_follow_tour`,
    data
  );
};

// Get follow data of user
export const getFollowTrails = async () => {
  // return await axios.post(
  //   `${process.env.REACT_APP_NEW_MS1_DOMAIN}userTourFollow/readTrailits_follow_tour`,
  //   data
  // );

  return await axios.get(
    `${process.env.REACT_APP_NEW_MS1_DOMAIN}userTourDataDetail/getTrailList?type=following`
  );
  // userTourDataDetail/getTrailList?type=following&page=1&itemsPerPage=20
};

// Unfollow trail
export const unFollowTrailOfUser = async (data) => {
  return await axios.post(
    `${process.env.REACT_APP_NEW_MS1_DOMAIN}userTourFollow/deleteTrailit_follow_tour`,
    data
  );
};

// Get all notification
export const getAllNotification = async (data) => {
  return await axios.post(
    `${process.env.REACT_APP_NEW_MS1_DOMAIN}userTourNotification/readTrailits_notification_tour`,
    data
  );
};

// Remove notification
export const updateNotification = async (data) => {
  return await axios.post(
    `${process.env.REACT_APP_NEW_MS1_DOMAIN}userTourNotification/updateTrailit_notification_tour`,
    data
  );
};

// Update sorted array
export const arraySorting = async (data) => {
  return await axios.put(
    `${process.env.REACT_APP_NEW_MS1_DOMAIN}trailitSorting/sortTrailOrder`,
    { data }
  );
};

// Get all notification data
export const getAllUser = async () => {
  return await axios.get(
    `${process.env.REACT_APP_NEW_MS2_DOMAIN}user/getAllUser`
  );
};

// Update flag in trail data table
export const updateTrailFlag = async (data) => {
  return await axios.put(
    `${process.env.REACT_APP_NEW_MS1_DOMAIN}userTourDataDetail/updateTrail_trail_data_tour`,
    data
  );
};

// Create trail_id when user signup
export const createTrailId = async (data) => {
  return await axios.post(
    `${process.env.REACT_APP_NEW_MS1_DOMAIN}trailitUser/createTrail_trail_user_tour`,
    data
  );
};

// Get trail_id of user
export const getTrailId = async (user_id) => {
  return await axios.get(
    `${process.env.REACT_APP_NEW_MS1_DOMAIN}trailitUser/indexTrail_id/${user_id}`
  );
};

// Get trail_id of user
export const getUserOneTrail = async (trail_id, screen) => {
  return await axios.get(
    `${process.env.REACT_APP_NEW_MS1_DOMAIN}userTourDataDetail/readTrailit_trails_data_tours/${trail_id}/${screen}`
  );
  // return await axios.get(
  //   `${process.env.REACT_APP_NEW_MS1_DOMAIN}userTourDataDetail/readTrailit_trails_data_tours/${user_id}/${trail_id}/${screen}`
  // );
};

// Get followed trail data of user
export const getFollowedOneTrail = async (trail_id, author_id, loggedin_id) => {
  return await axios.post(
    `${process.env.REACT_APP_NEW_MS1_DOMAIN}userTourDataDetail/getTrailDataTourByTrailID`,
    {
      trail_id: trail_id,
      user_id: author_id,
      loggedin_id: loggedin_id,
    }
  );
};

// Get trail_id of user
export const getUserSingleTrail = async () => {
  return await axios.get(
    `${process.env.REACT_APP_NEW_MS1_DOMAIN}trailitUser/fetchusertourdata`
  );
};

// Get all category
export const getAllCategory = async () => {
  return await axios.get(
    `${process.env.REACT_APP_NEW_MS1_DOMAIN}trailitUser/getAllCategory`
  );
};

// Update trail data
export const UpdateSingleTrail = async (user_id, trail_id, data) => {
  return await axios.put(
    `${process.env.REACT_APP_NEW_MS1_DOMAIN}trailitUser/updateTrail_trail_user_tour/${trail_id}`,
    data
  );
};

// Update trail data
export const UpdateProfilePicture = async (data) => {
  return await axios.post(
    `${process.env.REACT_APP_NEW_MS2_DOMAIN}user/uploadUserProfilePic`,
    data,
    { withCredentials: true }
  );
};

export const getNearDetails = async (id) => {
  return await axios.get(
    `${process.env.REACT_APP_NEW_MS2_DOMAIN}user/getNearPublicKey/${id}`
  );
};

// Update Trail User Data
export const UpdateTrailData = async (data) => {
  return await axios.post(
    `${process.env.REACT_APP_NEW_MS1_DOMAIN}trailitUser/UpdateTrailData`,
    data
  );
};

// Delete Trail
export const deleteTrail = async (trailId) => {
  return await axios.delete(
    `${process.env.REACT_APP_NEW_MS1_DOMAIN}userTourDataDetail/deleteTrailit_trail_data_tour/${trailId}`
  );
};

// Update trail track
export const updateTrailTrack = async (data) => {
  return await axios.post(
    `${process.env.REACT_APP_NEW_MS1_DOMAIN}userTourDataDetail/addUpdateTrailTrack`,
    data,
    {
      headers: {
        Authorization: "",
      },
    }
  );
};

// Get User data by username
export const getUserData = async (data) => {
  return await axios.get(
    `${process.env.REACT_APP_NEW_MS1_DOMAIN}profileData/getProfileData/${data}`
  );
};

export const getSingleTrailData = async (trail_id, trail_data_id) => {
  return await axios.get(
    `${process.env.REACT_APP_NEW_MS1_DOMAIN}userTourDataDetail/getSingleStepData/${trail_id}/${trail_data_id}`
  );
};

// Get user data
export const getUser = async (userId) => {
  return await axios.get(
    `${process.env.REACT_APP_NEW_MS2_DOMAIN}user/getOneUser/${userId}`
  );
};

// Log user out
export const logout = async () => {
  return await axios.get(`${process.env.REACT_APP_NEW_MS2_DOMAIN}user/logout`);
};

// Delete trail
export const deleteSingleTrail = async (trailId) => {
  // https://trail.codezeros.com/trailit/api/v1/trailitUser/deleteSingleTrail/1366
  return await axios.delete(
    `${process.env.REACT_APP_NEW_MS1_DOMAIN}trailitUser/deleteSingleTrail/${trailId}`
  );
};
