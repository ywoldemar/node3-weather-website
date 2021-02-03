const request = require('postman-request')

const geocode = (address, callback) => {
    const token = 'pk.eyJ1IjoieXdvbGRlbWFyIiwiYSI6ImNra2lnY21uMzB6NXUydm53cms5em02MHIifQ.vUyv3SGN-94lPtR7FoS4_w'
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=' + token + '&limit=1'
    request({url, json: true}, (error, {body} = {}) => {
        if(error){
            callback('Unable to connect with geocode service!')
        } else if(!body.features || body.features.length === 0){
            callback('Unable to find location! Try another search.')
        }else{
            const geocode = body.features[0]
            callback(undefined, {
                longitude: geocode.center[0],
                latitude: geocode.center[1],
                location: geocode.place_name
            })
        }
    })
}

module.exports = geocode