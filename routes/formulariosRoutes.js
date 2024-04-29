const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');



router.get('/afip', function (req, res) {
    res.render('afip')
});

router.get('/afip2024', function (req, res) {
    res.render('afip2024')
});




module.exports = router;    
