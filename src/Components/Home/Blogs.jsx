import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import SinglePost from "../Cards/SinglePost";

function Blogs() {
  const [blogs,setBlogs]=useState([]);
  const api = import.meta.env.VITE_BACKEND_API;
  useEffect(()=>{
    const fetchpost= async()=>{
      try{
        const response = await axios.get(api);
        setBlogs(response.data);
      }
      catch(error){
        console.log(error,"Error in fetching the data");         
      }
    };
    fetchpost(); 
  },[api])
  return (
    <>
      <Navbar />
      <Header />
      <div className="px-0.5 md:px-7 pb-14 pt-6 mx-auto">
        <div className="flex flex-wrap">
          {blogs &&
            blogs.map(
              (blog) =>
                blog.data.isPublished && (
                  <SinglePost
                    key={blog.data.Id}
                    data={blog.data}
                    content={blog.content}
                    readTime={blog.readTime.text}
                  />
                )
            )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Blogs;