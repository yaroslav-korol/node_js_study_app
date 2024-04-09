// import modules
const express = require('express');

// express app
const app = express();

// register view engine
app.set('view engine', 'ejs');

// listen for requests on port 3000
app.listen(3000);

// default route
app.get('/', (req, res) => {
    res.render('<p>Hello World!</p>');
});

// about
app.get('/about', (req, res) => {
    res.send('<p>About Me</p>');
});