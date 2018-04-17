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
    //if "flashcards" button is clicked
    if (info.menuItemId) {
        var selectedText = info.selectionText;
        console.log("selected text is " + selectedText);
        processText(selectedText);
    } 
});

//add comment
var button = document.getElementById("button");

//add comment
//button.onclick = function() {
//	alert("you clicked a button!")
//}

//add comment
function shuffle() {
    alert("shuffling!")
};


/*--------------------------------DB Logic-----------------------------------------------*/
var db;
//db name
const dbName = 'dbFlashCard';

function processText(textHighlighted) {
    console.log("inside process text");
    /* Open the database (this is a request); returns an instance of IDBDatabase 1 is a version of the current db, should be upgraded with each change*/
    var dbRequest = window.indexedDB.open(dbName, 1);
    
    /* create event handlers for the request above
    what if user denies request to create a DB?
    Note: IndexedDB storage for incognito sessions only exists in memory until
    the incognito session is closed */
    dbRequest.onerror = function(event) {
        alert("Database open error!");
        alert(event.$log)
    };
    
    //called when we change the db version (aka change our db, change db schema)
    dbRequest.onupgradeneeded = function (event) {
        console.log("running onupgradeneeded");
        db = event.target.result;
        //OR alternatively:
        //db = dbRequest.result;
        
        /* add generic error handler to the DB instance to handle all possible errors; without it, it would require adding error handlers for each request */
        db.onerror = function(event) {
        alert("Database error: " + event.target.errorCode);
        };
    
        /* Create an objectStore (like a "table") to hold information about flashcards. 
         We use field "word" as the key path because we will make sure that the words stored
         in the database do not have duplicates */
        if(!db.objectStoreNames.contains("flashcards")) {
            console.log("I am creating new objectstore for flashcards");
            var objectStore = db.createObjectStore("flashcards", { keyPath: "word" });  
            // Create an index to store the meaning of words; we might have duplicates for meaning
            objectStore.createIndex("meaning", "meaning", { unique: false }); 
        }   
    };
    
    /* onsuccess is called each time we make a new request: even if the database schemas has not been changed */
    dbRequest.onsuccess = function(event) {
        console.log("running onsuccess");
        db = event.target.result;
        //OR alternatively:
        //db = dbRequest.result;

        /* Generic error handler for all errors targeted at this database's requests! */
        db.onerror = function(event) {
            alert("Database error: " + event.target.errorCode);
            console.log("Database error " + event.target);
        };
        
        //before we start a transaction, parse highlighted text
        var textParsed = parseText(textHighlighted);

        //start a read/write transaction
        var transaction = db.transaction("flashcards", "readwrite");
        //get object store from transaction
        var store = transaction.objectStore("flashcards");
        //check our highlighted text exists in the DB as a key
        var req = store.openCursor(textParsed);
        req.onsuccess = function(event) {
            var cursor = event.target.target;
            if (cursor) { // textParsed already exist
                alert("word already exists in DB");
                //try to get the parsed text's meaning from object store if we need to show it tot the user
                //var wordMeaning = store.get(textParsed);
                //cursor.update(textParsed);
            } else { // textParsed not exist
                alert("word is not in DB");
                //find meaning of the word and add to the DB
                //var meaning = findWordMeaning();
                //store.put({wordToCheck, meaning}); 
                //store.add(textParsed)
            }
        };        
        
        // report on the success of opening the transaction
        transaction.oncomplete = function(event) {
            console.log("transaction completed.")
            db.close();
        };

        transaction.onerror = function(event) {
            note.innerHTML += '<li>Transaction not opened due to error.</li>';
        };

    };
}

//text parser
function parseText(text) {
    console.log("inside text parser");
    var textProcessed = "";
    return textProcessed;
}











