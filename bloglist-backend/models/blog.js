const mongoose = require('mongoose')
const Comment = require('./comment')

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  url: { type: String, required: true },
  likes: { type: Number, default: 0 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ],
})

blogSchema.set('toJSON', {
  transform: (document, newDocument) => {
    newDocument.id = document._id.toString()
    delete newDocument._id
    delete newDocument.__v
  }
})

blogSchema.pre('remove', function(next) {
    Comment.remove({blog: this._id}).exec();
    next();
});

module.exports = mongoose.model('Blog', blogSchema)
