// Importando o módulo express, que é um framework web para Node.js
import { Router } from "express";

// Importando a função sendreservation do arquivo de controle reservation.js
import authMiddleware from "./middleware/authMiddleware.js"
import roleMiddleware from "./middleware/roleMiddleware.js";
import { sendreservation } from "./controller/reservation.js";
import userController from "./controller/userController.js"
import authController from "./controller/authController.js"

// Criando uma nova rota utilizando o método Router do Express
const router = Router();

router.get("/user/list", authMiddleware, roleMiddleware, userController.getAllUsers)
router.get("/user", authMiddleware, userController.getUserById)
router.post("/auth/login", authController.authenticate);
// Definindo uma rota POST "/send" , que chama a função sendreservation quando a rota é acessada
router.post("/send", sendreservation);

export default router;