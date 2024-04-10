// import modules
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const Blog = require('./models/blogs');

// express app
const app = express();

// connect to MongoDB
const dbURI = 'mongodb+srv://node-user:usJWlotA6OIUcJBr@node-tutorials.qu87mss.mongodb.net/node-blog-app?retryWrites=true&w=majority&appName=node-tutorials'
mongoose.connect(dbURI)
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware and static files
app.use(express.static('public'));

// middleware for parsing request body
app.use(morgan('dev'));

// mongoose and mongo sandbox routes
// Create new test blog and save to Db
app.get('/sandbox/create', (req, res) => {
    const blog = new Blog({
        title: 'Node.js sandbox',
        snippet: 'This is a sandbox for testing Node.js',
        body: 'This is a body for testing Node.js'
    });

    blog.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            res.send(err)
        });
});

// Read all blogs from Db
app.get('/sandbox/read/all', (req, res) => {
    Blog.find()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        });
});

// Read one blog from Db
app.get('/sandbox/read/one', (req, res) => {
    const id = '6616f1eb2162ee56aa222105';
    Blog.findById(id)
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        });
});

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

// get all blogs from Db and render them
app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1})
        .then((result) => {
            res.render('index', {title: 'All Blogs', blogs: result })
        })
        .catch((err) => {
            console.log(err)
        })
});

// create a new blog page
app.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'Create Blog'});
});
 
// 404 page
app.use((req, res) => {
    res.status(404).render('404', {title: '404'});
});