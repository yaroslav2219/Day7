export const login = {
  data() {
    return {
      parent: {}, // 🔹 тут замість null
      img: 1,
      loading: false
    };
  },

  mounted() {
    this.parent = this.$root || {};
    this.img = this.randomIntFromInterval(1, 7);

    if (!this.parent.formData) {
      this.parent.formData = { email: '', password: '' };
    }
  },

  methods: {
    randomIntFromInterval(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },

    async login() {
      if (!this.parent.formData?.email || !this.parent.formData?.password) {
        this.$refs.msg.alertFun('Enter email and password');
        return;
      }

      this.loading = true;

      try {
        // 🔹 Локальний користувач
        if (
          this.parent.formData.email === 'yaroslav@mail.com' &&
          this.parent.formData.password === '123456'
        ) {
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

        // 🔹 Серверний логін (для адміна)
        const res = await axios.post(
          `${this.parent.url || ''}/site/login`,
          this.parent.toFormData(this.parent.formData)
        );

        if (res.data?.error) {
          this.$refs.msg.alertFun(res.data.error);
          return;
        }

        if (!res.data?.user) {
          this.$refs.msg.alertFun('Login failed');
          return;
        }

        this.parent.user = res.data.user;
        window.localStorage.setItem('user', JSON.stringify(this.parent.user));

        // Редірект по ролі
        if (this.parent.user.type === 'admin') {
          this.parent.page('/campaigns');
        } else {
          this.parent.page('/statistics');
        }

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

    <div class="form inner-form p20">
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
