import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./Components/Pages/SignUp";
import Login from "./Components/Pages/Login";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h3 className="text-red-500">Hi, Welcome!</h3>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;