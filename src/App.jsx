import Blogs from "./Components/Home/Blogs";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./Components/Profile/About";
import Blogdetails from "./Components/BlogInsider/Blogdetails";
import { BlogProvider } from "./Context/BlogContext";

function App() {
  return (
    <Router>
      <BlogProvider>
        <Routes>
          <Route exact path="/" element={<Blogs />} />
          <Route path="/about" element={<About />} />
          <Route path="/Blogdetails/:Id" element={<Blogdetails />} />
        </Routes>
      </BlogProvider>
    </Router>
  );
}

export default App;
