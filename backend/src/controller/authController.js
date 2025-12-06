import jwt from "jsonwebtoken";
import { decrypt } from "./utils/cryptography.js";
import ErrorHandler from "../error/error.js";
import { authenticateService } from "../services/authService.js";

export default {
	async authenticate(req, res, next) {
		const { email, password } = req.body;

		try {
			const user = await authenticateService(email);

			const isValidPassword = decrypt(password, user.password);
 
			if (!user || !isValidPassword) {
				return next(new ErrorHandler("Email ou senha inválidos", 401));
			}
 
			const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });

			Object.defineProperty(user, "password", {
				enumerable: false
			});

			return res.json({ success: true, token, user });
		} catch (error) {

			console.log(`Error thrown: ${error}`);

			if (error.name === "ValidationError") {
          
				const validationErrors = Object.values(error.errors).map(err => err.message);
        
				return next(new ErrorHandler(validationErrors.join(", "), 400));
			}

			return next(error);
		}
   
	}
};