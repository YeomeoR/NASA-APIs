// grab the things we need
// grab the main h1
const h1 = document.getElementById('title');

//grab the apod button
const apod = document.getElementById('apod');
apod.addEventListener('click', () => {
  console.log('APOD button clicked');
  sendApodRequest(); // the function to run on click
});
// grab the mars button
const mars = document.getElementById('mars');
mars.addEventListener('click', () => {
  console.log('Mars button clicked');
  sendMarsRequest(); // the function to run on click
});
// grab the reload button
const reload = document.getElementById('reload');
reload.addEventListener('click', () => window.location.reload())

// APIs are asynchronous requests
async function sendApodRequest() {
  let res = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`,
  );
  console.log(res); //check the response status
  let data = await res.json(); // await the data response
  console.log(data); // check the json data available with the sendApiRequest()
  // check that the data is an image and not a video
  if (data.media_type !== 'image') {
    alert(
      'Data is not an image. Please go to: https://apod.nasa.gov/apod/ to view the video.',
    );
  }
  // call a function to show the data in the browser
  useApodData(data); // pass in the data you requested
}
// create the called function to show the data in the browser
function useApodData(data) {
  document.getElementById('content').innerHTML += `<h2>${data.title}</h2>`;
  document.getElementById('content').innerHTML += `<img src="${data.url}"/>`;
  document.getElementById(
    'content',
  ).innerHTML += `<h4>Astronomy Picture for ${data.date}</h4>`;
  document.getElementById(
    'content',
  ).innerHTML += `<p>(Scroll down to see a description of the image)</p> <br><br>`;
  document.getElementById('content').innerHTML += `<p>${data.explanation}</p>`;
  //remove the other items from the DOM
  h1.remove();
  apod.remove();
}
async function sendMarsRequest() {
  const res = await fetch(
    `https://api.nasa.gov/mars-photos/api/v1/rovers/spirit/photos?sol=500&camera=pancam&api_key=${apiKey}`,
  );
  console.log(res);
  let data = await res.json();
  console.log(data);
  useMarsData(data);
}

function useMarsData(data) {
    document.getElementById('content').innerHTML += `<h2>Pictures from 'Spirit' Rover on 'sol 500'</h2>`
    document.getElementById('content').innerHTML += `<img src="${data.photos[10].img_src}" />`
    document.getElementById('content').innerHTML += `<img src="${data.photos[20].img_src}" />`
    document.getElementById('content').innerHTML += `<img src="${data.photos[3].img_src}" />`
    document.getElementById('content').innerHTML += `<img src="${data.photos[14].img_src}" />`
    h1.remove();
    apod.remove();
    mars.remove();
}