import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../client/supabaseClient";
import "../../styles/Login-SignUp.css";

const Signup: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Usando o navigate para redirecionar

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error; // Se houver um erro, lança uma exceção

      const user = data?.user; // Acesso ao usuário dentro de 'data'

      if (user) {
        console.log("Usuário registrado:", user);
        navigate("/login"); // Redireciona para login após cadastro
      } else {
        setError("Erro desconhecido ao registrar usuário");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message); // Exibe a mensagem de erro
      } else {
        setError("Ocorreu um erro inesperado");
      }
    }
  };

  return (
    <section>
      <div>
        <form className="form" onSubmit={handleSignup}>
          <h2>Inscrever-se</h2>
          <div>
            <div className="flex-column">
              <label>Email </label>
            </div>
            <div className="inputForm">
              <input type="text" className="input" placeholder="Digite seu email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
          </div>

          <div>
            <div className="flex-column">
              <label>Senha </label>
            </div>
            <div className="inputForm">
              <input type="password" className="input" placeholder="Digite sua senha" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            {error && <div style={{ color: "red" }}>{error}</div>}
          </div>

          <button className="button-submit">Inscrever-se</button>
          <p className="p">
            Já possui uma conta? <span className="span"><a href=""></a></span>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Signup;
