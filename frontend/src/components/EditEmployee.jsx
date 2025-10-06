import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaSave, FaArrowLeft } from "react-icons/fa";
import "./Form.css";

function EditEmployee() {
  const { id } = useParams();
  const [form, setForm] = useState({ name: "", email: "", position: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    let errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.includes("@")) errs.email = "Valid email required";
    if (!form.position.trim()) errs.position = "Position is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/employee/${id}`);
        setForm(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEmployee();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/employee/${id}`, form);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Edit Employee</h3>
      <input
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      {errors.name && <p>{errors.name}</p>}

      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      {errors.email && <p>{errors.email}</p>}

      <input
        type="text"
        placeholder="Position"
        value={form.position}
        onChange={(e) => setForm({ ...form, position: e.target.value })}
      />
      {errors.position && <p>{errors.position}</p>}

      <button type="submit"><FaSave /> Update</button>
      <button type="button" onClick={() => navigate("/")}><FaArrowLeft /> Back</button>
    </form>
  );
}

export default EditEmployee;
