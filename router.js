import { login } from './login.js'
import { campaigns } from './campaigns.js'
import { campaign } from './campaign.js'
import { users } from './users.js'
import { user } from './user.js'
import { statistics } from './statistic.js'
import { ads } from './ads.js'
import { sites } from './sites.js'
import { payments } from './payments.js'

const Empty = (title) => ({
  template: `<div class="inside-content"><h1>${title}</h1></div>`
})

export const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),

  routes: [
    {
      path: '/',
      name: 'Login',
      component: login
    },

    {
      path: '/campaigns',
      name: 'Campaigns',
      component: campaigns,
      meta: { role: 'admin' }
    },
    {
      path: '/campaign/:id',
      name: 'Campaign',
      component: campaign,
      meta: { role: 'admin' }
    },
    {
      path: '/users',
      name: 'Users',
      component: users,
      meta: { role: 'admin' }
    },
    {
      path: '/user/:id',
      name: 'User',
      component: user,
      meta: { role: 'admin' }
    },

    {
      path: '/statistic',
      name: 'Statistics',
      component: statistic,
      meta: { role: 'user' }
    },
    {
      path: '/ads',
      name: 'Ads',
      component: ads,
      meta: { role: 'user' }
    },
    {
      path: '/sites',
      name: 'Sites',
      component: sites,
      meta: { role: 'user' }
    },
    {
      path: '/payments',
      name: 'Payments',
      component: payments,
      meta: { role: 'user' }
    }
  ]
})

