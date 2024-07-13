// Definição da classe ErrorHandler, que estende a classe Error do JavaScript
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
    // Define uma mensagem padrão de erro se não houver mensagem fornecida no erro
    err.message = err.message || "Internal Server Error";
    // Define um código de status padrão se não houver código de status fornecido no erro
    err.statusCode = err.statusCode || 500;

    // Se o erro for do tipo CastError (ocorre quando um valor não pode ser convertido para o tipo esperado)
    if (err.name === "CastError") {
        // Cria uma mensagem de erro personalizada indicando que o recurso não foi encontrado devido a um ID inválido
        const message = `Resource not found. Invalid: ${err.path}`;
        // Substitui o erro original por um novo erro utilizando a classe ErrorHandler e o código de status 400 (Bad Request)
        err = new ErrorHandler(message, 400);
    }

    // Se o erro for do tipo ValidationError (ocorre quando uma validação de esquema falha)
    if (err.name === 'ValidationError') {
        // Mapeia os erros de validação individuais e os junta em uma mensagem
        const validationErrors = Object.values(error.errors).map(err => err.message);
        // Retorna um novo erro utilizando a classe ErrorHandler com a mensagem de validação e o código de status 400 (Bad Request)
        return next(new ErrorHandler(validationErrors.join(', '), 400));
    }

    // Retorna uma resposta com o código de status e mensagem de erro adequados
    return res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};

// Exporta a classe ErrorHandler como padrão para uso em outros módulos
export default ErrorHandler;
