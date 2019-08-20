const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//Define paths for express configs
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Weather '
    });
});

app.get('/about2', (req, res) => {
    res.render('about2', {
        message: 'Dynamic about page',
        name: 'AlShevchuk',
        title: 'Modern weather service'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Weather service',
        name: 'Alexey Sh'
    });
});

app.get('/weather', (req, res) => {
    const city = req.query.address;
    if (!city) {
        return res.send({
            error: 'You have to specify an address'
        });
    }
    geocode.geocode(city, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error: error
            });
        }
        forecast(latitude, longitude, (error, {summary, temperature, precipProbability}) => {
            if (error) {
                return res.send({
                    error: error
                });
            }
            res.send({
                address: location,
                summary: summary + ' Temperature: ' + temperature + ' C. Rain probability: ' + precipProbability + '%',
                forecast: 'The temperature is: ' + temperature + ' degrees C',
                precipProbability: 'Rain probability ' + precipProbability + ' %'
            });
        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search);
    res.send({
        products: [{},
        ]
    });

});

app.get('/help/*', (req, res) => {
    res.render('page-not-found', {
        pageName: 'Help article not found',
        title: 'Help 404 error',
        name: 'Alexey'
    });
});

app.get('*', (req, res) => {
    res.render('page-not-found', {
        title: 'Error 404 page',
        pageName: '(any)',
        name: 'Alexey'
    });
});

app.listen(3000, () => {
    console.log('Server is app on port 3000.');
});