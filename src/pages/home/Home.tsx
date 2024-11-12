// Home.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../client/supabaseClient";
import { User } from "@supabase/supabase-js";
import '../../styles/Home.css';

const Home: React.FC = () => {
  const [, setUser] = useState<User | null>(null);
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
      <section className="Section1">
        {/* Introdução */}
        <div className="headder">
          <div className="headder-general">
            {/* Título */}
            <h1 className="Logo">MetroBus</h1>
            <div className="frase">
              <h2 id="text-1">Pontualidade</h2>
              <h2 id="text-2">é nossa prioridade</h2>
            </div>
            {/* Fim do Título */}

            {/* Slider */}
              <div className="container">
                <div className="logo">
                  <img src="" alt="" />
                </div>
              </div>


            {/* Fim do Slider */}
          </div>
        </div>
        {/* Fim da Introdução */}

        {/* D1 */}
        <div className="middle">
          <div className="change">
            <h1 className="lalallal"></h1>
          </div>
        </div>
        {/* Fim do D1 */}
      </section>
    </>
  );
};

export default Home;
