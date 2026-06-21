import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Shield,
  ShieldCheck,
  Users,
  Lightbulb,
  FileText,
  Clock,
  CheckCircle,
  Bell,
  ClipboardEdit,
  FolderOpen,
  MessageCircle,
  AlertTriangle,
  ChevronRight,
  Mail,
} from "lucide-react";

import API from "../services/api";
import dashboardImage from "../assets/student-dashboard.png";

function StudentDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [activeSection, setActiveSection] = useState("home");
  const [myAlerts, setMyAlerts] = useState([]);
  const [myComplaints, setMyComplaints] = useState([]);
  const [statsLoading, setStatsLoading] = useState(true);

  const scrollToSection = (event, sectionId) => {
    event.preventDefault();

    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    const sectionIds = [
      "home",
      "features",
      "how-it-works",
      "resources",
      "about",
      "contact",
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);

        if (visibleEntry) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        root: null,
        rootMargin: "-35% 0px -55% 0px",
        threshold: 0.1,
      }
    );

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);

      if (section) {
        observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchMyReports = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setStatsLoading(false);
          return;
        }

        const [alertsResponse, complaintsResponse] = await Promise.all([
          API.get("/alerts/my"),
          API.get("/complaints/my"),
        ]);

        setMyAlerts(alertsResponse.data || []);
        setMyComplaints(complaintsResponse.data || []);
      } catch (error) {
        console.log("Failed to fetch student dashboard stats:", error.message);
      } finally {
        setStatsLoading(false);
      }
    };

    fetchMyReports();
  }, []);

  const allMyReports = [...myAlerts, ...myComplaints];

  const totalReports = allMyReports.length;

  const pendingReports = allMyReports.filter(
    (report) => report.status === "Pending"
  ).length;

  const inProgressReports = allMyReports.filter(
    (report) => report.status === "In Progress"
  ).length;

  const resolvedReports = allMyReports.filter(
    (report) => report.status === "Resolved"
  ).length;

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
          <a
            className={activeSection === "home" ? "active" : ""}
            href="#home"
            onClick={(event) => scrollToSection(event, "home")}
          >
            Home
          </a>

          <a
            className={activeSection === "features" ? "active" : ""}
            href="#features"
            onClick={(event) => scrollToSection(event, "features")}
          >
            Features
          </a>

          <a
            className={activeSection === "how-it-works" ? "active" : ""}
            href="#how-it-works"
            onClick={(event) => scrollToSection(event, "how-it-works")}
          >
            How It Works
          </a>

          <a
            className={activeSection === "resources" ? "active" : ""}
            href="#resources"
            onClick={(event) => scrollToSection(event, "resources")}
          >
            Resources
          </a>

          <a
            className={activeSection === "about" ? "active" : ""}
            href="#about"
            onClick={(event) => scrollToSection(event, "about")}
          >
            About Us
          </a>

          <a
            className={activeSection === "contact" ? "active" : ""}
            href="#contact"
            onClick={(event) => scrollToSection(event, "contact")}
          >
            Contact
          </a>
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
        <section className="student-welcome" id="home">
          <div>
            <h1>Welcome back, {user?.name || "Student"} 👋</h1>

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
            value={statsLoading ? "..." : totalReports}
            text="All time"
          />

          <StatCard
            icon={<Clock size={30} />}
            title="Pending Reports"
            value={statsLoading ? "..." : pendingReports}
            text="Awaiting review"
          />

          <StatCard
            icon={<AlertTriangle size={30} />}
            title="In Progress"
            value={statsLoading ? "..." : inProgressReports}
            text="Currently being handled"
          />

          <StatCard
            icon={<CheckCircle size={30} />}
            title="Resolved Reports"
            value={statsLoading ? "..." : resolvedReports}
            text="Successfully resolved"
          />
        </section>

        <section className="student-action-grid" id="features">
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

        <section className="student-lower-grid" id="how-it-works">
          <div className="recent-card">
            <div className="section-head">
              <h2>Recent Activity</h2>
            </div>

            <EmptyDashboardBlock
              title="No recent activity yet"
              text="Your submitted alerts and complaints will appear here after you create them."
            />
          </div>

          <div className="tips-column">
            <div className="tips-card">
              <div className="section-head">
                <h2>Safety Tips for You</h2>
              </div>

              <EmptyDashboardBlock
                title="Stay alert and aware"
                text="Use the emergency alert for urgent situations and submit complaints for safety concerns."
              />
            </div>

            <div className="alone-card">
              <div>
                <h2>You’re Not Alone</h2>
                <p>
                  SafeHer is designed to help students report issues and get
                  support through a safer campus workflow.
                </p>
              </div>

              <EmptyBadge>Support available</EmptyBadge>
            </div>
          </div>
        </section>

        <section className="dashboard-info-section" id="resources">
          <div className="section-head">
            <h2>Helpful Resources</h2>

            <Link to="/student/safety-assistant">
              Open Safety Assistant <ChevronRight size={18} />
            </Link>
          </div>

          <div className="dashboard-info-grid">
            <div className="info-card">
              <div className="info-card-icon pink">
                <Bell size={24} />
              </div>

              <h3>Emergency Alert</h3>

              <p>
                Send an instant alert when you feel unsafe so campus support can
                respond quickly.
              </p>

              <Link to="/student/emergency-alert">Open Alert Form</Link>
            </div>

            <div className="info-card">
              <div className="info-card-icon purple">
                <MessageCircle size={24} />
              </div>

              <h3>Safety Assistant</h3>

              <p>
                Ask questions about staying safe, reporting incidents, or what
                to do in urgent situations.
              </p>

              <Link to="/student/safety-assistant">Ask the Assistant</Link>
            </div>

            <div className="info-card">
              <div className="info-card-icon green">
                <FileText size={24} />
              </div>

              <h3>My Reports</h3>

              <p>
                Review all of your alerts and complaints and track their current
                progress.
              </p>

              <Link to="/student/my-reports">View Reports</Link>
            </div>
          </div>
        </section>

        <section className="dashboard-info-section about-section" id="about">
          <div className="section-head">
            <h2>About SafeHer</h2>

            <a href="#contact">
              Need help? Contact us <ChevronRight size={18} />
            </a>
          </div>

          <div className="about-grid">
            <div className="about-card">
              <Shield size={24} />

              <h3>Our Mission</h3>

              <p>
                SafeHer helps female students report issues, request help, and
                stay informed with a simple campus safety workflow.
              </p>
            </div>

            <div className="about-card">
              <Users size={24} />

              <h3>Community Support</h3>

              <p>
                We focus on quick reporting, transparent status updates, and
                safer daily decisions for students and staff.
              </p>
            </div>

            <div className="about-card highlight">
              <Lightbulb size={24} />

              <h3>What You Can Do</h3>

              <p>
                Use the dashboard to send alerts, submit complaints, view your
                reports, and get safety guidance whenever you need it.
              </p>
            </div>
          </div>
        </section>

        <section className="dashboard-info-section contact-section" id="contact">
          <div className="section-head">
            <h2>Contact & Support</h2>

            <a href="mailto:support@safeher.app">
              support@safeher.app <ChevronRight size={18} />
            </a>
          </div>

          <div className="contact-grid">
            <div className="contact-card">
              <Mail size={24} />

              <h3>Email Support</h3>

              <p>Send non-urgent questions or feedback to our support team.</p>

              <a href="mailto:support@safeher.app">support@safeher.app</a>
            </div>

            <div className="contact-card">
              <Bell size={24} />

              <h3>Campus Safety Desk</h3>

              <p>
                For urgent matters, contact campus security or use the emergency
                alert feature right away.
              </p>

              <Link to="/student/emergency-alert">Go to Emergency Alert</Link>
            </div>

            <div className="contact-card">
              <AlertTriangle size={24} />

              <h3>Response Times</h3>

              <p>
                Emergency alerts should be used immediately. Complaint updates
                are visible in My Reports after admin review.
              </p>

              <Link to="/student/my-reports">Check My Reports</Link>
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
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#resources">Resources</a>
        </div>

        <div className="footer-column">
          <h3>Useful Links</h3>
          <a href="#about">About Us</a>
          <a href="#contact">Contact</a>
          <Link to="/student/safety-assistant">Safety Assistant</Link>
          <Link to="/student/my-reports">My Reports</Link>
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

function EmptyDashboardBlock({ title, text }) {
  return (
    <div className="empty-dashboard-block">
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

function EmptyBadge({ children }) {
  return <div className="empty-badge">{children}</div>;
}

export default StudentDashboard;