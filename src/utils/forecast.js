const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&APPID=bff01931885f35b182ea772f74205b93&units=metric'

    request({ url, json: true}, (error, { body })=>{
        if(error) {
            callback('Unable to connect to weather services!', undefined)
        } else if(body.message) {
            callback('Unable to fetch the forecast', undefined)
        } else {
            callback(undefined, body.weather[0].description +". It is currently " + body.main.temp + " degrees out. But it feels like " + body.main.feels_like + " degrees out. The high today is " + body.main.temp_max + " with a low of " + body.main.temp_min + ". There is " + body.main.humidity + "% chance of humidity.")
        }
    })
}

module.exports = forecast