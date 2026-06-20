import { Link } from "react-router-dom";
import { useState } from "react";
import {
  ShieldCheck,
  FilePenLine,
  MapPin,
  Lock,
  Send,
  Lightbulb,
  User,
  Bus,
  Building2,
  Upload,
  Heart,
  Shield,
  Mail,
} from "lucide-react";

import API from "../services/api";
import complaintImage from "../assets/student-dashboard.png";

function ComplaintForm() {
  const [formData, setFormData] = useState({
    complaintType: "",
    location: "",
    description: "",
    anonymous: true,
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const quickExamples = [
    { label: "Poor Lighting", icon: <Lightbulb size={16} /> },
    { label: "Harassment", icon: <User size={16} /> },
    { label: "Unsafe Route", icon: <MapPin size={16} /> },
    { label: "Hostel Issue", icon: <Building2 size={16} /> },
    { label: "Transport Issue", icon: <Bus size={16} /> },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleQuickExample = (value) => {
    setFormData({
      ...formData,
      complaintType: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    setLoading(true);

    try {
      await API.post("/complaints", {
        category: formData.complaintType,
        location: formData.location,
        description: formData.description,
        anonymous: formData.anonymous,
      });

      setSuccess("Complaint submitted successfully!");

      setFormData({
        complaintType: "",
        location: "",
        description: "",
        anonymous: true,
      });
    } catch (err) {
      setError("Failed to submit complaint. Please check backend connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="complaint-page">
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

      <main className="complaint-main">
        <div className="complaint-left-wrapper">
          <Link to="/student/dashboard" className="back-dashboard-btn">
            ← Back to Dashboard
          </Link>

          <section className="complaint-form-card">
            <div className="complaint-heading">
              <div className="complaint-icon-box">
                <FilePenLine size={45} />
              </div>

              <div>
                <h1>Anonymous Complaint</h1>
                <p>
                  Share what happened. Your identity is protected and your
                  report helps build a safer campus for everyone.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="complaint-group">
                <label>
                  Category <span>*</span>
                </label>

                <div className="complaint-input">
                  <FilePenLine size={18} />
                  <select
                    name="complaintType"
                    value={formData.complaintType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="Poor Lighting">Poor Lighting</option>
                    <option value="Harassment">Harassment</option>
                    <option value="Unsafe Route">Unsafe Route</option>
                    <option value="Hostel Issue">Hostel Issue</option>
                    <option value="Transport Issue">Transport Issue</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <p className="quick-title">Quick examples</p>

              <div className="quick-examples">
                {quickExamples.map((item) => (
                  <button
                    type="button"
                    key={item.label}
                    onClick={() => handleQuickExample(item.label)}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="complaint-group">
                <label>
                  Location <span>*</span>
                </label>

                <div className="complaint-input">
                  <MapPin size={18} />
                  <input
                    type="text"
                    name="location"
                    placeholder="Enter location, e.g., Library, Main Gate, Hostel Block A"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="complaint-group">
                <label>
                  Description <span>*</span>
                </label>

                <div className="complaint-textarea-box">
                  <FilePenLine size={20} />
                  <textarea
                    name="description"
                    placeholder="Describe what happened in detail. Include date, time and any relevant information that can help."
                    value={formData.description}
                    onChange={handleChange}
                    maxLength="1000"
                    required
                  ></textarea>
                </div>

                <p className="complaint-count">
                  {formData.description.length}/1000
                </p>
              </div>

              <div className="complaint-options">
                <div className="anonymous-box">
                  <div className="option-icon">
                    <Shield size={22} />
                  </div>

                  <div>
                    <h4>Anonymous Submission</h4>
                    <p>Your identity will remain completely anonymous.</p>
                  </div>

                  <label className="switch">
                    <input
                      type="checkbox"
                      name="anonymous"
                      checked={formData.anonymous}
                      onChange={handleChange}
                    />
                    <span></span>
                  </label>
                </div>

                <div className="upload-box">
                  <div>
                    <h4>
                      Upload Evidence <span>(Optional)</span>
                    </h4>
                    <p>
                      Add photos, videos or documents to support your report.
                    </p>
                  </div>

                  <button type="button">
                    <Upload size={20} />
                    Upload Files
                    <small>PNG, JPG, MP4, PDF</small>
                  </button>
                </div>
              </div>

              {success && <p className="success-message">{success}</p>}
              {error && <p className="error-message">{error}</p>}

              <button type="submit" className="submit-complaint-button">
                {loading ? "Submitting..." : "Submit Complaint"}
                <Send size={20} />
              </button>

              <p className="complaint-secure">
                <Lock size={15} />
                Your report is secure and confidential. We never share your
                identity.
              </p>
            </form>
          </section>
        </div>

        <section className="complaint-right-card">
          <img src={complaintImage} alt="Anonymous complaint support" />

          <div className="voice-card">
            <h2>
              Your <span>voice</span> matters
            </h2>
            <p>Report safely and confidentially.</p>

            <VoiceItem
              icon={<Lock size={22} />}
              title="100% Confidential"
              text="Your identity is never revealed."
            />

            <VoiceItem
              icon={<Shield size={22} />}
              title="Actionable Reports"
              text="Your report helps us take action."
            />

            <VoiceItem
              icon={<Heart size={22} />}
              title="Safer Together"
              text="Every report brings change and creates a safer campus."
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

function VoiceItem({ icon, title, text }) {
  return (
    <div className="voice-item">
      <div className="voice-icon">{icon}</div>
      <div>
        <h4>{title}</h4>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default ComplaintForm;