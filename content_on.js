// This script fetches the current blockList
// Previously hidden elements that are no longer in the current blockList
// are stripped of the noSpoilersHidden class and shown.
// All current elements of blockList are assigned the noSpoilersHidden class and hidden;


function block(blockList) {
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



function getBlockList() {
    chrome.runtime.sendMessage({method: "getStorage", key: "blockList"}, function(response) {
        block(response.data);
    });
}

getBlockList();
