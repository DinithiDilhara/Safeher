import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProtectedRoute from "../components/ProtectedRoute";
import { getUserComplaints } from "../services/api";

export default function MyReports() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const data = await getUserComplaints();
        setComplaints(data);
      } catch (err) {
        console.error("Failed to fetch complaints:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchComplaints();
  }, []);

  return (
    <ProtectedRoute>
      <div>
        <Navbar />
        <main className="reports-main">
          <div className="reports-container">
            <h2>My Reports</h2>
            {loading && <p>Loading...</p>}
            
            {!loading && complaints.length === 0 && (
              <p>No reports yet.</p>
            )}
            
            {!loading && complaints.length > 0 && (
              <div className="reports-list">
                {complaints.map((complaint) => (
                  <div key={complaint._id} className="report-card">
                    <h3>{complaint.title}</h3>
                    <p><strong>Status:</strong> {complaint.status}</p>
                    <p><strong>Category:</strong> {complaint.category}</p>
                    <p><strong>Location:</strong> {complaint.location}</p>
                    <p>{complaint.description}</p>
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
