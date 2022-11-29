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
import Register from './pages/Register';
import { ChakraProvider } from '@chakra-ui/react';

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
      <RouterProvider router={router} />
  );
}

export default App;
