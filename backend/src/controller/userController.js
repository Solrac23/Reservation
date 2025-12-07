import ErrorHandler from "../error/error.js";
import { createUserService, findAllUserService, findUserByIdService } from "../services/userService.js";

export default {
	async findAllUsers(req, res, next) {
		try {
      
			const users = await findAllUserService();

			return res.status(200).json({
				success: true,
				users,
			});
		} catch (err) {
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

			if (!user) {
				throw new ErrorHandler("Usuário não encontrado", 404);
			}

			return res.status(200).json({
				success: true,
				user
			});
		} catch (err) {
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

		// Verificando se todos os campos obrigatórios estão preenchidos
		if (!first_name || !last_name || !email || !password) {
		// Se algum campo estiver em branco, retorna um erro utilizando o ErrorHandler
			throw new ErrorHandler("Por favor, preencha o formulário de reserva completo!!", 400);
		}

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
		} catch (err) {
			return next(err);
		}
	},
};

