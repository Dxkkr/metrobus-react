import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../client/supabaseClient";
import { User } from "@supabase/supabase-js";
import '../../styles/Home.css'; 

const Home: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        navigate("/login");
      } else {
        setUser(data.user);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <>
      {user ? (
        <section>
          <h2>Bem-vindo, {user.email}</h2>
          <button role="button" className="golden-button" onClick={handleLogout}>
            <span className="golden-text">Sair</span>
          </button>
        </section>
      ) : (
        <p>Carregando...</p>
      )}
    </>
  );
};

export default Home;
