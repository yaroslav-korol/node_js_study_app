// import modules
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');


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

// middleware to encode urls
app.use(express.urlencoded({extended: true}));

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
    res.redirect('/blogs');
  });

// about page
app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});
});

// blog routes
app.use('/blogs', blogRoutes);

// 404 page
app.use((req, res) => {
    res.status(404).render('404', {title: '404'});
});