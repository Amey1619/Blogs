import Blogs from "./Components/Home/Blogs";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./Components/Profile/About";

function App() {
  return (    
      <Router>
        <Routes>
          <Route exact path="/" element={<Blogs />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
  );
}

export default App;
