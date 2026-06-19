import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import EmergencyAlert from "./pages/EmergencyAlert";
import ComplaintForm from "./pages/ComplaintForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/emergency-alert" element={<EmergencyAlert />} />
        <Route path="/student/complaint" element={<ComplaintForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;