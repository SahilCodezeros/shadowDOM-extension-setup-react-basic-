// Called when the user clicks on the browserApi action

function getBrowser() {
  if (typeof chrome !== "undefined") {
    if (typeof browser !== "undefined") {
      return "Firefox";
    } else {
      return "Chrome";
    }
  } else {
    return "Edge";
  }
}

// console.log("browserApi", getBrowser());

/* global chrome */

let browserApi = window.browser || window.chrome;
if (getBrowser() === "Chrome" || getBrowser() === "Chrome") {
  browserApi = window.chrome;
}

function onCaptured(imageUri) {}

function onError(error) {}

const alarmTrigger = (alarm) => {
  if (alarm.name === "autoLogout") {
    browserApi.tabs.query({}, (tabs) => {
      const message = {
        from: "background.js",
        message: "autoLogoutTriggered",
      };

      for (let i = 0; i < tabs.length; i++) {
        if (tabs[i].url) {
          if (tabs[i].active) {
            message.apiCall = true;
          }

          // Send message to all tabs
          browserApi.tabs.sendMessage(tabs[i].id, message);
        }
      }

      // Remove alarm listener
      browserApi.alarms.onAlarm.removeListener(alarmTrigger);
    });
  }
};

console.log("browserApi", browserApi);
console.log("chrome", chrome);
console.log("getBrowser()", getBrowser());

if (
  browserApi &&
  browserApi.app &&
  typeof browserApi.app.isInstalled !== "undefined"
) {
  browserApi.browserAction.onClicked.addListener(function (tab) {
    browserApi.tabs.query(
      { active: true, lastFocusedWindow: true },
      function (tabs) {
        var activeTab = tabs[0];
        browserApi.tabs.sendMessage(
          activeTab.id,
          { tabs },
          { message: "clicked_browserApi_action" }
        );
      }
    );
  });

  browserApi.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    // read changeInfo data and do something with it
    // like send the new url to contentscripts.js
    if (changeInfo.url) {
      browserApi.tabs.sendMessage(tabId, {
        message: "urlChanged",
        url: changeInfo.url,
      });
    }
  });

  // Call when extension install, updated manually or updated automatically
  browserApi.runtime.onInstalled.addListener((details) => {
    browserApi.tabs.query({}, (tabs) => {
      let contentjsFile = browserApi.runtime.getManifest().content_scripts[0]
        .js[0];
      for (let i = 0; i < tabs.length; i++) {
        if (tabs[i].title && tabs[i].url) {
          browserApi.tabs.executeScript(
            tabs[i].id,
            { file: contentjsFile },
            // eslint-disable-next-line no-loop-func
            function () {
              let e = browserApi.runtime.lastError;
              if (e !== undefined) {
                // eslint-disable-next-line no-undef
                console.error(
                  "tab: " + tabs[i].id + " lastError: " + JSON.stringify(e)
                );
              }
            }
          );
        }
      }
    });
  });

  browserApi.storage.onChanged.addListener(async (changes) => {
    if (changes.autoLogoutTime && changes.autoLogoutTime.newValue) {
      browserApi.alarms.create("autoLogout", {
        when: changes.autoLogoutTime.newValue,
      });
    }
  });
}

