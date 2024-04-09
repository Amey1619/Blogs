import { createContext, useContext, useState } from "react";

const BlogContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useBlogContext = () => {
  return useContext(BlogContext);
};

// eslint-disable-next-line react/prop-types
export const BlogProvider = ({ children }) => {
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [selectedData,setSelectedData]=useState(null);

  const setBlogs = (blog) => {
    setSelectedBlog(blog);
  };

  const setData=(data)=>{
    setSelectedData(data);
  }

  return (
    <BlogContext.Provider value={{ selectedBlog, setBlogs,selectedData,setData }}>
      {children}
    </BlogContext.Provider>
  );
};
