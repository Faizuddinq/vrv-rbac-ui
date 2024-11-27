import React, { useEffect, useState } from 'react';
import UserTable from './UserTable';
import { fetchUsers } from '../../redux/usersSlice';
import { useDispatch, useSelector } from 'react-redux';
import AddUserForm from './AddUserForm'; // Import the AddUserForm component
import { toast } from 'react-toastify';
import UnauthorizedModal from '../UnAuthorizedModal';

const UserPage = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  const permissions = useSelector((state) => state.roleLoggedIn.permissions); // Permissions from Redux

  const [showModal, setShowModal] = useState(false); // State for "Add User" modal
  const [isUnauthorizedModalOpen, setIsUnauthorizedModalOpen] = useState(false); // Unauthorized modal state
  const [unauthorizedAction, setUnauthorizedAction] = useState(''); // Unauthorized action message

  useEffect(() => {
    let isMounted = true; // Track if the component is still mounted

    const fetchData = async () => {
      try {
        await dispatch(fetchUsers()).unwrap(); // Ensures proper error handling
        if (isMounted) {
          toast.success("Users fetched successfully!");
        }
      } catch (error) {
        if (isMounted) {
          toast.error(error?.message || "Failed to fetch users.");
        }
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      isMounted = false; // Prevent further state updates if unmounted
    };
  }, [dispatch]);

  // Handle unauthorized actions
  const handleUnauthorized = (action) => {
    setUnauthorizedAction(action);
    setIsUnauthorizedModalOpen(true);
  };

  // Function to handle "Add New User" button click
  const handleAddUser = () => {
    if (permissions.includes('Write')) {
      setShowModal(true); // Open Add User modal
    } else {
      handleUnauthorized('add this user'); // Open Unauthorized modal
    }
  };

  // Function to handle closing the modals
  const handleCloseModal = () => {
    setShowModal(false);
    setIsUnauthorizedModalOpen(false);
  };

  return (
    <>
      <div className="px-4  sm:px-6 lg:px-8">
      <div className='flex gap-2 justify-between items-center'>
        <h1 className="text-gray-800 font-semibold text-base md:text-xl mt-8 ml-4">Total roles: {users.length}</h1>

        <button
          onClick={handleAddUser}
          className="border border-blue-600 text-blue-600 text-base flex justify-end hover:bg-blue-500 hover:text-white px-4 py-2 font-semibold rounded mr-4 mt-8"
        >
          Add New User
        </button>
      </div>

        {/* Render the UserTable component */}
        <UserTable />

        {/* Add User Modal */}
        {showModal && (
        
          <AddUserForm  handleCloseModal={handleCloseModal}  />
              // {/* AddUserForm component inside the modal */}
        
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
    </>
  );
};

export default UserPage;
