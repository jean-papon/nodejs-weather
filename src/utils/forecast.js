const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    
    const url = 'http://api.weatherstack.com/current?access_key=9536ef7c402df4b9e975b5d07a74e6c2&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '&units=m'
    request({ url, json: true }, (error, {body}) => 
    {
    if (error) 
    {
        callback('Unable to connect to weather service', undefined)
    } else if (body.error) {
        callback('Unable to find location', undefined)
    } else {
    callback(undefined, body.current.weather_descriptions[0] + '. Right now, it is '+ body.current.temperature + '°C out. It feels like ' + body.current.feelslike + '°C outside.')
    }
})
}

module.exports = forecast