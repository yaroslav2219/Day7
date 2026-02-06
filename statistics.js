export const statistics = {
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
    toggleItem(item, value) {
      // просто міняємо локально для демо
      item.active = value;
    }
  },

  template: `
<div class="inside-content">
  <Header />

  <h1>My statistics</h1>

  <div class="table">
    <table>
      <thead>
        <tr>
          <th>Fraud</th>
          <th>Leads</th>
          <th>Clicks</th>
          <th>Views</th>
          <th>Campaign</th>
          <th>Link</th>
          <th></th> <!-- фото -->
          <th></th> <!-- toggle -->
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in [
          {id:1, fclicks:5, leads:12, clicks:200, views:1500, campaign:'dreamiew-seo', link:'https://dreamview-seo.co.il', image:'./dreamview-seo.png', active:false},
          {id:2, fclicks:2, leads:7, clicks:120, views:980, campaign:'dreamiew-seo', link:'https://dreamview-seo.co.il', image:'./dreamview-seo.png', active:false},
          {id:3, fclicks:0, leads:3, clicks:60, views:430, campaign:'ineedjob', link:'https://ineedjob.co.il', image:'./ineedjob.png', active:false}
        ]" :key="item.id">

          <td>{{ item.fclicks }}</td>
          <td>{{ item.leads }}</td>
          <td>{{ item.clicks }}</td>
          <td>{{ item.views }}</td>
          <td>{{ item.campaign }}</td>
          <td><a :href="item.link" target="_blank">{{ item.link }}</a></td>
          <td><img :src="item.image" style="height:32px" /></td>
          <td>
            <toogle 
              :modelValue="item.active"
              @update:modelValue="toggleItem(item, $event)"
            />
          </td>

        </tr>
      </tbody>
    </table>
  </div>
</div>
`
};

