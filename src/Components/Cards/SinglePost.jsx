/* eslint-disable react/prop-types */
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useBlogContext } from "../../Context/BlogContext";

function SinglePost({ data, content, readTime }) {
 const { setBlogs, setData } = useBlogContext();
  const handleClick = () => {
    setBlogs(content);
    setData(data);
  };
  return (
    <>
      <Link
        to={`/Blogdetails/${data.Id}`}
        onClick={handleClick}
        className="inline-block cursor-pointer group px-6 py-6 md:px-10 md:w-1/3 flex flex-col items-start rounded transform"
      >
        <span className="py-1 px-2 rounded bg-gray-200 text-indigo-900 text-2sm font-medium tracking-widest">
          {data.Tags.split(" ")[0]}
        </span>
        <h2 className="sm:text-2xl text-2xl title-font font-semibold text-gray-900 mt-4 mb-4 group-hover:text-indigo-800">
          {data.Title}
        </h2>

        <p className="leading-relaxed mb-5 text-gray-900 text-xl">
          {data.Abstract}..
        </p>
        <div className="flex items-center flex-wrap pb-2 border-b-2 border-gray-300 mt-auto w-full justify-between">
          <div className="text-indigo-700 inline-flex font-semibold items-center text-3xs group-hover:text-indigo-800">
            Learn More{" "}
            <span className="pl-1">
              <AiOutlineArrowRight />
            </span>
          </div>

          <div className="inline-flex items-center">
            <span className="flex-grow flex flex-col pl-4">
              <span className="text-indigo-900 text-2xs tracking-widest mt-0.5">
                {readTime}
              </span>
            </span>
          </div>
        </div>
      </Link>
    </>
  );
}
export default SinglePost;
