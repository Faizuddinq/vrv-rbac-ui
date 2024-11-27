import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { addRole } from "../../redux/rolesSlice"; // Make sure to implement this action in your Redux slice
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const roleSchema = z.object({
    roleName: z.string().min(2, 'Role name must be at least 2 characters long'),
    permissions: z.array(z.string()).min(1, 'At least one permission must be selected'),
  });

const AddRoleForm = ({ handleCloseModal }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(roleSchema),
  });

  const permissionsOptions = ['Read', 'Write', 'Delete', 'Update'];


  const onSubmit = (data) => {
    try {
      // Dispatch addRole action with form data
      dispatch(addRole(data));
      toast.success("Role added successfully!");
    } catch (error) {
      toast.error(error || "Failed to add role.");
    } finally {
      handleCloseModal();
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center ">
      <div className="bg-white border border-black p-6 rounded-lg shadow-lg w-4/5 md:w-1/2">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          { 'Add Role'}
        </h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Role Name */}
          <div className="mb-4">
            <label htmlFor="roleName" className="block text-gray-700 font-medium">
              Role Name
            </label>
            <input
              id="roleName"
              type="text"
              {...register('roleName')}
              className={`w-full border px-3 py-2 rounded-lg ${
                errors.roleName ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.roleName && (
              <p className="text-red-500 text-sm mt-1">{errors.roleName.message}</p>
            )}
          </div>

          {/* Permissions */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Permissions</label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {permissionsOptions.map((permission) => (
                <label key={permission} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={permission}
                    {...register('permissions')}
                    className="h-4 w-4 text-blue-600"
                  />
                  <span>{permission}</span>
                </label>
              ))}
            </div>
            {errors.permissions && (
              <p className="text-red-500 text-sm mt-1">{errors.permissions.message}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-4">
          <button
              type="submit"
              className="border border-blue-600 text-blue-600 text-base flex justify-end hover:bg-blue-500 hover:text-white px-4 py-2 rounded "
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleCloseModal}
              className="border border-red-600 text-red-600  hover:bg-red-500 hover:text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRoleForm;
