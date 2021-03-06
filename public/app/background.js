// Called when the user clicks on the browser action
/* global chrome */
function onCaptured(imageUri) {}

function onError(error) {}

const alarmTrigger = (alarm) => {
  if (alarm.name === "autoLogout") {
    chrome.tabs.query({}, (tabs) => {
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
          chrome.tabs.sendMessage(tabs[i].id, message);
        }
      }

      // Remove alarm listener
      chrome.alarms.onAlarm.removeListener(alarmTrigger);
    });
  }
};

if (typeof chrome.app.isInstalled !== "undefined") {
  chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.query(
      { active: true, lastFocusedWindow: true },
      function (tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(
          activeTab.id,
          { tabs },
          { message: "clicked_browser_action" }
        );
      }
    );
  });

  chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    // read changeInfo data and do something with it
    // like send the new url to contentscripts.js
    if (changeInfo.url) {
      chrome.tabs.sendMessage(tabId, {
        message: "urlChanged",
        url: changeInfo.url,
      });
    }
  });

  // Call when extension install, updated manually or updated automatically
  chrome.runtime.onInstalled.addListener((details) => {
    chrome.tabs.query({}, (tabs) => {
      let contentjsFile = chrome.runtime.getManifest().content_scripts[0].js[0];
      for (let i = 0; i < tabs.length; i++) {
        if (tabs[i].title && tabs[i].url) {
          chrome.tabs.executeScript(
            tabs[i].id,
            { file: contentjsFile },
            // eslint-disable-next-line no-loop-func
            function () {
              let e = chrome.runtime.lastError;
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

  chrome.storage.onChanged.addListener(async (changes) => {
    if (changes.autoLogoutTime && changes.autoLogoutTime.newValue) {
      chrome.alarms.create("autoLogout", {
        when: changes.autoLogoutTime.newValue,
      });
    }
  });

  // function modifyDOM() {
  //    //You can play with your DOM here or check URL against your regex
  //
  //
  //    return document.body.innerHTML;
  // }

  // chrome.runtime.onMessage.addListener(function(request, sender) {
  //    chrome.tabs.query({active: false, currentWindow:true},function(tabs) {
  //       let activeTab = tabs.find(r => r.url == request.options.url);
  //       chrome.tabs.update(activeTab.id, {active: true});
  //       chrome.tabs.sendMessage(activeTab.id, {target: 'app', type: 'setMessage', body: 'How are you'}, function(ee) {
  //
  //       });

  //       chrome.tabs.executeScript({
  //          code: '(' + modifyDOM + ')();' //argument here is a string but function.toString() returns function's code
  //       }, (results) => {
  //          //Here we have just the innerHTML and not DOM structure
  //
  //
  //       });

  //       chrome.tabs.update(activeTab.id, {url: activeTab.url}, function() {
  //
  //       });

  // chrome.tabs.executeScript(null, {
  //    file: '/static/js/content.js'
  // }, function(ddd) {

  //    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
  //    if (chrome.runtime.lastError) {

  //    }
  // });

  //       chrome.tabs.executeScript(null, { file: 'src/content' });
  //    });
  // });

  // chrome.windows.onFocusChanged.addListener(function(window) {
  //    chrome.tabs.query({active: false, currentWindow:true},function(tabs) {
  //
  //       var activeTab = tabs[5];
  //       chrome.tabs.update(activeTab.id, {active: true})
  //       // chrome.tabs.sendMessage(activeTab.id, {tabs}, {"message": "clicked_browser_action"});
  //    });
  // });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.heartbeat) {
    sendResponse(message);
    return;
  }

  if (message.type === "closeMenuPopButton") {
    chrome.tabs.query({}, (tabs) => {
      const message = {
        from: "background.js",
        status: "removeMenuPopButton",
      };

      for (let i = 0; i < tabs.length; i++) {
        if (tabs[i].active) {
          continue;
        }

        // Send message to all tabs
        chrome.tabs.sendMessage(tabs[i].id, message);
      }
    });
  }

  if (message.type === "logout") {
    chrome.tabs.query({}, (tabs) => {
      const message = {
        from: "content.js",
        status: "logout",
      };

      for (let i = 0; i < tabs.length; i++) {
        // Send message to all tabs
        chrome.tabs.sendMessage(tabs[i].id, message);
      }
    });
  }

  if (message.type === "openInTab") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var activeTab = tabs[0];

      chrome.tabs.update(activeTab.id, {
        url: message.url,
      });
    });
  }

  if (message.type === "notification") {
    chrome.notifications.create("", message.options);
  }

  if (message.type === "updateTimeout") {
    chrome.tabs.query({}, (tabs) => {
      const message = {
        from: "popup",
        subject: "updateTimeout",
      };

      for (let i = 0; i < tabs.length; i++) {
        // Send message to all tabs
        chrome.tabs.sendMessage(tabs[i].id, message);
      }
    });
  }

  if (message.type === "DOMInfo") {
    chrome.tabs.query(
      {
        active: true,
        lastFocusedWindow: true,
      },
      (tabs) => {
        // ...and send a request for the DOM info...
        chrome.tabs.sendMessage(tabs[0].id, {
          from: "popup",
          subject: "DOMInfo",
        });
      }
    );
  }

  if (message.type === "chromeModal") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, {
        message: "chrome_modal",
        status: message.status,
      });
    });
  }

  if (message.type === "budgeText") {
    if (message.badgeText && message.badgeText !== "") {
      chrome.tabs.get(sender.tab.id, function (tab) {
        if (chrome.runtime.lastError) {
          return; // the prerendered tab has been nuked, happens in omnibox search
        }
        if (tab.index >= 0) {
          // tab is visible
          chrome.browserAction.setBadgeText({ tabId: tab.id, text: "*" }); // message.badgeText
          chrome.browserAction.setBadgeBackgroundColor({
            tabId: tab.id,
            color: "red",
          });
        } else {
          // prerendered tab, invisible yet, happens quite rarely
          var tabId = sender.tab.id,
            text = message.badgeText;
          chrome.webNavigation.onCommitted.addListener(function update(
            details
          ) {
            if (details.tabId == tabId) {
              chrome.browserAction.setBadgeText({ tabId: tabId, text: text });
              chrome.browserAction.setBadgeBackgroundColor({
                tabId: tabId,
                color: "red",
              });
              chrome.webNavigation.onCommitted.removeListener(update);
            }
          });
        }
      });
    }
  }
});

