const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');




//import
const post = require('./models/register');

mongoose.connect(process.env.db_connection, { useNewUrlParser: true }, (req, res) => {
    console.log('connected to db...')
});

app.set('view engine', 'ejs')
app.use(express.urlencoded( { extended: false } ));
app.use(bodyParser.json());



app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.get('/register', (req, res) => {
    res.render('register.ejs')
});
app.post('/register', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password,10)
    const Post = new post({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        
        const savedPost =  await Post.save() 
        .then(Post => {
             res.redirect('/login');
        });
        res.json(savedPost);
        // res.json(savedPost);
        // res.redirect('login.ejs');
    }catch(err) {
        console.log(err)
        res.redirect('/register')
    }   
});

app.get('/login', (req, res) => {
    res.render('login.ejs')
});

app.listen(3000, () => {
    console.log('Port running on 3000...')
});