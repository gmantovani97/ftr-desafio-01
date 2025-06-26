import { createBrowserRouter } from 'react-router';
import { HomePage } from './pages/home-page';
import { RedirectPage } from './pages/redirect-page/redirect-page';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: HomePage,
  },
  {
    path: '/:shortUrl',
    Component: RedirectPage,
  },
]);
