import React from "react"; // Importa o módulo React
import { HiOutlineArrowNarrowRight } from "react-icons/hi"; // Importa o ícone de seta da biblioteca React Icons
import axios from "axios"; // Importa o módulo Axios para fazer requisições HTTP
import { useState } from "react"; // Importa o hook useState do React para gerenciar o estado dos componentes
import toast from "react-hot-toast"; // Importa o módulo React Hot Toast para exibir notificações
import { useNavigate } from "react-router-dom"; // Importa o hook useNavigate do React Router para navegação programática

// Componente de Reserva
const Reservation = () => {
    // Define os estados dos campos do formulário de reserva
    const [firstName, setFirstName] = useState(""); // Estado para o primeiro nome
    const [lastName, setLastName] = useState(""); // Estado para o sobrenome
    const [email, setEmail] = useState(""); // Estado para o email
    const [date, setDate] = useState(""); // Estado para a data da reserva
    const [time, setTime] = useState(""); // Estado para o horário da reserva
    const [phone, setPhone] = useState(0); // Estado para o número de telefone
    const navigate = useNavigate(); // Função para navegação programática

    // Função para lidar com o envio da reserva
    const handleReservation = async (e) => {
        e.preventDefault(); // Previne o comportamento padrão do formulário
        try {
            // Faz uma requisição POST para o endpoint de reserva
            const { data } = await axios.post(
                "http://localhost:4000/api/v1/reservation/send", // URL do endpoint de reserva
                { firstName, lastName, email, phone, date, time }, // Dados da reserva a serem enviados
                {
                    headers: {
                        "Content-Type": "application/json", // Define o tipo de conteúdo como JSON
                    },
                    withCredentials: true, // Define se deve enviar cookies junto com a requisição (não útil neste caso)
                }
            );
            // Exibe uma mensagem de sucesso utilizando o React Hot Toast
            toast.success(data.message);
            // Limpa os campos do formulário após o envio da reserva
            setFirstName("");
            setLastName("");
            setPhone(0);
            setEmail("");
            setTime("");
            setDate("");
            // Navega para a página de sucesso após o envio da reserva
            navigate("/success");
        } catch (error) {
            // Exibe uma mensagem de erro caso ocorra um erro durante o envio da reserva
            toast.error(error);
        }
    };

    // Renderização do componente Reservation
    return (
        <section className="reservation" id="reservation">
            <div className="container">
                <div className="banner">
                    <img src="/reservation.png" alt="res" /> {/* Imagem do banner */}
                </div>
                <div className="banner">
                    <div className="reservation_form_box">
                        <h1>FAZER UMA RESERVA</h1> {/* Título do formulário */}
                        <p>Para mais perguntas, ligue</p> {/* Informação adicional */}
                        <form>
                            <div>
                                {/* Inputs para o primeiro nome e sobrenome */}
                                <input
                                    type="text"
                                    placeholder="Informe Seu nome"
                                    value={firstName}
                                    onChange={(e) =>
                                        setFirstName(e.target.value)
                                    } // Atualiza o estado do primeiro nome conforme o usuário digita
                                />
                                <input
                                    type="text"
                                    placeholder="Informe seu Sobrenome"
                                    value={lastName}
                                    onChange={(e) =>
                                        setLastName(e.target.value)
                                    } // Atualiza o estado do sobrenome conforme o usuário digita
                                />
                            </div>
                            <div>
                                {/* Inputs para a data e horário da reserva */}
                                <input
                                    type="date"
                                    placeholder="Data"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                                <input
                                    type="time"
                                    placeholder="Horario"
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                />
                            </div>
                            <div>
                                {/* Inputs para o email e número de telefone */}
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="email_tag"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <input
                                    type="number"
                                    placeholder="Informe seu número"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                            {/* Botão para realizar a reserva */}
                            <button type="submit" onClick={handleReservation}>
                                Realizar reserva{" "}
                                <span>
                                    <HiOutlineArrowNarrowRight /> {/* Ícone de seta */}
                                </span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Reservation; // Exporta o componente Reservation
