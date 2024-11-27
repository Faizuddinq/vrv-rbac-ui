import React, { useEffect, useState } from 'react';
import RolesTable from './RolesTable';
import { fetchRoles } from '../../redux/rolesSlice';
import { useDispatch, useSelector } from 'react-redux';
import AddRoleForm from './AddRoleForm'; // Import the AddRoleForm component
import { toast } from 'react-toastify';
import UnauthorizedModal from '../UnAuthorizedModal';

const RolesPage = () => {
  const dispatch = useDispatch();
  const { roles } = useSelector((state) => state.roles);
  const permissions = useSelector((state) => state.roleLoggedIn.permissions); // Permissions from Redux

  const [showModal, setShowModal] = useState(false); // State for "Add Role" modal
  const [isUnauthorizedModalOpen, setIsUnauthorizedModalOpen] = useState(false); // Unauthorized modal state
  const [unauthorizedAction, setUnauthorizedAction] = useState(''); // Unauthorized action message

  useEffect(() => {
    try {
      dispatch(fetchRoles());
      toast.success("Roles fetched successfully!");
    } catch (error) {
      toast.error(error || "Failed to fetch roles.");
    }
  }, [dispatch]);

  // Handle unauthorized actions
  const handleUnauthorized = (action) => {
    setUnauthorizedAction(action);
    setIsUnauthorizedModalOpen(true);
  };

  // Function to handle "Add New Role" button click
  const handleAddRole = () => {
    if (permissions.includes('Write')) {
      setShowModal(true); // Open Add Role modal
    } else {
      handleUnauthorized('add this role'); // Open Unauthorized modal
    }
  };

  // Function to handle closing the modals
  const handleCloseModal = () => {
    setShowModal(false);
    setIsUnauthorizedModalOpen(false);
  };

  return (
    <div>
      <div className='flex justify-between items-center'>
        <h1 className="text-gray-800 font-semibold text-xl mt-8 ml-4">Total roles: {roles.length}</h1>

        <button
          onClick={handleAddRole}
          className="border border-blue-600 text-blue-600 flex justify-end hover:bg-blue-500 hover:text-white px-4 py-2 font-semibold rounded mr-4 mt-8"
        >
          Add New Role
        </button>
      </div>

      {/* Render the RolesTable component */}
      <RolesTable />

      {/* Add Role Modal */}
      {showModal && (
       
            <AddRoleForm 
              handleCloseModal={handleCloseModal} // Close the modal after form submission
            />
      
      )}

      {/* Unauthorized modal */}
      {isUnauthorizedModalOpen && (
        <UnauthorizedModal
          isOpen={setIsUnauthorizedModalOpen}
          onClose={() => setIsUnauthorizedModalOpen(false)}
          action={unauthorizedAction}
        />
      )}
    </div>
  );
};

export default RolesPage;
