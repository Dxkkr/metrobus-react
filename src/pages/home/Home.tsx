import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../client/supabaseClient";
import { User } from "@supabase/supabase-js";
import '../../styles/Home.css';
import '../../../node_modules/swiper'
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

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
            <div className="Title">
              <div className="title-sub">
              <h1 className="h1-title">Pontualidade</h1>
              <h2 className="h2-sub">é nossa prioridade</h2>
              </div>
            </div>
            <div className="Swiper-config">
              
            <Swiper
  className="swiper-container" // Use a classe CSS que criamos
  modules={[Autoplay]}
  spaceBetween={30}
  slidesPerView={1}
  autoplay={{ delay: 3000, disableOnInteraction: false }} // Controle o delay para ajustar a velocidade
  style={{ width: "100%" }} // Garante que o Swiper ocupe apenas 100% da largura do contêiner
>
  <SwiperSlide>Slide 1</SwiperSlide>
  <SwiperSlide>Slide 2</SwiperSlide>
  <SwiperSlide>Slide 3</SwiperSlide>
</Swiper>
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
