const author = document.getElementById("author")
const crypto = document.getElementById("crypto-top")
const time = document.getElementById("time")
const weather = document.getElementById("weather")

fetch('https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature')
    .then(res => res.json())
    .then(data => {
        document.body.style.backgroundImage = `url("${data.urls.regular}")`
        author.textContent = `By: ${data.user.name}`
    })
    .catch(err => {
        document.body.style.backgroundImage = `url("https://images.unsplash.com/photo-1453872302360-eed3c5f8ff66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Njc5NTYxNzM&ixlib=rb-4.0.3&q=80&w=1080")`
    }
    )

fetch('https://api.coingecko.com/api/v3/coins/dogecoin')
    .then(res => {
        if (!res.ok) {
            throw Error("Something went wrong")
        }
        return res.json()
    })
    .then(data => {
        crypto.innerHTML = `<img  src="${data.image.small}"> 
        <span>${data.name}</span>
        `
        document.getElementById("crypto").innerHTML += `
        <ul>
            <li>🎯: $${data.market_data.current_price.usd}</li>
            <li>👆: $${data.market_data.high_24h.usd}</li>
            <li>👇: $${data.market_data.low_24h.usd}</li>
        </ul>
        
        `

    })
    .catch(err => console.error(err))



const displayTime = () => {
    const date = new Date()
    time.innerText = date.toLocaleTimeString("en-us", { timeStyle: "short" })
}

setInterval(displayTime, 1000)

navigator.geolocation.getCurrentPosition(position => {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude


    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=813195558e4107ce095cc15a968575c5`)
        .then(res => {
            if (!res.ok) {
                throw Error("Weather data not available")
            }
            return res.json()
        })
        .then(data => {

            console.log(data.weather.icon)
            weather.innerHTML = `
            <img src="${data.weather.icon}"/>
            `
        })
        .catch(err => console.error(err))
})