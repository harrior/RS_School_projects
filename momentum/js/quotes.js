export function init() {
    const changeQuote = document.querySelector('.change-quote')
    changeQuote.addEventListener('click',() => {
        updateQuote()
    })

    document.addEventListener('changeLang', () => {
        updateQuote()
    });

    updateQuote()
}
function updateQuote(){
    const lang = localStorage.getItem('lang');
    const quoteText = document.querySelector('.quote')
    const authorText = document.querySelector('.author')

    readTextFile("./js/quotes.json", text => {
        const quotes = JSON.parse(text);
        const randQuote = quotes[lang][Math.floor(Math.random() * quotes[lang].length)]
        quoteText.textContent = randQuote.quoteText;
        authorText.textContent = randQuote.quoteAuthor;
    });
}

function readTextFile(file, callback) {
    let rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status === 200) {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}