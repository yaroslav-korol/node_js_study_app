// import modules
const express = require('express');

// express app
const app = express();

// register view engine
app.set('view engine', 'ejs');

// listen for requests on port 3000
app.listen(3000);

// home page
app.get('/', (req, res) => {
    res.render('index');
});

// about page
app.get('/about', (req, res) => {
    res.render('about');
});


// redirects example
app.get('/about-us', (req, res) => {
    res.redirect('/about');
});

// create a new blog page
app.get('/blogs/create', (req, res) => {
    res.render('create.ejs');
});

// 404 page
app.use((req, res) => {
    res.status(404).render('404');
});