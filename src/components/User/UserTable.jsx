import { useSelector, useDispatch } from 'react-redux';
import { deleteUser, updateUser } from '../../redux/usersSlice';
import { useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import UserEditModal from './UserEditModal';
import Pagination from '../Pagination';
import DeleteUserModal from './DeleteUserModal';
import { toast } from 'react-toastify';
import UnauthorizedModal from '../UnAuthorizedModal';

const UserTable = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);
  const { role, permissions } = useSelector((state) => state.roleLoggedIn); // Fetch current role and permissions

  const [editUser, setEditUser] = useState(null); // State to store user being edited
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State for delete modal
  const [userToDelete, setUserToDelete] = useState(null); // User to delete
  const [isUnauthorizedModalOpen, setIsUnauthorizedModalOpen] = useState(false); // Unauthorized modal state
  const [unauthorizedAction, setUnauthorizedAction] = useState(''); // Unauthorized action message

  const [searchQuery, setSearchQuery] = useState(''); // Search query state
  const [sortOrder, setSortOrder] = useState('default'); // Sorting order

  const [statusFilter, setStatusFilter] = useState('All');


  // Handle unauthorized actions
  const handleUnauthorized = (action) => {
    setUnauthorizedAction(action);
    setIsUnauthorizedModalOpen(true);
  };

  const handleDelete = (id) => {
    try {
      dispatch(deleteUser(id)); // Dispatch delete action
      setIsDeleteModalOpen(false); // Close the modal
      toast.success('User deleted successfully!');
    } catch (error) {
      toast.error(error || 'Failed to delete user.');
    }
  };

  // Open delete modal
  const openDeleteModal = (user) => {
    if (!permissions.includes('Delete')) {
      handleUnauthorized('delete this user');
      return;
    }
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  // Open edit modal
  const openEditModal = (user) => {
    if (!permissions.includes('Write')) {
      handleUnauthorized('edit this user');
      return;
    }
    setEditUser(user);
  };

  const handleSave = async (updatedUser) => {
    try {
      if (editUser && editUser.id) {
        dispatch(updateUser({ id: editUser.id, user: updatedUser }));
        setEditUser(null); // Close the modal after saving
        toast.success('User updated successfully!');
      } else {
        toast.error('No user selected for editing!');
      }
    } catch (error) {
      toast.error(error || 'Failed to update user.');
    }
  };

  const reversedUsers = users.slice().reverse(); // Create a reversed copy of users to display latest added user

   // Filtered users based on status filter and search query
   let filteredUsers = reversedUsers.filter((user) => {
    const matchesStatus =
      statusFilter === 'All' || user.status === statusFilter;
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) || user.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

   // Sort users based on status
   if (sortOrder !== 'default') {
    filteredUsers = filteredUsers.sort((a, b) => {
      if (sortOrder === 'ActiveFirst') {
        return a.status === 'Active' ? -1 : 1;
      } else if (sortOrder === 'InActiveFirst') {
        return a.status === 'InActive' ? -1 : 1;
      }
      return 0;
    });
  }

  // Pagination logic
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const usersPerPage = 10; // Number of users per page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // Handle page change for pagination
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return; // Prevent invalid page number
    setCurrentPage(page); // Update the current page
  };

  

  return (
    <div className="p-4">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <FaSpinner className="animate-spin w-20 h-20 text-blue-800" />
        </div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          {/* Make table container scrollable on mobile and tablet */}
          <div className="overflow-x-auto overflow-y-auto lg:max-w-full border border-black">
            {/* Search Input */}
          <div className="mb-4 flex justify-between m-2 items-center">
            <input
              type="text"
              placeholder="Search by name or email..."
              className="p-2 border rounded w-full md:w-1/2 outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            
          </div>
            <table className="min-w-full table-auto divide-y divide-gray-200 rounded-lg">
              <thead className="bg-blue-900 text-sm text-white rounded-lg">
                <tr>
                  <th className="px-6 py-3 font-medium uppercase tracking-wider border-r border-gray-200">
                    No
                  </th>
                  <th className="px-6 py-3 font-medium uppercase tracking-wider border-r border-gray-200">
                    Name
                  </th>
                  <th className="px-6 py-3 font-medium uppercase tracking-wider border-r border-gray-200">
                    Email
                  </th>
                  <th className="px-6 py-3 font-medium uppercase tracking-wider border-r border-gray-200">
                    Role
                  </th>
                  <th className="px-6 py-3 font-medium  uppercase tracking-wider border-r border-gray-200 ">
                    <div className="relative">
                      <button
                        className="font-medium hover:text-blue-300"
                        onClick={() => {
                          setSortOrder((prev) =>
                            prev === 'ActiveFirst'
                              ? 'InActiveFirst'
                              : 'ActiveFirst'
                          );
                        }}
                      >
                        Status
                      </button>
                      <select
                        className="absolute top-0 right-0 left-0 text-white text-sm uppercase max-w-full bg-blue-900  "
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                      >
                        <option value="All" disabled className=' bg-gray-200 text-gray-400'>Status</option>
                        <option value="All" className=' bg-white text-black '>All</option>
                       <option value="Active" className=' bg-white text-black '>Active</option>
                        <option value="InActive" className=' bg-white text-black '>InActive</option>
                      </select>
                    </div>
                  </th>
                  <th className="px-6 py-3 font-medium uppercase tracking-wider border-r border-gray-200">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentUsers.map((user, index) => (
                  <tr
                    key={user.id}
                    className={index % 2 === 0 ? 'bg-white' : 'bg-blue-50'}
                  >
                    <td className="px-6 py-4 text-center whitespace-nowrap border-r border-gray-200">
                      {index + indexOfFirstUser + 1}
                     
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap border-r border-gray-200">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap border-r border-gray-200">
                      {user.email}
                    </td>
                    <td
                      className={`px-6 font-semibold py-4 text-center whitespace-nowrap border-r border-gray-200`}
                    >
                      <p
                        className={`text-center px-2 py-1 text-sm rounded-full ${
                          user.role === 'Admin'
                            ? 'text-blue-700 bg-blue-100'
                            : user.role === 'Editor'
                            ? 'text-green-600 bg-green-100'
                            : user.role === 'Viewer'
                            ? 'text-purple-600 bg-purple-100'
                            : 'text-red-600 bg-red-100'
                        }`}
                      >
                        {user.role}
                      </p>
                    </td>
                    <td
                      className={` whitespace-nowrap border-r border-gray-200 px-4 text-center `}
                    >
                      <p
                        className={`text-center px-2 py-1 text-sm rounded-full ${
                          user.status === 'Active'
                            ? 'text-green-700 bg-green-100'
                            : 'text-red-700 bg-red-100'
                        }`}
                      >
                        {user.status}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-r flex justify-center items-center border-gray-200">
                      <button
                        onClick={() => openEditModal(user)}
                        className="border border-blue-600 text-blue-600 hover:bg-blue-500 hover:text-white px-2 py-1 rounded mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => openDeleteModal(user)}
                        className="border border-red-600 text-red-600 hover:bg-red-500 hover:text-white px-2 py-1 rounded mr-2"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Render the Pagination component */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </>
      )}

      {editUser && (
        <UserEditModal
          user={editUser}
          onClose={() => setEditUser(null)}
          onSave={handleSave}
        />
      )}

      <DeleteUserModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={() => handleDelete(userToDelete.id)}
        userName={userToDelete?.name}
      />
      <UnauthorizedModal
        isOpen={isUnauthorizedModalOpen}
        onClose={() => setIsUnauthorizedModalOpen(false)}
        action={unauthorizedAction}
      />
    </div>
  );
};

export default UserTable;
