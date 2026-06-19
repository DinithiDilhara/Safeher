import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { submitComplaint } from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProtectedRoute from "../components/ProtectedRoute";

export default function ComplaintForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    category: "harassment"
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitComplaint(formData);
      setSuccess("Complaint submitted successfully!");
      setTimeout(() => navigate("/student/dashboard"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit complaint");
    }
  };

  return (
    <ProtectedRoute>
      <div>
        <Navbar />
        <main className="form-main">
          <div className="form-container">
            <h2>File a Complaint</h2>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
            
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                placeholder="Complaint Title"
                value={formData.title}
                onChange={handleChange}
                required
              />
              <select name="category" value={formData.category} onChange={handleChange}>
                <option value="harassment">Harassment</option>
                <option value="bullying">Bullying</option>
                <option value="assault">Assault</option>
                <option value="other">Other</option>
              </select>
              <input
                type="text"
                name="location"
                placeholder="Location of Incident"
                value={formData.location}
                onChange={handleChange}
                required
              />
              <textarea
                name="description"
                placeholder="Detailed Description"
                value={formData.description}
                onChange={handleChange}
                rows="6"
                required
              ></textarea>
              <button type="submit" className="btn btn-primary">Submit Complaint</button>
            </form>
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}
