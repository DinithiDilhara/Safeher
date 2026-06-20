import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ShieldCheck,
  Bell,
  User,
  ChevronDown,
  LogOut,
  Search,
  Calendar,
  Download,
  Eye,
  RefreshCw,
  CheckCircle,
  Trash2,
  MapPin,
  FilePenLine,
  Users,
  MessageCircle,
  Camera,
  Shield,
  BarChart3,
  Mail,
  ChevronRight,
} from "lucide-react";

import API from "../services/api";

function AdminComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [anonymousFilter, setAnonymousFilter] = useState("All");
  const [openMenu, setOpenMenu] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const response = await API.get("/complaints");

      const formatted = (response.data || []).map((complaint, index) => ({
        id: complaint._id,
        number: index + 1,
        category: complaint.category || complaint.complaintType || "Complaint",
        location: complaint.location || "Not provided",
        description: complaint.description || "No description provided",
        anonymous:
          complaint.isAnonymous === true || complaint.anonymous === true
            ? "Yes"
            : "No",
        status: complaint.status || "Pending",
        date: complaint.createdAt || new Date(),
      }));

      setComplaints(formatted);
    } catch (error) {
      console.log("Failed to fetch complaints:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateComplaintStatus = async (id, newStatus) => {
    try {
      await API.put(`/complaints/${id}/status`, { status: newStatus });

      setComplaints((prev) =>
        prev.map((complaint) =>
          complaint.id === id ? { ...complaint, status: newStatus } : complaint
        )
      );
    } catch (error) {
      console.log("Failed to update complaint status:", error.message);
    } finally {
      setOpenMenu(null);
    }
  };

  const filteredComplaints = complaints.filter((complaint) => {
    const searchMatch =
      complaint.category.toLowerCase().includes(searchText.toLowerCase()) ||
      complaint.location.toLowerCase().includes(searchText.toLowerCase()) ||
      complaint.description.toLowerCase().includes(searchText.toLowerCase());

    const categoryMatch =
      categoryFilter === "All Categories" ||
      complaint.category === categoryFilter;

    const statusMatch =
      statusFilter === "All Status" || complaint.status === statusFilter;

    const anonymousMatch =
      anonymousFilter === "All" || complaint.anonymous === anonymousFilter;

    return searchMatch && categoryMatch && statusMatch && anonymousMatch;
  });

  const totalComplaints = complaints.length;

  const harassmentCount = complaints.filter(
    (item) => item.category === "Harassment"
  ).length;

  const physicalThreatCount = complaints.filter(
    (item) => item.category === "Physical Threat"
  ).length;

  const verbalAbuseCount = complaints.filter(
    (item) => item.category === "Verbal Abuse"
  ).length;

  const inappropriateCount = complaints.filter(
    (item) =>
      item.category === "Inappropriate Behavior" ||
      item.category === "Happropriate Behavior"
  ).length;

  const stalkingCount = complaints.filter(
    (item) => item.category === "Stalking"
  ).length;

  return (
    <div className="admin-complaints-page">
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

        <div className="admin-complaint-nav">
          <button className="notification-button">
            <Bell size={20} />
            <span>3</span>
          </button>

          <button className="admin-profile-button">
            <div>
              <User size={22} />
            </div>
            <p>
              Admin
              <small>Super Admin</small>
            </p>
            <ChevronDown size={16} />
          </button>
        </div>
      </nav>

      <main className="admin-complaints-main">
        <section className="complaints-hero-admin">
          <div>
            <h1>Manage Complaints</h1>
            <p>
              View, manage, and resolve complaints reported by students to
              ensure a safer campus.
            </p>
          </div>

          <div className="complaints-hero-art">
            <ShieldCheck size={82} />
          </div>
        </section>

        <section className="complaints-filter-card">
          <div className="complaints-search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search complaints..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>

          <div className="complaints-filter-group">
            <label>Category</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option>All Categories</option>
              <option>Harassment</option>
              <option>Physical Threat</option>
              <option>Verbal Abuse</option>
              <option>Inappropriate Behavior</option>
              <option>Stalking</option>
              <option>Poor Lighting</option>
              <option>Unsafe Route</option>
              <option>Transport Issue</option>
              <option>Hostel Issue</option>
            </select>
          </div>

          <div className="complaints-filter-group">
            <label>Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>All Status</option>
              <option>Pending</option>
              <option>In Progress</option>
              <option>Resolved</option>
            </select>
          </div>

          <div className="complaints-filter-group">
            <label>Anonymous</label>
            <select
              value={anonymousFilter}
              onChange={(e) => setAnonymousFilter(e.target.value)}
            >
              <option>All</option>
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>

          <div className="complaints-filter-group">
            <label>Date Range</label>
            <button className="date-range-button">
              <Calendar size={18} />
              Select date range
            </button>
          </div>

          <button className="export-button">
            <Download size={18} />
            Export
          </button>
        </section>

        <section className="complaints-content-grid">
          <div className="complaints-table-card">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Category</th>
                  <th>Location</th>
                  <th>Description</th>
                  <th>Anonymous</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="8" className="complaints-empty-text">
                      Loading complaints...
                    </td>
                  </tr>
                ) : filteredComplaints.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="complaints-empty-text">
                      No complaints found.
                    </td>
                  </tr>
                ) : (
                  filteredComplaints.slice(0, 5).map((complaint, index) => (
                    <tr key={complaint.id}>
                      <td>{index + 1}</td>

                      <td>
                        <div className="complaint-category-cell">
                          <div className="complaint-category-icon">
                            {getCategoryIcon(complaint.category)}
                          </div>
                          <span>{complaint.category}</span>
                        </div>
                      </td>

                      <td>
                        <div className="complaint-location-cell">
                          <MapPin size={17} />
                          <span>{complaint.location}</span>
                        </div>
                      </td>

                      <td className="complaint-description-cell">
                        {shortenText(complaint.description)}
                      </td>

                      <td>{complaint.anonymous}</td>

                      <td>
                        <span
                          className={`complaint-admin-status ${getStatusClass(
                            complaint.status
                          )}`}
                        >
                          <span></span>
                          {complaint.status}
                        </span>
                      </td>

                      <td>{formatDate(complaint.date)}</td>

                      <td>
                        <div className="complaint-action-cell">
                          <button className="complaint-view-button">
                            <Eye size={17} />
                            View
                          </button>

                          <button
                            className="complaint-menu-button"
                            onClick={() =>
                              setOpenMenu(
                                openMenu === complaint.id ? null : complaint.id
                              )
                            }
                          >
                            <ChevronDown size={18} />
                          </button>

                          {openMenu === complaint.id && (
                            <div className="complaint-dropdown-menu">
                              <button>
                                <Eye size={17} />
                                View Details
                              </button>

                              <button
                                onClick={() =>
                                  updateComplaintStatus(
                                    complaint.id,
                                    "In Progress"
                                  )
                                }
                              >
                                <RefreshCw size={17} />
                                Update Status
                              </button>

                              <button
                                onClick={() =>
                                  updateComplaintStatus(
                                    complaint.id,
                                    "Resolved"
                                  )
                                }
                              >
                                <CheckCircle size={17} />
                                Resolve Complaint
                              </button>

                              <button>
                                <Trash2 size={17} />
                                Delete
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

            <div className="complaint-admin-pagination">
              <p>
                Showing 1 to {Math.min(filteredComplaints.length, 5)} of{" "}
                {totalComplaints} complaints
              </p>

              <div>
                <button className="active-page">1</button>
                <button>2</button>
                <button>3</button>
                <span>...</span>
                <button>5</button>
                <button>
                  <ChevronRight size={17} />
                </button>
              </div>
            </div>
          </div>

          <aside className="complaint-overview-card">
            <div className="overview-heading">
              <BarChart3 size={26} />
              <h3>Complaint Overview</h3>
            </div>

            <div className="total-complaints-box">
              <div>
                <p>Total Complaints</p>
                <h2>{totalComplaints}</h2>
                <span>This Month</span>
              </div>

              <div>
                <FilePenLine size={30} />
              </div>
            </div>

            <h4>By Category</h4>

            <CategoryProgress
              icon={<Bell size={16} />}
              label="Harassment"
              value={harassmentCount}
              width="80%"
              pink
            />

            <CategoryProgress
              icon={<Users size={16} />}
              label="Physical Threat"
              value={physicalThreatCount}
              width="55%"
              purple
            />

            <CategoryProgress
              icon={<MessageCircle size={16} />}
              label="Verbal Abuse"
              value={verbalAbuseCount}
              width="44%"
              violet
            />

            <CategoryProgress
              icon={<Camera size={16} />}
              label="Inappropriate Behavior"
              value={inappropriateCount}
              width="44%"
              pink
            />

            <CategoryProgress
              icon={<Shield size={16} />}
              label="Stalking"
              value={stalkingCount}
              width="44%"
              purple
            />

            <button className="analytics-button">
              View Detailed Analytics
              <ChevronRight size={18} />
            </button>
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

function CategoryProgress({ icon, label, value, width, pink, purple, violet }) {
  let className = "category-line-fill";
  if (pink) className += " pink";
  if (purple) className += " purple";
  if (violet) className += " violet";

  return (
    <div className="category-progress">
      <div className="category-progress-top">
        <div>
          <span>{icon}</span>
          <p>{label}</p>
        </div>
        <strong>{value}</strong>
      </div>

      <div className="category-line">
        <div className={className} style={{ width }}></div>
      </div>
    </div>
  );
}

function getCategoryIcon(category) {
  if (category === "Harassment") return <Bell size={20} />;
  if (category === "Physical Threat") return <Users size={20} />;
  if (category === "Verbal Abuse") return <MessageCircle size={20} />;
  if (category === "Inappropriate Behavior") return <Camera size={20} />;
  if (category === "Stalking") return <Shield size={20} />;
  return <FilePenLine size={20} />;
}

function getStatusClass(status) {
  if (status === "Resolved") return "resolved";
  if (status === "In Progress") return "progress";
  return "pending";
}

function shortenText(text) {
  if (!text) return "No description";
  return text.length > 55 ? text.substring(0, 55) + "..." : text;
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

export default AdminComplaints;