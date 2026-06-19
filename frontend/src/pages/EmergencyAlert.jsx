import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendAlert } from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProtectedRoute from "../components/ProtectedRoute";

export default function EmergencyAlert() {
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendAlert({ location, description });
      setSuccess("Alert sent successfully!");
      setTimeout(() => navigate("/student/dashboard"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send alert");
    }
  };

  return (
    <ProtectedRoute>
      <div>
        <Navbar />
        <main className="form-main">
          <div className="form-container">
            <h2>Send Emergency Alert</h2>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
            
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Your Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
              <textarea
                placeholder="Describe the situation (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="5"
              ></textarea>
              <button type="submit" className="btn btn-danger">Send Alert</button>
            </form>
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}
