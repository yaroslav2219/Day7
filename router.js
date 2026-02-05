import { login } from './login.js';
import { statistics } from './statistics.js';
import { ads } from './ads.js';
import { sites } from './sites.js';
import { payments } from './payments.js';
import { campaigns } from './campaigns.js';
import { users } from './users.js';

export const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes: [
    { path: '/', name: 'Login', component: login },

    // Адмінські маршрути
    { path: '/campaigns', name: 'Campaigns', component: campaigns, meta:{role:'admin'} },
    { path: '/campaign/:id', name: 'Campaign', component: campaigns, meta:{role:'admin'} },
    { path: '/users', name: 'Users', component: users, meta:{role:'admin'} },
    { path: '/user/:id', name: 'User', component: users, meta:{role:'admin'} },

    // Користувацькі маршрути
    { path: '/statistics', name: 'Statistics', component: statistics, meta:{role:'user'} },
    { path: '/ads', name: 'Ads', component: ads, meta:{role:'user'} },
    { path: '/sites', name: 'Sites', component: sites, meta:{role:'user'} },
    { path: '/payments', name: 'Payments', component: payments, meta:{role:'user'} }
  ]
});
