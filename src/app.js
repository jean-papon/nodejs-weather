const path = require('path')
const express = require ('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup Handlebars Engine and Views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))





//
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'JPaps'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
     title: 'Who am I?',
     name: 'JPaps'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})
            // res.send([{
            //     forecast: 'Sunny',
            //     location: 'Clamart',
            //     adress: req.query.adress
            // }])
            // console.log(req.query.adress)
            // }
       

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'How can I help you?',
        title: 'Help',
        name: 'JPaps'
    })
})



app.get('/products', (req,res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    } 
    
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 help page',
        name: 'JPaps',
        error404Help: 'Help article not found'
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name:'JPaps',
        error404: '404: Cannot find your page'
    })
    })

// app.get('', (req, res) => {
//     res.send('<h1> Weather </h1>')
// })

// app.get('/help', (req,res) => {
//     res.send([{
//         name: 'Jean'
//     }, {
//         name: 'Alolo lasticot'
//     }])
// })

// app.get('/about', (req,res) => {
//     res.send('<h1> About our page </h1>')
// })




app.listen(port, () => {
    console.log('Server is up on port' + port)
})
