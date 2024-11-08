// src/pages/Home.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';

const Home: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = supabase.auth.getUser();

    if (!currentUser) {
      navigate('/login');
    } else {
      setUser(currentUser);
    }
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div>
      {user ? (
        <div>
          <h2>Bem-vindo, {user.email}</h2>
          <button onClick={handleLogout}>Sair</button>
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};

export default Home;
