// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
} from './';
import LoginForm from './LoginForm';

export default {
  path: 'auth',
  component: LoginForm,
  childRoutes: [
  ],
};