browserApi.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.heartbeat) {
    sendResponse(message);
    return;
  }

  if (message.type === "closeMenuPopButton") {
    browserApi.tabs.query({}, (tabs) => {
      const message = {
        from: "background.js",
        status: "removeMenuPopButton",
      };

      for (let i = 0; i < tabs.length; i++) {
        if (tabs[i].active) {
          continue;
        }

        // Send message to all tabs
        browserApi.tabs.sendMessage(tabs[i].id, message);
      }
    });
  }

  if (message.type === "logout") {
    browserApi.tabs.query({}, (tabs) => {
      const message = {
        from: "content.js",
        status: "logout",
      };

      for (let i = 0; i < tabs.length; i++) {
        // Send message to all tabs
        browserApi.tabs.sendMessage(tabs[i].id, message);
      }
    });
  }

  if (message.type === "openInTab") {
    browserApi.tabs.query(
      { active: true, currentWindow: true },
      function (tabs) {
        var activeTab = tabs[0];

        browserApi.tabs.update(activeTab.id, {
          url: message.url,
        });
      }
    );
  }

  if (message.type === "notification") {
    browserApi.notifications.create("", message.options);
  }

  if (message.type === "updateTimeout") {
    browserApi.tabs.query({}, (tabs) => {
      const message = {
        from: "popup",
        subject: "updateTimeout",
      };

      for (let i = 0; i < tabs.length; i++) {
        // Send message to all tabs
        browserApi.tabs.sendMessage(tabs[i].id, message);
      }
    });
  }

  if (message.type === "DOMInfo") {
    browserApi.tabs.query(
      {
        active: true,
        lastFocusedWindow: true,
      },
      (tabs) => {
        // ...and send a request for the DOM info...
        browserApi.tabs.sendMessage(tabs[0].id, {
          from: "popup",
          subject: "DOMInfo",
        });
      }
    );
  }

  if (message.type === "browserApiModal") {
    browserApi.tabs.query(
      { active: true, currentWindow: true },
      function (tabs) {
        var activeTab = tabs[0];
        browserApi.tabs.sendMessage(activeTab.id, {
          message: "browserApi_modal",
          status: message.status,
        });
      }
    );
  }

  if (message.type === "budgeText") {
    if (message.badgeText && message.badgeText !== "") {
      browserApi.tabs.get(sender.tab.id, function (tab) {
        if (browserApi.runtime.lastError) {
          return; // the prerendered tab has been nuked, happens in omnibox search
        }
        if (tab.index >= 0) {
          // tab is visible
          browserApi.browserAction.setBadgeText({
            tabId: tab.id,
            text: "*",
          }); // message.badgeText
          browserApi.browserAction.setBadgeBackgroundColor({
            tabId: tab.id,
            color: "red",
          });
        } else {
          // prerendered tab, invisible yet, happens quite rarely
          var tabId = sender.tab.id,
            text = message.badgeText;
          browserApi.webNavigation.onCommitted.addListener(function update(
            details
          ) {
            if (details.tabId == tabId) {
              browserApi.browserAction.setBadgeText({
                tabId: tabId,
                text: text,
              });
              browserApi.browserAction.setBadgeBackgroundColor({
                tabId: tabId,
                color: "red",
              });
              browserApi.webNavigation.onCommitted.removeListener(update);
            }
          });
        }
      });
    }
  }
});

browserApi.runtime.onMessageExternal.addListener(function (
  request,
  sender,
  sendResponse
) {
  switch (request.type) {
    case "STATUS":
      if (request.message === "init") {
        browserApi.tabs.query(
          { active: true, currentWindow: true },
          function (tabs) {
            const port = browserApi.tabs.connect(tabs[0].id, {
              name: "Trailit-webapp",
            });
            port.postMessage({
              message: "check_login_status",
            });

            port.onMessage.addListener((response) => {
              sendResponse(response);
            });

            // port.onDisconnect.addListener((obj) => {
            //   console.log("disconnected!!!");
            // });
          }
        );
      } else {
        sendResponse(false);
      }

      break;

    case "WEB_REQUEST":
      if (request.action === "PREVIEW") {
        browserApi.tabs.query(
          { active: true, currentWindow: true },
          function (tabs) {
            var activeTab = tabs[0];
            browserApi.tabs.sendMessage(activeTab.id, {
              message: "preview_all",
              payload: { ...request, url: tabs[0].url },
            });
          }
        );
      }

      if (request.action === "CONTINUE_PREVIEW") {
        browserApi.tabs.query(
          { active: true, currentWindow: true },
          function (tabs) {
            var activeTab = tabs[0];

            browserApi.tabs.sendMessage(activeTab.id, {
              message: "continue_preview",
              payload: { ...request, url: tabs[0].url },
            });
          }
        );
      }

      if (request.action === "PREVIEW_SINGLE_TRAIL") {
        browserApi.tabs.query(
          { active: true, currentWindow: true },
          function (tabs) {
            var activeTab = tabs[0];

            browserApi.tabs.sendMessage(activeTab.id, {
              message: "preview_single",
              payload: { ...request, url: tabs[0].url },
            });
          }
        );
      }
      if (request.action === "PREVIEW_WITHOUT_LOGIN") {
        browserApi.tabs.query(
          { active: true, currentWindow: true },
          function (tabs) {
            var activeTab = tabs[0];

            browserApi.tabs.sendMessage(activeTab.id, {
              message: "preview_without_login",
              payload: { ...request, url: tabs[0].url },
            });
          }
        );
      }
      break;
    case "WEB_LOGIN":
      if (request.action === "LOGIN_FROM_WEB") {
        browserApi.tabs.query(
          { active: true, currentWindow: true },
          function (tabs) {
            var activeTab = tabs[0];
            browserApi.tabs.sendMessage(activeTab.id, {
              message: "addon_login",
              payload: { ...request, url: tabs[0].url },
            });
          }
        );

        // Add alarm listener
        browserApi.alarms.onAlarm.addListener(alarmTrigger);
      }
      if (request.action === "LOGOUT_FROM_WEB") {
        browserApi.tabs.query(
          { active: true, currentWindow: true },
          function (tabs) {
            var activeTab = tabs[0];
            browserApi.tabs.sendMessage(activeTab.id, {
              message: "addon_logout",
              payload: { url: tabs[0].url },
            });
          }
        );

        // Remove alarm listener
        browserApi.alarms.onAlarm.removeListener(alarmTrigger);
      }
      break;

    default:
      break;
  }
});
