import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async Thunks for API calls
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/users`);
    

      return { data: response.data, message: "Users fetched successfully!" };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch users.");
     

    }
  }
);

export const addUser = createAsyncThunk(
  "users/addUser",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/users`, user);
      return { data: response.data, message: "User added successfully!" };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to add user.");
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ id, user }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_SERVER_URL}/users/${id}`, user);
      return { data: response.data, message: "User updated successfully!" };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update user.");
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${import.meta.env.VITE_SERVER_URL}/users/${id}`);
      return { id, message: "User deleted successfully!" };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete user.");
    }
  }
);

// Slice
const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
    error: null,
    successMessage: null, // Store success message
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear error on new request
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data;
        state.successMessage = action.payload.message; // Store success message
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add User
      .addCase(addUser.pending, (state) => {
        state.error = null; // Clear error on new request
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload.data);
        state.successMessage = action.payload.message; // Store success message
      })
      .addCase(addUser.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Update User
      .addCase(updateUser.pending, (state) => {
        state.error = null; // Clear error on new request
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const updatedUser = action.payload.data;
        state.users = state.users.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        );
        state.successMessage = action.payload.message; // Store success message
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Delete User
      .addCase(deleteUser.pending, (state) => {
        state.error = null; // Clear error on new request
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload.id);
        state.successMessage = action.payload.message; // Store success message
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default usersSlice.reducer;
