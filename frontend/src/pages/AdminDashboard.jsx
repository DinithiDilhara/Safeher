import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProtectedRoute from "../components/ProtectedRoute";

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      if (parsedUser.role !== "admin") {
        navigate("/student/dashboard");
      }
      setUser(parsedUser);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <ProtectedRoute>
      <div>
        <Navbar />
        <main className="dashboard-main">
          <div className="dashboard-container">
            <h1>Admin Dashboard</h1>
            {user && <p>Welcome, {user.name}!</p>}
            
            <div className="dashboard-options">
              <Link to="/admin/alerts" className="option-card">
                <h3>View Alerts</h3>
                <p>Review emergency alerts</p>
              </Link>
              <Link to="/admin/complaints" className="option-card">
                <h3>View Complaints</h3>
                <p>Review and manage complaints</p>
              </Link>
            </div>

            <button onClick={handleLogout} className="btn btn-danger">Logout</button>
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}
