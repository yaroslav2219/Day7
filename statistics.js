export const statistics = {
  data() {
    return {
      parent: null,
      loader: false,
      items: []
    };
  },

  mounted() {
    this.parent = this.$root;

    if (!this.parent.user || this.parent.user.role !== 'user') {
        this.$router.push('/');
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
          this.parent.toFormData({ user_id: this.parent.user.id })
        );

        this.items = Array.isArray(res.data.items)
          ? res.data.items.map(i => ({
              ...i,
              image: this.parent.fixUrl(i.image)
            }))
          : [];
      } catch (e) {
        console.error(e);
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

  <table v-if="items.length">
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
        <img :src="i.image" style="height:32px">
      </td>
    </tr>
  </table>
</div>`
};
