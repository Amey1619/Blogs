function Header() {
  return (
    <div className="pt-24 px-12 mx-auto max-w-7xl">
      <div className="w-full mx-auto text-left md:w-11/12 xl:w-12/12 md:text-center">
        <p className="px-0 mb-4 text-3xl font-bold text-gray-800">
          React Blogs
        </p>
        <h1 className="mb-8 text-8xl font-bold text-gray-1200">
          <span>Explore</span>{" "}
          <span className="w-full py-2 text-transparent bg-clip-text leading-12 bg-gradient-to-r from-blue-400 to-purple-500 lg:inline">
            Learn
          </span>{" "}
          <span>Built 🚀</span>
        </h1>
      </div>
    </div>
  );
}

export default Header;
