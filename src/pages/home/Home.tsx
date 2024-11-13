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
      <div className="frase">
        <h2 id="text-1">Pontualidade</h2>
        <h2 id="text-2">é nossa prioridade</h2>
      </div>

      <div className="container-geral">
        <div className="container">Imagem1</div>
        <div className="container">Imagem2</div>
        <div className="container">Imagem3</div>
        <div className="container">Imagem4</div>
      </div>

      <div className="Infos">
        <div className="titulo">
          <h1>Quem Somos?</h1>
        </div>

        <div className="sub">
        {/* Somos uma empresa dedicada a oferecer soluções integradas para o setor de transporte público, com foco em ônibus urbanos. Nossa missão é facilitar e modernizar o serviço de transporte coletivo, contribuindo para a eficiência, segurança e conforto de passageiros e operadores.

Com anos de experiência na indústria de transportes, fornecemos uma ampla gama de serviços e produtos que vão desde a manutenção de frota até tecnologias de bilhetagem eletrônica e gestão de rotas. Nossas soluções ajudam operadoras de ônibus a otimizar suas operações, reduzir custos e melhorar a experiência dos usuários, ao mesmo tempo em que promovemos práticas sustentáveis para um futuro urbano mais inteligente.

Nosso portfólio inclui:

Sistemas de Bilhetagem e Pagamento Digital: Inovamos com tecnologias que facilitam o pagamento de passagens, como cartões eletrônicos e aplicativos móveis, tornando o processo mais rápido e seguro para os passageiros.
Gestão de Frota e Monitoramento: Fornecemos ferramentas avançadas de rastreamento e monitoramento que ajudam as empresas a gerenciar e otimizar suas rotas em tempo real.
Manutenção e Peças de Qualidade: Garantimos que as frotas estejam sempre em perfeito estado, oferecendo serviços de manutenção preventiva e corretiva, além de fornecer peças de reposição de alta qualidade.
Soluções de Informações ao Passageiro: Implementamos sistemas que mantêm os passageiros informados sobre horários e status de ônibus em tempo real, promovendo um serviço mais transparente e eficiente.
Nosso compromisso é com a inovação contínua e a melhoria do transporte público, colaborando para tornar as cidades mais conectadas e acessíveis. Trabalhamos lado a lado com municípios e operadores para criar um ecossistema de mobilidade urbana que seja sustentável, acessível e moderno, ajudando a transformar a experiência do transporte coletivo para melhor. */}
        </div>
      </div>
    </section>
  );
};

export default Home;
