import connection from "../database/connection.js";
import ErrorHandler from "../error/error.js";

export default async function roleMiddleware(req, res, next) {
  const { userId } = req;

  if(!userId) {
    return next(new ErrorHandler("Usuário não autenticado", 401));
  }
  try {
    const user = await connection("users")
   .where("id", userId)
   .select("role")
   .first();

   if(!user || user.role !== "admin") {
     return next(new ErrorHandler("Você não possui permissão para acessar este recurso", 403));
   }

   return next();
  } catch (error) {
    return next(new ErrorHandler("Erro ao verificar permissões", 500));
  }
}