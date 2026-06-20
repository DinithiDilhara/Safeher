import { Link } from "react-router-dom";
import { useState } from "react";
import {
  ShieldCheck,
  MessageCircle,
  Bot,
  User,
  Send,
  Lock,
  Phone,
  Bell,
  Shield,
  Ambulance,
  HeartPulse,
  Lightbulb,
  FileText,
  Users,
  Map,
  ChevronRight,
  Mail,
} from "lucide-react";

import assistantImage from "../assets/student-dashboard.png";

function SafetyAssistant() {
  const [message, setMessage] = useState("");

  const [chatMessages, setChatMessages] = useState([
    {
      sender: "user",
      text: "What should I do if I feel unsafe at night?",
      time: "10:12 AM",
    },
    {
      sender: "bot",
      text: "If you feel unsafe at night, try to stay in well-lit and populated areas. Share your live location with a trusted friend or use the SafeHer emergency alert feature. You can also contact campus security immediately.",
      time: "10:12 AM",
    },
    {
      sender: "user",
      text: "How can I report anonymously?",
      time: "10:13 AM",
    },
    {
      sender: "bot",
      text: "You can use the Anonymous Complaint feature to report incidents without sharing your identity. Go to the complaint section and submit your report confidentially.",
      time: "10:13 AM",
    },
    {
      sender: "user",
      text: "Who should I contact in an emergency?",
      time: "10:14 AM",
    },
    {
      sender: "bot",
      text: "In an emergency, contact campus security or the local helpline immediately. You can also use the emergency alert button in the app to share your location.",
      time: "10:14 AM",
    },
    {
      sender: "user",
      text: "How do I stay safe while traveling back to hostel?",
      time: "10:15 AM",
    },
    {
      sender: "bot",
      text: "Plan your route in advance, use well-lit and busy roads, avoid isolated areas, and share your trip details with a trusted friend.",
      time: "10:16 AM",
    },
  ]);

  const suggestedQuestions = [
    "What should I do if I feel unsafe at night?",
    "How can I report anonymously?",
    "Who should I contact in an emergency?",
    "How do I stay safe while traveling back to hostel?",
    "What are my rights on campus?",
  ];

  const getBotReply = (question) => {
    const lower = question.toLowerCase();

    if (lower.includes("unsafe") || lower.includes("night")) {
      return "Stay in well-lit and populated areas. Share your live location with someone you trust and use the Emergency Alert feature if you need immediate help.";
    }

    if (lower.includes("anonymous") || lower.includes("report")) {
      return "You can report anonymously using the Anonymous Complaint page. Your identity will remain protected while your complaint is reviewed.";
    }

    if (lower.includes("emergency") || lower.includes("contact")) {
      return "Contact campus security first. If the situation is urgent, use the Emergency Alert feature to notify the responsible team quickly.";
    }

    if (lower.includes("hostel") || lower.includes("travel")) {
      return "Use safe routes, avoid isolated places, travel with friends when possible, and share your location with someone you trust.";
    }

    if (lower.includes("rights")) {
      return "You have the right to feel safe, respected, and supported on campus. Report any harassment, unsafe area, or threatening behavior.";
    }

    return "I can help with campus safety, emergency alerts, anonymous reporting, and safe travel guidance. Please ask your question clearly.";
  };

  const handleSend = () => {
    if (!message.trim()) return;

    const currentTime = new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const userMessage = {
      sender: "user",
      text: message,
      time: currentTime,
    };

    const botMessage = {
      sender: "bot",
      text: getBotReply(message),
      time: currentTime,
    };

    setChatMessages([...chatMessages, userMessage, botMessage]);
    setMessage("");
  };

  const handleSuggestedQuestion = (question) => {
    const currentTime = new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const userMessage = {
      sender: "user",
      text: question,
      time: currentTime,
    };

    const botMessage = {
      sender: "bot",
      text: getBotReply(question),
      time: currentTime,
    };

    setChatMessages([...chatMessages, userMessage, botMessage]);
  };

  return (
    <div className="safety-assistant-page">
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

      <main className="assistant-main">
        <Link to="/student/dashboard" className="back-dashboard-btn">
             ←     Back to Dashboard
        </Link>
        <section className="assistant-hero">
          <div className="assistant-heading">
            <div className="assistant-icon-box">
              <MessageCircle size={48} />
            </div>

            <div>
              <h1>Safety Assistant</h1>
              <p>
                Ask questions and get guidance for campus safety, reporting, and
                emergency support.
              </p>
            </div>
          </div>

          <img src={assistantImage} alt="Safety assistant illustration" />
        </section>

        <section className="assistant-content-grid">
          <div className="chat-card">
            <div className="chat-messages">
              {chatMessages.map((chat, index) => (
                <div
                  key={index}
                  className={`chat-row ${
                    chat.sender === "user" ? "user-chat" : "bot-chat"
                  }`}
                >
                  {chat.sender === "bot" && (
                    <div className="chat-avatar bot-avatar">
                      <Bot size={24} />
                    </div>
                  )}

                  <div className="chat-bubble">
                    <p>{chat.text}</p>
                    <span>{chat.time}</span>
                  </div>

                  {chat.sender === "user" && (
                    <div className="chat-avatar user-avatar">
                      <User size={22} />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="chat-input-area">
              <input
                type="text"
                placeholder="Type your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSend();
                }}
              />

              <button onClick={handleSend}>
                <Send size={24} />
              </button>
            </div>

            <p className="chat-secure-text">
              <Lock size={14} />
              Your conversations are private and secure.
            </p>
          </div>

          <aside className="assistant-sidebar">
            <div className="suggested-card">
              <h3>Suggested Questions</h3>

              {suggestedQuestions.map((question) => (
                <button
                  key={question}
                  onClick={() => handleSuggestedQuestion(question)}
                >
                  <MessageCircle size={17} />
                  <span>{question}</span>
                  <ChevronRight size={17} />
                </button>
              ))}
            </div>

            <div className="emergency-contacts-card">
              <div className="assistant-card-head">
                <h3>Emergency Contacts</h3>
                <a>View All</a>
              </div>

              <ContactItem
                icon={<Shield size={20} />}
                title="Campus Security"
                number="1800-123-4567"
              />

              <ContactItem
                icon={<Bell size={20} />}
                title="Women Helpline (24/7)"
                number="1091"
                pink
              />

              <ContactItem
                icon={<Phone size={20} />}
                title="Police Emergency"
                number="100"
                orange
              />

              <ContactItem
                icon={<Ambulance size={20} />}
                title="Ambulance"
                number="108"
                green
              />
            </div>

            <div className="quick-resources-card">
              <div className="assistant-card-head">
                <h3>Quick Safety Resources</h3>
                <a>View All</a>
              </div>

              <ResourceItem
                icon={<Lightbulb size={20} />}
                title="Safety Tips"
                text="Best practices for everyday safety"
                pink
              />

              <ResourceItem
                icon={<FileText size={20} />}
                title="Know Your Rights"
                text="Important information for students"
              />

              <ResourceItem
                icon={<Users size={20} />}
                title="Campus Support Services"
                text="Counselling, helplines & more"
                green
              />

              <ResourceItem
                icon={<Map size={20} />}
                title="Travel Safety Guide"
                text="Safe travel tips and checklists"
                orange
              />
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

function ContactItem({ icon, title, number, pink, orange, green }) {
  let iconClass = "contact-icon";

  if (pink) iconClass += " pink";
  if (orange) iconClass += " orange";
  if (green) iconClass += " green";

  return (
    <div className="contact-item">
      <div className={iconClass}>{icon}</div>

      <div>
        <h4>{title}</h4>
        <p>{number}</p>
      </div>

      <button>
        <Phone size={17} />
      </button>
    </div>
  );
}

function ResourceItem({ icon, title, text, pink, green, orange }) {
  let iconClass = "resource-icon";

  if (pink) iconClass += " pink";
  if (green) iconClass += " green";
  if (orange) iconClass += " orange";

  return (
    <div className="resource-item">
      <div className={iconClass}>{icon}</div>

      <div>
        <h4>{title}</h4>
        <p>{text}</p>
      </div>

      <ChevronRight size={17} />
    </div>
  );
}

export default SafetyAssistant;