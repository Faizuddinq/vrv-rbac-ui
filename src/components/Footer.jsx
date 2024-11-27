import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="text-center py-4 text-gray-600">
      All rights reserved &copy; {currentYear}
      <br /> Faiz Uddin
    </div>
  );
};

export default Footer;
