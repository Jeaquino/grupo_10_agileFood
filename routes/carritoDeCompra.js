const express = require('express');
const router = express.Router();
const controller = require('../controllers/carritoDeComprasControllers');

router.get('/', controller.detail);

module.exports = router;