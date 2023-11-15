import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Travel Route!!");
});

export default router;
