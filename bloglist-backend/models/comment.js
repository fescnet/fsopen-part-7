const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  blog: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }
})

commentSchema.set('toJSON', {
  transform: (document, newDocument) => {
    newDocument.id = document._id.toString()
    delete newDocument._id
    delete newDocument.__v
  }
})

module.exports = mongoose.model('Comment', commentSchema)
