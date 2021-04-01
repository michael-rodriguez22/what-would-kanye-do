// ON PAGE LOAD
let generatedCardEl = document.getElementById("generated-object-el");
let saveButtonEl = document.getElementById("save-button-el");
let myFavoritesEl = document.getElementById("my-favorites-section");

function hide(element) {
    element.style.display = "none";
}

function pageLoadHide() {
    hide(generatedCardEl);
    hide (saveButtonEl); 
    hide(myFavoritesEl);
}

pageLoadHide();

// CREATE ARRAY WHERE OUR LOCAL STORAGE ITEMS WILL BE ACCESSED
let lsArr = new Array();
if (localStorage.getItem("lsArr")) {
    lsArr = JSON.parse(localStorage.getItem("lsArr"));
}

// QUOTE OBJECT CLASS
class QuoteObject {
    constructor(url, quote) {
        this.gif = url;
        this.quote = quote;
    }
    saveQuote() {
        lsArr.push(JSON.stringify(this));
        localStorage.setItem("lsArr", JSON.stringify(lsArr))
    }
}

// CREATE ARRAY OF ALL KANYE GIFS AND ID'S THAT WILL BE USED
let kanyeGifsArr = new Array();
function giphyFetch() {
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=VSPSbFNr7y8yOtY0EZ6u8TxYLHCJG8RK&q=kanye%20west&lang=en`)
        .then(function(giphyRes) {
            giphyRes.json()
                .then(function(giphyData) {
                    giphyData.data.forEach(element => {
                        kanyeGifsArr.push({
                            url: element.images.fixed_height.url
                        });
                    });
                })
        });
}

giphyFetch();


// GENERATE RANDOM QUOTE
let currentQO;
function generateHandler() {
    fetch(`https://api.kanye.rest?`)
        .then(function (quoteRes) {
            quoteRes.json()
                .then(function (quoteData) {
                    let selectedGif = kanyeGifsArr[Math.floor(Math.random() * 50 )];
                    let QO = new QuoteObject(selectedGif.url, quoteData.quote);
                    displayQuote(QO);
                    currentQO = QO;
                });
        });
}

document.getElementById("generate-button-el").addEventListener("click", generateHandler);

// DISPLAY QUOTE
function displayQuote(object) {
    generatedCardEl.style.display = "unset";
    document.getElementById("giphy-el").src = object.gif;
    document.getElementById("quote-el").innerText = object.quote;
    saveButtonEl.style.display = "unset";
}


// SAVE HANDLER 
function saveHandler() {
    if (lsArr[lsArr.length - 1] !== JSON.stringify(currentQO)) {
        currentQO.saveQuote();
        displayFavorites();
    }
}

saveButtonEl.addEventListener("click", saveHandler)

// MY FAVORITE SECTION
let cardWrapperEl = document.querySelector(".card-wrapper");
function clearFavorites() {
    while (cardWrapperEl.firstChild) {
        cardWrapperEl.removeChild(cardWrapperEl.firstChild);
    }
}

function displayFavorites() {
    if (localStorage.getItem("lsArr")) {
        myFavoritesEl.style.display = "unset";
        clearFavorites();
        for (let i = lsArr.length; i > 0; i--){
            let newCard = document.createElement("div");
            newCard.className = "card saved-card purple accent-1";
            let newImgDiv = document.createElement("div");
            newImgDiv.className = "card-image"
            newImgDiv.innerHTML = `<img src="${JSON.parse(lsArr[i - 1]).gif}">`
            newCard.appendChild(newImgDiv);
            let newCardContent = document.createElement("div");
            newCardContent.className = "card-content";
            newCardContent.innerHTML = `<p>${JSON.parse(lsArr[i - 1]).quote}</p>`;
            newCard.appendChild(newCardContent);
            cardWrapperEl.appendChild(newCard);
        }

    }
}

displayFavorites();

function clearHandler() {
    localStorage.removeItem("lsArr");
    lsArr = []
    clearFavorites();
    hide(myFavoritesEl);
}

document.getElementById("clear-button-el").addEventListener("click", clearHandler);