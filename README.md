# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# RBAC UI (Role-Based Access Control UI)

This project is a **Role-Based Access Control (RBAC) UI** designed for managing users, roles, and permissions within an admin dashboard. Administrators can efficiently view, manage, and assign roles and permissions to users, ensuring secure and efficient user access management across the organization. The system supports multiple roles with different access levels to various features.

## Features
- **User Management**: Add, edit, delete users, and assign roles.
- **Role Management**: Define and edit roles with specific permissions.
- **Dynamic Permissions**: Assign, modify, and display permissions for roles.
- **Search & Filter**: Search users by name and filter by their status (Active/Inactive).
- **Sorting**: Sort users by their status (Active/Inactive).
- **Pagination**: Paginated display of users for better navigation.
- **Role-Based Access Control**: Select a role in the navbar to implement different access restrictions across the UI.

## Technologies Used
This project leverages the following technologies:
- **React**: A powerful JavaScript library for building user interfaces.
- **Redux**: For state management, enabling seamless interaction between components and global state.
- **Tailwind CSS**: A utility-first CSS framework used for fast styling and responsiveness.
- **React Router**: For handling client-side routing within the app.
- **React Toastify**: To display toast notifications for success/error messages.
- **Axios**: Used for making API requests to interact with the mock backend.
- **React Icons**: Provides a library of icons for UI elements.
- **React Hook Form**: For handling form validation and submission efficiently.

## Setup Instructions

Follow these steps to set up the project on your local machine:

### 1. Clone the Repository
Clone this repository to your local machine:

```bash
git clone https://github.com/yourusername/rbac-ui.git
