import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./Home.css";

function Home({ searchResults }) {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  const fetchEmployees = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/employee`);
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/employee/${id}`);
      fetchEmployees();
    } catch (err) {
      console.error(err);
    }
  };

  const displayData = searchResults !== null ? searchResults : employees;

  return (
    <div className="home">
      <h3>Employee List</h3>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Name</th><th>Email</th><th>Position</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayData.map(emp => (
              <tr key={emp.id}>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.position}</td>
                <td>
                  <button className="edit" onClick={() => navigate(`/edit/${emp.id}`)}><FaEdit /></button>
                  <button className="delete" onClick={() => handleDelete(emp.id)}><FaTrash /></button>
                </td>
              </tr>
            ))}
            {displayData.length === 0 && <tr><td colSpan="4" className="no-data">No employees found</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
