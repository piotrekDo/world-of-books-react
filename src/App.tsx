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
import AudioBookPage, {
  loader as audiobookLoader,
} from './pages/AudiobookPage';
import Register, { action as registerNewAccoutAction } from './pages/Register';
import LoginPage from './pages/LoginPage';
import { AppContextProvider } from './context/AppContext';
import Publications from './pages/Publications';
import UserPage from './pages/UserPage';

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
        path: '/paper/:id',
        element: <ScientificPaper />,
        loader: scientificPaperLoader,
      },
      {
        path: '/audiobook/:id',
        element: <AudioBookPage />,
        loader: audiobookLoader,
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
