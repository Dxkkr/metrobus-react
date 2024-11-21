import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../client/supabaseClient";
import "../../styles/Login-SignUp.css";

const Signup: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 1. Cria o usuário no Supabase Auth
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        console.error("Erro de criação de usuário no Auth:", authError);
        setError(`Erro ao criar usuário no Auth: ${authError.message}`);
        return;
      }

      const user = data?.user;
      if (user) {
        console.log("Usuário registrado no Supabase Auth:", user);

        // Redireciona para login após cadastro
        navigate("/login");
      } else {
        setError("Erro desconhecido ao registrar usuário");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(`Erro inesperado: ${error.message}`);
      } else {
        setError("Ocorreu um erro inesperado");
      }
    }
  };

  return (
    <section>
      <div>
        <form className="form" onSubmit={handleSignup}>
          <h2 className="SignUp" style={{ marginTop: '50px' }}>Inscrever-se</h2>

          {/* Campo para Email */}
          <div>
            <div className="flex-column">
              <label>Email</label>
            </div>
            <div className="inputForm">
              <input
                type="email"
                className="input"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Campo para Senha */}
          <div>
            <div className="flex-column">
              <label>Senha</label>
            </div>
            <div className="inputForm">
              <input
                type="password"
                className="input"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {error && <div style={{ color: "red" }}>{error}</div>}

          <button className="button-submit">Inscrever-se</button>

          <p className="p">
            <span className="span">
              <a href="/Login">Já possui uma conta?</a>
            </span>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Signup;
