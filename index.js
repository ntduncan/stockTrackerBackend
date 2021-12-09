const express = require("express");
const cors = require("cors");
const mainRoutes = require("./routes/mainRoutes.js")

const app = express();

const corsOptions = {
    origin: "http://stock-tracker-tool.herokuapp.com/",
    optionsSuccessStatus: 200,
};

// Middleware
app
  .use(cors(corsOptions))
  .use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "*");
 
    // Request methods you wish to allow
    res.setHeader(
       "Access-Control-Allow-Methods",
       "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
 
    // Request headers you wish to allow
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
 
    // Pass to next layer of middleware
    next();
 });
// Routes
app
.use(express.urlencoded({extended: false}))
.use(express.json())
.use('/', mainRoutes)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server connected at:", PORT);
});