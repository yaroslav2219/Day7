console.log('ads module loaded (hard html)');

export const ads = {
  data() {
    return {
      parent: null
    };
  },

  mounted() {
    this.parent = this.$root;

    if (!this.parent?.user?.id || this.parent.user.type !== 'user') {
      this.$router.replace('/');
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
          <th>ID</th>
          <th>Campaign</th>
          <th>Views</th>
          <th>Clicks</th>
          <th>Leads</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>101</td>
          <td>Crypto UA</td>
          <td>1 250</td>
          <td>210</td>
          <td>18</td>
          <td class="green">Active</td>
        </tr>

        <tr>
          <td>102</td>
          <td>Finance EU</td>
          <td>980</td>
          <td>140</td>
          <td>9</td>
          <td class="green">Active</td>
        </tr>

        <tr>
          <td>103</td>
          <td>Dating PL</td>
          <td>430</td>
          <td>52</td>
          <td>3</td>
          <td class="red">Paused</td>
        </tr>
      </tbody>
    </table>
  </div>

</div>
`
};
