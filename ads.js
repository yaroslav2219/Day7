export const ads = {
  data() {
    return {
      parent: null
    };
  },

  mounted() {
    this.parent = this.$root;

    // тільки user
    if (!this.parent?.user?.id || this.parent.user.type !== 'user') {
      this.$router.replace('/');
    }
  },

  methods: {
    copyLink(link) {
      navigator.clipboard.writeText(link)
        .then(() => alert('Link copied!'))
        .catch(() => alert('Failed to copy'));
    }
  },

  template: `
<div class="inside-content">
  <Header />

  <h1>Ads</h1>

  <div class="table">
    <table>
      <thead>
        <tr>
          <th class="id">#</th>
          <th>Campaign</th>
          <th>Link</th>
          <th></th> <!-- фото -->
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(item, index) in [
          {id:1, campaign:'dreamview-seo', link:'https://dreamview-seo.co.il', image:'./dreamview-seo.png'},
          {id:2, campaign:'ineedjob', link:'https://ineedjob.co.il', image:'./ineedjob.png'},
          {id:3, campaign:'dreamview-seo', link:'https://dreamview-seo.co.il', image:'./dreamview-seo.png'}
        ]" :key="item.id">

          <td class="id">{{ index + 1 }}</td>
          <td>{{ item.campaign }}</td>
          <td><a :href="item.link" target="_blank">{{ item.link }}</a></td>
          <td><img :src="item.image" style="height:32px" /></td>
          <td>
            <button class="btn" @click="copyLink(item.link)">Copy</button>
          </td>

        </tr>
      </tbody>
    </table>
  </div>
</div>
`
};
