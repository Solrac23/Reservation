import { useState} from "react"
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import api from "../../services/api";
import './styles.css'
import toast from "react-hot-toast";
export function Register(){
  const [firstName, setFirstName] = useState(""); // Estado para o primeiro nome
  const [lastName, setLastName] = useState(""); // Estado para o sobrenome
  const [email, setEmail] = useState(""); // Estado para o email
  const [password, setPassword] = useState(""); // Estado para o password

  const navigate = useNavigate();
  
  async function handleRegistration(e){
    e.preventDefault();

    try {
      const { data } = await api.post("user/create", {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      })

      toast.success(data.message)

      setFirstName("")
      setLastName("")
      setEmail("")
      setPassword("")

      navigate("/")
    } catch (error) {
      console.error("Falha ao fazer cadastro", error);
    }
  }

  return (
    <>
      <section className="register">
        <div className="container">
          <div className="register_form_box">
            <h1>Cadastro</h1>
            <form action="" onSubmit={handleRegistration}>
              <div className="form-group">
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
              <div className="form-group">
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  required 
                  placeholder="Informe seu e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                  type="password" 
                  id="password" 
                  name="password" 
                  required 
                  placeholder="Informe sua senha" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="btn">
                <button type="submit">Cadastrar</button>
              </div>
              <div className="have-account">
                <Link to={"/"} >
                  <HiOutlineArrowNarrowLeft />
                  {" "}Login
                </Link>
              </div>
            </form>
          </div>
        </div>  
      </section>
    </>
  )
}