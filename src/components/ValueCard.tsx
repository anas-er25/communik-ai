import React from "react";

interface ValueCardProps {
  title: string;
  description: string;
}

const ValueCard: React.FC<ValueCardProps> = ({ title, description }) => {
  return (
    <div className="bg-red-100 p-8 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300">
      <h3 className="text-xl font-bold mb-4 text-communikAI-red">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default ValueCard;