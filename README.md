# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh



# RBAC UI (Role-Based Access Control UI)

This project is a **Role-Based Access Control (RBAC) UI** designed for managing users, roles, and permissions within an admin dashboard. Administrators can efficiently view, manage, and assign roles and permissions to users, ensuring secure and efficient user access management across the organization. The system supports multiple roles with different access levels to various features.
For instance:
- **Admin** can create, edit, delete users, and assign roles and permissions.
- **Editor** can modify user details and roles.
- **Viewer** only have permission to view the data without modifying anything.
- **Destroyer** only have permission to delete the data without modifying anything.

## Features
- **User Management**: Add, edit, delete users, and assign roles.
- **Role Management**: Define and edit roles with specific permissions.
- **Dynamic Permissions**: Assign, modify, and display permissions for roles.
- **Search & Filter**: Search users by name or email.
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
git clone https://github.com/Faizuddinq/vrv-rbac-ui.git
```

### 2. Navigate to Project Directory
Go into the project directory:

```bash
cd vrv-rbac-ui
```

### 3. Install Dependencies
Install the necessary npm dependencies:

```bash
npm install
```

### 4. Configure Environment Variables
Create a `.env` file at the root of the project and set up the `VITE_SERVER_URL` environment variable to point to the mock API server.

Example:
```bash
VITE_SERVER_URL=https://<your_api_key>.mockapi.io
```

- Replace `<your_api_key>` with the actual API key you are using for your mock API.

P.S: env is not ignored in this project due assignment as the HR reviewer will face issue in making tables in mockapi.io otherwise I professionally do not add .env files for safety and security. I hope you understand. Thanks.

### 5. Start the Development Server
To run the application locally, start the development server:

```bash
npm run dev
```

This will launch the app at `http://localhost:5173` in your web browser.

### 6. Select a Role from the Navbar
In the navbar, you'll find a **Role Selector**. This allows administrators to switch between different roles. The role selected determines the level of access within the application. This feature is essential for implementing **Role-Based Access Control (RBAC)**, where users with different roles (e.g., Admin, Editor, Viewer) will have different permissions and access to various features.



## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.



