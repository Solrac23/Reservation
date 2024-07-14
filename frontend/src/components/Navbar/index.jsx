import React, { useState } from "react";
import './styles.css'
import { data } from "../../restApi.json";
import { Link as Scroll} from "react-scroll";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { FiLogIn } from "react-icons/fi"
const Navbar = () => {
	const [show, setShow] = useState(false);
	return (
			<>
				<nav>
					<div className="logo">Alexsandro</div>
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
						<button className="menuBtn">NOSSO MENU</button>
					</div>
					<div className="login-container">
							<div className="login">
								<Link to={"/login"} href="/login">
									<FiLogIn size={16} color="#000"/>
									Login
									</Link>
							</div>
							<div className="signup">
							<Link to={"/signup"}>Sign Up</Link>
							</div>
					</div>
					<div className="hamburger" onClick={() => setShow(!show)}>
							<GiHamburgerMenu />
					</div>
				</nav>
			</>
	);
};

export default Navbar;