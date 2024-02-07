const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');



router.get('/afip', function (req, res) {
    res.render('afip')
});




module.exports = router;    