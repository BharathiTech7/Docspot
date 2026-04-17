import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/common/Home";
import Login from "./components/common/Login";
import Register from "./components/common/Register";
import UserHome from "./components/user/UserHome";
import AdminHome from "./components/admin/AdminHome";
import UserAppointments from "./components/user/UserAppointments";
import ProtectedRoute from "./components/common/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Always declare all routes */}
            <Route
              path="/Adminhome"
              element={
                <ProtectedRoute>
                  <AdminHome />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Userhome"
              element={
                <ProtectedRoute>
                  <UserHome />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Userhome/UserAppointments/:doctorId"
              element={
                <ProtectedRoute>
                  <UserAppointments />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
      <footer className="text-center py-4">
        <div className="container">
          <p className="text-muted mb-0">© 2023 DocSpot • Seamless Appointment Booking</p>
        </div>
      </footer>
    </div>
  );
}

export default App;

