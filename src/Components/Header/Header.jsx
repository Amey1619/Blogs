function Header() {
  return (
    <div className="pt-24 px-6 md:px-12 mx-auto max-w-7xl">
      <div className="w-full mx-auto text-left md:w-11/12 xl:w-12/12 md:text-center">
        <p className="px-0 mb-4 text-2xl md:text-3xl font-bold text-gray-800">
          Bits-0f-C0de
        </p>
        <h1 className="mb-8 text-4xl md:text-6xl lg:text-8xl font-bold text-gray-900">
          <span>Explore</span>{" "}
          <span className="w-full py-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Learn
          </span>{" "}
          <span>Built 🚀</span>
        </h1>
      </div>
    </div>
  );
}

export default Header;
