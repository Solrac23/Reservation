import ErrorHandler from "../error/error.js";
import { createUserService, findAllUserService, findUserByIdService } from "../services/userService.js";

export default {
	async findAll(req, res, next) {
		try {
      
			const users = await findAllUserService();

			return res.status(200).json({
				success: true,
				users,
			});
		} catch (err) {
			console.log(err.message);
			return next(err);
		}
	},

	async findUserById(req, res, next) {
		const { userId } = req;

		if(!userId) {
			throw new ErrorHandler("User id not exist", 404);
		}

		try {

			const user = await findUserByIdService(userId);

			return res.status(200).json({
				success: true,
				user
			});
		} catch (err) {
			console.log(err.message);
			return next(err);
		}
	},

	async create(req, res, next) {
		const { 
			first_name, 
			last_name, 
			email, 
			role, 
			password
		} = req.body;

		try {
			await createUserService({
				first_name,
				last_name,
				email,
				role,
				password
			});

			return res.status(201).json({
				success: true,
				message: "Cadastro realizado com sucesso!",
			});
		} catch (error) {
			// Se ocorrer algum erro durante o processo de criação da reserva
			console.log(`Error thrown: ${error}`);

			// Verificando se o erro é do tipo ValidationError, que pode ocorrer devido a validações do esquema da reserva
			if (error.name === "ValidationError") {
				// Se for um erro de validação, mapeia os erros individuais e os junta em uma mensagem
				const validationErrors = Object.values(error.errors).map(err => err.message);
				// Retorna um erro utilizando o ErrorHandler com a mensagem de validação
				return next(new ErrorHandler(validationErrors.join(", "), 400));
			}

			return next(error);
		}
	},
};

