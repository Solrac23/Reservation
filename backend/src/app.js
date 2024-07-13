// Importando o módulo express, que é um framework web para Node.js
import express from "express";

// Importando o módulo cors para habilitar o controle de acesso a recursos de origens diferentes
import cors from "cors";

// Importando o módulo dotenv para carregar variáveis de ambiente de um arquivo .env
import dotenv from "dotenv";

// Importando o middleware errorMiddleware do arquivo error.js para lidar com erros
import { errorMiddleware } from './error/error.js';

// Importando o roteador reservationRouter do arquivo reservationRoute.js para lidar com as rotas relacionadas a reservas
import router from "./routes.js";

// Criando uma instância do aplicativo Express
const app = express();

// Carregando as variáveis de ambiente do arquivo config.env usando o dotenv
dotenv.config({ path: "./src/config/config.env" });

// Utilizando o middleware cors para habilitar o controle de acesso a recursos de origens diferentes
app.use(cors({
    // Especificando as origens permitidas, métodos e permitindo credenciais
    origin: [process.env.FRONTEND_URLS.split(",")],
    methods: ["GET", "POST"],
    allowedHeaders: ['Content-Type', 'Authorization', 'Set-Cookie'],
    credentials: true,
    optionsSuccessStatus: 200,
}));

// Utilizando o middleware express.json() para fazer o parsing de requisições JSON
app.use(express.json());

// Utilizando o middleware express.urlencoded() para fazer o parsing de requisições URL-encoded
app.use(express.urlencoded({ extended: true, limit: "2026kb" }));
app.set('trust proxy', 1)
app.disable('x-powered-by')
// Utilizando o roteador reservationRouter para lidar com as rotas relacionadas a reservas
app.use("/api/v1/reservation", router);

// Utilizando o middleware errorMiddleware para lidar com erros
app.use(errorMiddleware);

// Exportando o aplicativo Express para ser utilizado em outros arquivos
export default app;
