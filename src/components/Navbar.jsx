import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSelector, useDispatch } from 'react-redux';
import { setRole, setPermissions } from '../redux/roleLoggedInSlice';
import axios from 'axios';
import { fetchRoles } from '../redux/rolesSlice';

// Zod schema for dropdown validation
const roleSchema = z.object({
  role: z.string().min(1, 'Role is required'),
});

const Navbar = () => {
  const dispatch = useDispatch();
  const currentRole = useSelector((state) => state.roleLoggedIn.role); // Get current role
  const permissions = useSelector((state) => state.roleLoggedIn.permissions); // Get permissions
  
  const { roles, loading, error } = useSelector((state) => state.roles);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      role: currentRole || '',
    },
  });

  // Fetch permissions dynamically based on role
  const fetchPermissions = async (role) => {
    try {
      const selectedRole = roles.find((r) => r.roleName === role);
      if (selectedRole) {
        dispatch(setPermissions(selectedRole.permissions)); // Update permissions in Redux
      }
    } catch (error) {
      console.error('Error fetching permissions:', error);
      dispatch(setPermissions([])); // Default to no permissions
    }
  };

  const onSubmit = (data) => {
    const selectedRole = data.role;
    dispatch(setRole(selectedRole)); // Update role in Redux
    fetchPermissions(selectedRole); // Fetch permissions for the role
  };

  useEffect(() => {
    if (roles.length === 0) {
      dispatch(fetchRoles()); // Fetch roles if not already fetched
    } else if (currentRole) {
      fetchPermissions(currentRole); // Fetch permissions for current role on load
    }
  }, [dispatch, roles, currentRole]);

  return (
    <div className=" bg-gray-100 shadow sticky z-50 flex flex-col sm:flex-row items-center justify-center p-4">
      <form
  className="flex gap-4  lg:flex-row justify-center items-center space-y-4 sm:space-x-4 sm:space-y-0"
  onSubmit={handleSubmit(onSubmit)}
  defaultValue=""
>
  <select
    id="role"
    {...register('role')}
    className="border mt-4 md:mt-0 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-auto"
  >
    <option value="" disabled>Select Role</option>
    {roles.map((role) => (
      <option key={role.id} value={role.roleName}>
        {role.roleName}
      </option>
    ))}
  </select>
  <button
    type="submit"
    className="border border-blue-600 text-blue-600 flex justify-center hover:bg-blue-500 hover:text-white px-4 py-2 font-semibold rounded w-full sm:w-auto"
  >
    Set Role
  </button>
</form>


      <div className="mt-4 sm:mt-0 sm:ml-8">
        <p>
          Selected Role: <span className="font-semibold">{currentRole}</span>
        </p>
        <p>
          Permissions:{" "}
          <span className="font-semibold">
            {permissions.length > 0 ? permissions.join(", ") : "No permissions available"}
          </span>
        </p>
      </div>

      {errors.role && (
        <p className="text-red-500 text-sm mt-2">{errors.role.message}</p>
      )}
      {loading && <p>Loading roles...</p>}
      {error && <p className="text-red-500">Failed to fetch roles.</p>}
    </div>
  );
};

export default Navbar;