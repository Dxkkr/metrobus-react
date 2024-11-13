import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../../pages/home/Home";
import Login from "../../pages/login/Login";
import Signup from "../../pages/signup/Signup";
// import Profile from "../../pages/profile/Profile"; // Página de perfil
import '../../styles/NavBar.css'
import { FiX } from "react-icons/fi";
// import { FiAlignJustify } from "react-icons/fi";
import { FiGrid } from "react-icons/fi";
import Pass from "../../pages/Pass/Pass";
import Notification from "../../pages/Notification/Notification";'../../pages/Notification/Notification';



function NavBar() {
  return (
    <Router>
      <nav className="container-navigation">
        <ul className="container-link">
            <input type="checkbox" id="check"/>
            <span className="menu">
            <li className="Logo"><h1><a href="/home">MetroBus</a></h1></li>
            <li className="cor"><a href="#">Horário de Ônibus</a></li>
            <li className="cor"><a href="/Pass">Recarga de Passe</a></li>
            <li className="cor"><a href="/Notification">Notificações</a></li>
            <label htmlFor="check" className="close-menu"><FiX /></label>
            </span>
            <label htmlFor="check" className="open-menu"><FiGrid /></label>

            
        </ul>
      </nav>

      <Routes>
        <Route path="/Notification" element={<Notification/>}/>
        <Route path="/home" element={<Home />} />
        <Route path="/Pass" element={<Pass />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default NavBar;


// Fazer as Areas da Nav (Horário de Ônibus, Notificações).
// Fazer a Area do Perfil do Usuario.