var blockList = [];
var showList = [];

function block() {
    if (blockList == null) {
        {};
    } else {
    for (i = 0; i < blockList.length; ++i) {
        $(":contains("+blockList[i]+"):not(:has(div))").hide();
    }
        }
};

function show() {
    if (showList == null) {
        {};
    } else {
        for (i = 0; i < showList.length; ++i) {
            $(":contains("+showList[i]+"):not(:has(div))").show();
        }
        chrome.runtime.sendMessage({method: "resetShowList"}, function(response){})
    }
};

function updateBlockList() {
    chrome.runtime.sendMessage({method: "getLocalStorage", key: "blockList"}, function(response) {
        blockList = response.data;
        console.log("content " + blockList);
        block();
    });
}

function updateShowList() {
    chrome.runtime.sendMessage({method: "getLocalStorage", key: "showList"}, function(response) {
        showList = response.data;
        show();
    });
}

console.log("on the content script");
updateBlockList();
updateShowList();



