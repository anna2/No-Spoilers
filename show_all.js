// This script fetches the current blockList
// Previously hidden elements that are no longer in the current blockList
// are stripped of the noSpoilersHidden class and shown.
//All current elements fo blockList are assigned the noSpoilersHidden class and hidden();

var blockList = [];


function block() {
    if (blockList == null) {
        $(".noSpoilersHidden").removeClass("noSpoilersHidden").show();
    } else {
    for (i = 0; i < blockList.length; ++i) {
        $(":contains("+blockList[i]+"):not(:has(div))").removeClass("noSpoilersHidden").addClass("noSpoilersTemp");
    }
        $(".noSpoilersHidden").removeClass("noSpoilersHidden").show();
        $(".noSpoilersTemp").removeClass("noSpoilersTemp").addClass("noSpoilersHidden").hide();
        }
};



function updateBlockList() {
    chrome.runtime.sendMessage({method: "getLocalStorage", key: "blockList"}, function(response) {
        blockList = response.data;
        console.log("content " + blockList);
        block();
    });
}

updateBlockList();
