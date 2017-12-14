const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/database');
const bodyParser = require('body-parser');

const app = express();

// Listen to port number
const PORT = process.env.PORT || 3000;

const users = require('./routers/users');

// Middleware definition -------------------
app.use(bodyParser.json());

app.listen(PORT, ()=> {
  console.log('Server listening on port ' +PORT);
})


// Database connection ---------------------
mongoose.connect(config.database, (err)=>{
  if (err){
    console.log(err)
  }else{
    console.log('Connected');
  };
});

mongoose.connection.on('open', ()=>{
  console.log('Connected to database ' +config.database);
});

mongoose.connection.on('error', (err)=>{
  console.log('Database error:' +err);
});


// Specify the route handler ------------------
app.use('/users', users);

// Handle get request
app.get('/', (req, res)=>{
  // let user = {
  //   name:"James",
  //   age:28,
  // };
  //
  // for (let key in user){
  //   console.log(user[key]);
  // }

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
