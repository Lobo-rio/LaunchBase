const express = require('express')
const router = express.Router()
const foodfyAdmin = require('../controllers/index')


router.get('/', foodfyAdmin.index)
router.get('/create', foodfyAdmin.create)
router.post('/create', foodfyAdmin.post)


module.exports = router