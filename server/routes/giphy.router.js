const express = require('express');
const pool = require('../modules/pool');
const axios = require('axios');
const router = express.Router();
require("dotenv").config();



router.get('/:id', (req,res) => {
    console.log('req.params is', req.params);
    axios.get(`http://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=${req.params.id}&limit=50`)
    .then((response) => {
        console.log('response is', response);
        res.send(response.data)
    }).catch( error => {
        console.log('Error on giphy get', error);
        res.sendStatus(500);
    })

});

module.exports = router;