import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./Components/Header";
import "./App.css";
import EditGoal from "./pages/EditGoal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Test from "./pages/Test";

function App() {
  return (
    <Router>
      <div className="container">
        <Header />
        <Routes>
          {/* <Route path="/" element={<Test />} /> */}

          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/goal/:goalId" element={<EditGoal />} />
        </Routes>
      </div>

      <ToastContainer />
    </Router>
  );
}

export default App;
