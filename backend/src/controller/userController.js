import connection from "../database/connection.js";
import Cookies from "js-cookie";
import ErrorHandler from "../error/error.js";

export default {
  async getAllUsers(req, res, next) {
    try {
      const token = Cookies.get("token");
      console.log(token)
      
      const users = await connection("users").select("*");

      return res.status(200).json({users});
    } catch (error) {
      return next(new ErrorHandler("Erro ao listar usuários", 500));
    }
  },

  async getUserById(req, res, next) {
    const { userId } = req;

    try {
      const token = Cookies.get("token");
      console.log(token)
      // res.cookie("token")
      const user = await connection("users")
       .where("id", userId)
       .select("*")
       .first();

      if (!user) {
        return next(new ErrorHandler("Usuário não encontrado", 404));
      }

      return res.status(200).json(user);
    } catch (error) {
      return next(new ErrorHandler("Erro ao buscar usuário", 500));
    }
  },
}

