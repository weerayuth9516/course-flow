import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token || !token.startsWith(`Bearer `)) {
    return res.status(401).json({
      message: "Token has invlid format",
    });
  }
  // if (
  //   req.headers["content-type"].split(" ")[0].split(";")[0] ===
  //   "multipart/form-data"
  // ) {
  //   console.log(req.headers["content-type"].split(" ")[0].split(";")[0]);
  // }
  const pureToken = token.split(" ")[1];
  jwt.verify(pureToken, process.env.SECRET_KEY, (err, payload) => {
    if (err) {
      return res.status(401).json({
        message: "Token is invalid",
      });
    }
    req.user = payload;
    next();
  });
};
