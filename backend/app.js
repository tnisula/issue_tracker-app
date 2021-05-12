const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const config = require('./config/database');
const router = express.Router();

const Issue= require('./models/issue');

const issueRoutes = require('./routes/issues');
/*
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/users');
*/

mongoose.connect(
  'mongodb+srv://node-shop:' + 
  process.env.MONGO_ATLAS_PW + 
  '@node-rest-shop-mbe59.mongodb.net/test?retryWrites=true',
  {
    useNewUrlParser: true
  }
);

mongoose.Promise = global.Promise;

app.use(morgan('dev'));
// app.use('/uploads', express.static('uploads'));
/* original order */
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if(req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
}); 

// Routes which should handle requests
/*
app.use('/products', productRoutes); 
app.use('/orders', orderRoutes); 
app.use('/users', userRoutes); 
*/
app.use('/issues', issueRoutes);

//app.use('/', router);

// CORS middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser middleware
app.use(bodyParser.json());

// Connect to database
mongoose.connect(config.database);

// On connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database ' + config.database);
});

// On err
mongoose.connection.on('error', (err) => {
  console.log('Database error: ' + err);
});

// app.get('/', (req, res) => res.send('Hello World'));

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;