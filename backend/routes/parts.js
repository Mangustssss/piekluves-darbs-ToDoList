const express = require('express')
const {
  createPart,
  getParts,
  getPart,
  deletePart,
  updatePart
} = require('../controllers/partController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all part routes
router.use(requireAuth)

// GET all parts
router.get('/', getParts)

//GET a single part
router.get('/:id', getPart)

// POST a new part
router.post('/', createPart)

// DELETE a part
router.delete('/:id', deletePart)

// UPDATE a part
router.patch('/:id', updatePart)


module.exports = router