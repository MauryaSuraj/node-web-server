const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port =process.env.PORT || 3000;
var app = express();
//middleware
//setting up the static page
//partial page for menu and all
hbs.registerPartials(__dirname + '/views/partial');
app.set('view engine', 'hbs');

// req store everything from client
//app.use keep tracke of the server how its working
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now} : ${req.method} ${ req.url}`;
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append File to server log');
    }
  });
  console.log(log);
  next();
});

// app.use((req, res, next) => {
//   res.render('maintanance.hbs');
// });
app.use(express.static(__dirname + '/public'));
//Helper Methods
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

//req that is made
//res is send back to the client
// slashe tell the root of the project
app.get('/', (req, res) => {
  // res.send('<h1>Hello Express</h1>');// response to the request
  // res.send({
  //   name: 'Suraj',
  //   likes: [
  //     'Biking',
  //     'Moving'
  //   ]
  // });
  res.render('home.hbs', {
    pageTitle: 'Home',
    // currentYear:new Date().getFullYear(),
    welcomemsg: 'Welcome To the Home page'
  });
});
//listen for the local host

//about route here
app.get('/about', (req, res) => {
  // res.send('About Page');
  res.render('about.hbs', {
    pageTitle: 'About Page', //passed to the aboutus page
    // currentYear:new Date().getFullYear() //send to the about us page
  });
});
//  /bad - send back json with errormessage
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});
//message on the console
app.listen(port, () => {
  console.log(`server is up on the prot ${port} `);
});
