import User from "../component/users/user.model.js";
import config from "../config/config.js";
import { RequestHandler } from "../helpers/requestHandler.helper.js";
import jwt from "jsonwebtoken";

export default async function jwtAuthorize(req, res, next) {
  const token = req.headers?.authorization?.split(" ")[1];
  jwt.verify(token, config.JWT_SECRET, async (err, data) => {
    if (err) {
      return RequestHandler.Unauthorized({ res, error: err?.message });
    }
    const user = await User.findById(data?.userId).lean()
    if(!user ){
        return RequestHandler.Unauthorized({ res })
    }
    req.user = data;
    return next();
  });
}

