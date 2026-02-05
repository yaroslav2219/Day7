import { router } from "./router.js";
import { msg } from "./msg.js";
import { popup } from "./popup.js";
import { header } from "./header.js";
import { toogle } from "./toogle.js";
import { img } from "./img.js";

document.addEventListener('DOMContentLoaded', () => {

  const WORKER_URL = 'https://twilight-night-3140.kya-pk22-6-3.workers.dev';

  const appConfig = {
    data() {
      return {
        url: WORKER_URL,

        user: {
          id: null,
          name: "",
          phone: "",
          email: "",
          date: "",
          auth: "",
          type: ""
        },

        title: "",

        formData: {
          email: "",
          password: ""
        }
      };
    },

    watch: {
      $route() {
        this.init();
      }
    },

    mounted() {
      this.init();
    },

    methods: {
      fixUrl(url) {
        if (!url) return '';
        return url.replace(/^http:/, 'https:');
      },

      initUser() {
        const stored = localStorage.getItem('user');
        if (stored) {
          this.user = JSON.parse(stored);
        }
      },

      init() {
        this.initUser();

        router.isReady().then(() => {
          if (!this.user?.id) {
            this.page('/');
            return;
          }

          const page = this.$route.path.split('/')[1] || '';

          if (this.user.type === 'admin') {
            if (!['campaigns', 'campaign', 'users', 'user'].includes(page)) {
              this.page('/campaigns');
            }
          } else {
            if (!['statistics', 'ads', 'sites', 'payments'].includes(page)) {
              this.page('/statistics');
            }
          }

          this.updateTitle();
        });
      },

      logout() {
        this.user = {
          id: null,
          name: "",
          phone: "",
          email: "",
          date: "",
          auth: "",
          type: ""
        };
        localStorage.removeItem('user');
        this.page('/');
      },

      page(path) {
        this.$router.replace(path);
      },

      updateTitle() {
        this.title = this.$route.name || '';
        document.title = this.title;
      },

      toFormData(obj) {
        const fd = new FormData();
        for (const key in obj) {
          fd.append(key, obj[key]);
        }
        return fd;
      }
    }
  };

  const app = Vue.createApp(appConfig);

  app.component('img', img);
  app.component('toogle', toogle);
  app.component('Header', header);
  app.component('popup', popup);
  app.component('msg', msg);

  app.use(router);
  app.mount('#content');
});
