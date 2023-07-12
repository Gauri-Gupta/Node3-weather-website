const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(__filename)

const app = express()

const port = process.env.PORT || 3000

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather App',
        name: 'Gauri'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About Me',
        name: 'Gauri'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Need Help?',
        desc: 'This is help section which you can refer to know about the website'
    })

})


//creating web server using express
// app.get('', (req, res)=>{
//     // res.send('Welcome to express!')
//     res.send('<h1>Welcome to express!</h1>')
// })

// app.get('/help', (req, res)=>{
//     // res.send('This is help page!')
//      res.send({
//         name: 'Gauri',
//         age:23
//     })
    
// })

// app.get('/about', (req, res)=>{
//     // res.send('About page!')
//     res.send('<h1>About page!</h1>')
// })

app.get('/weather', (req, res)=>{
    // res.send('Welcome to weather page..')

        // forecast: 'It is 10 degrees outside.',
        // location: 'Uruguay',
        // address: req.query.address

    const address = req.query.address
    if(!address) {
        return res.send({
            error: 'Address must be provided'
        })
    } 

    geocode(address, (error, { latitude, longitude, place } = {})=>{

        if(error){
            return res.send({
                error
            } )

        } else {

            forecast( latitude, longitude, (error, forecastData)=>{
                
                if(error) {
                    return res.send(
                        {
                            error
                        })
                } else {
                    return res.send({
                        forecast: forecastData,
                        place,
                        address
                    })
                }
            })
        }
    })

    
} )

app.get('/products', (req, res)=> {
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
        
    }

    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Gauri',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Gauri',
        errorMessage: 'Page not found'
    })
})

app.listen(port, ()=>{
    console.log('server is up and running on port ' + port )
})