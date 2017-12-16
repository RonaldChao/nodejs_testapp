const express = require('express');
const mongoose = require('mongoose');
const configDatabase = require('./config/database');
const keys = require('./config/keys')
const cookieSession = require('cookie-session');
const passport = require('passport');

require('./models/User');
require('./services/passport');


// // Database connection ---------------------
mongoose.connect(configDatabase.database, (err)=>{
  if (err){
    console.log(err)
  }else{
    console.log('Connected');
  };
});

const app = express();

app.use(
  cookieSession({
    // expire in ms
    maxAge: 1000000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routers/authRoutes')(app);

// Listen to port number
const PORT = process.env.PORT || 5000;

const users = require('./routers/users');

// Middleware definition -------------------

app.listen(PORT, ()=> {
  console.log('Server listening on port ' +PORT);
})



// mongoose.connection.on('open', ()=>{
//   console.log('Connected to database ' +config.database);
// });
//
// mongoose.connection.on('error', (err)=>{
//   console.log('Database error:' +err);
// });

//
// Specify the route handler ------------------
app.use('/users', users);

// Handle get request
app.get('/', (req, res)=>{

  res.send('Hello World, GET!!!!');
})

app.post('/', (req, res)=>{
  res.send('POST received!');
})

app.put('/', (req, res)=>{
  res.send('PUT received!');
})

app.delete('/', (req, res)=>{
  res.send('DELETE received!');
})
