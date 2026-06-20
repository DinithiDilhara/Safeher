import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ShieldCheck,
  FileText,
  Clock,
  CheckCircle,
  Search,
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
  const [dateRange, setDateRange] = useState("All Time");
  const [loading, setLoading] = useState(true);

  const [selectedReport, setSelectedReport] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const reportsPerPage = 5;

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const alertsResponse = await API.get("/alerts/my");
      const complaintsResponse = await API.get("/complaints/my");

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
    status: alert.status || "Pending",
    updated: alert.updatedAt || alert.createdAt,
    icon: <Bell size={20} />,
    category: alert.emergencyType || "Emergency Alert",
    message: alert.message || "No message provided",
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
    message: complaint.description || "No description provided",
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

    const statusMatch = status === "All Status" || report.status === status;

    const dateMatch = checkDateRange(report.date, dateRange);

    return searchMatch && typeMatch && statusMatch && dateMatch;
  });

  const totalPages = Math.ceil(filteredReports.length / reportsPerPage) || 1;
  const startIndex = (currentPage - 1) * reportsPerPage;
  const endIndex = startIndex + reportsPerPage;
  const paginatedReports = filteredReports.slice(startIndex, endIndex);

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

  const handleClearFilters = () => {
    setSearchText("");
    setReportType("All Types");
    setStatus("All Status");
    setDateRange("All Time");
    setCurrentPage(1);
  };

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
        <Link to="/student/dashboard" className="back-dashboard-btn">
          ← Back to Dashboard
        </Link>

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
                    onChange={(e) => {
                      setSearchText(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                </div>
              </div>

              <div className="filter-group">
                <label>Report Type</label>
                <select
                  value={reportType}
                  onChange={(e) => {
                    setReportType(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option>All Types</option>
                  <option>Emergency Alert</option>
                  <option>Anonymous Complaint</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Status</label>
                <select
                  value={status}
                  onChange={(e) => {
                    setStatus(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option>All Status</option>
                  <option>Pending</option>
                  <option>Under Review</option>
                  <option>In Progress</option>
                  <option>Resolved</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Date Range</label>
                <select
                  value={dateRange}
                  onChange={(e) => {
                    setDateRange(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option>All Time</option>
                  <option>Today</option>
                  <option>This Week</option>
                  <option>This Month</option>
                </select>
              </div>

              <button
                type="button"
                className="clear-filter-button"
                onClick={handleClearFilters}
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
                    paginatedReports.map((report) => (
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
                          <span
                            className={`report-status ${getStatusClass(
                              report.status
                            )}`}
                          >
                            {report.status}
                          </span>
                        </td>
                        <td>{formatDate(report.updated)}</td>
                        <td>
                          <button
                            type="button"
                            className="view-details-button"
                            onClick={() => setSelectedReport(report)}
                          >
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
                  <button
                    type="button"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    ‹
                  </button>

                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      type="button"
                      key={index + 1}
                      className={
                        currentPage === index + 1 ? "active-page" : ""
                      }
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    ›
                  </button>
                </div>

                <p>
                  Showing {filteredReports.length === 0 ? 0 : startIndex + 1}–
                  {Math.min(endIndex, filteredReports.length)} of{" "}
                  {filteredReports.length} reports
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
                    Click View Details to see full report information and
                    updates.
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

      {selectedReport && (
        <div className="report-modal-overlay">
          <div className="report-modal">
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setSelectedReport(null)}
            >
              ×
            </button>

            <h2>Report Details</h2>

            <div className="modal-detail-row">
              <strong>Report Type:</strong>
              <span>{selectedReport.type}</span>
            </div>

            <div className="modal-detail-row">
              <strong>Category:</strong>
              <span>{selectedReport.category}</span>
            </div>

            <div className="modal-detail-row">
              <strong>Location:</strong>
              <span>{selectedReport.location}</span>
            </div>

            <div className="modal-detail-row">
              <strong>Status:</strong>
              <span>{selectedReport.status}</span>
            </div>

            <div className="modal-detail-row">
              <strong>Date Submitted:</strong>
              <span>{formatDate(selectedReport.date)}</span>
            </div>

            <div className="modal-detail-row">
              <strong>Last Updated:</strong>
              <span>{formatDate(selectedReport.updated)}</span>
            </div>

            <div className="modal-message-box">
              <strong>Message / Description:</strong>
              <p>{selectedReport.message}</p>
            </div>
          </div>
        </div>
      )}

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

function ReportStatCard({
  icon,
  title,
  value,
  text,
  purple,
  orange,
  green,
  violet,
}) {
  let className = "report-stat-icon";

  if (purple) className += " purple";
  if (orange) className += " orange";
  if (green) className += " green";
  if (violet) className += " violet";

  return (
    <div className="report-stat-card no-arrow">
      <div className={className}>{icon}</div>
      <div>
        <h4>{title}</h4>
        <h2>{value}</h2>
        <p>{text}</p>
      </div>
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

function checkDateRange(dateValue, range) {
  if (range === "All Time") return true;
  if (!dateValue) return false;

  const reportDate = new Date(dateValue);
  const today = new Date();

  const reportDay = new Date(
    reportDate.getFullYear(),
    reportDate.getMonth(),
    reportDate.getDate()
  );

  const todayDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  if (range === "Today") {
    return reportDay.getTime() === todayDay.getTime();
  }

  if (range === "This Week") {
    const sevenDaysAgo = new Date(todayDay);
    sevenDaysAgo.setDate(todayDay.getDate() - 7);

    return reportDay >= sevenDaysAgo && reportDay <= todayDay;
  }

  if (range === "This Month") {
    return (
      reportDate.getMonth() === today.getMonth() &&
      reportDate.getFullYear() === today.getFullYear()
    );
  }

  return true;
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