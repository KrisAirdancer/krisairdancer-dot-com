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
  
app.get('/', (req, res) => {

    res.render('main_site_views/homepage');
});

app.use('/airdancer-player', airdancerPlayerRoutes);

app.use( (req, res) => { 

    res.status(404).render('main_site_views/404', { title: '404'} );
});

app.listen(11001, (error) => {
    if(error){
        throw error;
    }   
    console.log("Server listening on port 11001");
});