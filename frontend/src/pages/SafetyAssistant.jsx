import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProtectedRoute from "../components/ProtectedRoute";

export default function SafetyAssistant() {
  const tips = [
    {
      title: "Be Aware of Your Surroundings",
      description: "Always stay alert and trust your instincts."
    },
    {
      title: "Travel in Groups",
      description: "Whenever possible, avoid walking alone, especially at night."
    },
    {
      title: "Share Your Location",
      description: "Let trusted friends or family know where you are."
    },
    {
      title: "Use Emergency Buttons",
      description: "Know the location of emergency buttons on campus."
    }
  ];

  return (
    <ProtectedRoute>
      <div>
        <Navbar />
        <main className="assistant-main">
          <div className="assistant-container">
            <h2>Safety Tips & Assistant</h2>
            
            <div className="tips-grid">
              {tips.map((tip, index) => (
                <div key={index} className="tip-card">
                  <h3>{tip.title}</h3>
                  <p>{tip.description}</p>
                </div>
              ))}
            </div>

            <div className="emergency-contacts">
              <h3>Emergency Contacts</h3>
              <ul>
                <li>Campus Security: 911</li>
                <li>Local Police: 911</li>
                <li>Crisis Hotline: 1-800-273-8255</li>
              </ul>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}
