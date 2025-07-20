// Definição da classe ErrorHandler, que estende a classe Error do JavaScript
class ErrorHandler extends Error {
    constructor(message, statusCode) {
        // Chama o construtor da classe Error com a mensagem de erro fornecida
        super(message);
        // Atribui o código de status fornecido à instância da classe ErrorHandler
        this.statusCode = statusCode;
    }

