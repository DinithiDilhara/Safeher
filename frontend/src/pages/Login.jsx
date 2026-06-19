import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  Mail,
  Lock,
  EyeOff,
  ArrowRight,
  User,
  UserPlus,
} from "lucide-react";

import API from "../services/api";
import loginImage from "../assets/login-safeher.png";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await API.post("/auth/login", formData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      if (res.data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/student/dashboard");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-page">
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
            <UserPlus size={18} />
            Register
          </Link>
        </div>
      </nav>

      <main className="login-main">
        <section className="login-card">
          <div className="auth-logo-center">
            <div className="logo-box small">
              <ShieldCheck size={24} />
            </div>
            <h2>
              Safe<span>Her</span>
            </h2>
          </div>

          <h1>Welcome Back</h1>

          <p className="auth-subtitle">
            Log in to your account and continue building a safer campus together.
          </p>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="auth-group">
              <label>Email</label>

              <div className="auth-input">
                <Mail size={20} />
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="auth-group">
              <label>Password</label>

              <div className="auth-input">
                <Lock size={20} />
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <EyeOff size={18} />
              </div>
            </div>

            <div className="auth-row">
              <label className="remember">
                <input type="checkbox" />
                Remember me
              </label>

              <a className="forgot">Forgot Password?</a>
            </div>

            <button type="submit" className="auth-submit">
              Login <ArrowRight size={20} />
            </button>
          </form>

          <div className="divider">
            <span></span>
            <p>or continue with</p>
            <span></span>
          </div>

          <div className="social-login">
            <button type="button">G&nbsp;&nbsp;Continue with Google</button>
            <button type="button">&nbsp;&nbsp;Continue with Apple</button>
          </div>

          <p className="auth-bottom">
            Don’t have an account? <Link to="/register">Register</Link>
          </p>
        </section>

        <section className="login-illustration-box">
          <img
            src={loginImage}
            alt="SafeHer safety illustration"
            className="login-side-image"
          />
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

export default Login;