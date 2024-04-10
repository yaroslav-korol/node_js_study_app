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

// create a new blog page
app.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'Create a new Blog'});
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

// get data from the input form and save to Db
app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
        .then((result) => {
            res.redirect('/blogs');
        })
       .catch((err) => {
            console.log(err)
        });
});


// get blog by id and render it
app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;

    Blog.findById(id)
        .then((result) => {
            res.render('details', { blog: result, title: 'Blog Details' })
        })
        .catch((err) => {
            console.log(err)
        });
});
 
// delete blog by id
app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then((result) => {
            res.json({ redirect: '/blogs', message: 'Blog deleted successfully' })
        })
        .catch((err) => {
            console.log(err)
        });
});

// 404 page
app.use((req, res) => {
    res.status(404).render('404', {title: '404'});
});