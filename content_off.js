//call show() on every element of blockList

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
        showList = JSON.parse(response.data);
        show();
    });
}

moveBlockToShow();



