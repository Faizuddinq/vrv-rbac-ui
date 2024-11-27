import React from 'react';

const UnauthorizedModal = ({ isOpen, onClose, action }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center ">
      <div className="bg-white border border-red-600 p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-lg font-semibold text-red-600">Unauthorized Action !! </h3>
        <p className="mt-2 text-red-800">
          You are not authorized to {action}. Please contact your
          administrator if you believe this is a mistake.
        </p>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="border text-lg border-red-600 text-red-600 hover:bg-red-500 hover:text-white px-4 py-2 rounded mr-2"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedModal;
