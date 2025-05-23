import HomePage from '../pages/home/home-page';
import AboutPage from '../pages/about/about-page';
import LoginPage from '../pages/login/login-page';
import RegisterPage from '../pages/register/register-page';
import CreateStoryPage from '../pages/create-story/create-story-page';
import DetailPage from '../pages/detail/detail-page';
import OfflineStoriesPage from '../pages/offline-stories';

const routes = {
  '/': new HomePage(),
  '/about': new AboutPage(),
  '/login': new LoginPage(),
  '/register': new RegisterPage(),
  '/create-story': new CreateStoryPage(),
  '/detail/:id': new DetailPage(),
  '/offline-stories': OfflineStoriesPage,
};

export default routes;
