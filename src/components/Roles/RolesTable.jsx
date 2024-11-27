import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Pagination from '../Pagination';
import { deleteRole,  updateRole } from '../../redux/rolesSlice';
import DeleteRoleModal from './DeleteRoleModal';
import RolesEditModal from './RolesEditModal';
import UnauthorizedModal from '../UnAuthorizedModal';

const RolesTable = () => {
    
    const dispatch = useDispatch();
  const { roles, loading, error } = useSelector((state) => state.roles);

  const { role, permissions } = useSelector((state) => state.roleLoggedIn); // Fetch current role and permissions

  const [editRole, setEditRole] = useState(null); // State to store role being edited
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State for delete modal
  const [roleToDelete, setRoleToDelete] = useState(null); // Role to delete

  const [isUnauthorizedModalOpen, setIsUnauthorizedModalOpen] = useState(false); // Unauthorized modal state
  const [unauthorizedAction, setUnauthorizedAction] = useState(''); // Unauthorized action message

    // Handle unauthorized actions
  const handleUnauthorized = (action) => {
    setUnauthorizedAction(action);
    setIsUnauthorizedModalOpen(true);
  };


  // Handle role deletion
  const handleDelete = (id) => {
    try {
      dispatch(deleteRole(id)); // Dispatch delete action
      setIsDeleteModalOpen(false); // Close the modal
      toast.success('Role deleted successfully!');
    } catch (error) {
      toast.error(error || 'Failed to delete role.');
    }
  };

 

  // Open delete modal
  const openDeleteModal = (role) => {
    if (!permissions.includes('Delete')) {
      handleUnauthorized('delete this user');
      return;
    }
    setRoleToDelete(role);
    setIsDeleteModalOpen(true);
  };

 
  // Open edit modal
  const openEditModal = (role) => {
    if (!permissions.includes('Write')) {
      handleUnauthorized('edit this user');
      return;
    }
    setEditRole(role);
  };

  // Save updated role
  const handleSave = async (updatedRole) => {
    try {
      if (editRole && editRole.id) {
        dispatch(updateRole({ id: editRole.id, role: updatedRole }));
        setEditRole(null); // Close the modal
        toast.success('Role updated successfully!');
      } else {
        toast.error('No role selected for editing!');
      }
    } catch (error) {
      toast.error(error || 'Failed to update role.');
    }
  };

//   const reversedRoles = roles.slice().reverse(); // Create reversed copy of roles

  // Pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const rolesPerPage = 10;
  const indexOfLastRole = currentPage * rolesPerPage;
  const indexOfFirstRole = indexOfLastRole - rolesPerPage;
  const currentRoles = roles.slice(indexOfFirstRole, indexOfLastRole);
  const totalPages = Math.ceil(roles.length / rolesPerPage);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
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
          <div className="overflow-x-auto overflow-y-auto max-w-full">
          <table className="min-w-full table-auto divide-y divide-gray-200 rounded-lg">
            <thead className="bg-blue-900 text-sm text-white rounded-lg">
              <tr>
                <th className="px-6 py-3 font-medium uppercase tracking-wider border-r border-gray-200">
                  No
                </th>
                <th className="px-6 py-3 font-medium uppercase tracking-wider border-r border-gray-200">
                  Role Name
                </th>
                <th className="px-6 py-3 font-medium uppercase tracking-wider border-r border-gray-200">
                  Permissions
                </th>
                <th className="px-6 py-3 font-medium uppercase tracking-wider border-r border-gray-200">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentRoles.map((role, index) => (
                <tr
                  key={role.id}
                  className={index % 2 === 0 ? 'bg-white' : 'bg-blue-50'}
                >
                  <td className="px-6 py-4 text-center whitespace-nowrap border-r border-gray-200">
                    {index + indexOfFirstRole + 1}
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap border-r border-gray-200">
                    {role.roleName}
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap border-r border-gray-200">
                    {role.permissions.join(', ')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border-r flex justify-center items-center border-gray-200">
                    <button
                      onClick={() => openEditModal(role)}
                      className="border border-blue-600 text-blue-600 hover:bg-blue-500 hover:text-white px-2 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => openDeleteModal(role)}
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
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </>
      )}
       {editRole && (
        <RolesEditModal
          role={editRole}
          onClose={() => setEditRole(null)}
          onSave={handleSave}
        />
      )}
      <DeleteRoleModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={() => handleDelete(roleToDelete.id)}
        roleName={roleToDelete?.name}
      />
       <UnauthorizedModal
        isOpen={isUnauthorizedModalOpen}
        onClose={() => setIsUnauthorizedModalOpen(false)}
        action={unauthorizedAction}
      />
    </div>
  );
};

export default RolesTable;
