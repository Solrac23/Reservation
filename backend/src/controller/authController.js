import jwt from "jsonwebtoken"
import Cookies from "js-cookie";
import connection from "../database/connection.js";
import { decrypt } from "./utils/cryptography.js"
import ErrorHandler from "../error/error.js";

export default {
  async authenticate(req, res, next) {
    const { email, password } = req.body;

    try {
      const user = await connection("users")
      .where("email", email)
      .select("*")
      .first();
 
     const isValidPassword = decrypt(password, user.password);
 
     if (!user || !isValidPassword) {
       return next(new ErrorHandler("Email ou senha inválidos", 401));
     }
 
     const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });
     
     Cookies.set("authtoken", token, { 
      expires: new Date(Date.now() + 86400000),
      path: "/",
      sameSite: "Strict",
      secure: process.env.NODE_ENV === 'production',  // true for production
    }); // 1 day

      delete user.password

      return res.json({ success: true, token, user });
    } catch (error) {

      console.log(`Error thrown: ${error}`);

      if (error.name === 'ValidationError') {
          
          const validationErrors = Object.values(error.errors).map(err => err.message);
        
          return next(new ErrorHandler(validationErrors.join(', '), 400));
      }

      return next(error);
    }
   
  }
}