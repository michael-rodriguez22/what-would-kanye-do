// CREATE ARRAY OF ALL KANYE GIFS THAT WILL BE USED
let kanyeGIFURLs = new Array();
function giphyFetch() {
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=VSPSbFNr7y8yOtY0EZ6u8TxYLHCJG8RK&q=kanye%20west&limit=100&lang=en`)
        .then(function(giphyRes) {
            giphyRes.json()
                .then(function(giphyData) {
                    giphyData.data.forEach(element => {
                        kanyeGIFURLs.push(element.url);
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
                    displayQuote(generatedQuoteObject);
                    lsObjectsArr.push(generatedQuoteObject);
                    console.log(generatedQuoteObject);
                })
        })
}

// DISPLAY QUOTE ON PAGE

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
        