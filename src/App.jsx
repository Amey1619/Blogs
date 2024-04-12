import { Provider } from "react-redux"; // Import the Provider
import { Store } from "./Redux/Store";
import Blogs from "./Components/Home/Blogs";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./Components/Profile/About";
import Blogdetails from "./Components/BlogInsider/Blogdetails";
import { BlogProvider } from "./Context/BlogContext";

function App() {
  return (
    <Provider store={Store}>
      <Router>
        <BlogProvider>
          <Routes>
            <Route exact path="/" element={<Blogs />} />
            <Route path="/about" element={<About />} />
            <Route path="/Blogdetails/:Id" element={<Blogdetails />} />
          </Routes>
        </BlogProvider>
      </Router>
    </Provider>
  );
}

export default App;
