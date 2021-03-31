// ON PAGE LOAD
function hide(element) {
    element.style.display = "none";
}

let generatedCardEl = document.getElementById("generated-object-el");
let saveButtonEl = document.getElementById("save-quote-el");
let myFavoritesEl = document.getElementById("my-favorites-section");

function pageLoadHide() {
    hide(generatedCardEl);
    hide (saveButtonEl) 
    if (!localStorage.length) {
        hide(myFavoritesEl);
    }
}

pageLoadHide();

// CREATE ARRAY OF ALL KANYE GIFS THAT WILL BE USED
let kanyeGIFURLs = new Array();
function giphyFetch() {
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=VSPSbFNr7y8yOtY0EZ6u8TxYLHCJG8RK&q=kanye%20west&lang=en`)
        .then(function(giphyRes) {
            giphyRes.json()
                .then(function(giphyData) {
                    giphyData.data.forEach(element => {
                        kanyeGIFURLs.push(element.images.fixed_height.url);
                    });
                })
        });
}
giphyFetch();

// CREATE ARRAY WHERE SAVED QUOTE OBJECTS WILL BE STORED
let lsObjectsArr = new Array();

// GENERATE NEW QUOTE OBJECT
function generateHandler() {
    fetch(`https://api.kanye.rest?`)
        .then(function (quoteRes) {
            quoteRes.json()
                .then(function(quoteData) {
                    let generatedQuoteObject = new Object();
                    generatedQuoteObject.url = kanyeGIFURLs[Math.floor(Math.random() * 50)]
                    generatedQuoteObject.quote = quoteData.quote;
                    displayQuoteObject(generatedQuoteObject);
                })
        })
}
document.getElementById("generate-button-el").addEventListener("click", generateHandler);

// DISPLAY QUOTE ON PAGE
function displayQuoteObject(object) {
    saveButtonEl.style.display = "unset";
    generatedCardEl.style.display = "unset";
    document.getElementById("giphy-el").src = object.url;
    document.getElementById("quote-el").innerText = object.quote;
}

// ON PAGE LOAD 
    // if (local storage empty) hide saved quotes section
// USER OPTIONS
    // generate a new quote 
        // create an object with a GIF and a quote
        // display object on the page
    // after (displaying at least one quote object) save quote object to local storage
        //create new array
        // add current object to that array
        // save array to local storage with a key that will be used every time
    // show saved quotes "page"
        // "delete saved quotes" option should be available at the top
        // loop through saved quote object array in local storage
        // at each index, create a new DOM element containing GIF, quote, and possibly a remove button.
        