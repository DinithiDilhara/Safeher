import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProtectedRoute from "../components/ProtectedRoute";
import { getAllComplaints } from "../services/api";

export default function AdminComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const data = await getAllComplaints();
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
        <main className="admin-main">
          <div className="admin-container">
            <h2>Complaints</h2>
            {loading && <p>Loading...</p>}
            
            {!loading && complaints.length === 0 && (
              <p>No complaints at this time.</p>
            )}
            
            {!loading && complaints.length > 0 && (
              <div className="complaints-list">
                {complaints.map((complaint) => (
                  <div key={complaint._id} className="complaint-card">
                    <h3>{complaint.title}</h3>
                    <p><strong>From:</strong> {complaint.userId?.name}</p>
                    <p><strong>Category:</strong> {complaint.category}</p>
                    <p><strong>Status:</strong> {complaint.status}</p>
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
