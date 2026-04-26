import Diet from '../pages/Diet';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Settings from '../pages/Settings';
import Training from '../pages/Training';

export const routes = {
  home: { path: '/', component: Home },
  login: { path: '/login', component: Login },
  training: { path: '/training', component: Training },
  diet: { path: '/diet', component: Diet },
  settings: { path: '/settings', component: Settings },
} as const;
