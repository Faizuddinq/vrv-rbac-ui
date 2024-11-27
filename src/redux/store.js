import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./usersSlice";
import rolesReducer from "./rolesSlice";
import sidebarReducer from './sidebarSlice';
import roleLoggedInReducer from './roleLoggedInSlice'
const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    users: usersReducer,
    roles: rolesReducer,
    roleLoggedIn: roleLoggedInReducer
  },
});

export default store;
