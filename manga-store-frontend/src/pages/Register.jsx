import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/Login.css";

function Register() {

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    try {

      const response = await fetch(
        "http://localhost:8080/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      if (!response.ok) {

        const message = await response.text();

        throw new Error(
          message || "No se pudo crear la cuenta."
        );
      }

      const data = await response.json();

      // Dejamos al usuario automáticamente logueado
      login(data);

      navigate("/");

    } catch (error) {

      alert(error.message);

    }
  };

  return (
    <div className="login-container">

      <div className="login-card">

        <h2 className="login-title">
          Crear cuenta
        </h2>

        <p className="login-subtitle">
          Únete a Manga X Store
        </p>

        <form onSubmit={handleRegister}>

          <div className="login-form-group">

            <label>Usuario</label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ingresa tu usuario"
              required
            />

          </div>

          <div className="login-form-group">

            <label>Email</label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingresa tu correo"
              required
            />

          </div>

          <div className="login-form-group">

            <label>Contraseña</label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Crea una contraseña"
              required
              minLength={6}
            />

          </div>

          <div className="login-form-group">

            <label>Confirmar contraseña</label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repite tu contraseña"
              required
              minLength={6}
            />

          </div>

          <button
            type="submit"
            className="login-btn-submit"
          >
            Crear cuenta
          </button>

        </form>

      </div>

    </div>
  );
}

export default Register;