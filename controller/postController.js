import PostModel from "../models/postModel.js";

// creating the post
export const createPost = async (req, res) => {
  try {
    const { title, content, visibility, images } = req.body;
    if (!title) {
      res.status(400).json({
        success: false,
        message: "Give the Title ",
      });
      return;
    }
    if (!content) {
      res.status(400).json({
        success: false,
        message: "Empty post?",
      });
      return;
    }
    const author = req.user[0]._id;
    if (images && visibility) {
      const post = await PostModel.create({
        title,
        content,
        author,
        visibility,
        images,
      });
    } else if (visibility) {
      const post = await PostModel.create({
        title,
        content,
        author,
        visibility,
      });
    } else {
      if (images) {
        const post = await PostModel.create({ title, content, author, images });
      } else {
        const post = await PostModel.create({ title, content, author });
      }
    }

    res.status(201).json({
      success: true,
      message: "Post Created Successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err && err.message,
    });
  }
};

export const getALLPosts = async (req, res) => {
  try {
    const post = await PostModel.find({});
    res.status(201).json({
      success: true,
      post,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err && err.message,
    });
  }
};

export const getOwnPosts = async (req, res) => {
  try {
    const post = await PostModel.find({ author: req.user[0]._id });
    res.status(201).json({
      success: true,
      post,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err && err.message,
    });
  }
};

export const doUpvote = async (req, res) => {
  try {
    const post = await PostModel.findById(req.body._id);
    if (!post) {
      res.status(404).json({
        success: false,
        message: "Not Found",
      });
      return;
    }

    var upvotes = post.upvotes || [];
    var downvotes = post.downvotes || [];
    const userId = req.user[0]._id;
    // Check if the user has already upvoted
    const hasUpvoted = upvotes.includes(userId);
    // Check if the user has already downvoted
    const hasDownvoted = downvotes.includes(userId);
    if (hasUpvoted) {
      // User has already upvoted, so remove the upvote
      upvotes.splice(upvotes.indexOf(userId), 1);
    } else {
      // User has not upvoted, so add the upvote
      upvotes.push(userId);
      if (hasDownvoted) {
        downvotes.splice(downvotes.indexOf(userId), 1);
      }
    }
    const updatePost = await PostModel.updateOne(
      {
        _id: req.body._id,
      },
      { $set: { upvotes, downvotes } }
    );

    res.status(201).json({
      totalUpvotes: upvotes.length,
      totalDownvotes: downvotes.length,
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err && err.message,
    });
  }
};
export const doDownvote = async (req, res) => {
  try {
    const post = await PostModel.findById(req.body._id);
    if (!post) {
      res.status(404).json({
        success: false,
        message: "Not Found",
      });
      return;
    }

    const userId = req.user[0]._id;
    var upvotes = post.upvotes || [];
    var downvotes = post.downvotes || [];
    // Check if the user has already upvoted
    const hasUpvoted = upvotes.includes(userId);
    // Check if the user has already downvoted
    const hasDownvoted = downvotes.includes(userId);
    if (hasDownvoted) {
      // User has already upvoted, so remove the upvote
      downvotes.splice(downvotes.indexOf(userId), 1);
    } else {
      // User has not upvoted, so add the upvote
      downvotes.push(userId);
      if (hasUpvoted) {
        upvotes.splice(upvotes.indexOf(userId), 1);
      }
    }
    const updatePost = await PostModel.updateOne(
      {
        _id: req.body._id,
      },
      { $set: { upvotes, downvotes } }
    );

    res.status(201).json({
      totalUpvotes: upvotes.length,
      totalDownvotes: downvotes.length,
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err && err.message,
    });
  }
};

export const commetOnPost = async (req, res) => {
  try {
    const post = await PostModel.findById(req.body._id);

    if (!post) {
      res.status(404).json({
        success: false,
        message: "Not Found",
      });
      return;
    }
    var comments = post.comments || [];
    if (!req.body.text || req.body.text.length === 0) {
      res.status(404).json({
        success: false,
        message: "type something",
      });

      return;
    }
    comments.push({ text: req.body.text, postedBy: req.user._id });
    const updatePost = await PostModel.updateOne(
      {
        _id: req.body._id,
      },
      { $set: { comments } }
    );
    res.status(201).json({
      comments,
      success: true,
    });
  } catch (err) {
    res.status(201).json({
      success: false,
      message: "something went wrong , try after sometime",
    });
  }
};
