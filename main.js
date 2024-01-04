'use strict'
/* key=8e6b28400836488a927215732240201 */
const day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let currentlocation;



async function getdata(word) {
    let data = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=8e6b28400836488a927215732240201&q=${word}&days=3`);
    let final = await data.json();
    displaycurrent(final.current)
    displaynext(final.forecast.forecastday[1])
    displaythird(final.forecast.forecastday[2])
    let more=`<h6> Region: ${final.location.region}, ${final.location.country}</h6>`
    document.querySelector('#cornermore').innerHTML=more;
    document.querySelector('#location').innerHTML = final.location.name

}
document.querySelector('#search').addEventListener('keyup', search => getdata(search.target.value))

function displaycurrent(current) {
    let dateCurr = new Date(current.last_updated)
    let content = `
    <h1 id="main">${current.temp_c}<sup>o</sup>C</h1>
    <h6 id="main">${day[dateCurr.getDay()]}${', '}${dateCurr.getDay()} ${month[dateCurr.getMonth()]} ${dateCurr.getFullYear()}</h6>
    <figure>
    <img src="https:${current.condition.icon}" alt="" width=80% >
  <figcaption id="text">${current.condition.text}</figcaption> </figure>
    `
    let more=`<h6><i class="fa-solid fa-temperature-quarter"></i> Feels like: ${current.feelslike_c}<sup>o</sup>C</h6>
    <h6> <i class="fa-solid fa-wind"></i> Wind speed in km/h: ${current.wind_kph}</h6>
    <h6><i class="fa-regular fa-compass"></i> Wind direction: ${current.wind_dir}</h6>
    `
    document.querySelector('#current').innerHTML = content;
    document.querySelector('#Weatherdetails').innerHTML = more;
}

function displaynext(forecast1) {
    let dateforecat = new Date(forecast1.date)
    let content = `
    <h3>${day[dateforecat.getDay()]}</h3>
    <h1 id="main">${forecast1.day.maxtemp_c}<sup>o</sup>C</h1>
    <h6 id="main">Min:${forecast1.day.mintemp_c}<sup>o</sup>C</h6>
    <figure>
    <img src="https:${forecast1.day.condition.icon}" alt="" width=40%>
    <figcaption id="text">${forecast1.day.condition.text}</figcaption></figure>
    `
    document.querySelector('#next').innerHTML = content;
}
function displaythird(forecast2) {
    let dateforecat = new Date(forecast2.date)
    let content = `
    <h3>${day[dateforecat.getDay()]}</h3>
    <h1 id="main">${forecast2.day.maxtemp_c}<sup>o</sup>C</h1>
    <h6 id="main">Min:${forecast2.day.mintemp_c}<sup>o</sup>C</h6>
    <figure>
    <img src="https:${forecast2.day.condition.icon}" alt="" width=40%>
    <figcaption id="text">${forecast2.day.condition.text}</figcaption></figure>
   
    `
    document.querySelector('#third').innerHTML = content;
}

const successCallback = (position) => {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    currentlocation = latitude + ',' + longitude;
    getdata(currentlocation);
    console.log(currentlocation)
    return currentlocation;
};

const errorCallback = (error) => {
    console.log(error);
};

 navigator.geolocation.getCurrentPosition(successCallback, errorCallback); 

 function emptyinput(){
  if(document.querySelector('#search').value==''){
    getdata(currentlocation)
  };
}
document.querySelector('#search').addEventListener('input',emptyinput); 


getdata()

