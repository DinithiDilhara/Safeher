import { Link } from "react-router-dom";
import {
  ShieldCheck,
  FileText,
  Clock,
  CheckCircle,
  Lightbulb,
  Bell,
  ClipboardEdit,
  FolderOpen,
  MessageCircle,
  User,
  AlertTriangle,
  Shield,
  Users,
  Calendar,
  ChevronRight,
  Mail,
} from "lucide-react";

import dashboardImage from "../assets/student-dashboard.png";

function StudentDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="student-dashboard-page">
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
            Login
          </Link>
          <Link to="/register" className="register-button">
            Register
          </Link>
        </div>
      </nav>

      <main className="student-dashboard-main">
        <section className="student-welcome">
          <div>
            <h1>Welcome back, {user?.name || "Test Student"} 👋</h1>
            <p>
              Your safety matters. We’re here to support you and keep our campus
              community safe.
            </p>
          </div>

          <img
            src={dashboardImage}
            alt="Student safety illustration"
            className="dashboard-hero-img"
          />
        </section>

        <section className="student-stats-grid">
          <StatCard
            icon={<FileText size={30} />}
            title="Total Reports"
            value="12"
            text="All time"
          />

          <StatCard
            icon={<Clock size={30} />}
            title="Pending Reports"
            value="3"
            text="Awaiting review"
          />

          <StatCard
            icon={<CheckCircle size={30} />}
            title="Resolved Reports"
            value="9"
            text="Successfully resolved"
          />

          <StatCard
            icon={<Lightbulb size={30} />}
            title="Safety Tips"
            value="18"
            text="Explore tips"
          />
        </section>

        <section className="student-action-grid">
          <ActionCard
            to="/student/emergency-alert"
            icon={<Bell size={34} />}
            title="Send Emergency Alert"
            text="Instantly alert authorities and trusted contacts in any danger."
            pink
          />

          <ActionCard
            to="/student/complaint"
            icon={<ClipboardEdit size={34} />}
            title="Submit Anonymous Complaint"
            text="Report incidents confidentially and help create a safer campus."
          />

          <ActionCard
            to="/student/my-reports"
            icon={<FolderOpen size={34} />}
            title="My Reports"
            text="View and track your submitted reports."
          />

          <ActionCard
            to="/student/safety-assistant"
            icon={<MessageCircle size={34} />}
            title="Safety Assistant"
            text="Get guidance and answers to safety-related questions."
          />
        </section>

        <section className="student-lower-grid">
          <div className="recent-card">
            <div className="section-head">
              <h2>Recent Activity</h2>
              <Link to="/student/my-reports">
                View All Reports <ChevronRight size={18} />
              </Link>
            </div>

            <ActivityItem
              icon={<User size={22} />}
              title="Harassment Incident"
              location="Academic Block A"
              date="May 26, 2025 • 10:30 AM"
              status="Under Review"
              statusClass="review"
            />

            <ActivityItem
              icon={<AlertTriangle size={22} />}
              title="Unsafe Lighting"
              location="Parking Area"
              date="May 24, 2025 • 08:15 PM"
              status="Pending"
              statusClass="pending"
            />

            <ActivityItem
              icon={<Shield size={22} />}
              title="Inappropriate Behavior"
              location="Library"
              date="May 20, 2025 • 02:45 PM"
              status="Resolved"
              statusClass="resolved"
            />

            <ActivityItem
              icon={<Users size={22} />}
              title="Suspicious Activity"
              location="Hostel Gate"
              date="May 18, 2025 • 09:05 PM"
              status="Under Review"
              statusClass="review"
            />
          </div>

          <div className="tips-column">
            <div className="tips-card">
              <div className="section-head">
                <h2>Safety Tips for You</h2>
                <a>
                  View All Tips <ChevronRight size={18} />
                </a>
              </div>

              <TipItem
                icon={<Shield size={22} />}
                title="Stay Aware"
                text="Be aware of your surroundings, especially in unfamiliar areas."
              />

              <TipItem
                icon={<Bell size={22} />}
                title="Keep Emergency Contacts Handy"
                text="Save important numbers and share your location when needed."
              />

              <TipItem
                icon={<Users size={22} />}
                title="Look Out for Each Other"
                text="Report concerns and support your campus community."
              />
            </div>

            <div className="alone-card">
              <div>
                <h2>You’re Not Alone</h2>
                <p>
                  We’re stronger together. Your voice helps build a safer campus
                  for everyone.
                </p>
              </div>
              <div className="mini-students">👩‍🎓👩‍🎓👩‍🎓</div>
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
            Your Safety. Our Priority.
          </p>
          <p>© 2026 SafeHer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function StatCard({ icon, title, value, text }) {
  return (
    <div className="student-stat-card">
      <div className="stat-icon">{icon}</div>
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

function ActionCard({ to, icon, title, text, pink }) {
  return (
    <Link to={to} className="student-action-card">
      <div className={`action-icon ${pink ? "pink" : ""}`}>{icon}</div>
      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
      <span>
        <ChevronRight size={18} />
      </span>
    </Link>
  );
}

function ActivityItem({ icon, title, location, date, status, statusClass }) {
  return (
    <div className="activity-item">
      <div className="activity-icon">{icon}</div>

      <div className="activity-info">
        <h4>{title}</h4>
        <p>{location}</p>
      </div>

      <div className="activity-date">
        <Calendar size={16} />
        {date}
      </div>

      <span className={`status-pill ${statusClass}`}>{status}</span>
    </div>
  );
}

function TipItem({ icon, title, text }) {
  return (
    <div className="tip-item">
      <div className="tip-icon">{icon}</div>

      <div>
        <h4>{title}</h4>
        <p>{text}</p>
      </div>

      <ChevronRight size={18} />
    </div>
  );
}

export default StudentDashboard;