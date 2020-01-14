const request = require('request')

const getGeocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiY2FwaWN1YWFndXN0aW4iLCJhIjoiY2s1NDkzcnlqMGd4ejNlbWdkMzAzNGt2ayJ9.vG5eeS3VqHcTtlVKw0f95A&limit=1'
    request({ url: url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to geo coding service.', undefined)
        } else if (!body.features || body.features.length === 0) {
            callback('Unable to find location.', undefined)
        } else {
            const geoCoding = {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            }
            callback(undefined, geoCoding)
        }
    })
}

module.exports = getGeocode