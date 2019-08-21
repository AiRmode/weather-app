const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/4efd9b30fb4ae0fcd12105cabcfd53d2/' + latitude + ',' + longitude + '?units=si&lang=uk';
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('no network connection');
        } else if (body.error) {
            callback('location not found');
        } else {
            callback(undefined, {
                summary: body.daily.data[0].summary,
                temperature: body.currently.temperature,
                precipProbability: body.currently.precipProbability,
                sunriseTime: new Date(body.daily.data[0].sunriseTime * 1000).toLocaleString(),
                sunsetTime: new Date(body.daily.data[0].sunsetTime * 1000).toLocaleString()
            });
        }
    });
};

module.exports = forecast;