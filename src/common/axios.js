import axios from "axios";
import { get } from "../AppUtill";

// Upload media files
export const uploadMediaFile = async (formData) => {
  return await axios.post(
    `${process.env.REACT_APP_MS4_URL}userTourDataDetail/uploadTrail_file_media`,
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
    `${process.env.REACT_APP_MS4_URL}userTourDataDetail/createTrailit_trail_data_tour`,
    trails
  );
};

// Get all trails
export const getTrails = async (userId) => {
  return await axios.get(
    `${process.env.REACT_APP_MS4_URL}userTourDataDetail/readTrailit_trails_data_tour/${userId}`
  );
};

// For follow
export const followTrails = async (data) => {
  return await axios.post(
    `${process.env.REACT_APP_MS4_URL}userTourFollow/createTrailit_follow_tour`,
    data
  );
};

// Get follow data of user
export const getFollowTrails = async (userId) => {
  // return await axios.post(
  //   `${process.env.REACT_APP_MS4_URL}userTourFollow/readTrailits_follow_tour`,
  //   data
  // );

  return await axios.get(
    `${process.env.REACT_APP_MS4_URL}userTourDataDetail/getTrailList?type=following&page=1&itemsPerPage=20&loggedInId=${userId}`
  );
  // userTourDataDetail/getTrailList?type=following&page=1&itemsPerPage=20&loggedInId=6008389da0d1567ee8224390
};

// Unfollow trail
export const unFollowTrailOfUser = async (data) => {
  return await axios.post(
    `${process.env.REACT_APP_MS4_URL}userTourFollow/deleteTrailit_follow_tour`,
    data
  );
};

// Get all notification
export const getAllNotification = async (data) => {
  return await axios.post(
    `${process.env.REACT_APP_MS4_URL}userTourNotification/readTrailits_notification_tour`,
    data
  );
};

// Remove notification
export const updateNotification = async (data) => {
  return await axios.post(
    `${process.env.REACT_APP_MS4_URL}userTourNotification/updateTrailit_notification_tour`,
    data
  );
};

// Update sorted array
export const arraySorting = async (data) => {
  return await axios.put(
    `${process.env.REACT_APP_MS4_URL}trailitSorting/sortTrailOrder`,
    { data }
  );
};

// Get all notification data
export const getAllUser = async () => {
  return await axios.get(`${process.env.REACT_APP_MS2_URL}user/getAllUser`);
};

// Update flag in trail data table
export const updateTrailFlag = async (data) => {
  return await axios.put(
    `${process.env.REACT_APP_MS4_URL}userTourDataDetail/updateTrail_trail_data_tour`,
    data
  );
};

// Create trail_id when user signup
export const createTrailId = async (data) => {
  return await axios.post(
    `${process.env.REACT_APP_MS4_URL}trailitUser/createTrail_trail_user_tour`,
    data
  );
};

// Get trail_id of user
export const getTrailId = async (user_id) => {
  return await axios.get(
    `${process.env.REACT_APP_MS4_URL}trailitUser/indexTrail_id/${user_id}`
  );
};

// Get trail_id of user
export const getUserOneTrail = async (trail_id, screen) => {
  return await axios.get(
    `${process.env.REACT_APP_MS4_URL}userTourDataDetail/readTrailit_trails_data_tours/${trail_id}/${screen}`
  );
  // return await axios.get(
  //   `${process.env.REACT_APP_MS4_URL}userTourDataDetail/readTrailit_trails_data_tours/${user_id}/${trail_id}/${screen}`
  // );
};

// Get followed trail data of user
export const getFollowedOneTrail = async (trail_id, author_id, loggedin_id) => {
  return await axios.post(
    `${process.env.REACT_APP_MS4_URL}userTourDataDetail/getTrailDataTourByTrailID`,
    {
      trail_id: trail_id,
      user_id: author_id,
      loggedin_id: loggedin_id,
    }
  );
};

export const getTrailPublic = async (user_id, trail_id, steps) => {
  return await axios.get(
    `${process.env.REACT_APP_MS4_URL}userTourDataDetail/getLimitedStepsData/${trail_id}`
  );
};

// Get trail_id of user
export const getUserSingleTrail = async (user_id) => {
  return await axios.get(
    `${process.env.REACT_APP_MS4_URL}trailitUser/fetchusertourdata/${user_id}`
  );
};

// Get all category
export const getAllCategory = async (user_id) => {
  return await axios.get(
    `${process.env.REACT_APP_MS4_URL}trailitUser/getAllCategory`
  );
};

// Update trail data
export const UpdateSingleTrail = async (user_id, trail_id, data) => {
  return await axios.put(
    `${process.env.REACT_APP_MS4_URL}trailitUser/updateTrail_trail_user_tour/${user_id}/${trail_id}`,
    data
  );
};

// Update trail data
export const UpdateProfilePicture = async (data) => {
  return await axios.post(
    `${process.env.REACT_APP_MS1_URL}user/uploadUserProfilePic`,
    data,
    { withCredentials: true }
  );
};

// Update Trail User Data
export const UpdateTrailData = async (data) => {
  return await axios.post(
    `${process.env.REACT_APP_MS4_URL}trailitUser/UpdateTrailData`,
    data
  );
};

// Delete Trail
export const deleteTrail = async (trailId) => {
  return await axios.delete(
    `${process.env.REACT_APP_MS4_URL}userTourDataDetail/deleteTrailit_trail_data_tour/${trailId}`
  );
};

// Update trail track
export const updateTrailTrack = async (data) => {
  return await axios.post(
    `${process.env.REACT_APP_MS4_URL}userTourDataDetail/addUpdateTrailTrack`,
    data
  );
};

// Get User data by username
export const getUserData = async (data) => {
  return await axios.get(
    `${process.env.REACT_APP_MS4_URL}profileData/getProfileData/${data}`
  );
};

export const getSingleTrailData = async (trail_id, trail_data_id) => {
  return await axios.get(
    `${process.env.REACT_APP_MS4_URL}userTourDataDetail/getSingleStepData/${trail_id}/${trail_data_id}`
  );
};

// Get user data
export const getUser = async (userId) => {
  return await axios.get(
    `${process.env.REACT_APP_MS1_URL}user/getOneUser/${userId}`
  );
};
