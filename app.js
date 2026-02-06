import { router } from "./router.js";
import { msg } from "./msg.js";
import { popup } from "./popup.js";
import { header } from "./header.js";
import { toogle } from "./toogle.js";
import { img } from "./img.js";

document.addEventListener('DOMContentLoaded', function(){

  const WORKER_URL = 'https://affiliate.yanbasok.com'; 

  const appConfig = {
    data() {
      return {
        url: WORKER_URL,
        user: { id: null, name:"", phone:"", email:"", auth:"", type:"" },
        title: "",
        formData: {},
      }
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
      initUser() {
        const stored = window.localStorage.getItem('user');
        if(stored){
          this.user = JSON.parse(stored);
        }
      },

      init() {
        this.initUser();

        router.isReady().then(() => {
          const pathSegment = this.$route.path.split('/')[1] || '';

          // якщо не залогінений
          if(!this.user?.id){
            this.page('/');
            return;
          }

          // 🔹 доступ для admin
          const adminRoutes = ['campaigns','campaign','users','user'];
          // 🔹 доступ для user
          const userRoutes = ['statistic','ads','sites','payments'];

          if(this.user.type === 'admin'){
            if(!adminRoutes.includes(pathSegment)){
              this.page('/campaigns');
              return;
            }
          } else { // user
            if(!userRoutes.includes(pathSegment)){
              this.page('/statistic');
              return;
            }
          }

          this.updateTitle();
        });
      },

      logout() {
        this.user = { id:null, name:"", phone:"", email:"", auth:"", type:"" };
        window.localStorage.removeItem('user');
        this.page('/');
      },

      page(path=""){
        this.$router.replace(path).then(() => this.updateTitle());
      },

      updateTitle() {
        this.title = this.$route.name || '';
        document.title = this.title;
      },

      toFormData(obj){
        const fd = new FormData();
        for(const x in obj){
          if(typeof obj[x] === 'object' && x !== 'img' && x !== 'copy'){
            for(const y in obj[x]){
              if(typeof obj[x][y] === 'object'){
                for(const z in obj[x][y]){
                  fd.append(`${x}[${y}][${z}]`, obj[x][y][z]);
                }
              } else {
                fd.append(`${x}[${y}]`, obj[x][y]);
              }
            }
          } else if(x !== 'copy'){
            fd.append(x, obj[x]);
          }
        }
        return fd;
      }
    }
  };

  const app = Vue.createApp(appConfig)
    .component('img', img)
    .component('toogle', toogle)
    .component('Header', header)
    .component('popup', popup)
    .component('msg', msg);

  app.use(router).mount('#content');
});


