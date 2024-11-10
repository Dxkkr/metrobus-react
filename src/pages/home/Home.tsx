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

  return (
    <>
      {user ? (
        <>
          <section className="umacoisa">
            <h2 className="Welcome">Bem-vindo, {user.email}</h2>

            <div className="Start">
              <h1 className="h1-title">Pontualidade</h1>
              <h2 className="h2-sub">é nossa prioridade</h2>
            </div>

            <div className="something">
            </div>
          </section>
        </>
      ) : (
        <p>Carregando...</p>
      )}
    </>
  );
};

export default Home;
