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
    const blogs = [
        {title: 'How to start with Node.js', snippet: 'Node.js is a JavaScript runtime built on Chrome\'s V8 JavaScript engine.'},
        {title: 'Express.js tutorial', snippet: 'Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.'},
        {title: 'MongoDB tutorial', snippet: 'MongoDB is a free and open-source cross-platform document-oriented database program.'},
    ];
    res.render('index', {title: 'Home', blogs});
});

// about page
app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});
});


// redirects example
app.get('/about-us', (req, res) => {
    res.redirect('/about');
});

// create a new blog page
app.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'Create Blog'});
});
 
// 404 page
app.use((req, res) => {
    res.status(404).render('404', {title: '404'});
});