chrome.runtime.onMessageExternal.addListener(function (
  request,
  sender,
  sendResponse
) {
  switch (request.type) {
    case "STATUS":
      if (request.message === "init") {
        chrome.tabs.query(
          { active: true, currentWindow: true },
          function (tabs) {
            const port = chrome.tabs.connect(tabs[0].id, {
              name: "Trailit-webapp",
            });
            port.postMessage({
              message: "check_login_status",
            });

            port.onMessage.addListener((response) => {
              sendResponse(response);
            });
          }
        );
      } else {
        sendResponse(false);
      }

      break;

    case "WEB_REQUEST":
      if (request.action === "PREVIEW") {
        chrome.tabs.query(
          { active: true, currentWindow: true },
          function (tabs) {
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, {
              message: "preview_all",
              payload: { ...request, url: tabs[0].url },
            });
          }
        );
      }

      if (request.action === "CONTINUE_PREVIEW") {
        chrome.tabs.query(
          { active: true, currentWindow: true },
          function (tabs) {
            var activeTab = tabs[0];

            chrome.tabs.sendMessage(activeTab.id, {
              message: "continue_preview",
              payload: { ...request, url: tabs[0].url },
            });
          }
        );
      }

      if (request.action === "PREVIEW_SINGLE_TRAIL") {
        chrome.tabs.query(
          { active: true, currentWindow: true },
          function (tabs) {
            var activeTab = tabs[0];

            chrome.tabs.sendMessage(activeTab.id, {
              message: "preview_single",
              payload: { ...request, url: tabs[0].url },
            });
          }
        );
        //   chrome.tabs.query(
        //     { active: true, currentWindow: true },
        //     function (tabs) {
        //       var activeTab = tabs[0];

        //
        //       chrome.tabs.sendMessage(activeTab.id, {
        //         message: "check_login_status",
        //         callback: sendResponse,
        //       });
        //     }
        //   );
        // } else {
        //   sendResponse(false);
        // }
      }
      if (request.action === "PREVIEW_WITHOUT_LOGIN") {
        chrome.tabs.query(
          { active: true, currentWindow: true },
          function (tabs) {
            var activeTab = tabs[0];

            chrome.tabs.sendMessage(activeTab.id, {
              message: "preview_without_login",
              payload: { ...request, url: tabs[0].url },
            });
          }
        );
      }
      break;
    case "WEB_LOGIN":
      if (request.action === "LOGIN_FROM_WEB") {
        chrome.tabs.query(
          { active: true, currentWindow: true },
          function (tabs) {
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, {
              message: "addon_login",
              payload: { ...request, url: tabs[0].url },
            });
          }
        );

        // Add alarm listener
        chrome.alarms.onAlarm.addListener(alarmTrigger);
      }
      if (request.action === "LOGOUT_FROM_WEB") {
        chrome.tabs.query(
          { active: true, currentWindow: true },
          function (tabs) {
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, {
              message: "addon_logout",
              payload: { url: tabs[0].url },
            });
          }
        );

        // Remove alarm listener
        chrome.alarms.onAlarm.removeListener(alarmTrigger);
      }
      break;

    default:
      break;
  }
});

// chrome.runtime.onMessage.addListener(
//    function(request, sender, sendResponse) {
//       // read `newIconPath` from request and read `tab.id` from sender
//       chrome.browserAction.setIcon({
//          path: request.newIconPath,
//          tabId: sender.tab.id
//       });
// });

// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//    if (request.method == "getStatus")
//      sendResponse({status: localStorage['status']});
//    else
//      sendResponse({}); // snub them.
// });

// chrome.runtime.onMessage.addListener(
//    function(message, callback) {
//       chrome.tabs.sendMessage(sender.id, {"message": "clicked_browser_action"});
//   });

// chrome.runtime.onMessage.addListener(
//    function(request, sender, sendResponse) {
//       alert("Hello " + sender.id)
//       chrome.runtime.sendMessage(sender.id, {"message": "clicked_browser_action"});
//    }
// );
