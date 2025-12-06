import db from "../database/db.js";
import ErrorHandler from "../error/error.js";

export async function findAllReservationService(userId) {
		
	try {
		// Tentando buscar a reserva no banco de dados utilizando o ID fornecido
		const reservation = await db
			.where("user_id", userId)
			.from("reservations")
			.select("*");
			
		if(!reservation){
			throw new ErrorHandler("Reserva não encontrada", 404);
		}

		reservation.forEach(users => {
			Object.defineProperty(users, "user_id", {
				enumerable: false,
				configurable: false
			});
		});

		return reservation;
	}catch(err){
		throw new ErrorHandler("Não foi possível encontrar a reserva com esse Id", 404);
	}
}
  
export async function findReservationByIdService(reservationId, userId) {
		
	try {
		// Tentando buscar a reserva no banco de dados utilizando o ID fornecido
		const reservation = await db
			.where("id", reservationId)
			.andWhere("user_id", userId)
			.from("reservations")
			.select("*")
			.first();
			
		if(!reservation){
			throw new ErrorHandler("Reserva não encontrada", 404);
		}

		// remove property user_id 
		Object.defineProperty(reservation, "user_id", {
			enumerable: false,
			configurable: false
		});
		
		return reservation;
	}catch(err){
		throw new ErrorHandler("Não foi possível encontrar a reserva com esse Id", 404);
	}
}
	
export async function createService({
	date, 
	time, 
	phone,
	people 
}, userId) {
		
	try {
		// Tentando criar uma nova reserva no banco de dados utilizando o modelo Reservation
		await db
			.insert({
				user_id: userId, 
				date, 
				time, 
				phone,
				people,  // Número de pessoas na reserva
			})
			.into("reservations");
			
	} catch (err) {
		// Se ocorrer algum erro durante o processo de criação da reserva
		throw new ErrorHandler("Não foi possível criar a reserva", 400);
	}
}