var blockList = [];
function block() {
    if (blockList == null) {
        {};
    } else {
    for (i = 0; i < blockList.length; ++i) {
        $(":contains("+blockList[i]+"):not(:has(div))").hide();
        console.log(blockList[i]);
    }
        }
};

function updateList() {
    chrome.runtime.sendMessage({method: "getLocalStorage", key: "list"}, function(response) {
        blockList = JSON.parse(response.data);
        block();
    });
}

console.log("IN the content script")
updateList();



