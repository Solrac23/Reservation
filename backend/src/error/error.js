class ErrorHandler extends Error {
	constructor(message, statusCode) {
		// Chama o construtor da classe Error com a mensagem de erro fornecida
		super(message);
		// Atribui o código de status fornecido à instância da classe ErrorHandler
		this.statusCode = statusCode;
	}
}

// Middleware de tratamento de erros
export const errorMiddleware = (err, req, res, next) => {

	err.message = err.message || "Internal Server Error";
	err.statusCode = err.statusCode || 500;

	if (err.name === "CastError") {
		const message = `Resource not found. Invalid: ${err.path}`;
		err = new ErrorHandler(message, 400);
	}

	if (err.name === "ValidationError") {
		const validationErrors = Object.values(err.errors).map(err => err.message);
		return next(new ErrorHandler(validationErrors.join(", "), 400));
	}

	return res.status(err.statusCode).json({
		success: false,
		message: err.message,
	});
};

export default ErrorHandler;