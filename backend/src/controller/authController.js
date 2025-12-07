import { authenticateService } from "../services/authService.js";

export default {
	async authenticate(req, res, next) {
		const { email, password } = req.body;

		try {
			const {token} = await authenticateService({email, password});

			return res.json({ success: true, token });
		} catch (err) {
			console.error(`${err}`);

			return next(err);
		}
   
	}
};