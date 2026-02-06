console.log('sites module loaded');

const API_URL = 'https://affiliate.yanbasok.com';

export const sites = {
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

    this.getSites();
  },

  methods: {

    async getSites() {
      this.loader = true;

      try {
        const res = await axios.post(
          API_URL + '/site/getUserSites',
          this.parent.toFormData({ user_id: this.parent.user.id })
        );

        this.items = Array.isArray(res.data.items)
          ? res.data.items
          : [];
      } catch (e) {
        console.error('getSites error:', e);
      } finally {
        this.loader = false;
      }
    },

    async toggleSite(item, value) {
      const old = item.active;
      item.active = value;

      try {
        await axios.post(
          API_URL + '/site/actionSite',
          this.parent.toFormData({
            id: item.id,
            active: value
          })
        );
      } catch (e) {
        console.error('toggleSite error:', e);
        item.active = old;
      }
    }

  },

  template: `
<div class="inside-content">
  <Header />

  <h1>Sites</h1>

  <div v-if="loader" id="spinner"></div>

  <div v-if="items.length" class="table">
    <table>
      <thead>
        <tr>
          <th>Fraud</th>
          <th>Leads</th>
          <th>Clicks</th>
          <th>Views</th>
          <th>Site</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>{{ item.fclicks || 0 }}</td>
          <td>{{ item.leads || 0 }}</td>
          <td>{{ item.clicks || 0 }}</td>
          <td>{{ item.views || 0 }}</td>

          <td>
            <a :href="item.site" target="_blank">
              {{ item.site }}
            </a>
          </td>

          <td class="actions">
            <toogle
              :modelValue="item.active"
              @update:modelValue="toggleSite(item, $event)"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div v-else class="empty">
    No sites
  </div>
</div>
`
};
