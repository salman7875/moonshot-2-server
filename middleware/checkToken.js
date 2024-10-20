import jwt from "jsonwebtoken";

console.log(process.env.JWT_SEC);

export const checkAuthToken = async (req, res, next) => {
  try {
    const authToken = req.cookies.token;

    if (!authToken) {
      return res.status(401).json({ success: false, message: "Unauthorized!" });
    }

    const decode = jwt.verify(authToken, process.env.JWT_SEC);
    req.user = decode;
    next();
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
