export const login = {
  data() {
    return {
      img: 1,
      parent: ''
    }
  },

  mounted() {
    this.img = this.randomIntFromInterval(1, 7);
    this.parent = this.$parent.$parent;
  },

  methods: {
    randomIntFromInterval(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },

    login() {
      const self = this;
      const form = self.parent.formData;

      const usersDB = [
        { id: 23, name: 'Yan Basok', email: 'basok@mail.com', phone: '0963346617', type: 'user' },
        { id: 25, name: 'Doron Ben David', email: 'doron@dreamview.co.il', phone: '0506435555', type: 'user' },
        { id: 1, name: 'Admin', email: 'admin@admin.com', phone: '', type: 'admin' }
      ];

      const found = usersDB.find(u => u.email === form.email && form.password === '1234');

      if (!found) {
        self.$refs.msg.alertFun('Невірний логін або пароль');
        return;
      }

      self.parent.user = found;
      window.localStorage.setItem('user', JSON.stringify(found));

      if (found.type === 'admin') {
        self.parent.page('/campaigns');
      } else {
        self.parent.page('/statistics');
      }
    }
  },

  template: `
  <div class="flex">
    <msg ref="msg"/>
    <div id="left-area" class="w40">
      <div class="header">
        <div class="wrapper flex">
          <div class="w40 logo">
            <img :src="parent.url+'/app/views/images/logo.svg'" />
          </div>
          <div class="w60 al">
            <h1>Affiliate Sign in</h1>
          </div>
        </div>
      </div>

      <div class="form inner-form p20">
        <form @submit.prevent="login()" v-if="parent.formData">
          <div class="row">
            <label>Email</label>
            <input type="email" v-model="parent.formData.email" required />
          </div>

          <div class="row">
            <label>Password</label>
            <input type="password" v-model="parent.formData.password" required autocomplete="on" />
          </div>

          <div class="row">
            <small>Пароль для всіх користувачів: <strong>1234</strong></small>
          </div>

          <div class="row">
            <button class="btn">Sign in</button>
          </div>
        </form>
      </div>
    </div>

    <div id="right-area" class="w60">
      <img :src="parent.url+'/app/views/images/Cover_'+img+'.jpg'" />
    </div>
  </div>
  `
};
