const express = require('express');
const {handleGenerateShortURL,handleRedirectURL,handleUpdateVisit} = require('../controllers/url');
const URL = require('../models/url');
const router = express.Router();


router.post('/',handleGenerateShortURL);

router.get('/:shortId',handleRedirectURL);
router.get('/updateVisit/:shortId',handleUpdateVisit);
module.exports = router;