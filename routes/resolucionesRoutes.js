const express = require('express');
const router = express.Router();

const path = require('path');
const fs = require('fs');


router.get('/299', function (req, res) {
    res.render('299')
});


module.exports = router;