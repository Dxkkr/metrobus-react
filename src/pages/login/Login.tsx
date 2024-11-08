import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../client/supabaseClient";
import "../../styles/Login-SignUp.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error; // Se ocorrer um erro, lança uma exceção

      const user = data?.user; // Acesso correto ao usuário

      if (user) {
        console.log("Usuário logado:", user);
        navigate("/home");
      } else {
        setError("Usuário não encontrado");
      }
    } catch (err: unknown) {
      // Verifique se 'err' é uma instância de 'Error' e extraia a mensagem
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocorreu um erro desconhecido.");
      }
    }
  };

  return (
    <>
      <section>
        <div>
          <form className="form" onSubmit={handleLogin}>
            <h2>Login</h2>
            <div>
              <div className="flex-column">
                <label>Email </label>
              </div>
              <div className="inputForm">
                <input type="text" className="input" placeholder="Entre com seu email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
            </div>

            <div>
              <div className="flex-column">
                <label>Senha </label>
              </div>
              <div className="inputForm">
                <input type="password" className="input" placeholder="Entre com sua senha" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              {error && <div style={{ color: "red", padding:"10px 0" }}>{error}</div>}
              <div className="flex-row">
                <span className="span">Esqueceu a senha?</span>
              </div>
            </div>

            <button className="button-submit">Conectar</button>
            <p className="p">
              Não tem uma conta? <span className="span">cadastre-se</span>
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
