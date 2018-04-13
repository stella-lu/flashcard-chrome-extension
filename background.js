var contextMenuItem = {
    "id": "flashcards",
    "title": "Flashcards",
    "contexts": ["selection"]
    
}
chrome.contextMenus.create(contextMenuItem)


chrome.contextMenus.onClicked.addListener(function(info, tab) {
    alert("hallo");
});


/*
chrome.contextMenus.create({
	title: 'Add "%s" to Flashcards',
	contexts: ['selection'],
	onclick: alert("hallo"),
});
*/