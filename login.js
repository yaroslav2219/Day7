export const login = {
  data() {
    return {
      parent: null,
      img: 1,
      loading: false
    };
  },

  mounted() {
    this.parent = this.$root;

    // Ініціалізація форми
    if (!this.parent.formData) {
      this.parent.formData = { email: '', password: '' };
    }

    this.img = this.randomIntFromInterval(1, 7);
  },

  methods: {
    randomIntFromInterval(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },

    async login() {
      const { email, password } = this.parent.formData || {};

      if (!email || !password) {
        this.$refs.msg.alertFun('Enter email and password');
        return;
      }

      this.loading = true;

      try {
        // 🔹 Локальний користувач
        if (email === 'yaroslav@mail.com' && password === '123456') {
          this.parent.user = {
            id: 1,
            name: 'Yaroslav',
            email: 'yaroslav@mail.com',
            type: 'user'
          };
          window.localStorage.setItem('user', JSON.stringify(this.parent.user));
          this.parent.page('/statistics');
          return;
        }

        // 🔹 Локальний адмін
        if (email === 'admin@mail.com' && password === 'admin123') {
          this.parent.user = {
            id: 999,
            name: 'Admin',
            email: 'admin@mail.com',
            type: 'admin'
          };
          window.localStorage.setItem('user', JSON.stringify(this.parent.user));
          this.parent.page('/campaigns');
          return;
        }

        // const res = await axios.post(
        //   `${this.parent.url || ''}/site/login`,
        //   this.parent.toFormData(this.parent.formData)
        // );
        // if (res.data?.error) this.$refs.msg.alertFun(res.data.error);
        // else if (!res.data?.user) this.$refs.msg.alertFun('Login failed');
        // else {
        //   this.parent.user = res.data.user;
        //   window.localStorage.setItem('user', JSON.stringify(this.parent.user));
        //   this.parent.page(this.parent.user.type === 'admin' ? '/campaigns' : '/statistics');
        // }

        this.$refs.msg.alertFun('Invalid credentials (local test only)');
      } catch (e) {
        console.error('LOGIN ERROR:', e);
        this.$refs.msg.alertFun('Network error');
      } finally {
        this.loading = false;
      }
    }
  },

  template: `
<div class="flex">
  <msg ref="msg" />

  <div id="left-area" class="w40">
    <div class="header">
      <div class="wrapper flex">
        <div class="w40 logo">
          <img :src="parent?.url + '/favicon.ico'" />
        </div>
        <div class="w60 al">
          <h1>Affiliate Sign in</h1>
        </div>
      </div>
    </div>

    <div class="form inner-form p20" v-if="parent && parent.formData">
      <form @submit.prevent="login">
        <div class="row">
          <label>Email</label>
          <input type="email" v-model="parent.formData.email" required autocomplete="username" />
        </div>

        <div class="row">
          <label>Password</label>
          <input type="password" v-model="parent.formData.password" required autocomplete="current-password" />
        </div>

        <div class="row">
          <button class="btn" :disabled="loading">
            <span v-if="loading">Signing in...</span>
            <span v-else>Sign in</span>
          </button>
        </div>
      </form>
    </div>
  </div>

  <div id="right-area" class="w60">
    <img :src="parent?.url + '/app/views/images/Cover_' + img + '.jpg'" />
  </div>
</div>
`
};
