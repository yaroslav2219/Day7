export const login = {
  data() {
    return {
      img: 1,
      parent: ''
    }
  },

  mounted() {
    this.img = Math.floor(Math.random() * 7) + 1;
    this.parent = this.$parent.$parent;

    // ініціалізація formData
    if (!this.parent.formData) {
      this.parent.formData = {
        email: '',
        password: ''
      };
    }
  },

  methods: {
    login() {
      const email = this.parent.formData.email;

      // ❗ ТІЛЬКИ ОДИН USER
      if (email !== 'yaroslav@mail.com') {
        this.$refs.msg.alertFun('Access denied');
        return;
      }

      const user = {
        id: 100,
        name: 'Yaroslav',
        user: 'Yaroslav', // ⚠️ потрібно для header
        email: 'yaroslav@mail.com',
        phone: '',
        type: 'user',     // 🔥 ВАЖЛИВО
        auth: { data: 100 }
      };

      this.parent.user = user;
      window.localStorage.setItem('user', JSON.stringify(user));

      // 👉 після логіну — тільки statistics
      this.parent.page('/statistics');
    }
  },

  template: `
  <div class="flex">
    <msg ref="msg"/>

    <div id="left-area" class="w40">
      <div class="header">
        <div class="wrapper flex">
          <div class="w40 logo">
            <img :src="parent.url + '/favicon.ico'" />
          </div>
          <div class="w60 al">
            <h1>Sign in</h1>
          </div>
        </div>
      </div>

      <div class="form inner-form p20">
        <form @submit.prevent="login">
          <div class="row">
            <label>Email</label>
            <input type="email" v-model="parent.formData.email" required />
          </div>

          <div class="row">
            <label>Password</label>
            <input type="password" v-model="parent.formData.password" />
          </div>

          <div class="row">
            <button class="btn">Sign in</button>
          </div>
        </form>
      </div>
    </div>

    <div id="right-area" class="w60">
      <img :src="parent.url + '/app/views/images/Cover_' + img + '.jpg'" />
    </div>
  </div>
  `
};
