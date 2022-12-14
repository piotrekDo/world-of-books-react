import React, { useEffect } from 'react';
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
import AudioBook, { loader as audiobookLoader } from './pages/Audiobook';
import Register, { action as registerNewAccoutAction } from './pages/Register';
import LoginPage from './pages/LoginPage';
import { AppContextProvider } from './context/AppContext';
import Publications from './pages/Publications';
import UserPage from './pages/UserPage';
import ManageUsers from './pages/ManageUsers';
import AuthenticatedGuard from './guards/AuthenticatedGuard';
import AdminGuard from './guards/AdminGuard';
import AOS from 'aos';
import 'aos/dist/aos.css';

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
        path: '/users-manager',
        element: <AdminGuard><ManageUsers /></AdminGuard>,
      },
      {
        path: '/user',
        element: (
          <AuthenticatedGuard>
            <UserPage />
          </AuthenticatedGuard>
        ),
      },
      {
        path: '/publications',
        element: (
          <AuthenticatedGuard>
            <Publications />
          </AuthenticatedGuard>
        ),
      },
      {
        path: '/paper/:id',
        element: (
          <AuthenticatedGuard>
            <ScientificPaper />
          </AuthenticatedGuard>
        ),
        loader: scientificPaperLoader,
      },
      {
        path: '/audiobook/:id',
        element: (
          <AuthenticatedGuard>
            <AudioBook />
          </AuthenticatedGuard>
        ),
        loader: audiobookLoader,
      },
    ],
  },
]);

function App() {
  useEffect(() => {
    AOS.init();
  }, []);
  
  return (
    <AppContextProvider>
      <RouterProvider router={router} />
    </AppContextProvider>
  );
}

export default App;
