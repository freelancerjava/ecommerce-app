import { WelcomePage } from './';
import LoginForm from './LoginForm';
import Products from './Products';
import SearchProducts from './SearchProducts';

export default {
  path: '',
  component: WelcomePage,
  childRoutes: [
    { path:'products', component: Products, isIndex: true},
    { path:'search', component: SearchProducts}
  ],
};
