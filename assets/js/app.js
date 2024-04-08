const url = "https://api.nasa.gov/planetary/apod?api_key=KHawM29oiGeTHWLrJIThRDWq0LJDVFK0zhX6PE4w&start_date=2024-04-02"

fetch(url)
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log("Ups noget gik galt....", err))



function inpendImg 