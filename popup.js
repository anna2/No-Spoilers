function buildList() {
    var list = document.getElementById('list');
    var titles = JSON.parse(localStorage["list"] || "null") || [];
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

function refresh() {
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
        chrome.tabs.reload(tabs[0].id);
    })
}

function addTitle() {
    var titles = JSON.parse(localStorage["list"] || "null") || [];
    var input = document.getElementById('title').value;
    titles.push(input);
    localStorage["list"] = JSON.stringify(titles);
    emptyList();
    buildList();
    
    refresh();
}

function removeTitle(e) {
    if (e.target.id) {
        // remove node from DOM
        node = document.getElementById(e.target.id);
        nodeText = document.getElementById(e.target.id).value;
        node.remove();

        // remove title from master list
        var titles = JSON.parse(localStorage["list"] || "null") || [];
        var index = titles.indexOf(nodeText);
        titles.splice(index, 1);
        localStorage["list"] = JSON.stringify(titles);

        refresh();
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
        refresh();
});
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('add').addEventListener('click', addTitle);
    checkBox();
    buildList();
    document.getElementById('list').addEventListener('click', removeTitle);
});
