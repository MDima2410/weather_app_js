// JSON.stringify() --- преобразовать объект в JSON-формат
// JSON.parse() --- JSON-формат преобразовать в объект

const Weather = {
    apiKey: "c1a6da483e4450b352e3e16b6c56a5c6",
    apiIconUrl: "https://openweathermap.org/img/wn/",
    getWeather: function (cityName) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${this.apiKey}&units=metric&lang=ua`)
            .then(function (response) {
                if(!response.ok) {
                    throw new Error ("Wrong city name")
                }
                return response.json()
            }).then(function (result) {
            Weather.displayWeather(result)
        })
    },
    startSearch: function (form) {
        let city = form.elements.cityName.value
        if (city?.length >= 3) {
            this.getWeather(city)
        }
        form.reset()
    },
    displayWeather: function(data) {
        document.querySelector('.app__result').removeAttribute('hidden')
        document.querySelector('.cityName').innerText = data.name
        document.querySelector('.temp').innerText = Math.round(data.main.temp)
        document.querySelector('.clouds').innerText = data.weather[0].description
        document.querySelector('.humidity').innerText = Math.round(data.main.humidity)+'%'
        document.querySelector('.windSpeed').innerText = Math.round(data.wind.speed)
        document.querySelector('.icon').setAttribute('src', `${this.apiIconUrl}${data.weather[0].icon}.png`)

    }
}
document.addEventListener('submit', function () {
    event.preventDefault()
    Weather.startSearch(event.target)
})