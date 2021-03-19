import axios from "axios";

const chrome = window.chrome;

// Add a request interceptor
axios.interceptors.request.use(
  async function (config) {
    // Do something before request is sent
    await new Promise((resolve, reject) => {
      chrome.storage.local.get(["authToken"], (items) => {
        console.log("items", items);
        console.log(
          'config.headers.hasOwnProperty("Authorization")',
          config.headers.hasOwnProperty("Authorization")
        );
        if (config.headers.hasOwnProperty("Authorization")) {
          // If calling api is public api then delete Authorization property
          // Remove Authorization property from headers
          delete config.headers["Authorization"];

          resolve();
        } else {
          config.headers["Authorization"] = `Bearer ${items.authToken}`;

          console.log("inner", config);

          resolve();
        }
      });
    });

    console.log("outer", config);

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axios;
