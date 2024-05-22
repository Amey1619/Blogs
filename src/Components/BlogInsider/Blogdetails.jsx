import { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { useBlogContext } from "../../Context/BlogContext";
import { BsThreeDots } from "react-icons/bs";
import ReactMarkdown from "react-markdown";
import Toc from "../TOC/Toc";
import "./Style.css";
import LikeBtn from "../LikeBtn";
import Comments from "../Comments";

function BlogDetails() {
  const { selectedBlog, selectedData } = useBlogContext();
  const [headings, setHeadings] = useState([]);

  useEffect(() => {
    const extractHeadings = (text) => {
      const headingLines = text.match(/^##\s+(.+?)(?:\s+\{\#(.+)\})?$/gm) || [];
      return headingLines.map((line) => {
        const match = line.match(/^##\s+(.+?)(?:\s+\{\#(.+)\})?$/);
        const text = match[1].trim();
        const id = text.toLowerCase().replace(/\s+/g, "-");
        return { id, text };
      });
    };

    if (selectedBlog) {
      setHeadings(extractHeadings(selectedBlog));
    }
  }, [selectedBlog]);

  const preprocessMarkdown = (markdown) => {
    // Remove {#ID} from heading lines
    return markdown.replace(/\{#[^\}]+\}/g, "");
  };

  const cleanedMarkdown = preprocessMarkdown(selectedBlog);

  return (
    <>
      <Navbar />
      <div className="mx-auto flex max-w-screen-xl mt-24 mb-7">
        <div className="flex-grow rounded-lg shadow-lg bg-white pb-6 px-1">
          <img
            className="object-cover w-50 h-65"
            src={selectedData.HeaderImage}
            alt="Article Image"
          />
          <div className="p-3">
            <div className="flex flex-col items-center">
              <div className="flex">
                {selectedData.Tags.split(" ").map((tag) => (
                  <p
                    key={tag}
                    className="inline-block px-2 ml-3 py-1 mb-4 text-xs font-semibold tracking-wider text-gray-50 uppercase rounded-full bg-indigo-500"
                  >
                    {tag}
                  </p>
                ))}
              </div>
              <h2 className="block mt-2 text-2xl sm:text-4xl font-semibold text-gray-800">
                {selectedData.Title}
              </h2>
              <p className="text-5xl pt-2">
                <BsThreeDots />
              </p>
              <article className="prose prose-lg w-full py-7 max-w-2xl markdown-content">
                <ReactMarkdown
                  components={{
                    a: ({ href, children }) => (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        {children}
                      </a>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc ml-6">{children}</ul>
                    ),
                    li: ({ children }) => <li className="mb-2">{children}</li>,
                    h2: ({ node, ...props }) => {
                      const textContent = node.children[0].value;
                      const id = textContent.toLowerCase().replace(/\s+/g, "-");
                      return (
                        <h3
                          id={id}
                          {...props}
                          className="text-xl font-bold"
                          style={{ margin: "24px 0" }}
                        />
                      );
                    },
                    code: ({ inline, children }) => {
                      if (inline) {
                        return (
                          <span
                            style={{
                              fontWeight: "bold",
                              color: "#FF69B4",
                            }}
                          >
                            {children}
                          </span>
                        );
                      } else {
                        return (
                          <pre
                            className="bg-gray-800 p-4 rounded-md mb-2 text-white overflow-auto"
                            style={{ whiteSpace: "pre-wrap" }}
                          >
                            {children}
                          </pre>
                        );
                      }
                    },
                  }}
                >
                  {cleanedMarkdown}
                </ReactMarkdown>
              </article>
              <div className="mt-3">
                <div className="flex items-center flex-col">
                  <p className="text-5xl pb-2">
                    <BsThreeDots />
                  </p>
                  <p className="text-2xl pb-2">Thanks for reading!!!</p>
                  <p className="mx-2 font-semibold text-gray-700">
                    {selectedData.Author}
                  </p>
                  <p className="text-sm font-medium leading-4 text-gray-600">
                    Author
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="toc ml-4 w-full mr-0 max-w-sm">
          <Toc headings={headings} />
        </div>
      </div>
      <LikeBtn  Id={String(selectedData.Id)} />
      <Comments Id={String(selectedData.Id)} />
      <Footer />
    </>
  );
}

export default BlogDetails;
