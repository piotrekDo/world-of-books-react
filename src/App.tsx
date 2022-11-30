import React from 'react';
import logo from './logo.svg';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './pages/RootLayout';
import ErrorPage from './pages/Error';
import HomePage, {
  loader as getNewestScientificPapersLoader,
} from './pages/HomePage';
import ScientificPaper, {
  loader as scientificPaperLoader,
} from './pages/ScientificPaper';
import Register, { action as registerNewAccoutAction } from './pages/Register';
import LoginPage from './pages/LoginPage';
import { AppContextProvider } from './context/AppContext';
import Publications from './pages/Publications';
import UserPage from './pages/UserPage';
import CurrentlyBorrowedByUserList from './components/CurrentlyBorrowedByUserList';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: getNewestScientificPapersLoader,
      },
      {
        path: '/register',
        element: <Register />,
        action: registerNewAccoutAction,
      },
      {
        path: '/login-page',
        element: <LoginPage />,
      },
      {
        path: '/user',
        element: <UserPage />,
      },
      {
        path: '/publications',
        element: <Publications />,
      },
      {
        path: '/publication/:id',
        element: <ScientificPaper />,
        loader: scientificPaperLoader,
      },
    ],
  },
]);

function App() {
  return (
    <AppContextProvider>
      <RouterProvider router={router} />
    </AppContextProvider>
  );
}

export default App;
