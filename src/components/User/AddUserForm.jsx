import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { addUser } from "../../redux/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const userSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  role: z.string().min(1, 'Role is required'),
  status: z.enum(["Active", "InActive"], { message: "Invalid status" }),
});

const AddUserForm = ({ handleCloseModal }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
  });

  const { roles } = useSelector((state) => state.roles);



  const onSubmit = (data) => {
  

    try {
      // Dispatch addUser action with form data
      dispatch(addUser(data));
      toast.success("User added successfully!");
    } catch (error) {

      toast.error(error || "Failed to add user.");
    } finally {
      handleCloseModal();
    }
  };

  return (
    <div className="fixed inset-0  flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)} // Use handleSubmitForm
        className="bg-white mt-24 lg:mt-0 border border-black w-4/5 lg:w-1/2 p-6 shadow-md rounded"
        >
          <div className="flex justify-between">

            <h2 className=" text-xl font-semibold mb-8">Add User</h2>
        </div>
        <div className="mb-4">
          
          <input
            {...register("name")}
            placeholder="Name"
            className="w-full px-3 py-2 border rounded"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div className="mb-4">
          
          <input
            {...register("email")}
            placeholder="Email"
            className="w-full px-3 py-2 border rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4">
           
            <select
          id="role"
          {...register('role')}
          defaultValue=""
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>Select Role</option>
          {roles.map((role) => (
            <option key={role.id} value={role.roleName}>
              {role.roleName}
            </option>
          ))}
        </select>
            {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
          </div>

        <div className="mb-4">
          
          <select
            {...register("status")}
            defaultValue=""
            className="w-full px-3 py-2 border rounded"
          >
            <option value="" disabled>Select Status</option>
            <option value="Active">Active</option>
            <option value="InActive">InActive</option>
          </select>
          {errors.status && (
            <p className="text-red-500 text-sm">{errors.status.message}</p>
          )}
        </div>

          <div className=" flex gap-4 justify-end">

          
        <button
          type="submit"
          className="border border-blue-600 text-blue-600  hover:bg-blue-500 hover:text-white px-4 py-2 rounded"
        >
          Add
        </button>
        <button
                      onClick={handleCloseModal}
                      className="border border-red-600 text-red-600  hover:bg-red-500 hover:text-white px-4 py-2 rounded"
                    >
                      Cancel
                    </button>
          </div>
      </form>
    </div>
  );
};

export default AddUserForm;
