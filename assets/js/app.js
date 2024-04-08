const url = "https://api.nasa.gov/planetary/apod?api_key=KHawM29oiGeTHWLrJIThRDWq0LJDVFK0zhX6PE4w&start_date=2024-04-02"
const wrapperEl = document.querySelector(".wrapper");

fetch(url)
    .then(res => res.json())
    .then(data => renderApodImages(data))
    .catch(err => console.log("Ups noget gik galt....", err))


function renderApodImages(images) {
    images.forEach(image => {
        const newArticle = document.createElement("article")
        const newH2 = document.createElement("h2")
        const newP = document.createElement("p")
        const newImg = document.createElement("img")

        newH2.textContent = image.title
        newP.textContent = image.explanation

        newImg.src = image.url
        newImg.alt = "ALT";

        newArticle.append(newH2, newImg, newP)
        wrapperEl.append(newArticle)
    })
}