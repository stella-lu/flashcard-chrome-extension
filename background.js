var contextMenuItem = {
    "id": "flashcards",
    "title": "Flashcards",
    "contexts": ["selection"]
    
}
chrome.contextMenus.create(contextMenuItem)
chrome.contextMenus.onClicked.addListener(function(info, tab) {
    getSelectionText()
});

var button = document.getElementById("button");
button.onclick = function() {
	alert("you clicked a button!")
}

function shuffle() {
    alert("shuffling!")
};