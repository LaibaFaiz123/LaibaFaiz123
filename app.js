const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express();


console.log(__dirname)
// console.log(__filename)

const publicDirectoryPath = path.join(__dirname, './public')
const viewPath = path.join(__dirname, './views')
const Partial = path.join(__dirname, './partials')
const port=process.env.PORT||3000

// app.get('/', (req, res) => {
//     res.send("Welcome to Express.js")
// })

// app.get('/help', (req, res) => {
//     res.send({
//         name: 'Laiba',
//         Age: 22
//     })
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About US</h1>')
// })
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(Partial)
//app.use(express.static(publicDirectoryPath))
app.get('', (req, res) => {
    res.render('index', {
        h1: 'Express!'
    })

})
app.get('/help', (req, res) => {
    res.render('help', {
        h1: 'Help!'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide the location'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
        if (error) {
            return res.send({ error })
        }
             
       
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
               return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    
    })
})
    // else {
    //     res.send([{
    //         fname: 'Laiba'
    //     }, {
    //         lname: 'Faiz'
    //     },
    //     {
    //         address: req.query.address
    //     }])
    // }


app.get('/help/*', (req, res) => {
    res.render('404', {
        Error: 'Article not Found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        Error: '404 Page not found'
    })
    // res.send('<h1>404 Error</h1>')
})
app.listen(port, () => {
    
    console.log("Listening to port:"+port)
})

