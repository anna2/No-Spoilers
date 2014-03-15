//when icon is clicked, build popup.html list
// call content script for active page

//every time a new tab is clicked call content script

chrome.runtime.onInstalled.addListener(function() {
    localStorage["toggle"] = true;
    localStorage["list"] = null;
})


chrome.tabs.onUpdated.addListener(function(id,info, tab) {
    console.log("update " + localStorage["toggle"])
    if (localStorage["toggle"] == "true") {
        chrome.tabs.executeScript(null, {"file": "content.js"});
        console.log("execute");
    }
})


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method == "getLocalStorage") {
        sendResponse({data: localStorage[request.key]});
    } else {
        sendResponse({});
        }
});

