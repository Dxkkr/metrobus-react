import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../client/supabaseClient";
import { User } from "@supabase/supabase-js";
import '@splidejs/splide/dist/css/splide.min.css';
import '../../styles/Home.css';

const Home: React.FC = () => {
  const [, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const fetchUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) {
      navigate("/login");
    } else {
      setUser(data.user);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [navigate]);

  return (
    <section className="Section1">
      {/* Header */}
      <div className="Logo">
        <h1>MetroBus</h1>
      </div>
      
        <div className="frase">
          <h2 id="text-1">Pontualidade</h2>
          <h2 id="text-2">é nossa prioridade</h2>
        </div>

      {/* Slider */}
      {/* TODO: Implementar slider utilizando Splide */}

      {/* Conteúdo de imagens */}
      <div className="container-geral">
        <div className="container">Imagem1</div>
        <div className="container">Imagem2</div>
        <div className="container">Imagem3</div>
        <div className="container">Imagem4</div>
      </div>
    </section>
  );
};

export default Home;
