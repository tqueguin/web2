import HomePage from '../Pages/HomePage';
import CreatePage from '../Pages/CreatePage';
import ViewPage from '../Pages/ViewPage';
import RegisterPage from '../Pages/RegisterPage';
import LoginPage from '../Pages/LoginPage';
import Logout from '../Logout/Logout';

const routes = {
  '/': HomePage,
  '/create': CreatePage,
  '/view': ViewPage,
  '/register': RegisterPage,
  '/login': LoginPage,
  '/logout': Logout,
};

export default routes;
