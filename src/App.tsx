import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Template from './Template';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import RegisterForm from './components/Form/RegisterForm';
import OTPSetup from './pages/OTPSetup';
import Home from './components/Home/Home';
import { UserProvider } from './providers/UserProvider';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Template />,
    children: [
      {
        path: '/',
        element: <RegisterPage />,
        children: [
          {
            index: true,
            element: <RegisterForm />,
          },
          {
            path: 'otp-setup',
            element: <OTPSetup />,
          },
        ],
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/profile',
        element: <Home />
      }
    ],
  },
]);

function App() {
  return(
    <UserProvider>
      <RouterProvider router={router} />;
    </UserProvider>
  )
}

export default App;