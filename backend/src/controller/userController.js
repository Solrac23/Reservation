import connection from "../database/connection.js";
import { crypt } from "./utils/cryptography.js";
import ErrorHandler from "../error/error.js";

export default {
  async getAllUsers(req, res, next) {
    try {
      
      const users = await connection("users").select("*");

      return res.status(200).json({
        success: true,
        users
      });
    } catch (error) {
      return next(new ErrorHandler("Erro ao listar usuários", 500));
    }
  },

  async getUserById(req, res, next) {
    const { userId } = req;

    try {
      const user = await connection("users")
       .where("id", userId)
       .select("*")
       .first();

      if (!user) {
        return next(new ErrorHandler("Usuário não encontrado", 404));
      }

      return res.status(200).json({
        success: true,
        user
      });
    } catch (error) {
      return next(new ErrorHandler("Erro ao buscar usuário", 500));
    }
  },
  async createUser(req, res, next) {
    const { 
      first_name, 
      last_name, 
      email, 
      role, 
      password
  } = req.body;

  let newRole;
  // Verificando se todos os campos obrigatórios estão preenchidos
  if (!first_name || !last_name || !email || !password) {
      // Se algum campo estiver em branco, retorna um erro utilizando o ErrorHandler
      return next(new ErrorHandler("Por favor, preencha o formulário de reserva completo!!", 400));
  }

  if(!role) {
      newRole = "user";
  }

  const pass = crypt(password)

  const userAlreadyExists = await connection("users")
      .where("email", email)
      .select("*")
      .first()
  
  if(userAlreadyExists){
      return next(new ErrorHandler("User already exists", 409))
  }

  try {
      // Tentando criar uma nova reserva no banco de dados utilizando o modelo Reservation
      await connection('users').insert({
        first_name, 
        last_name, 
        email, 
        role: newRole,
        password: pass  // A senha é criptografada antes de ser salva no banco de dados
      });
      // Se a criação for bem-sucedida, envia uma resposta de sucesso ao cliente
      return res.status(201).json({
        success: true,
        message: "Cadastro realizado com sucesso!",
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

