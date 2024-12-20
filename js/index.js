// Search Input

let searchInput = document.getElementById("search")

// Today Variables

let todayName = document.getElementById("today_day_day_name")
let todayNumber = document.getElementById("today_date_day_number")
let todayMonth = document.getElementById("today_date_month")
let todayLocation = document.getElementById("today_location")
let todayTemp = document.getElementById("today_temp")
let todayConditionImg = document.getElementById("today_condation_img")
let todayConditionText = document.getElementById("today_condition_text")
let humidity = document.getElementById("humidity")
let wend = document.getElementById("wind")
let windDirection = document.getElementById("wind_direction")

// let weatherData

// Next Data

let nextDay = document.getElementsByClassName("next_day_name")
let nextMaxTemp = document.getElementsByClassName("next_max_temp")
let nextMinTemp = document.getElementsByClassName("next_min_temp")
let nextConditionImg = document.getElementsByClassName("next_condition_img")
let nextConditionText = document.getElementsByClassName("next_condition_text")

// Start API Weather 



async function getWeatherData(cityName) {

        

        if(cityName.length>2){
            let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=4e9e9ea7891a46c38e8121012241812&q=${cityName}&days=7`)
            if(response.ok){
                data = await response.json()
                getTodayData()
                getNextDay()
            }
        }
    

}
getWeatherData("Alexandria")

function getTodayData(){
    let currentDate = new Date()
    todayName.innerHTML = currentDate.toLocaleDateString("en-Us", {weekday: "long"})
    todayNumber.innerHTML = currentDate.getDate()
    todayMonth.innerHTML = currentDate.toLocaleDateString("en-Us", {month :"long"})
    todayLocation.innerHTML = data.location.name
    todayTemp.innerHTML = data.current.temp_c
    todayConditionImg.setAttribute('src', data.current.condition.icon)
    todayConditionText.innerHTML = data.current.condition.text
    humidity.innerHTML = data.current.humidity
    wend.innerHTML = data.current.wind_kph+" km/h"
    windDirection.innerHTML = data.current.wind_dir
}
function getNextDay(){
    let forcastData = data.forecast.forecastday;
    for(let i=0; i<2; i++){
        let nextDate = new Date(forcastData[i+2].date)
        nextDay[i].innerHTML = nextDate.toLocaleDateString("en-Us", {weekday : "long"})
        nextMaxTemp[i].innerHTML = data.forecast.forecastday[i+1].day.maxtemp_c
        nextMinTemp[i].innerHTML = data.forecast.forecastday[i+1].day.mintemp_c
        nextConditionText[i].innerHTML = data.forecast.forecastday[i+1].day.condition.text
        nextConditionImg[i].setAttribute ('src', data.forecast.forecastday[i+1].day.condition.icon)
    }



}
searchInput.addEventListener("input", function(){
    getWeatherData(searchInput.value)
})



