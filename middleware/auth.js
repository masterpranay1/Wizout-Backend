import jwt from "jsonwebtoken";
import user from '../models/authModel.js'

export const auth = async (req, res, next) => {
  try {
    const tokens = req.cookies.token;
    if (!tokens) {
      res.status(404).json({
        message: "Please Login to access the resource",
      });
    } else {
      const decode = jwt.verify(tokens, process.env.SECRET_KEY);
      req.user = await user.find({ primary_email: decode.primary_email });
      next();
    }
  } catch (err) {
    return next(new Error("please Login First"));
  }
};
