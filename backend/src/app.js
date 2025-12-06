import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { errorMiddleware } from "./error/error.js";
import router from "./routes.js";

const app = express();

dotenv.config({ path: "./src/config/config.env" });

app.use(cors({
	// Especificando as origens permitidas, métodos e permitindo credenciais
	origin: [process.env.FRONTEND_URLS.split(",")],
	methods: ["GET", "POST", "OPTIONS"],
	allowedHeaders: ["Content-Type", "Authorization", "Set-Cookie"],
	credentials: true,
	optionsSuccessStatus: 200,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "2026kb" }));
app.set("trust proxy", 1);
app.disable("x-powered-by");
app.use("/api/v1", router);
app.use(errorMiddleware);

export default app;
