// CREATE ARRAY WHERE SAVED QUOTE OBJECTS WILL BE STORED
let lsQuoteObjectsArr = new Array();

// create Array kanye gif urls will be stored
let kanyeGIFURLsArr = new Array();
// populate that array once on pageload, such that we only need to fetch giphy information once
function giphyFetch() {
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=VSPSbFNr7y8yOtY0EZ6u8TxYLHCJG8RK&q=kanye%20west&limit=100&lang=en`)
        .then(function(giphyRes) {
            giphyRes.json()
                .then(function(giphyData) {
                    console.log(giphyData);
                    giphyData.data.forEach(element => {
                        kanyeGIFURLsArr.push(element.url);
                    });
                })
        });
}
giphyFetch();

// fetch a random kanye quote (response already plain text)
function fetchQuote() {
    fetch(`https://api.kanye.rest?`)
        .then(function (quoteRes) {
            quoteRes.json()
                .then(function(quoteData) {
                    generatedQuote;
                })
        })
}
// fetchQuote();
let gifEl = document.createElement("img");
function generateQuoteHandler() {
    let generatedQuoteObject = new Object();
    selectedGIF = kanyeGIFURLsArr[Math.floor(Math.random() * 50)]
    console.log(selectedGIF);
    fetchQuote();
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
        