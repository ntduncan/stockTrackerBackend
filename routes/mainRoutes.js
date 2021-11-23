const express = require("express");
const mainControllers = require("../contollers/mainControllers")
const bodyParser = require("body-parser")
const router = express.Router();

const urlEncodedParser = bodyParser.urlencoded({extended: true});


router.get("/", (req, res) => {
    res.json("saw dude")
})

router.post("/getOne",(req, res) => {
    mainControllers.getOneStock(req, res);
})

router.post("/getMany",(req, res) => {
    mainControllers.getManyStocks(req, res);
})

module.exports = router