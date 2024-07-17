import React, { useState, useEffect } from "react";
import { useNavigate, Link} from "react-router-dom"
import './styles.css'
import api from "../../services/api";
import { data } from "../../restApi.json";
import toast from "react-hot-toast";
import { Link as Scroll} from "react-scroll";
import { FiPower } from "react-icons/fi";

const Navbar = () => {
	const [user, setUser] = useState("")
	const [role, setRole] = useState("")
	const [show, setShow] = useState(false);
	const navigate = useNavigate();
	useEffect(() => {
		const token = localStorage.getItem("token");
		const role = localStorage.getItem("role");

    if (token && role) {
      setShow(true);
			setRole(role);
    } else {
      setShow(false);
			setUser("");
			setRole("");
			navigate("/");
    }
	}, [navigate])

	useEffect(() => {
		async function handleUserLogin(){
			const token = localStorage.getItem("token");

			if(!token){
				return
			}else{
				try {
					const response = await api.get("user", {
						headers: { Authorization: `Bearer ${token}` },
					});
					const user = response.data.user
					setUser(user);
					console.log("Usuário logado:", user.first_name);
				} catch (error) {
					console.error("Falha ao verificar o token", error);
					localStorage.removeItem('token');
					localStorage.removeItem('role');
					toast.error("Sessão expirada. Faça login novamente");
					setShow(false);
					return;
				}
			}
		}

		handleUserLogin();

	}, [])

	function handleLogout() {
		localStorage.clear();
 
    navigate("/");
	}

	return (
			<>
				<nav>
					<div className="logo">{ !user ? "Alexsandro" : user.first_name}</div>
					<div className={show ? "navLinks showmenu" : "navLinks"}>
						<div className="links">
								{data[0].navbarLinks.map((element) => (
										<Scroll
											to={element.link}
											spy={true}
											smooth={true}
											duration={500}
											key={element.id}
										>
											{element.title}
										</Scroll>
								))}
						</div>
						<div className="menuBtn">
							<Scroll
								to="menu"
								spy={true}
								smooth={true}
								duration={500}
							>
								NOSSO MENU
							</Scroll>
						</div>
					</div>
					{user && role === "admin" && (
            <div className="userProfile">
							<Link to={"/users"}>Usuários cadastrados!</Link>
						</div>
					)}
					<button className="menuBtn" onClick={handleLogout} type="button">
						<FiPower size={18} color="#111" />
					</button>
				</nav>
			</>
	);
};

export default Navbar;