import { createSlice } from '@reduxjs/toolkit';




const roleLoggedInSlice = createSlice({
  name: 'roleLoggedIn',
  initialState: {
    role: '', // Selected role
    permissions: [], // Permissions for the selected role
    
  },
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setPermissions: (state, action) => {
      state.permissions = action.payload; // Update permissions dynamically
    },
  },
  
});

export const { setRole, setPermissions } = roleLoggedInSlice.actions;
export default roleLoggedInSlice.reducer;
