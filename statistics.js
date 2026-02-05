export const statistics = {
  name: 'statistics',

  data() {
    return {
      parent: null,
      loader: false,
      items: []
    };
  },

  mounted() {
    this.parent = this.$root;

    const user = this.parent?.user;

    // 🔒 Доступ ТІЛЬКИ для конкретного користувача
    if (!user || user.email !== 'yaroslav@mail.com') {
      // ❗ захист від зациклення
      if (this.$route.path !== '/') {
        this.$router.replace('/');
      }
      return;
    }

    this.getStatistic();
  },

  methods: {
    async getStatistic() {
      this.loader = true;

      try {
        const res = await axios.post(
          this.parent.url + '/site/getUserStatistic',
          this.parent.toFormData({
            user_id: this.parent.user.id
          })
        );

        this.items = Array.isArray(res?.data?.items)
          ? res.data.items.map(i => ({
              ...i,
              image: this.parent.fixUrl(i.image)
            }))
          : [];
      } catch (err) {
        console.error('Statistic error:', err);
        this.items = [];
      } finally {
        this.loader = false;
      }
    }
  },

  template: `
    <div class="inside-content">
      <Header />

      <h1>My statistics</h1>

      <div v-if="loader" id="spinner"></div>

      <table v-if="!loader && items.length">
        <tr>
          <th>Leads</th>
          <th>Clicks</th>
          <th>Views</th>
          <th>Campaign</th>
          <th></th>
        </tr>

        <tr v-for="i in items" :key="i.id">
          <td>{{ i.leads }}</td>
          <td>{{ i.clicks }}</td>
          <td>{{ i.views }}</td>
          <td>{{ i.campaign }}</td>
          <td>
            <img
              v-if="i.image"
              :src="i.image"
              style="height:32px"
              alt=""
            >
          </td>
        </tr>
      </table>

      <p v-if="!loader && !items.length">
        No statistics available
      </p>
    </div>
  `
};
