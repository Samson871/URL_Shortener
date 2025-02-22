const express = require('express');
const {connectmongoDb} = require('./connect');
const path = require('path');

const URL = require('./models/url');

const urlRoute = require('./routes/url');
const staticRoute=require('./routes/staticRouter')
const userRoute = require('./routes/user')

const app = express();
const port = 3000;

//Corrected connection string
connectmongoDb('mongodb://localhost:27017/url-shortener');

//ALL MIDDLEWARE
app.set("view engine", "ejs");
app.set('views', path.resolve("./views"));
app.use(express.json()); // MUST be before your routes
app.use(express.urlencoded({extented: false}));

//ALL ROUTES
app.use('/',staticRoute);
app.use('/user',userRoute);
app.use('/url', urlRoute);




app.listen(port, () => console.log(`Server is running on http://localhost:${port}`)); 