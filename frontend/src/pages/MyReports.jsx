import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ShieldCheck,
  FileText,
  Clock,
  CheckCircle,
  Search,
  Calendar,
  ChevronRight,
  Bell,
  FilePenLine,
  AlertTriangle,
  Shield,
  User,
  Bus,
  MapPin,
  Lock,
  Lightbulb,
  Mail,
} from "lucide-react";

import API from "../services/api";
import reportImage from "../assets/student-dashboard.png";

function MyReports() {
  const [alerts, setAlerts] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [reportType, setReportType] = useState("All Types");
  const [status, setStatus] = useState("All Status");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const alertsResponse = await API.get("/alerts");
      const complaintsResponse = await API.get("/complaints");

      setAlerts(alertsResponse.data || []);
      setComplaints(complaintsResponse.data || []);
    } catch (error) {
      console.log("Failed to fetch reports:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const alertReports = alerts.map((alert) => ({
    id: alert._id,
    type: "Emergency Alert",
    location: alert.location || "Not provided",
    date: alert.createdAt,
    status: alert.status || "Under Review",
    updated: alert.updatedAt || alert.createdAt,
    icon: <Bell size={20} />,
    category: alert.emergencyType || "Emergency Alert",
  }));

  const complaintReports = complaints.map((complaint) => ({
    id: complaint._id,
    type: "Anonymous Complaint",
    location: complaint.location || "Not provided",
    date: complaint.createdAt,
    status: complaint.status || "Pending",
    updated: complaint.updatedAt || complaint.createdAt,
    icon: getComplaintIcon(complaint.category),
    category: complaint.category || "Complaint",
  }));

  const allReports = [...alertReports, ...complaintReports].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const filteredReports = allReports.filter((report) => {
    const searchMatch =
      report.type.toLowerCase().includes(searchText.toLowerCase()) ||
      report.location.toLowerCase().includes(searchText.toLowerCase()) ||
      report.category.toLowerCase().includes(searchText.toLowerCase());

    const typeMatch =
      reportType === "All Types" || report.type === reportType;

    const statusMatch =
      status === "All Status" || report.status === status;

    return searchMatch && typeMatch && statusMatch;
  });

  const totalReports = allReports.length;
  const pendingReports = allReports.filter(
    (report) => report.status === "Pending"
  ).length;
  const resolvedReports = allReports.filter(
    (report) => report.status === "Resolved"
  ).length;
  const underReviewReports = allReports.filter(
    (report) => report.status === "Under Review"
  ).length;

  return (
    <div className="my-reports-page">
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

      <main className="reports-main">
        <section className="reports-hero">
          <div>
            <h1>My Reports</h1>
            <p>Track the status of your submitted alerts and complaints.</p>
          </div>

          <img src={reportImage} alt="My reports illustration" />
        </section>

        <section className="reports-stats-grid">
          <ReportStatCard
            icon={<FileText size={28} />}
            title="Total Reports"
            value={totalReports}
            text="All time"
            purple
          />

          <ReportStatCard
            icon={<Clock size={28} />}
            title="Pending"
            value={pendingReports}
            text="Awaiting review"
            orange
          />

          <ReportStatCard
            icon={<CheckCircle size={28} />}
            title="Resolved"
            value={resolvedReports}
            text="Successfully resolved"
            green
          />

          <ReportStatCard
            icon={<Search size={28} />}
            title="Under Review"
            value={underReviewReports}
            text="Currently under review"
            violet
          />
        </section>

        <section className="reports-content-grid">
          <div className="reports-left">
            <div className="reports-filter-card">
              <div className="filter-group search-filter">
                <label>Search reports</label>
                <div className="filter-input">
                  <Search size={17} />
                  <input
                    type="text"
                    placeholder="Search by type, location or keyword..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                </div>
              </div>

              <div className="filter-group">
                <label>Report Type</label>
                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                >
                  <option>All Types</option>
                  <option>Emergency Alert</option>
                  <option>Anonymous Complaint</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Status</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option>All Status</option>
                  <option>Pending</option>
                  <option>Under Review</option>
                  <option>In Progress</option>
                  <option>Resolved</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Date Range</label>
                <select>
                  <option>All Time</option>
                  <option>Today</option>
                  <option>This Week</option>
                  <option>This Month</option>
                </select>
              </div>

              <button
                className="clear-filter-button"
                onClick={() => {
                  setSearchText("");
                  setReportType("All Types");
                  setStatus("All Status");
                }}
              >
                Clear Filters
              </button>
            </div>

            <div className="reports-table-card">
              <table>
                <thead>
                  <tr>
                    <th>Report Type</th>
                    <th>Location</th>
                    <th>Date Submitted ↓</th>
                    <th>Status</th>
                    <th>Last Updated</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="6" className="empty-report-text">
                        Loading reports...
                      </td>
                    </tr>
                  ) : filteredReports.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="empty-report-text">
                        No reports found.
                      </td>
                    </tr>
                  ) : (
                    filteredReports.map((report) => (
                      <tr key={report.id}>
                        <td>
                          <div className="report-type-cell">
                            <div className="report-row-icon">{report.icon}</div>
                            <div>
                              <h4>{report.type}</h4>
                              <small>{report.category}</small>
                            </div>
                          </div>
                        </td>

                        <td>{report.location}</td>
                        <td>{formatDate(report.date)}</td>
                        <td>
                          <span className={`report-status ${getStatusClass(report.status)}`}>
                            {report.status}
                          </span>
                        </td>
                        <td>{formatDate(report.updated)}</td>
                        <td>
                          <button className="view-details-button">
                            View Details
                            <ChevronRight size={16} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>

              <div className="reports-pagination">
                <div>
                  <button>‹</button>
                  <button className="active-page">1</button>
                  <button>2</button>
                  <button>3</button>
                  <button>›</button>
                </div>

                <p>
                  Showing 1–{filteredReports.length} of {totalReports} reports
                </p>
              </div>
            </div>
          </div>

          <aside className="reports-sidebar">
            <div className="details-card">
              <div className="details-heading">
                <div>
                  <h3>Report Details</h3>
                  <p>
                    Click on any report to view full details, updates, and
                    responses from our team.
                  </p>
                </div>
                <Search size={48} />
              </div>

              <SideInfo
                icon={<Lock size={20} />}
                text="Your identity is always protected."
              />

              <SideInfo
                icon={<Bell size={20} />}
                text="You’ll receive updates on your report status."
              />

              <SideInfo
                icon={<Shield size={20} />}
                text="We take every report seriously and act quickly."
              />
            </div>

            <div className="helpful-tips-card">
              <div className="tips-heading">
                <h3>Helpful Tips</h3>
                <Lightbulb size={42} />
              </div>

              <Tip text="Provide clear and accurate details for faster resolution." />
              <Tip text="You can add more information from the report details page." />
              <Tip text="For emergencies, use the Emergency Alert for immediate help." />

              <a>
                View all Safety Tips
                <ChevronRight size={16} />
              </a>
            </div>
          </aside>
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

function ReportStatCard({ icon, title, value, text, purple, orange, green, violet }) {
  let className = "report-stat-icon";

  if (purple) className += " purple";
  if (orange) className += " orange";
  if (green) className += " green";
  if (violet) className += " violet";

  return (
    <div className="report-stat-card">
      <div className={className}>{icon}</div>
      <div>
        <h4>{title}</h4>
        <h2>{value}</h2>
        <p>{text}</p>
      </div>
      <button>
        <ChevronRight size={18} />
      </button>
    </div>
  );
}

function SideInfo({ icon, text }) {
  return (
    <div className="side-info">
      <div>{icon}</div>
      <p>{text}</p>
    </div>
  );
}

function Tip({ text }) {
  return (
    <div className="tip-line">
      <span>✓</span>
      <p>{text}</p>
    </div>
  );
}

function getComplaintIcon(category) {
  if (category === "Poor Lighting") return <AlertTriangle size={20} />;
  if (category === "Harassment") return <Shield size={20} />;
  if (category === "Transport Issue") return <Bus size={20} />;
  if (category === "Unsafe Route") return <MapPin size={20} />;
  return <FilePenLine size={20} />;
}

function getStatusClass(status) {
  if (status === "Resolved") return "resolved";
  if (status === "Pending") return "pending";
  if (status === "In Progress") return "progress";
  return "review";
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

export default MyReports;