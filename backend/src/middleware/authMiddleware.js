import ErrorHandler from "../error/error.js";
import jwt from "jsonwebtoken";

export default function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return next(new ErrorHandler("Token de autenticação não fornecido", 401));
  }

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
      if (err) {
        err = {
          name: "TokenExpiredError",
          message: "Token expirado!"
        }
        return next(new jwt.TokenExpiredError(err.message))
      }else {
        return decoded
      }
    });

    const { id } = data
    req.userId = id

    return next();
  } catch (error) {
    return next(new ErrorHandler("Token de autenticação inválido", 401));
  }
}