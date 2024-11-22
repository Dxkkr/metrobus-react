import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../../pages/home/Home";
import Login from "../../pages/login/Login";
import Signup from "../../pages/signup/Signup";
import '../../styles/NavBar.css';
import { FiX } from "react-icons/fi";
import { FiGrid } from "react-icons/fi";
import Pass from "../../pages/Pass/Pass";
import Notifica from "../../pages/Notifica/Notifica";
import Bustime from "../../pages/Bustime/Bustime";

function NavBar() {
  return (
    <Router>
      <nav className="container-navigation">
        <ul className="container-link">
            <input type="checkbox" id="check"/>
            <span className="menu">
            <li className="Logo"><h1><a href="/home">MetroBus</a></h1></li>
            <li className="link"><a href="/Bustime">Horário de Ônibus</a></li>
            <li className="link"><a href="/Pass">Recarga de Passe</a></li>
            <li className="link"><a href="/Notifica">Notificações</a></li>
            <label htmlFor="check" className="close-menu"><FiX /></label>
            </span>
            <label htmlFor="check" className="open-menu"><FiGrid /></label>
        </ul>
      </nav>

      <Routes>
        <Route path="/Bustime" element={<Bustime/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/notifica" element={<Notifica/>}/>
        <Route path="/Pass" element={<Pass />}/>
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default NavBar;
