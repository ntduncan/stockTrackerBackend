const express = require("express");
const cors = require("cors");
const mainRoutes = require("./routes/mainRoutes.js")

const app = express();
const whitelist =["http://127.0.0.1:5500", "<github link>"]
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
          callback(null, true)
        } else {
          callback(new Error('Not allowed by CORS'))
        }
      }
    ,
    optionsSuccessStatus: 200,
};

// Middleware
app
  .use(cors())
//   .use(function (req, res, next) {
//     // Website you wish to allow to connect
//     res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
 
//     // Request methods you wish to allow
//     res.setHeader(
//        "Access-Control-Allow-Methods",
//        "GET, POST"
//     );
 
//     // Request headers you wish to allow
//     res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
 
//     // Pass to next layer of middleware
//     next();
//  });
// Routes
app
.use(express.urlencoded({extended: false}))
.use(express.json())
.use('/', mainRoutes)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server connected at:", PORT);
});