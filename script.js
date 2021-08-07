const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

//event listeners on buttons
newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

//function to fetch quotes from api
async function getQuote() {
  const proxyUrl = "http://corsthat.herokuapp.com/";
  const apiUrl =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
  try {
    setLoading(true);
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();

    quoteText.innerText = wrapQuote(data.quoteText);
    authorText.innerText = data.quoteAuthor ? data.quoteAuthor : "Unknown";
    setLoading(false);
  } catch (error) {
    console.log("Error getting quotes", error);
    // getQuote();
  }
}

//function to resize font if large quote is returned from the API
function wrapQuote(quote) {
  if (quote.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  return quote;
}

//function to tweet the quote
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;

  window.open(twitterUrl, "_blank");
}

//function to set loading state
function setLoading(loading) {
  if (loading) {
    loader.classList.add("loader");
    quoteContainer.hidden = true;
  } else {
    loader.classList.remove("loader");
    quoteContainer.hidden = false;
  }
}

//get quote on page load
window.onload = getQuote();
