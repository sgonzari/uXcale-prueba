import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import AllMeetupsPage from './pages/AllMeetupsPage';
import NewMeetupsPage from './pages/NewMeetup';
import FavoritesPage from './pages/Favorites';

// All routes of app
export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Navigate to="/meetups" replace /> 
            },
            {
                path: "/meetups",
                element: <AllMeetupsPage />,
            },
            {
                path: "/create",
                element: <NewMeetupsPage />
            },
            {
                path: "/favourites",
                element: <FavoritesPage />
            }
        ]
    },
]);

ReactDOM.render(<RouterProvider router={router} />, document.getElementById('root'));