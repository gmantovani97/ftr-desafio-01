import { createBrowserRouter } from 'react-router';
import { HomePage } from './pages/home-page';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: HomePage,
  },
]);
