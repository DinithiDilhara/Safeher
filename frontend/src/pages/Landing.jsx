import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Bell,
  FileText,
  MonitorCheck,
  ArrowRight,
  User,
  UserPlus,
} from "lucide-react";

import heroImage from "../assets/hero-safeher.png";

function Landing() {
  return (
    <div className="landing-page">
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
          <a className="active" href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#how">How It Works</a>
          <a href="#resources">Resources</a>
          <a href="#about">About Us</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="nav-buttons">
          <Link to="/login" className="login-button">
            <User size={18} />
            Login
          </Link>

          <Link to="/register" className="register-button">
            <UserPlus size={18} />
            Register
          </Link>
        </div>
      </nav>

      <main className="hero" id="home">
        <section className="hero-text">
          <h1>
            Safer Campus <br />
            Support for <br />
            <span>Female Students</span>
          </h1>

          <p>
            SafeHer is your trusted companion for a safer campus experience.
            Report incidents, get help, and access support—anytime, anywhere.
          </p>

          <div className="hero-actions">
            <Link to="/register" className="main-button">
              Get Started <ArrowRight size={20} />
            </Link>

            <a href="#features" className="outline-button">
              Learn More <ArrowRight size={20} />
            </a>
          </div>
        </section>

        <section className="hero-image-area">
          <img src={heroImage} alt="SafeHer campus safety illustration" />
        </section>
      </main>

      <section className="features" id="features">
        <FeatureCard
          icon={<Bell size={42} />}
          title="Emergency Alert"
          text="Instantly alert authorities and trusted contacts in any danger."
          type="pink"
        />

        <FeatureCard
          icon={<FileText size={42} />}
          title="Anonymous Complaint"
          text="Report incidents confidentially and help create a safer campus."
          type="purple"
        />

        <FeatureCard
          icon={<MonitorCheck size={42} />}
          title="Admin Monitoring"
          text="Real-time monitoring and action by campus authorities."
          type="purple"
        />
      </section>

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
            <span>@</span>
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

function FeatureCard({ icon, title, text, type }) {
  return (
    <div className="feature-card">
      <div className={`feature-icon ${type}`}>{icon}</div>

      <div className="feature-content">
        <h3>{title}</h3>
        <p>{text}</p>
      </div>

      <div className="arrow-circle">
        <ArrowRight size={20} />
      </div>
    </div>
  );
}

export default Landing;