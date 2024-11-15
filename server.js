const express = require('express');
const morgan = require('morgan');
const connectDB = require('./config/database');
const formData = require('express-form-data');
require('dotenv/config');

const medicineRoute = require('./router/medicineRouter'); 
const userRoute = require('./router/userRoute');
const reminderRoute  =  require('./router/reminderRouter');
const notificationRoute = require('./router/notificationRouter'); 
const categoryRoute = require('./router/categoryRouter');
const pharmacyStoreRoute = require('./router/PharmacyStore') ; 
const addToCartRouter = require('./router/cartRouter');
const orderRoute = require('./router/orderRoute') ;

require('dotenv').config();
require('colors');

connectDB(); 

const app = express();    

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

  
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(formData.parse());

app.use('/api/medicine' , medicineRoute) ;
app.use('/api/user' , userRoute) ; 
app.use('/api/reminder' , reminderRoute); 
app.use('/api/notification' , notificationRoute);
app.use('/api/category' , categoryRoute); 
app.use('/api/pharmacyStore' , pharmacyStoreRoute) 
app.use('/api/cart' , addToCartRouter); 
app.use('/api/order' , orderRoute);

app.use('*', (req, res) => {
    console.log('Endpoint working fine');
    res.status(404).send('Endpoint does not exist');
  });

  

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
  
  
  const PORT = process.env.PORT || 4000;
  
  
  
app.listen(
    PORT,
    console.log(`Server is connected ${process.env.NODE_ENV} mode on port ${PORT}`.yellow)
  );