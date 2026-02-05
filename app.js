import { router } from './router.js';
import { login } from './login.js';
import { header } from './header.js';
import { statistics } from './statistics.js';
import { ads } from './ads.js';
import { sites } from './sites.js';
import { payments } from './payments.js';
import { campaigns } from './campaigns.js';
import { users } from './users.js';

document.addEventListener('DOMContentLoaded', function() {

  const appConfig = {
    data() {
      return {
        user: { id:null, name:"", email:"", type:"" },
        title: "",
        formData: { email:'', password:'' }
      };
    },

    mounted() {
      this.initUser();
    },

    methods: {
      initUser() {
        const stored = window.localStorage.getItem('user');
        if(stored){
          this.user = JSON.parse(stored);
        }
      },

      loginMock(email) {
        if(email === 'yaroslav@mail.com') {
          // Звичайний користувач
          this.user = {
            id: 1,
            name: 'Yaroslav',
            email: 'yaroslav@mail.com',
            type: 'user'
          };
          window.localStorage.setItem('user', JSON.stringify(this.user));
          this.$router.replace('/statistics');
        }
        else if(email === 'admin@mail.com') {
          // Адмін
          this.user = {
            id: 2,
            name: 'Admin',
            email: 'admin@mail.com',
            type: 'admin'
          };
          window.localStorage.setItem('user', JSON.stringify(this.user));
          this.$router.replace('/campaigns');
        }
        else {
          alert('Невірний користувач');
        }
      },

      logout() {
        this.user = { id:null, name:"", email:"", type:"" };
        window.localStorage.removeItem('user');
        this.$router.replace('/');
      }
    }
  };

  const app = Vue.createApp(appConfig)
    .component('Header', header)
    .component('login', login)
    .component('statistics', statistics)
    .component('ads', ads)
    .component('sites', sites)
    .component('payments', payments)
    .component('campaigns', campaigns)
    .component('users', users);

  app.use(router).mount('#content');
});
