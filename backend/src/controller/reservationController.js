import { validateDate } from "./utils/date.js";
import ErrorHandler from "../error/error.js";
import { createService, findAllReservationService, findReservationByIdService } from "../services/reservationService.js";

export default {
	async findAllReservation(req, res, next) {
		const { userId } = req;

		if(!userId){
			throw new ErrorHandler("Usuário não encontrado", 404);
		}
		
		try {
			// Tentando buscar a reserva no banco de dados utilizando o ID fornecido
			const reservation = await findAllReservationService(userId);

			return res.status(200).json({
				success: true,
				reservation,
			});

		}catch(err){
			return next(err);
		}
	},
	async findReservationById(req, res, next) {
		// Extraindo o ID da reserva do parâmetro da URL
		const { reservationId } = req.params;
		const { userId } = req;

		if(!userId){
			throw new ErrorHandler("Usuário não encontrado", 404);
		}
		
		if(!reservationId){
			throw new ErrorHandler("Id da reserva não fornecido", 400);
		}
		
		try {
			// Tentando buscar a reserva no banco de dados utilizando o ID fornecido
			const reservation = await findReservationByIdService(reservationId, userId);

			return res.status(200).json({
				success: true,
				reservation
			});

		}catch(err){
			return next(err);
		}
	},
	
	async create(req, res, next) {
		
		const {  
			date, 
			time, 
			phone,
			people 
		} = req.body;
		
		const { userId } = req;

		if(!userId){
			return next(new ErrorHandler("Usuário não fornecido", 401));
		}
		// Verificando se todos os campos obrigatórios estão preenchidos
		if (!date || !time || !phone || !people) {
			// Se algum campo estiver em branco, retorna um erro utilizando o ErrorHandler
			return next(new ErrorHandler("Por favor, preencha o formulário de reserva completo!!", 400));
		}
		
		if(!validateDate(date)){
			return next(new ErrorHandler("A data da reserva não pode ser inferior a data atual", 400));
		}
		
		try {
			// Tentando criar uma nova reserva no banco de dados utilizando o modelo Reservation
			await createService({
				date,
				time,
				phone,
				people
			}, userId);
			
			// Se a criação for bem-sucedida, envia uma resposta de sucesso ao cliente
			return res.status(201).json({
				success: true,
				message: "Reserva enviada com sucesso!",
			});
		} catch (error) {
			return next(error);
		}
	},
};
