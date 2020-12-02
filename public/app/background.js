/* global chrome */

// chrome.browserAction.onClicked.addListener(function(tab) {
//     chrome.tabs.sendMessage(tab.id, { message: 'load' });
// });

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete' && 
        tab.url.includes('http')) {
        chrome.tabs.executeScript(tabId, { file: '/static/js/content.js' });
    }
});