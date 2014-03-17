function buildList() {
    var list = document.getElementById('list');
    chrome.storage.sync.get("blockList", function(data){
        var titles = data["blockList"] || [];
        for (i = 0; i < titles.length; ++i) {
            var newTitle = document.createElement('LI');
            newTitle.id = i;
            newTitle.appendChild(document.createTextNode(titles[i]));
            list.appendChild(newTitle); 
        }
    })
}

function emptyList() {
    var list = document.getElementById('list');
    while(list.firstChild) {
        list.removeChild(list.firstChild);
    }
}

function updateDOM() {
    chrome.storage.sync.get("toggle", function(data){
        if (data["toggle"]  == true) {
            chrome.runtime.sendMessage({method: "updateDOM"}, function(response){})
        }
    })
}

function addTitle() {
    chrome.storage.sync.get("blockList", function(data){
        var titles = data["blockList"] || [];
        var input = document.getElementById('title').value;
        titles.push(input);
        chrome.storage.sync.set({"blockList": titles}, function() {
            emptyList();
            buildList();
            updateDOM();
        })
    })
}


function removeTitle(e) {
    if (e.target.id) {
        // remove node from popup DOM
        node = document.getElementById(e.target.id);
        nodeText = document.getElementById(e.target.id).textContent;
        node.remove();

        // remove title from master list
        chrome.storage.sync.get("blockList", function(data){
            var titles = data["blockList"] || [];
            var index = titles.indexOf(nodeText);
            titles.splice(index, 1);
            chrome.storage.sync.set({"blockList": titles}, function() {


                //update showList
                chrome.storage.sync.get("showList", function(data) {
                    var show = data["showList"] || [];
                    show.push(nodeText);
                    chrome.storage.sync.set({"showList": show}, function(){
                        updateDOM();
                    })
                })
            })
        })
    }
}

function off() {
    console.log("In off");
    chrome.runtime.sendMessage({method: "off"}, function(response){})
}

function checkBox() {
    console.log("in checkbox");
    var input = document.getElementById('toggle');
    chrome.storage.sync.get("toggle", function(data){
        if (data["toggle"] == true) {
            input.checked = true;
        } else {
            input.checked = false;
        }
    })
    input.addEventListener("change", function() {
        console.log("change!");
        chrome.storage.sync.set({"toggle": input.checked}, function() {
            if (input.checked == true) {
                updateDOM();
                console.log("true!");
            } else {
                off();
                console.log("false~");

            }
        })
    })
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('add').addEventListener('click', addTitle);
    checkBox();
    buildList();
    document.getElementById('list').addEventListener('click', removeTitle);
});
