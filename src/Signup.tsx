// src/pages/Signup.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';

const Signup: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();  // Usando o navigate para redirecionar

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;  // Se houver um erro, lança uma exceção

      const user = data?.user;  // Acesso ao usuário dentro de 'data'

      if (user) {
        console.log('Usuário registrado:', user);
        navigate('/login');  // Redireciona para login após cadastro
      } else {
        setError('Erro desconhecido ao registrar usuário');
      }
    } catch (error: any) {
      setError(error.message);  // Exibe erro
    }
  };

  return (
    <div>
      <h2>Cadastro</h2>
      <form onSubmit={handleSignup}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Senha</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default Signup;
