import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async Thunks for API calls
export const fetchRoles = createAsyncThunk(
  "roles/fetchRoles",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/roles`);
      return { data: response.data, message: "Roles fetched successfully!" };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch roles.");
    }
  }
);

export const addRole = createAsyncThunk(
  "roles/addRole",
  async (role, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/roles`, role);
      return { data: response.data, message: "Role added successfully!" };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to add role.");
    }
  }
);

export const updateRole = createAsyncThunk(
  "roles/updateRole",
  async ({ id, role }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_SERVER_URL}/roles/${id}`, role);
      return { data: response.data, message: "Role updated successfully!" };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update role.");
    }
  }
);

export const deleteRole = createAsyncThunk(
  "roles/deleteRole",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${import.meta.env.VITE_SERVER_URL}/roles/${id}`);
      return { id, message: "Role deleted successfully!" };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete role.");
    }
  }
);

// Slice
const rolesSlice = createSlice({
  name: "roles",
  initialState: {
    roles: [],
    loading: false,
    error: null,
    successMessage: null, // To store the success message
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Roles
      .addCase(fetchRoles.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear error on new request
        state.successMessage = null; // Clear previous success message
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = action.payload.data;
        state.successMessage = action.payload.message; // Store success message
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add Role
      .addCase(addRole.pending, (state) => {
        state.error = null;
        state.successMessage = null; // Clear previous success message
      })
      .addCase(addRole.fulfilled, (state, action) => {
        state.roles.push(action.payload.data);
        state.successMessage = action.payload.message; // Store success message
      })
      .addCase(addRole.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Update Role
      .addCase(updateRole.pending, (state) => {
        state.error = null; // Clear any previous errors
        state.successMessage = null; // Clear previous success message
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        const updatedRole = action.payload.data;
        state.roles = state.roles.map((role) =>
          role.id === updatedRole.id ? updatedRole : role
        );
        state.successMessage = action.payload.message; // Store success message
      })
      .addCase(updateRole.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Delete Role
      .addCase(deleteRole.pending, (state) => {
        state.error = null;
        state.successMessage = null; // Clear previous success message
      })
      .addCase(deleteRole.fulfilled, (state, action) => {
        state.roles = state.roles.filter((role) => role.id !== action.payload.id);
        state.successMessage = action.payload.message; // Store success message
      })
      .addCase(deleteRole.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});


export default rolesSlice.reducer;
