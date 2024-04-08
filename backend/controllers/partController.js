const Part = require('../models/partModel')
const mongoose = require('mongoose')

// get all parts
const getParts = async (req, res) => {
  const user_id = req.user._id

  const parts = await Part.find({user_id}).sort({createdAt: -1})

  res.status(200).json(parts)
}

// get a single Part
const getPart = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such Part'})
  }

  const parts = await Part.findById(id)

  if (!part) {
    return res.status(404).json({error: 'No such part'})
  }
  
  res.status(200).json(part)
}


// create new part
const createPart = async (req, res) => {
  const {title, ammount, price} = req.body

  let emptyFields = []

  if(!title) {
    emptyFields.push('title')
  }
  if(!ammount) {
    emptyFields.push('ammount')
  }
  if(!price) {
    emptyFields.push('price')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  // add doc to db
  try {
    const user_id = req.user._id
    const part = await Part.create({title, ammount, price, user_id})
    res.status(200).json(part)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// delete a part
const deletePart = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such part'})
  }

  const part = await Part.findOneAndDelete({_id: id})

  if (!part) {
    return res.status(400).json({error: 'No such part'})
  }

  res.status(200).json(part)
}

// update a part
const updatePart = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such Part'})
  }

  const part = await Part.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!part) {
    return res.status(400).json({error: 'No such part'})
  }

  res.status(200).json(part)
}


module.exports = {
  getParts,
  getPart,
  createPart,
  deletePart,
  updatePart
}