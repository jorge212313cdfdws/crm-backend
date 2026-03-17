import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="navbar">
      <button className="navbar-back" onClick={() => navigate("/home")}>
        <ArrowLeft size={18} />
      </button>
      <h1>CRM</h1>
    </header>
  );
}

export default Navbar;
