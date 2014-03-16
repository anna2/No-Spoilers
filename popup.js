function buildList() {
    var list = document.getElementById('list');
    var titles = JSON.parse(localStorage["blockList"] || "null") || [];
    for (i = 0; i < titles.length; ++i) {
        var newTitle = document.createElement('LI');
        newTitle.id = i;
        newTitle.appendChild(document.createTextNode(titles[i]));
        list.appendChild(newTitle); 
    }
}

function emptyList() {
    var list = document.getElementById('list');
    while(list.firstChild) {
        list.removeChild(list.firstChild);
    }
}

function updateDOM() {
    chrome.runtime.sendMessage({method: "updateDOM"}, function(response){}
)}

function addTitle() {
    var titles = JSON.parse(localStorage["blockList"] || "null") || [];
    var input = document.getElementById('title').value;
    titles.push(input);
    localStorage["blockList"] = JSON.stringify(titles);
    emptyList();
    buildList();
    updateDOM();
}


function removeTitle(e) {
    if (e.target.id) {
        // remove node from popup DOM
        node = document.getElementById(e.target.id);
        nodeText = document.getElementById(e.target.id).textContent;
        node.remove();

        // remove title from master list
        var titles = JSON.parse(localStorage["list"] || "null") || [];
        var index = titles.indexOf(nodeText);
        titles.splice(index, 1);
        localStorage["blockList"] = JSON.stringify(titles);
        
        //update webpage to unblock matching nodes
        localStorage["showList"] = JSON.stringify([nodeText]);
        console.log(nodeText);
        updateDOM();
        
    }
}

function checkBox() {
    var toggle = document.getElementById('toggle');
    if (localStorage["toggle"] == "true") {
        toggle.checked = true;
    } else {
        toggle.checked = false;
    }
    toggle.addEventListener("change", function() {
        localStorage["toggle"] = toggle.checked;
        chrome.tabs.reload;
});
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('add').addEventListener('click', addTitle);
    checkBox();
    buildList();
    document.getElementById('list').addEventListener('click', removeTitle);
});
