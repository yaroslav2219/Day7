console.log('payments module loaded');

const API_URL = 'https://affiliate.yanbasok.com';

export const payments = {
  data() {
    return {
      parent: null,
      loader: false,
      items: []
    };
  },

  mounted() {
    this.parent = this.$root;

    // ✅ правильна перевірка доступу
    if (!this.parent?.user?.id || this.parent.user.type !== 'user') {
      this.$router.replace('/');
      return;
    }

    this.getPayments();
  },

  methods: {

    async getPayments() {
      this.loader = true;

      try {
        const res = await axios.post(
          API_URL + '/site/getUserPayments',
          this.parent.toFormData({ user_id: this.parent.user.id })
        );

        this.items = Array.isArray(res.data.items)
          ? res.data.items
          : [];
      } catch (e) {
        console.error('getPayments error:', e);
      } finally {
        this.loader = false;
      }
    }

  },

  template: `
<div class="inside-content">
  <Header />

  <h1>Payments</h1>

  <div v-if="loader" id="spinner"></div>

  <div class="table" v-if="items.length">
    <table>
      <thead>
        <tr>
          <th class="id">#</th>
          <th>Description</th>
          <th>Date</th>
          <th>Value</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(item, index) in items" :key="item.id || index">
          <td class="id">{{ index + 1 }}</td>
          <td>{{ item.description }}</td>
          <td>{{ item.date_title || item.date }}</td>
          <td>{{ item.value }}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="empty" v-else>
    No payments
  </div>
</div>
`
};
