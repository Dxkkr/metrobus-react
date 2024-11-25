import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../client/supabaseClient";
import "./profile.css";

const Profile: React.FC = () => {
  const navigate = useNavigate();

  // Estados para armazenar os dados do usuário
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Função para buscar os dados do usuário
  const fetchUserData = async () => {
    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) throw authError;

      if (user) {
        const { data: userProfile, error: dbError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

        if (dbError) throw dbError;

        setUser({ ...user, ...userProfile });
      } else {
        setError("Usuário não encontrado.");
      }
    } catch (err: any) {
      setError(err.message || "Erro ao carregar os dados do usuário.");
    } finally {
      setLoading(false);
    }
  };

  // Função para deslogar
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Erro ao sair da conta:", error);
        return;
      }
      navigate("/signup");
    } catch (err) {
      console.error("Erro inesperado ao sair da conta:", err);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (loading) return <div>Carregando...</div>;

  if (error)
    return <div style={{ color: "red" }}>Erro ao carregar o perfil: {error}</div>;

  return (
    <div className="profile-container">
      {/* Foto de Perfil */}
      <div className="profile-header">
        <img
          src={user.avatar_url || "https://via.placeholder.com/150"}
          alt="Foto de Perfil"
          className="profile-picture"
        />
        <h1>{user.name || "Usuário"}</h1>
        <p>{user.email}</p>
      </div>

      {/* Configurações do Usuário */}
      <div className="profile-settings">
        <h2>Configurações</h2>
        <div className="button-group">
          <button className="profile-button">Alterar Senha</button>
          <button className="profile-button">Editar Informações</button>
          <button className="profile-button logout" onClick={handleLogout}>
            Sair da Conta
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
