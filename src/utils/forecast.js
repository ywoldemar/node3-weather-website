const request = require('postman-request')

const forecast = (longitude, latitude, callback) => {
    const token = '6c68b101cac55fc36bd4c32946a03532'
    const url = 'http://api.weatherstack.com/current?access_key=' + token + '&query=' + longitude + ',' + latitude
    //console.log('URL: ' + url)
    request({url, json: true}, (error, {body} = {}) => {
        if(error){
            callback('Unable to connect with geocode service!')
        } else if(body.error){
            callback(body.error.info)
        }else{
            const currentWeatherData = body.current
            const currentWeather = currentWeatherData.weather_descriptions[0] + '. It is currently ' + currentWeatherData.temperature + 
                                    'C. It feels like ' + currentWeatherData.feelslike + 'C and humidity is ' + currentWeatherData.humidity + '%.'
            callback(undefined, currentWeather)
        }
    })
}

module.exports = forecast