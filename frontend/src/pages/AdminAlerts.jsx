import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ShieldCheck,
  Bell,
  Clock,
  CheckCircle,
  Search,
  Filter,
  Eye,
  ChevronDown,
  ChevronRight,
  MapPin,
  User,
  LogOut,
  Zap,
  Mail,
} from "lucide-react";

import API from "../services/api";

function AdminAlerts() {
  const [alerts, setAlerts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [openMenu, setOpenMenu] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      const response = await API.get("/alerts");
      const backendAlerts = response.data || [];

      const formattedAlerts = backendAlerts.map((alert, index) => ({
        id: alert._id,
        studentName: alert.name || "Anonymous Student",
        studentInfo: "Student",
        emergencyType: alert.emergencyType || "Emergency Alert",
        location: alert.location || "Not provided",
        message: alert.message || "No message provided",
        status: alert.status || "Pending",
        date: alert.createdAt || new Date(),
        letter: (alert.name || "A").charAt(0).toUpperCase(),
      }));

      setAlerts(formattedAlerts);
    } catch (error) {
      console.log("Failed to fetch alerts:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateLocalStatus = (id, newStatus) => {
    setAlerts((prevAlerts) =>
      prevAlerts.map((alert) =>
        alert.id === id ? { ...alert, status: newStatus } : alert
      )
    );
    setOpenMenu(null);
  };

  const filteredAlerts = alerts.filter((alert) => {
    const searchMatch =
      alert.studentName.toLowerCase().includes(searchText.toLowerCase()) ||
      alert.location.toLowerCase().includes(searchText.toLowerCase()) ||
      alert.emergencyType.toLowerCase().includes(searchText.toLowerCase());

    const tabMatch =
      activeTab === "All" ||
      alert.status.toLowerCase() === activeTab.toLowerCase();

    return searchMatch && tabMatch;
  });

  const totalAlerts = alerts.length;
  const pendingCount = alerts.filter((a) => a.status === "Pending").length;
  const progressCount = alerts.filter((a) => a.status === "In Progress").length;
  const resolvedCount = alerts.filter((a) => a.status === "Resolved").length;

  return (
    <div className="admin-alerts-page">
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

        <div className="admin-nav-buttons">
          <button className="admin-user-button">
            <User size={18} />
            Admin
            <ChevronDown size={16} />
          </button>

          <Link to="/login" className="admin-logout-button">
            <LogOut size={18} />
            Logout
          </Link>
        </div>
      </nav>

      <main className="admin-alerts-main">
        <aside className="alerts-sidebar">
          <h3>Alerts Overview</h3>

          <div className="alert-total-card">
            <div className="alert-total-icon">
              <Bell size={32} />
            </div>
            <div>
              <h2>{totalAlerts}</h2>
              <p>Total Alerts</p>
              <span>Today</span>
            </div>
            <small>↑ 12% from yesterday</small>
          </div>

          <div className="alert-side-stat pending">
            <div>
              <Clock size={22} />
              <span>Pending</span>
            </div>
            <strong>{pendingCount}</strong>
          </div>

          <div className="alert-side-stat progress">
            <div>
              <Zap size={22} />
              <span>In Progress</span>
            </div>
            <strong>{progressCount}</strong>
          </div>

          <div className="alert-side-stat resolved">
            <div>
              <CheckCircle size={22} />
              <span>Resolved</span>
            </div>
            <strong>{resolvedCount}</strong>
          </div>

          <div className="response-metrics">
            <h3>Response Metrics</h3>

            <div>
              <span>Average Response Time</span>
              <strong>4m 32s</strong>
            </div>

            <div>
              <span>Resolution Rate</span>
              <strong>92%</strong>
            </div>

            <div>
              <span>Alerts Resolved Today</span>
              <strong>{resolvedCount}</strong>
            </div>
          </div>

          <Link to="/student/my-reports" className="view-reports-link">
            View Reports
            <ChevronRight size={18} />
          </Link>
        </aside>

        <section className="alerts-management-section">
          <div className="alerts-breadcrumb">
            <Link to="/admin/dashboard">Dashboard</Link>
            <span>›</span>
            <p>Alerts Management</p>
          </div>

          <div className="alerts-title-row">
            <div>
              <h1>Manage Emergency Alerts</h1>
              <p>
                Monitor, respond to, and resolve emergency alerts reported by
                students.
              </p>
            </div>

            <span className="last-updated">⟳ Last updated: 2 min ago</span>
          </div>

          <div className="alerts-table-card">
            <div className="alerts-controls">
              <div className="alert-tabs">
                <button
                  className={activeTab === "All" ? "active" : ""}
                  onClick={() => setActiveTab("All")}
                >
                  All ({totalAlerts})
                </button>

                <button
                  className={activeTab === "Pending" ? "active pending" : "pending"}
                  onClick={() => setActiveTab("Pending")}
                >
                  Pending ({pendingCount})
                </button>

                <button
                  className={
                    activeTab === "In Progress" ? "active progress" : "progress"
                  }
                  onClick={() => setActiveTab("In Progress")}
                >
                  In Progress ({progressCount})
                </button>

                <button
                  className={
                    activeTab === "Resolved" ? "active resolved" : "resolved"
                  }
                  onClick={() => setActiveTab("Resolved")}
                >
                  Resolved ({resolvedCount})
                </button>
              </div>

              <div className="alerts-search">
                <Search size={18} />
                <input
                  type="text"
                  placeholder="Search by student name, location, or type..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>

              <button className="alerts-filter-button">
                <Filter size={18} />
                Filters
              </button>
            </div>

            <table className="admin-alerts-table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Emergency Type</th>
                  <th>Location</th>
                  <th>Message</th>
                  <th>Status</th>
                  <th>Date & Time</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" className="alerts-empty-text">
                      Loading alerts...
                    </td>
                  </tr>
                ) : filteredAlerts.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="alerts-empty-text">
                      No alerts found.
                    </td>
                  </tr>
                ) : (
                  filteredAlerts.map((alert) => (
                    <tr key={alert.id}>
                      <td>
                        <div className="student-cell">
                          <div className="student-avatar">{alert.letter}</div>
                          <div>
                            <h4>{alert.studentName}</h4>
                            <p>{alert.studentInfo}</p>
                          </div>
                        </div>
                      </td>

                      <td>
                        <div className="emergency-type-cell">
                          <div className="emergency-type-icon">
                            <Bell size={17} />
                          </div>
                          <span>{alert.emergencyType}</span>
                        </div>
                      </td>

                      <td>
                        <div className="alert-location-cell">
                          <MapPin size={17} />
                          <span>{alert.location}</span>
                        </div>
                      </td>

                      <td className="alert-message-cell">{alert.message}</td>

                      <td>
                        <span
                          className={`alert-status-pill ${getAlertStatusClass(
                            alert.status
                          )}`}
                        >
                          <span></span>
                          {alert.status}
                        </span>
                      </td>

                      <td>{formatDate(alert.date)}</td>

                      <td>
                        <div className="alert-action-cell">
                          <button className="view-alert-button">
                            <Eye size={17} />
                            View
                          </button>

                          <button
                            className="alert-menu-button"
                            onClick={() =>
                              setOpenMenu(openMenu === alert.id ? null : alert.id)
                            }
                          >
                            <ChevronDown size={18} />
                          </button>

                          {openMenu === alert.id && (
                            <div className="alert-dropdown-menu">
                              <button>
                                <Eye size={17} />
                                View Details
                              </button>

                              <button
                                onClick={() =>
                                  updateLocalStatus(alert.id, "In Progress")
                                }
                              >
                                <Zap size={17} />
                                Mark In Progress
                              </button>

                              <button
                                onClick={() =>
                                  updateLocalStatus(alert.id, "Resolved")
                                }
                              >
                                <CheckCircle size={17} />
                                Resolve Alert
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            <div className="alerts-pagination">
              <p>
                Showing 1 to {filteredAlerts.length} of {totalAlerts} alerts
              </p>

              <div>
                <button>‹</button>
                <button className="active-page">1</button>
                <button>2</button>
                <button>3</button>
                <span>...</span>
                <button>6</button>
                <button>›</button>
              </div>

              <label>
                Rows per page
                <select>
                  <option>5</option>
                  <option>10</option>
                  <option>15</option>
                </select>
              </label>
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

function getAlertStatusClass(status) {
  if (status === "Resolved") return "resolved";
  if (status === "In Progress") return "progress";
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

export default AdminAlerts;