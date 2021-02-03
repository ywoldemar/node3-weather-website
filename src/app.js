const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for express config.
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Set up handle bars config
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Set up server directory
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Yann Woldemar'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Yann Woldemar'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Some helpful text',
        title: 'Help',
        name: 'Yann Woldemar'
    })
})

app.get('/Weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address!'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({ error })
        } 

        forecast(latitude, longitude, (error, forecast) => {
            if(error){
               return res.send({ error })
            }
            
            res.send({
                forecast,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        error: 'Help article not found',
        title: '404',
        name: 'Yann Woldemar'
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term!'
        })
    }
    
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        error: 'Page not found',
        title: '404',
        name: 'Yann Woldemar'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})