const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engines and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Mr. Anderson'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Unknown'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Heeeeelp',
        name: 'Unknown',
        title: 'Help page'
    })
})

app.get('/doryiah', (req, res) => {
    res.send('<h1>DORYIAHH!!</h1>')
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error)
        {
            return res.send({
                error,
                address: req.query.address
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error)
            {
                return res.send({
                    error,
                    address: req.query.address
                })
            }
            return res.send({
                location,
                weather: forecastData
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/forecast', (req, res) => {
    res.send('Not implemented')
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'John',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'John',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})
