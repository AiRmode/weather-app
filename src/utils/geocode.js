const request = require('request');

const geocode = (address, callback) => {
    url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibmVvbm9kZS1uMSIsImEiOiJjanpmaDFmY2gwYzN5M21tcXVvN211cXBwIn0.o20INZdrpKyIJm5nAlmRTg&limit=1';

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('unable to connect to location services');
        } else if (body.features.length === 0) {
            callback('unable to find location');
        } else {
            const longitude = body.features[0].center[0];
            const latitude = body.features[0].center[1];
            const location = body.features[0].place_name;
            callback(undefined, {longitude, latitude, location});
        }
    })
};

module.exports = {geocode: geocode};