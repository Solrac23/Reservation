import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import './styles.css'
import api from "../../services/api";
export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showLogin, setShowLogin] = useState(true);
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setShowLogin(false);
    }
  }, [])

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await api.post("auth/login", {
        email,
        password,
      })

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.user.role);

      setShowLogin(false);
    } catch (error) {
      console.error("Falha ao fazer login", error);
      alert("Falha ao fazer login");
    }
  }

  return (
    <main className={`login_main ${showLogin ? '' : 'hidden'}`} >
      <section className="container">
        <form action="" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              required  
              placeholder="Informe Seu E-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              required 
              placeholder="Informe Sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Login</button>
          <div className="forgot-password">
            <Link href="#">Esqueceu a senha?</Link>
          </div>
        </form>
      </section>
    </main>
  )
}