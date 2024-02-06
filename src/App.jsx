import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Blogs from "./Components/Home/Blogs";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./Components/Profile/About";

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <Router>
        <Routes>
          <Route exact path="/" element={<Blogs />} />
          <Route path="/about" Component={<About />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
