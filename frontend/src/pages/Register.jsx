import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  ShieldCheck,
  User,
  Mail,
  Lock,
  Building2,
  GraduationCap,
  Phone,
  Eye,
} from "lucide-react";

import API from "../services/api";
import registerImage from "../assets/hero-safeher.png";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
    year: "",
    emergencyContact: "",
    role: "student",
  });

  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!agree) {
      setError("Please agree to the terms and conditions.");
      return;
    }

    setLoading(true);

    try {
      await API.post("/auth/register", formData);

      setSuccess("Account created successfully! Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
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

      <main className="register-main">
        <section className="register-left-art">
          <img src={registerImage} alt="SafeHer students" />
        </section>

        <section className="register-form-card">
          <div className="register-logo">
            <div className="logo-box">
              <ShieldCheck size={28} />
            </div>
            <h2>
              Safe<span>Her</span>
            </h2>
          </div>

          <h1>Create Your Account</h1>
          <p>Join SafeHer and help build a safer campus for everyone.</p>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <form onSubmit={handleRegister}>
            <div className="register-group">
              <label>Full Name</label>
              <div className="register-input">
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

            <div className="register-group">
              <label>Email</label>
              <div className="register-input">
                <Mail size={18} />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="register-group">
              <label>Password</label>
              <div className="register-input">
                <Lock size={18} />
                <input
                  type="password"
                  name="password"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <Eye size={18} />
              </div>
            </div>

            <div className="register-two-cols">
              <div className="register-group">
                <label>Department</label>
                <div className="register-input">
                  <Building2 size={18} />
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select your department</option>
                    <option value="Mechanical">Mechanical</option>
                    <option value="Computer">Computer</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Civil">Civil</option>
                    <option value="Administration">Administration</option>
                  </select>
                </div>
              </div>

              <div className="register-group">
                <label>Year</label>
                <div className="register-input">
                  <GraduationCap size={18} />
                  <select
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select your year</option>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="register-group">
              <label>Emergency Contact</label>
              <div className="register-input">
                <Phone size={18} />
                <input
                  type="text"
                  name="emergencyContact"
                  placeholder="Enter emergency contact number"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <label className="terms-row">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
              />
              <span>
                I agree to the <b>Terms & Conditions</b> and{" "}
                <b>Privacy Policy</b>.
              </span>
            </label>

            <button type="submit" className="register-submit-button">
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <p className="login-redirect">
            Already have an account? <Link to="/login">Login</Link>
          </p>
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

export default Register;