//when icon is clicked, build popup.html list
// call content script for active page

//every time a new tab is clicked call content script

chrome.runtime.onInstalled.addListener(function() {
    localStorage["toggle"] = true;
    localStorage["blockList"] = null;
    localStorage["showList"] = null;
})

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method == "getLocalStorage") {
        sendResponse({data: localStorage[request.key]});
    } else if (request.method == "updateDOM") {
        if (localStorage["toggle"] == "true") {
            chrome.tabs.executeScript(null, {"file": "jquery-2.1.0.min.js"});
            chrome.tabs.executeScript(null, {"file": "content.js"});
        }
    } else {
        sendResponse({});
        }
});

