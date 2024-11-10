import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "../../pages/home/Home";
import Login from "../../pages/login/Login";
import Signup from "../../pages/signup/Signup";
import '../../styles/App.css'

function NavBar() {
  return (
    <Router>
      <nav className="container-navigation">
        <ul className="container-link">
          <li><Link to="/login"className="button1" >Login</Link></li>
          <li><Link to="/signup" className="button">User</Link></li>
        </ul>
      </nav>

      <Routes>
      <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} /> {/* Rota de Cadastro */}
      </Routes>
    </Router>
  );
}

export default NavBar;
