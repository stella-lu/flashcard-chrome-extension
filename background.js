//db name
const dbName = 'dbFlashCard'

//create context menu item
var contextMenuItem = {
    "id": "flashcards",
    "title": "Flashcards",
    "contexts": ["selection"]
}
 
//add context menu item to menu
chrome.contextMenus.create(contextMenuItem)

//attach event listener to the context menu item;
//get selected text
chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId) {
        var selectedText = info.selectionText;
    } 
});

//add comment
var button = document.getElementById("button");

//add comment
button.onclick = function() {
	alert("you clicked a button!")
}

//add comment
function shuffle() {
    alert("shuffling!")
};


//Open the database (this is a request); returns an instance of IDBDatabase
//1 is a version of the current db, should be upgraded with each change
var dbRequest = window.indexedDB.open(dbName, 1);

//create event handlers for the request above
//what if user denies request to create a DB?
//Note: IndexedDB storage for incognito sessions only exists in memory until
//the incognito session is closed
dbRequest.onerror = function(event) {
    alert("Database open error!");
    alert(event.$log)
};

//called when we change the db version (aka change our db, change db schema)
request.onupgradeneeded = function (event) {
    console.log("running onupgradeneeded");
    var db = event.target.result;
    
    //add generic error handler to the DB instance to handle all possible errors; 
    //without it, it would require adding error handlers for each request
    db.onerror = function(event) {
        alert("Database error: " + event.target.errorCode);
    };

    // Create an objectStore (like a "table") to hold information about flashcards. 
    // We use field "word" as the key path because we will make sure that the words stored
    //in the database do not have duplicates
    if(!db.objectStoreNames.contains("flashcards")) {
			console.log("I am creating new objectstore for flashcards");
			var objectStore = db.createObjectStore("flashcards", { keyPath: "word" });  
			// Create an index to store the meaning of words; we might have duplicates for meaning
            objectStore.createIndex("meaning", "meaining", { unique: false }); 
		}       
};

//onsuccess is called each time we make a new request: even if the database schemas has not been changed
request.onsuccess = function(event) {
	db = event.target.result;
	
	db.onerror = function(event) {
	    // Generic error handler for all errors targeted at this database's
        // requests!
        alert("Database error: " + event.target.errorCode);
	};

    console.log("We have a handle to our indexeddb");
};





