const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'authModel',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  upvotes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'authModel', 
    },
  ],
  downvotes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'authModel', 
    },
  ],
  images: [
    // for image we have to decide ,either we use aws bucket or cloudinary
    {
      type: String, 
    },
  ],
  visibility: {
    type: String, 
    required: true,
    default:"Global"
  },
  comments: [
    {
      text: String,
      postedBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'authModel', 
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
