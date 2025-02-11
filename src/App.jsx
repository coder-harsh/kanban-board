import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./Components/Pages/SignUp";
import Login from "./Components/Pages/Login";
import PrivateRoutes from "./Components/Routes/PrivateRoutes"
import Dashboard from "./Components/Pages/Dashboard";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<h3 className="text-red-500">Hi, Welcome!</h3>} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;