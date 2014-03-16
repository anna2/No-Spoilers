var blockList = [];
var showList = [];

function block() {
    if (blockList == null) {
        {};
    } else {
    for (i = 0; i < blockList.length; ++i) {
        $(":contains("+blockList[i]+"):not(:has(div))").hide();
        console.log("blocking " + blockList[i]);
    }
        }
};

function show() {
    console.log("inside show");
    if (showList == null) {
        {};
    } else {
        console.log("inside show else");
        for (i = 0; i < showList.length; ++i) {
            $(":contains("+showList[i]+"):not(:has(div))").show();
            console.log("showing " + showList[i]);
        }
    }
};

function updateBlockList() {
    chrome.runtime.sendMessage({method: "getLocalStorage", key: "blockList"}, function(response) {
        blockList = JSON.parse(response.data);
        block();
    });
}

function updateShowList() {
    chrome.runtime.sendMessage({method: "getLocalStorage", key: "showList"}, function(response) {
        showList = JSON.parse(response.data);
        console.log("showlist: " + showList);
        show();
    });
}

console.log("IN the content script")
updateBlockList();
updateShowList();



