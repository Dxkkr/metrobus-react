import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "../../pages/home/Home";
import Login from "../../pages/login/Login";
import Signup from "../../pages/signup/Signup";
// import Profile from "../../pages/profile/Profile"; // Página de perfil
import '../../styles/NavBar.css'

function NavBar() {
  return (
    <Router>
      <nav className="container-navigation">
        <ul className="container-link">
          <li className="navitems"><h1>MetroBus</h1></li>
        </ul>

        {/* Botão para acessar o perfil */}
        <Link to="/profile" className="navitems-2">
          <button className="profile-button">User</button>
        </Link>
      </nav>

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default NavBar;


// Fazer as Areas da Nav (Horário de Ônibus, Recarga de Passe, Notificações).
// Fazer a Area do Perfil do Usuario.