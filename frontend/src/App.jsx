import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AddEmployee from "./components/AddEmployee";
import EditEmployee from "./components/EditEmployee";
import { useState } from "react";

function App() {
  const [searchResults, setSearchResults] = useState(null);

  return (
    <Router>
      <Navbar onSearch={setSearchResults} />
      <Routes>
        <Route path="/" element={<Home searchResults={searchResults} />} />
        <Route path="/add" element={<AddEmployee />} />
        <Route path="/edit/:id" element={<EditEmployee />} />
      </Routes>
    </Router>
  );
}

export default App;
