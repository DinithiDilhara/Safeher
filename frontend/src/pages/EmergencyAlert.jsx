import { Link } from "react-router-dom";
import { useState } from "react";
import {
  ShieldCheck,
  AlertTriangle,
  User,
  MapPin,
  Phone,
  Target,
  Siren,
  Lock,
  Zap,
  Shield,
  Users,
  Mail,
} from "lucide-react";

import API from "../services/api";
import alertImage from "../assets/student-dashboard.png";

function EmergencyAlert() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    name: user?.name || "",
    emergencyType: "",
    location: "",
    message: "",
    trustedContact: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUseLocation = () => {
    setFormData({
      ...formData,
      location: "Current location shared",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    setLoading(true);

    try {
      await API.post("/alerts", {
        name: formData.name,
        emergencyType: formData.emergencyType,
        location: formData.location,
        message: formData.message,
        trustedContact: formData.trustedContact,
      });

      setSuccess("Emergency alert sent successfully!");

      setFormData({
        name: user?.name || "",
        emergencyType: "",
        location: "",
        message: "",
        trustedContact: "",
      });
    } catch (err) {
      setError("Failed to send alert. Please check backend connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="emergency-page">
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

      <main className="emergency-main">
        <section className="emergency-left">
          <Link to="/student/dashboard" className="back-link">
            ← Back to Dashboard
          </Link>

          <div className="emergency-title-row">
            <div className="alert-icon-box">
              <AlertTriangle size={38} />
            </div>

            <h1>
              Emergency <span>Alert</span>
            </h1>
          </div>

          <p className="emergency-subtitle">
            Quickly notify campus authorities and trusted contacts. Your safety
            is our priority.
          </p>

          <form className="emergency-form-card" onSubmit={handleSubmit}>
            <div className="form-two-columns">
              <div className="form-group">
                <label>Student Name</label>
                <div className="input-box">
                  <User size={18} />
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Emergency Type</label>
                <div className="input-box">
                  <AlertTriangle size={18} />
                  <select
                    name="emergencyType"
                    value={formData.emergencyType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select emergency type</option>
                    <option value="Harassment">Harassment</option>
                    <option value="Unsafe Area">Unsafe Area</option>
                    <option value="Medical Emergency">Medical Emergency</option>
                    <option value="Suspicious Activity">
                      Suspicious Activity
                    </option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Current Location</label>
              <div className="location-row">
                <div className="input-box location-input">
                  <MapPin size={18} />
                  <input
                    type="text"
                    name="location"
                    placeholder="Enter your current location, e.g., Library, Hostel Block A"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  type="button"
                  className="use-location-button"
                  onClick={handleUseLocation}
                >
                  <Target size={18} />
                  Use My Location
                </button>
              </div>
            </div>

            <div className="form-group">
              <label>Short Message / Description</label>
              <textarea
                name="message"
                placeholder="Describe what's happening. Include any important details."
                value={formData.message}
                onChange={handleChange}
                maxLength="500"
                required
              ></textarea>
              <p className="char-count">{formData.message.length}/500</p>
            </div>

            <div className="form-group">
              <label>Trusted Contact</label>
              <div className="input-box">
                <Phone size={18} />
                <input
                  type="text"
                  name="trustedContact"
                  placeholder="Enter trusted contact number"
                  value={formData.trustedContact}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="checkbox-row">
              <input type="checkbox" defaultChecked />
              <span>Share my live location with campus authorities</span>
              <small>(Optional)</small>
            </div>

            {success && <p className="success-message">{success}</p>}
            {error && <p className="error-message">{error}</p>}

            <button type="submit" className="send-alert-button">
              <Siren size={22} />
              {loading ? "Sending..." : "Send Alert Now"}
            </button>

            <p className="secure-text">
              <Lock size={15} />
              Your information is secure and confidential.
            </p>
          </form>
        </section>

        <section className="emergency-right">
          <img src={alertImage} alt="Emergency support" />

          <div className="support-box">
            <h2>We’re here for you</h2>
            <p>Help is just a click away.</p>

            <SupportItem
              icon={<Zap size={24} />}
              title="Fast Campus Response"
              text="Alerts are sent instantly to campus safety teams for immediate action."
              pink
            />

            <SupportItem
              icon={<Shield size={24} />}
              title="Your Safety, Our Priority"
              text="Every alert is handled with care and complete confidentiality."
            />

            <SupportItem
              icon={<Users size={24} />}
              title="Stronger Together"
              text="Your alert helps create a safer and more supportive campus."
            />
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

function SupportItem({ icon, title, text, pink }) {
  return (
    <div className="support-item">
      <div className={`support-icon ${pink ? "pink" : ""}`}>{icon}</div>
      <div>
        <h4>{title}</h4>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default EmergencyAlert;