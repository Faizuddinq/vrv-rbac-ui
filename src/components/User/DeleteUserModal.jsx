import React from 'react';

const DeleteUserModal = ({ isOpen, onClose, onDelete, userName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center ">
      <div className="bg-white border border-black p-6 rounded-lg shadow-lg w-80 md:w-96">
        <h3 className="text-lg font-semibold text-gray-800">Are you sure?</h3>
        <p className="mt-2 text-gray-600">Are you sure you want to delete the user <strong>{userName}</strong>? This action cannot be undone.</p>
        <div className="mt-4 flex justify-end gap-4">
        <button
            onClick={onDelete}
            className="border border-red-600 text-red-600  hover:bg-red-500 hover:text-white px-4 py-2 rounded mr-2"
          >
            Yes
          </button>
          <button
            onClick={onClose}
            className="border border-blue-600 text-blue-600  hover:bg-blue-500 hover:text-white px-4 py-2 rounded mr-2"
          >
            No
          </button>
         
        </div>
      </div>
    </div>
  );
};

export default DeleteUserModal;
