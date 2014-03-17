//when icon is clicked, build popup.html list
// call content script for active page

//every time a new tab is clicked call content script

chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.clear(function(){
    chrome.storage.sync.set({"toggle": true}, function(){});
    chrome.storage.sync.set({"blockList": null}, function() {});
    chrome.storage.sync.set({"showList": null}, function(){});
})
})

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method == "getLocalStorage") {
        chrome.storage.sync.get(request.key, function(obj){
            sendResponse({data: obj[request.key]});
        })
        return true;
    } else if (request.method == "updateDOM") {
        chrome.tabs.executeScript(null, {"file": "jquery-2.1.0.min.js"});
        chrome.tabs.executeScript(null, {"file": "content.js"});
    } else if (request.method == "off") {
        console.log("in backgournd off");
        chrome.tabs.executeScript(null, {"file": "jquery-2.1.0.min.js"});
        chrome.tabs.executeScript(null, {"file": "content_off.js"});
        return true;
    } else if (request.method == "resetShowList") {
        chrome.storage.sync.set({"showList": null});
    } else {
        sendResponse({});
        }
});

function toggle() {
    chrome.storage.sync.get("toggle", function(data){
        if (data["toggle"] == true) {
            chrome.tabs.executeScript(null, {"file": "jquery-2.1.0.min.js"});
            chrome.tabs.executeScript(null, {"file": "show_all.js"});
            //chrome.tabs.executeScript(null, {"file": "content.js"});
        } else {
            chrome.tabs.executeScript(null, {"file": "off.js"});
        }
    })
}

chrome.tabs.onUpdated.addListener(function(){
    toggle();
})

chrome.tabs.onActivated.addListener(function() {
    toggle();
})
