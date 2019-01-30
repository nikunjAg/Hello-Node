const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

let app = express();

// To let the app know we want to add support for partials
hbs.registerPartials(__dirname + '/views/partials');

// To set up the view-engine compulsory
// it uses the default views/ directory to render the .hbs pages
app.set('view engine', 'hbs');

// All the request are being saved to a file called 'logger.txt'
// app.use((req, res, next) => {
//     fs.appendFileSync('logger.txt', `${new Date().toString()}: ${req.method}: ${req.url}\n`);
//     next();
// });

// To use the maintenance mode
// app.use((req, res, next) => {
//     res.render('Maintenance.hbs', {
//         pageTitle: 'Maintenance'
//     });
// });

// We used a middleware to make express work in a bit different way
// Normally express use GET or POST route for making request
// But here use used the middleware and asked express to
// use our public directory and respond to the request made to any of that.
app.use(express.static(__dirname + '/public'));

// we can use the registerHelper to make its use to pass the data at the time
// of request made to the server
// inside this helper we do sent in data that is common to many request
// while rendering
// Now we don't need to pass in the data at the time of rendering
// the partials can automatically use it by its name
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});


app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home',
        welcomeMessage: 'Welcome to our home page'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About'
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects'
    });
})

app.get('/help', (req, res) => {
    res.sendFile('./public/help.html');
})

app.get('/bad', (req, res) => {
    res.send({
        code: 404,
        errorMessage: 'error handling request'
    });
});

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});