const request = require('request')

const geocode = (address, callback) => {
    const geoapify = 'https://api.geoapify.com/v1/geocode/search?text='+address+'.&bias=proximity:7.0652029,52.4309185&format=json&apiKey=fe046df569704087ab76b2076cf2b152'

    request({ url: geoapify, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        }
      
        else if (response.body.results.length === 0) {
            callback('Unable to find location.Try another search', undefined)
        }
        else {
             callback(undefined, {
                latitude: response.body.results[4].lat,
                longitude: response.body.results[4].lon,
                location: response.body.results[4].city
            })
            // console.log('Latitude of Los Angeles is: '+response.body.results[4].lat)
            // console.log('Longitude of Los Angeles is: '+response.body.results[4].lon)
        }
    })
}

module.exports=geocode