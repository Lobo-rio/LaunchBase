const express = require('express')
const router = express.Router()
const foodfyAdmin = require('../controllers/index')


router.get('/', foodfyAdmin.index)

router.get('/admin/recipes', foodfyAdmin.index)
router.get('/admin/recipes/create', foodfyAdmin.create)
router.post('/admin/recipes', foodfyAdmin.post)
router.get('/admin/recipes/:id', foodfyAdmin.show)
router.get('/admin/recipes/:id/edit', foodfyAdmin.edit)
router.put('/admin/recipes', foodfyAdmin.put)
router.delete('/admin/recipes', foodfyAdmin.delete)

module.exports = router 