import React, { useState, useEffect } from "react";
import { useNavigate, Link} from "react-router-dom"
// import './styles.css'
import api from "../../services/api";
import toast from "react-hot-toast";
export function Users(){
  const [user, setUser] = useState([])
	const [role, setRole] = useState("")

	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem("token");
		const role = localStorage.getItem("role");

    if (token && role) {
			return
    } else {
			setUser("");
			setRole("");
			navigate("/");
    }
	}, [navigate])

	useEffect(() => {
		async function handleUserLogin(){
			const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");

			try {
        const response = await api.get("user/list", {
          headers: { Authorization: `Bearer ${token}` },
        });
				const {users} = response.data

				setUser(users);
        setRole(role);
      } catch (error) {
        console.error("Falha ao verificar o token", error);
        toast.error("Sessão expirada. Faça login novamente");
        return;
      }
		}

		handleUserLogin();

	}, [])
  return (
    <div>
      <h1>Usuários cadastrados:</h1>
      {user && role === "admin" && (
        <div>
          {user.map((element) => (
            <div key={element.id}>
              <p>Nome: {element.first_name}</p>
              <p>Sobrenome: {element.last_name}</p>
              <p>E-mail: {element.email}</p>
            </div>
          ))}
        </div>
      )}
      <div>
        <Link to={"/"}>Voltar</Link>
      </div>
    </div>
  )
}