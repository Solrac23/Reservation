// Importando o aplicativo Express definido no arquivo app.js
import app from "./app.js";

// Iniciando o servidor Express e fazendo-o ouvir na porta especificada nas variáveis de ambiente
app.listen(process.env.PORT, () => {
	// Registrando uma mensagem no console indicando que o servidor está operando na porta especificada
	console.log(`Server está operando na porta: ${process.env.PORT}`);
});
