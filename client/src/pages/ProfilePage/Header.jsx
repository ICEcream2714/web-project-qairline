const Header = () => {
  return (
    <div className="relative h-[300px] w-screen">
      {/* Background Section */}
      <div className="absolute inset-0 bg-[url('')] bg-cover bg-center"></div>
      <div className="absolute inset-0 bg-black/50"></div> {/* Overlay */}
      {/* Text Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
        <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">
          Manage your profile
        </h1>
      </div>
    </div>
  );
};

export default Header;
