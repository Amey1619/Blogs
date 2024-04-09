/* eslint-disable react/prop-types */
function Toc({ headings }) {
  const scrollToElement = (id) => (event) => {
    event.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = -84;
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition + offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="sticky top-32 overflow-auto toc-inner">
      <ul>
        {headings.map((heading) => (
          <li
            key={heading.id}
            className="mt-4 text-lg text-gray-700 dark:text-gray-400"
            style={{
              paddingLeft: "1rem",
            }}
          >
            <a
              href={`#${heading.id}`}
              onClick={(event) => {
                scrollToElement(heading.id)(event);
              }}
              className="hover:text-indigo-500 transition-colors duration-200 text-2xl lg:text-2xl no-underline"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Toc;
