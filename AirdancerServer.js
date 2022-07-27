const { application } = require('express');
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const airdancerPlayerRoutes = require('./routes/airdancerPlayerRoutes');
  
// Static Middleware
app.use(express.static(path.join(__dirname, 'public')));

// app.use(express.static('public')); // This makes the directory 'public' and all of it's contents available to the frontend.
  
// View Engine Setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
  
// TODO: Replace the redirect here to got to the krisairdancer.com directory page (homepage).
app.get('/', (req, res) => {
    // console.log('AT: /');

    res.redirect('/homepage');
});

app.get('/homepage', (req, res) => {
    // console.log(`AT: /homepage`);

    res.render('homepage');
});

app.use('/airdancer-player', airdancerPlayerRoutes);

app.use( (req, res) => { 
    // console.log(`AT: 404 route`);

    res.status(404).render('404', { title: '404'} );
});

app.listen(11001, (error) => {
    if(error){
        throw error;
    }   
    console.log("Server listening on port 11001");
});