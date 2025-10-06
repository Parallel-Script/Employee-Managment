import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaSearch, FaUserPlus } from "react-icons/fa";
import "./Navbar.css";

function Navbar({ onSearch }) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!search.trim()) {
      onSearch(null);
      return;
    }
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/employee/search/${search}`);
      onSearch(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Search error:", err);
      onSearch([]);
    }
  };

  return (
    <nav className="navbar">
      <h2>Employee Management</h2>

      <div className="navbar-search">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button onClick={handleSearch}><FaSearch /></button>
      </div>

      <button onClick={() => navigate("/add")} className="new-btn">
        <FaUserPlus /> New
      </button>
    </nav>
  );
}

export default Navbar;
