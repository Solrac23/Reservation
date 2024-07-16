// Importando o ErrorHandler de um módulo externo para lidar com erros personalizados
import connection from "../database/connection.js";
import { validateDate } from "./utils/date.js";
import ErrorHandler from "../error/error.js";

// Função assíncrona responsável por lidar com o envio de reservas
export default {
	async getAllReservation(req, res, next) {
		const { userId } = req;

		if(!userId){
			return next(new ErrorHandler("ID da reserva não fornecido", 400));
		}
		
		try {
			// Tentando buscar a reserva no banco de dados utilizando o ID fornecido
			const reservation = await connection('reservations')
			.where('user_id', userId)
			.select("phone", "date", "time", "people");
			
			if(!reservation){
				return next(new ErrorHandler("Reserva não encontrada", 404));
			}

			return res.status(200).json({
				success: true,
        reservation
			})

		}catch(error){
			return next(new ErrorHandler("Não foi possível encontrar a reserva com esse ID", 404));
		}
	},
	async getReservationByID(req, res, next) {
		// Extraindo o ID da reserva do parâmetro da URL
		const { reservationId } = req.params;

		if(!reservationId){
			return next(new ErrorHandler("ID da reserva não fornecido", 400));
		}
		
		try {
			// Tentando buscar a reserva no banco de dados utilizando o ID fornecido
			const reservation = await connection('reservations')
			.where('id', reservationId)
			.first();
			
			if(!reservation){
				return next(new ErrorHandler("Reserva não encontrada", 404));
			}

			delete reservation.user_id;

			return res.status(200).json({
				success: true,
        reservation
			})

		}catch(error){
			return next(new ErrorHandler("Não foi possível encontrar a reserva com esse ID", 404));
		}
	},
	
	async sendReservation(req, res, next) {
		
		// Extraindo os dados da reserva do corpo da requisição
		const {  
			date, 
			time, 
			phone,
			people 
		} = req.body;
		
		const { userId } = req;
		if(!userId){
			return next(new ErrorHandler("Usuário não fornecido", 400));
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
			await connection('reservations').insert({
				user_id: userId, 
				date, 
				time, 
				phone,
				people,  // Número de pessoas na reserva
			});
			
			// Se a criação for bem-sucedida, envia uma resposta de sucesso ao cliente
			return res.status(201).json({
				success: true,
				message: "Reserva enviada com sucesso!",
			});
		} catch (error) {
			// Se ocorrer algum erro durante o processo de criação da reserva
			console.log(`Error thrown: ${error}`);
			
			// Verificando se o erro é do tipo ValidationError, que pode ocorrer devido a validações do esquema da reserva
			if (error.name === 'ValidationError') {
				// Se for um erro de validação, mapeia os erros individuais e os junta em uma mensagem
				const validationErrors = Object.values(error.errors).map(err => err.message);
				// Retorna um erro utilizando o ErrorHandler com a mensagem de validação
				return next(new ErrorHandler(validationErrors.join(', '), 400));
			}
			
			// Se não for um erro de validação, repassa o erro para o próximo middleware de tratamento de erros
			return next(error);
		}
	},
}
