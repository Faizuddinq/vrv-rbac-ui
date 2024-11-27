import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useSelector } from 'react-redux';
const userSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Provide a valid email.'),
  role: z.string().min(1, 'Role is required'),
  status: z.enum(['Active', 'InActive'], { required_error: 'Status is required' }),
});

const UserEditModal = ({ user, onClose, onSave }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: user,
    resolver: zodResolver(userSchema),
  });

  const onSubmit = (data) => {
    onSave(data);
  };

  const { roles } = useSelector((state) => state.roles);


  return (
    <div className="fixed inset-0  flex justify-center items-center">
      <div className="bg-white mt-32 lg:mt-12 border border-black p-6 rounded shadow-md w-4/5 md:w-1/2 lg:w-1/3">
        <h2 className="text-xl font-semibold mb-4">Edit User</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              {...register('name')}
              className="w-full border px-3 py-2 rounded"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              {...register('email')}
              className="w-full border px-3 py-2 rounded"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Role</label>
            <select
          id="role"
          {...register('role')}
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
            <label className="block text-sm font-medium mb-1">Status</label>
            <select {...register('status')} className="w-full border px-3 py-2 rounded">
              <option value="Active">Active</option>
              <option value="InActive">InActive</option>
            </select>
            {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
          </div>
          <div className=" flex gap-4 justify-end">

          
        <button
          type="submit"
          className="border border-blue-600 text-blue-600  hover:bg-blue-500 hover:text-white px-4 py-2 rounded"
        >
          Update
        </button>
        <button
                      onClick={onClose}
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

export default UserEditModal;
