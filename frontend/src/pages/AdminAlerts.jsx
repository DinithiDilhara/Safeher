import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProtectedRoute from "../components/ProtectedRoute";
import { getAllAlerts } from "../services/api";

export default function AdminAlerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const data = await getAllAlerts();
        setAlerts(data);
      } catch (err) {
        console.error("Failed to fetch alerts:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAlerts();
  }, []);

  return (
    <ProtectedRoute>
      <div>
        <Navbar />
        <main className="admin-main">
          <div className="admin-container">
            <h2>Emergency Alerts</h2>
            {loading && <p>Loading...</p>}
            
            {!loading && alerts.length === 0 && (
              <p>No alerts at this time.</p>
            )}
            
            {!loading && alerts.length > 0 && (
              <div className="alerts-list">
                {alerts.map((alert) => (
                  <div key={alert._id} className="alert-card">
                    <h3>Alert from {alert.userId?.name}</h3>
                    <p><strong>Location:</strong> {alert.location}</p>
                    <p><strong>Description:</strong> {alert.description}</p>
                    <p><strong>Time:</strong> {new Date(alert.createdAt).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}
