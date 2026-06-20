import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ShieldCheck,
  LayoutDashboard,
  Bell,
  FilePenLine,
  Clock,
  CheckCircle,
  MapPin,
  AlertTriangle,
  PieChart,
  BarChart3,
  Eye,
  ChevronRight,
  Mail,
  User,
} from "lucide-react";

import API from "../services/api";
import adminImage from "../assets/student-dashboard.png";

function AdminDashboard() {
  const [alerts, setAlerts] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      const alertsResponse = await API.get("/alerts");
      const complaintsResponse = await API.get("/complaints");

      setAlerts(alertsResponse.data || []);
      setComplaints(complaintsResponse.data || []);
    } catch (error) {
      console.log("Failed to fetch admin data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const totalAlerts = alerts.length;
  const totalComplaints = complaints.length;

  const allReports = [
    ...alerts.map((alert) => ({
      id: alert._id,
      type: "Emergency Alert",
      reporter: alert.name || "Anonymous",
      location: alert.location || "Not provided",
      status: alert.status || "Pending",
      date: alert.createdAt,
      icon: <Bell size={17} />,
    })),
    ...complaints.map((complaint) => ({
      id: complaint._id,
      type: complaint.category || "Complaint",
      reporter: complaint.isAnonymous || complaint.anonymous ? "Anonymous" : "Student",
      location: complaint.location || "Not provided",
      status: complaint.status || "Pending",
      date: complaint.createdAt,
      icon: <FilePenLine size={17} />,
    })),
  ].sort((a, b) => new Date(b.date) - new Date(a.date));

  const pendingCases = allReports.filter((item) => item.status === "Pending").length;
  const resolvedCases = allReports.filter((item) => item.status === "Resolved").length;

  const unsafeAreaReports = complaints.filter(
    (item) => item.category === "Unsafe Route" || item.category === "Poor Lighting"
  ).length;

  return (
    <div className="admin-dashboard-page">
      <nav className="navbar">
        <Link to="/" className="logo">
          <div className="logo-box">
            <ShieldCheck size={28} />
          </div>
          <h2>
            Safe<span>Her</span>
          </h2>
        </Link>

        <div className="nav-links">
          <Link className="active" to="/">
            Home
          </Link>
          <a>Features</a>
          <a>How It Works</a>
          <a>Resources</a>
          <a>About Us</a>
          <a>Contact</a>
        </div>

        <div className="nav-buttons">
          <Link to="/login" className="login-button">
            <User size={18} />
            Login
          </Link>
          <Link to="/register" className="register-button">
            Register
          </Link>
        </div>
      </nav>

      <main className="admin-main">
        <section className="admin-hero">
          <div className="admin-title-area">
            <div className="admin-title-icon">
              <LayoutDashboard size={42} />
            </div>

            <div>
              <h1>Admin Dashboard</h1>
              <p>Welcome back, Admin! Here’s what’s happening on campus.</p>
            </div>
          </div>

          <img src={adminImage} alt="Admin dashboard illustration" />

        </section>

        <section className="admin-stats-grid">
          <AdminStat
            icon={<Bell size={30} />}
            title="Total Alerts"
            value={totalAlerts}
            pink
          />

          <AdminStat
            icon={<FilePenLine size={30} />}
            title="Total Complaints"
            value={totalComplaints}
            purple
          />

          <AdminStat
            icon={<Clock size={30} />}
            title="Pending Cases"
            value={pendingCases}
            orange
          />

          <AdminStat
            icon={<CheckCircle size={30} />}
            title="Resolved Cases"
            value={resolvedCases}
            green
          />

          <AdminStat
            icon={<MapPin size={30} />}
            title="Unsafe Area Reports"
            value={unsafeAreaReports}
            violet
          />
        </section>

        <section className="admin-chart-grid">
          <div className="admin-chart-card admin-complaints-overview-card">
            <div className="admin-card-head">
              <h3>New Complaints</h3>
              <Link to="/admin/complaints">
                View All <ChevronRight size={17} />
              </Link>
            </div>

            <div className="admin-complaints-preview-list">
              {loading ? (
                <p className="admin-empty-text">Loading complaints...</p>
              ) : complaints.length === 0 ? (
                <p className="admin-empty-text">No complaints found.</p>
              ) : (
                complaints.slice(0, 5).map((complaint) => (
                  <div className="admin-complaint-preview" key={complaint._id}>
                    <div>
                      <strong>{complaint.category || "Complaint"}</strong>
                      <p>{complaint.location || "Not provided"}</p>
                    </div>
                    <span className={`admin-status ${getStatusClass(complaint.status || "Pending")}`}>
                      {complaint.status || "Pending"}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        <section className="admin-bottom-grid">
          <div className="recent-incidents-card">
            <div className="admin-card-head">
              <h3>Recent Incidents</h3>
              <Link to="/admin/alerts">
                View All <ChevronRight size={17} />
              </Link>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Reporter</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="admin-empty-text">
                      Loading incidents...
                    </td>
                  </tr>
                ) : allReports.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="admin-empty-text">
                      No incidents found.
                    </td>
                  </tr>
                ) : (
                  allReports.slice(0, 5).map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="admin-type-cell">
                          <span>{item.icon}</span>
                          {item.type}
                        </div>
                      </td>
                      <td>{item.reporter}</td>
                      <td>{item.location}</td>
                      <td>
                        <span className={`admin-status ${getStatusClass(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td>{formatDate(item.date)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="quick-actions-card">
            <h3>Quick Actions</h3>

            <div className="quick-action-grid">
              <QuickAction
                to="/admin/alerts"
                icon={<Bell size={31} />}
                title="Manage Alerts"
                text="View, respond and manage all alerts."
                pink
              />

              <QuickAction
                to="/admin/complaints"
                icon={<FilePenLine size={31} />}
                title="Manage Complaints"
                text="Review and take action on complaints."
                purple
              />

              <QuickAction
                to="/student/my-reports"
                icon={<BarChart3 size={31} />}
                title="View Reports"
                text="Access detailed reports and incident logs."
                orange
              />

              <QuickAction
                to="/admin/dashboard"
                icon={<PieChart size={31} />}
                title="Safety Analytics"
                text="Explore trends and campus safety insights."
                violet
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-about">
          <div className="footer-logo">
            <div className="logo-box small">
              <ShieldCheck size={24} />
            </div>
            <h2>
              Safe<span>Her</span>
            </h2>
          </div>
          <p>
            Building a safer, stronger, and more supportive campus for every
            female student.
          </p>
        </div>

        <div className="footer-column">
          <h3>Quick Links</h3>
          <a>Home</a>
          <a>Features</a>
          <a>How It Works</a>
          <a>Resources</a>
        </div>

        <div className="footer-column">
          <h3>Useful Links</h3>
          <a>About Us</a>
          <a>Contact</a>
          <a>Privacy Policy</a>
          <a>Terms & Conditions</a>
        </div>

        <div className="footer-column">
          <h3>Connect With Us</h3>
          <div className="socials">
            <span>IG</span>
            <span>X</span>
            <span>in</span>
            <span>
              <Mail size={18} />
            </span>
          </div>
          <p className="priority">
            <ShieldCheck size={16} />
            Your Safety, Our Priority.
          </p>
          <p>© 2026 SafeHer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function AdminStat({ icon, title, value, pink, purple, orange, green, violet }) {
  let iconClass = "admin-stat-icon";
  if (pink) iconClass += " pink";
  if (purple) iconClass += " purple";
  if (orange) iconClass += " orange";
  if (green) iconClass += " green";
  if (violet) iconClass += " violet";

  return (
    <div className="admin-stat-card">
      <div className={iconClass}>{icon}</div>

      <div>
        <p>{title}</p>
        <h2>{value}</h2>
      </div>
    </div>
  );
}

function QuickAction({ to, icon, title, text, pink, purple, orange, violet }) {
  let iconClass = "quick-action-icon";
  if (pink) iconClass += " pink";
  if (purple) iconClass += " purple";
  if (orange) iconClass += " orange";
  if (violet) iconClass += " violet";

  return (
    <Link to={to} className="quick-action-box">
      <div className={iconClass}>{icon}</div>

      <div>
        <h4>{title}</h4>
        <p>{text}</p>
      </div>

      <span>
        <ChevronRight size={18} />
      </span>
    </Link>
  );
}

function getStatusClass(status) {
  if (status === "Resolved") return "resolved";
  if (status === "In Review" || status === "Under Review") return "review";
  return "pending";
}

function formatDate(dateValue) {
  if (!dateValue) return "Not available";

  const date = new Date(dateValue);

  return date.toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default AdminDashboard;