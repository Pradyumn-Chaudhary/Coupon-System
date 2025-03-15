import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ClaimCoupon from "./pages/ClaimCoupon";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ClaimCoupon />} /> {/* User Claim Page */}
        <Route path="/login" element={<AdminLogin />} /> {/* Admin Login */}
        <Route path="/dashboard" element={<AdminDashboard />} /> {/* Admin Panel */}
        <Route path="/claim-history" element={<ClaimHistory />} /> {/* View Claim History */}
        <Route path="*" element={<NotFound />} /> {/* 404 Page */}
      </Routes>
    </Router>
  );
}

export default App;
