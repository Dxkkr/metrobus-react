import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../client/supabaseClient";
import { User } from "@supabase/supabase-js";
import '@splidejs/splide/dist/css/splide.min.css';
import '../../styles/Home.css';
import '../../images/images.jpg'
import myVideo from '../../images/background.mp4';

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

      {/* Vídeo*/}
      <div className="video-container">
        <video autoPlay loop muted playsInline className="background-video">
          <source src={myVideo} type="video/mp4" />
          Seu navegador não suporta vídeos HTML5.
        </video>
        <div className="blur-layer"></div>
        <div className="overlay-content">
          <h1 className="main-title">MetroBus</h1>
          <span className="main-subtitle">Pontualidade</span>
          <span className="main-subtitle2">é Nossa Prioridade</span>
        </div>
      </div>
      <hr />

      <ul>
        <li style={{ listStyle: "none", marginTop: "-10px", fontSize: "35px", marginLeft: "10%", position: "relative" }}>Quem Nós Somos?</li>
        <li style={{ listStyle: "none", marginLeft: "45px", marginTop: "-5px" }}>Somos uma empresa que fornece serviços para empresas de Ônibus Urbanos que fornecem serviços como:</li>
        <li style={{ listStyle: "initial", marginLeft: "10%", marginBottom: "" }}>Sistemas de Bilhetagem Digital: Inovamos com tecnologias que facilitam o recarregamento de passagens, tornando o processo mais rápido e seguro para os passageiros.</li>
        <li style={{ listStyle: "initial", marginLeft: "10%" }}>Gestão de Frota e Monitoramento: Fornecemos ferramentas avançadas de rastreamento e monitoramento que ajudam as empresas a gerenciar e otimizar suas rotas em tempo real.</li>
        <li style={{ listStyle: "initial", marginLeft: "10%" }}>Soluções de Informações ao Passageiro: Implementamos sistemas que mantêm os passageiros informados sobre horários e status de ônibus em tempo real, promovendo um serviço mais transparente e eficiente.</li>
      </ul>
<div className="footer"></div>


    </section>
  );
};

export default Home;
