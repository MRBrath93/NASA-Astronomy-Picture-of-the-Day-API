// Måtte begrænse mig med hvor langt man kunne gå tilbage i tiden. Det tog aaaaalt for lang tid at hente det hele ned og dataen tog lang tid om at blive indlæst på min side. 
const url = "https://api.nasa.gov/planetary/apod?api_key=KHawM29oiGeTHWLrJIThRDWq0LJDVFK0zhX6PE4w&start_date=2024-03-20"
// Fanger vores wrapper i html
const wrapperEl = document.querySelector(".wrapper");
// Skaber en variabel som skal anvendes senere og derfor skal ligge tilgængeligt så det kan anvendes flere steder
let imageData;

// // Vi skaber en asynkron funktion kaldet "fetchNasaStuff". 
// async function fetchNasaData() {
//     // Vi sender en request til vores url om at få noget data.
//     const res = await fetch(url);
//     // Vi får en respons fra vores url/API som gemmes i variablen data.
//     const data = await res.json();
//     // Vi gemmer nu vores data i den variable som vi oprettede ovenfor. dette gør vi for at vi kan anvende vores data til at filtrer senere.
//     imageData = data;
//     // Sender vores data videre til funktionen renderApodImages
//     renderApodImages(data);
// }
// // Køre vores funktion
// fetchNasaData();
fetch(url)
    .then(res => res.json())
    .then(data => {
        imageData = data; // Gem dataene i variablen fetchedData
        renderApodImages(data); // Eventuel logik til at håndtere dataene
    })
    .catch(err => console.log("Ups noget gik galt....", err));


// Skaber vores funktion renderApodImages
function renderApodImages(images) {
    // Vi looper igennem alle vores billedere og tilhørende data
    images.forEach(image => {
        // Nulstiller vores wrapperEL så vi er sikre på der ikke står noget i forvejen eller blot bliver tilføjet indhold.
        wrapperEl.innerHTML = "";
        // Skaber en række nye tags så som article, paragraphs osv. 
        const newArticle = document.createElement("article")
        const newH2 = document.createElement("h2")
        const explanationP = document.createElement("p")
        const copyrightP = document.createElement("p")
        const newImg = document.createElement("img")

        // Indsætter hvilket indhold der skal være i vores nye tags.
        newH2.textContent = image.title
        explanationP.textContent = image.explanation
        copyrightP.textContent = image.copyright
        newImg.src = image.url;
        newImg.alt = image.title;


        // Vi appender nu vores tags ind i vores nyoprettede artikel.
        newArticle.append(newH2, newImg, explanationP, copyrightP)
        // Vi appender nu vores nye artikel ind i vores wrapper som befinder sig i vores html dokument
        wrapperEl.append(newArticle)
    })
}

// Fanger vores inputfelt
const inputEl = document.querySelector("#dateCalender");


// Hent hele datoen lige nu og dertil høre også tiden, zone osv. 
const thisDate = new Date();

// Nu vil vi kun have dato, måned og år ud af vores variable "dagenDato" Det gør vi ved at hive hvert detalje ud og gemme i en variable
const year = thisDate.getFullYear();

// Vi anvender herefter string() til at lave vores dato og vores +1 om til en string

// Grunden til at vi bliver nødt til at ligge 1 til vores måned er fordi at man i Javascript har placeret januar på index 0, februar på index 1 osv. Det vil derfor ikke passe med kalenderåret hvis ikke vi ligger 1 til måneden. 

// For at sikre os at vi hele tiden beskriver vores datoer og måneder med 2 decimaler anvender vi padStart(). Her kan man definere en specifik længde man ønsker at opnå og derefter vælge hvad der skal indsættes hvis det ikke har den ønskede længde. Ved padStart placeres vores valgte content forrest. 

const month = String(thisDate.getMonth() + 1).padStart(2, '0');
const day = String(thisDate.getDate()).padStart(2, '0');

// Vi skaber nu vores endelige dato som skal indesættes ved at sætte vores value til den nye værdi7variable 
const formattedDate = `${year}-${month}-${day}`;
inputEl.value = formattedDate;



// Vi vil ny lytte efter om brugeren vælger en anden dato.
inputEl.addEventListener("change", e => {
    // Skaber en variabel som inderholder den value som brugeren vælger i vores daypicker
    const selectedDate = e.target.value;
    // Vi anvender vores filtermetode til at undersøge hvilket af vores data der indeholder den valgte value. Den undersøger kun inden vores vore "date" data.
    const filteredimages = imageData.filter(image => image.date.includes(selectedDate));
    // Render de filtrerede images ved at sende vores filteredimages videre til vores funktion (renderApodimages)
    renderApodImages(filteredimages)
})

