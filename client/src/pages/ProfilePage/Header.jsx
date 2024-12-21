const Header = () => {
  return (
    <div className="relative h-[350px] w-screen">
      {/* Background Section */}
      <div className="absolute inset-0 bg-[url('https://saigoncomputer.vn/uploads/hinh-nen-may-tinh-cuc-dep(4).jpg')] bg-gradient-to-t from-gray-200 from-gray-500 bg-cover bg-center"></div>
      <div className="absolute inset-0 bg-black/50"></div> {/* Overlay */}
    </div>
  );
};

export default Header;
