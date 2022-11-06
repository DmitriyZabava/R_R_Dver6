import React from "react";

import "../App.css";
import { Link, Navigate, Outlet, useParams, useRoutes } from "react-router-dom";
import users from "./mockUser/mockUser";

const UsersLayout = () => {
    return (
        <div>
            <Link to='/users'>Users List Page</Link>
            <h1>Users Layout</h1>
            <Link to='/'>Main Page</Link>
            <Outlet />
        </div>
    );
};
const HomePage = () => {
    return (
        <div>
            <Link to='users'>Users List Page</Link>
            <h1>Home Page</h1>
        </div>
    );
};
const UsersListPage = () => {
    return (
        <div>
            <h3>User List Page</h3>
            <ul>
                {users.map((user) => {
                    return (
                        <li key={user.id}>
                            <Link to={`${user.id}`}>{user.name}</Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
const UserPage = () => {
    const { userId } = useParams();

    return (
        <>
            <h3>User Page</h3>
            <ul>
                <li>
                    <Link to='/users'>Users List Page</Link>
                </li>
                <li>
                    <Link to={`/users/${userId}/edit`}>Edit This User</Link>
                </li>

                <p>{`User ID : ${userId}`}</p>
            </ul>
        </>
    );
};
const EditUserPage = () => {
    const { userId } = useParams();
    return (
        <div>
            <ul>
                <li>
                    <Link to={`/users`}>Users List Page</Link>
                </li>
                <li>
                    <h3>Edit User Page</h3>
                </li>
                <li>
                    <Link to={`/users/${userId}/profile`}>
                        User Profile Page
                    </Link>
                </li>
                <li>
                    <Link to={`/users/${Number(userId) + 1}/profile`}>
                        Another User
                    </Link>
                </li>
            </ul>
        </div>
    );
};
const Redirect = () => {
    const { userId } = useParams();
    return <Navigate to={`/users/${userId}/profile`} />;
};
const routes = [
    { path: "/", element: <HomePage /> },
    {
        path: "users",
        element: <UsersLayout />,
        children: [
            { path: "", element: <UsersListPage /> },
            {
                path: ":userId",
                children: [
                    { path: "", element: <Redirect /> },
                    { path: "profile", element: <UserPage /> },
                    { path: "edit", element: <EditUserPage /> },
                    { path: "*", element: <Redirect /> },
                ],
            },
        ],
    },
    { path: "*", element: <Navigate to='/' /> },
];

function App() {
    const element = useRoutes(routes);
    return (
        <div className='App'>
            <h1>App Layout</h1>
            {element}
        </div>
    );
}

export default App;
