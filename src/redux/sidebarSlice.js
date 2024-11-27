
import { createSlice } from '@reduxjs/toolkit';

// Create the sidebar slice to manage sidebar state
export const sidebarSlice = createSlice({
  name: 'sidebar', // The name of this slice
  initialState: {
    isExpanded: false, // Initially, the sidebar is collapsed
  },
  reducers: {
    // Reducer to toggle the sidebar's expanded/collapsed state
    toggleSidebar: (state) => {
      state.isExpanded = !state.isExpanded; // Toggle the value of isExpanded
    },
  },
});

// Export the toggleSidebar action to be dispatched
export const { toggleSidebar } = sidebarSlice.actions;

// Export the reducer to be used in the Redux store
export default sidebarSlice.reducer;
