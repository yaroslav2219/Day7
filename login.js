export const login = {
  data() {
    return {
      parent: '',
      formData: { email:'', password:'' }
    };
  },

  mounted() {
    this.parent = this.$root;
  },

  methods: {
    login() {
      this.parent.loginMock(this.formData.email);
    }
  },

  template: `
    <div class="inside-content">
      <h1>Login</h1>
      <form @submit.prevent="login">
        <div>
          <label>Email:</label>
          <input type="email" v-model="formData.email" required>
        </div>
        <div>
          <label>Password:</label>
          <input type="password" v-model="formData.password" required>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  `
};
