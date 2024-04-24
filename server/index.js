// import express from 'express';
// import dotenv from 'dotenv';
// import mongoose from 'mongoose';
//

require("dotenv").config();
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_SERVER);
const express = require("express");
const app = express();
app.use(express.json());

//auth route
const authRoute = require('./routers/authRoute');
app.use('/api', authRoute);

//admin route
const adminRoute = require('./routers/adminRoute');
app.use('/api/admin', adminRoute);

const port = process.env.SERVER_PORT || 3001;
app.listen(port, () => {
  console.log("Server listening on port", port);
});
