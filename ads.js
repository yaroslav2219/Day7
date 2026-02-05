console.log('ads module loaded');

export const ads = {
  data() {
    return {
      parent: null,
      loader: false,

      items: [],

      popupActive: false,
      popupImage: ''
    };
  },

  mounted() {
    this.parent = this.$root;

    if (!this.parent?.user?.id) {
      console.warn('NO AUTH USER');
      this.parent.logout();
      return;
    }

    this.getAds();
  },

  methods: {
    async getAds() {
      this.loader = true;

      try {
        const res = await axios.post(
          `${this.parent.url}/site/getAds?auth=${this.parent.user.id}`
        );

        this.items = Array.isArray(res.data.items)
          ? res.data.items.map(item => ({
              ...item,
              image: this.parent.fixUrl(item.image)
            }))
          : [];

      } catch (e) {
        console.error(e);
      } finally {
        this.loader = false;
      }
    },

    openPopup(image) {
      this.popupImage = image;
      this.popupActive = true;
    },

    closePopup() {
      this.popupActive = false;
      this.popupImage = '';
    },

    copyLink(link) {
      if (!link) return;

      navigator.clipboard.writeText(link).then(() => {
        this.$refs.header.$refs.msg.successFun('Link copied');
      });
    }
  },

  template: `
<div class="inside-content">

  <Header ref="header" />

  <div v-if="loader" id="spinner"></div>

  <div class="wrapper">

    <div class="panel">
      <h1>Ads</h1>
    </div>

    <div class="table" v-if="items.length">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Campaign</th>
            <th>Link</th>
            <th class="actions"></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td>{{ item.id }}</td>

            <td>
              <img v-if="item.image" :src="item.image" class="thumb" @click="openPopup(item.image)" />
            </td>

            <td>{{ item.campaign }}</td>

            <td class="link">
              {{ item.link }}
            </td>

            <td class="actions">
              <a href="#" @click.prevent="copyLink(item.link)">
                <i class="fas fa-copy"></i>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="empty" v-else>No ads</div>
  </div>

  <div v-if="popupActive" class="popup-back" @click="closePopup"></div>

  <div v-if="popupActive" class="popup popup-image">
    <div class="head-popup">
      <span>Banner preview</span>
      <a href="#" @click.prevent="closePopup">&times;</a>
    </div>

    <div class="popup-inner ac">
      <img :src="popupImage" class="popup-img" />
    </div>
  </div>

</div>
`
};
