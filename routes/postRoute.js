import express from "express";

import {
  createPost,
  getALLPosts,
  getOwnPosts,
  doUpvote,
  doDownvote,
  commetOnPost,
} from "../controller/postController";
import { auth } from "../middleware/auth";

const router = express.Router();

router.post("/new", auth, createPost);
router.get("/get/all", getALLPosts);
router.get("/get/own", auth, getOwnPosts);
router.post("/downvote", auth, doDownvote);
router.post("/upvote", auth, doUpvote);
router.post("/comment", auth, commetOnPost);

export default router;
