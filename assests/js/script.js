
 var input = document.getElementById("city-input");
 var search = document.getElementById("search-button");
 var clear = document.getElementById("clear-history");
 var named = document.getElementById("city-name");
 var currentTemp = document.getElementById("temperature");
 var currentHumidity = document.getElementById("humidity");
 var currentWind = document.getElementById("wind-speed");
 var currentUV = document.getElementById("UV-index");
 var history = document.getElementById("history");
 var searchHistory = JSON.parse(localStorage.getItem("search")) || [];

//function to fetch current data and for the next 5 days
function getWeather(cityName){
fetch("https://api.openweathermap.org/data/2.5/weather?q="
+
cityName + 
"&appid=c9a9ed03a355403f4cb9a36e931c0b4a"
)
.then(function(response) {
   
    return response.json();
})
.then (function (response){
        console.log (response);
        named.innerHTML = "Name: " + response.name;
        currentTemp.innerHTML = "Temperature: " + kelvinToFarenheit(response.main.temp) + " &#176F";
        currentHumidity.innerHTML = "Humidity: " + response.main.humidity + "%";
        currentWind.innerHTML = "Wind Speed: " + response.wind.speed + " MPH";

        let lat = response.coord.lat;
        let lon = response.coord.lon;
        let UVQueryURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?"+ "&lat" + lat + "&lon"+ lon +"&appid=c9a9ed03a355403f4cb9a36e931c0b4a";
            let UVIndex = document.createElement("span");
            UVIndex.setAttribute("class","badge badge-danger");
            UVIndex.innerHTML = response.value;
            currentUV.innerHTML = "UV Index: ";
            currentUV.append(UVIndex);
    
                
            
        

})
.catch(err => {
	console.log(err);
});


};

 function kelvinToFarenheit(K) {
    return Math.floor((K - 273.15) *(9/5) +32);
}



 //Local Storage functions
 search.addEventListener("click",function() {
    const searchTerm = input.value;
    getWeather(searchTerm);
    searchHistory.push(searchTerm);
    localStorage.setItem("search",JSON.stringify(searchHistory));
    renderSearchHistory();
})

clear.addEventListener("click",function() {
    searchHistory = [];
    renderSearchHistory();
})

function renderSearchHistory() {
    history.innerHTML = "";
    for (let i=0; i<searchHistory.length; i++) {
        const historyItem = document.createElement("input");
         historyItem.setAttribute("type","text");
        historyItem.setAttribute("readonly",true);
        historyItem.setAttribute("class", "form-control d-block bg-white");
        historyItem.setAttribute("value", searchHistory[i]);
        historyItem.addEventListener("click",function() {
            getWeather(historyItem.value);
        })
        //history.append(historyItem);
    }
}

renderSearchHistory();
if (searchHistory.length > 0) {
    getWeather(searchHistory[searchHistory.length - 1]);
}