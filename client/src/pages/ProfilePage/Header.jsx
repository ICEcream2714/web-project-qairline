const Header = () => {
  return (
    <div className="relative h-[350px] w-full">
      {/* Background Section */}
      <div className="absolute inset-0 w-screen bg-[url('https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?cs=srgb&dl=pexels-pixabay-206359.jpg&fm=jpg')]"></div>
      <div className="absolute inset-0 bg-black/50"></div>
    </div>
  );
};

export default Header;
