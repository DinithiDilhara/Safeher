import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import EmergencyAlert from "./pages/EmergencyAlert";
import ComplaintForm from "./pages/ComplaintForm";
import MyReports from "./pages/MyReports";
import AdminDashboard from "./pages/AdminDashboard";
import AdminAlerts from "./pages/AdminAlerts";
import AdminComplaints from "./pages/AdminComplaints";
import SafetyAssistant from "./pages/SafetyAssistant";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/emergency-alert" element={<EmergencyAlert />} />
        <Route path="/student/complaint" element={<ComplaintForm />} />
        <Route path="/student/my-reports" element={<MyReports />} />
        <Route path="/student/safety-assistant" element={<SafetyAssistant />} />

        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/alerts" element={<AdminAlerts />} />
        <Route path="/admin/complaints" element={<AdminComplaints />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;