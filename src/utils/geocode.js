const request = require('request')

const geocode = (address, callback) => {

    const url= 'http://api.openweathermap.org/geo/1.0/direct?q=' + encodeURIComponent(address) + '&limit=1&appid=bff01931885f35b182ea772f74205b93'

    request({ url, json: true}, (error, { body })=>{

        if(error) {
            callback('Unable to connect to location services!', undefined)
        } else if(body.length === 0) {
            callback('Unable to find the location. Try another search')
        } else {
            callback(undefined, {
                //shorthand property
                latitude: body[0].lat,
                longitude: body[0].lon,
                place: body[0].name + ', ' + body[0].state + ', ' + body[0].country
            })
        }
    })
}

module.exports = geocode