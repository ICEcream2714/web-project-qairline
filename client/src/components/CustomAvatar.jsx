import React from 'react';
import { Pencil } from 'lucide-react';

const CustomAvatar = ({ src, onClick }) => {
  return (
    <div className="relative">
      <img
        src={src}
        alt="Avatar"
        className="h-24 w-24 rounded-full object-cover"
      />
      <button
        className="absolute bottom-0 right-0 rounded-full bg-white p-1 shadow"
        onClick={onClick}
      >
        <Pencil className="h-4 w-4 text-primary" />
      </button>
    </div>
  );
};

export default CustomAvatar;
