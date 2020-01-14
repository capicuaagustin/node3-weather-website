const request = require('request')

const getForecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/a5058bf3dbca7c0ea81cb2d0c3b401f2/' + latitude + ',' + longitude + '?units=si'
    request({ url: url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service.', undefined)
        } else if (body.error) {
            callback('Unable to find location.', undefined)
        } else {
            const currently = body.currently
            const precipProbability = currently.precipProbability
            const temperature = currently.temperature
            const dailySummary = body.daily.data[0].summary
            const output = dailySummary + " It is currently " + temperature + " degrees out. There is a " + precipProbability + "% chance of rain."
            callback(undefined, output)
        }
    })
}

module.exports = getForecast