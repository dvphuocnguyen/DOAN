// import express from 'express';
// import dotenv from 'dotenv';
// import mongoose from 'mongoose';
//

require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_SERVER);
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // Địa chỉ của frontend
  credentials: true, // Để gửi cookie
}));
app.use(cookieParser());

//auth route
const authRoute = require("./routers/authRoute");
app.use("/api", authRoute);

//admin route
const adminRoute = require("./routers/adminRoute");
app.use("/api/admin", adminRoute);

//partner routes
const partnerRoute = require("./routers/partnerRoute");
app.use("/api/partner", partnerRoute);
//common routes
const commonRoute = require("./routers/commonRoute");
app.use("/api", commonRoute);

//

const port = process.env.SERVER_PORT || 3001;
app.listen(port, () => {
  console.log("Server listening on port", port, "aa");
});

/*
const cors = require("cors");

app.use(cors({
  origin: "http://yourfrontend.com", // Thay bằng domain frontend của bạn
  credentials: true
}));

*/
