const express = require("express");
const cors = require("cors");
const mainRoutes = require("./routes/mainRoutes.js")

const app = express();

const corsOptions = {
    origin: "http://stock-tracker-app.herokuapp.com",
    optionsSuccessStatus: 200,
};

// Middleware
app
  .use(cors(corsOptions))

// Routes
app
.use(express.urlencoded({extended: false}))
.use(express.json())
.use('/', mainRoutes)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server connected at:", PORT);
});