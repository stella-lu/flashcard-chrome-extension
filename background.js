var contextMenuItem = {
    "id": "flashcards",
    "title": "Flashcards",
    "contexts": ["selection"]
}

chrome.contextMenus.create(contextMenuItem)


chrome.contextMenus.onClicked.addListener(function(info, tab) {
    alert(info.selectionText);
});