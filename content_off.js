// This content script is injected when extension is turned off.
// Call show() on every element of blockList

var showList = [];

function show() {
    if (showList == null) {
        {};
    } else {
        for (i = 0; i < showList.length; ++i) {
            $(":contains("+showList[i]+"):not(:has(div))").show();
        }
    }
};


function moveBlockToShow() {
    chrome.runtime.sendMessage({method: "getLocalStorage", key: "blockList"}, function(response) {
        showList = response.data;
        show();
    });
}

moveBlockToShow();



