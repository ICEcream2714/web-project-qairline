const DropdownUser = () => {
  return (
    <div className="flex items-center gap-2">
      <img
        src="https://via.placeholder.com/40"
        alt="User"
        className="w-8 h-8 rounded-full"
      />
      <div className="text-sm">
        <p className="font-semibold">Thomas Anree</p>
        <p className="text-gray-500">UX Designer</p>
      </div>
    </div>
  );
};

export default DropdownUser;
