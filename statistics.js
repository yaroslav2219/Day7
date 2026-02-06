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

  template: `
<div class="inside-content">
  <Header />

  <h1>Statistics</h1>

  <div class="table">
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Views</th>
          <th>Clicks</th>
          <th>Leads</th>
          <th>Fraud</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>2025-01-01</td>
          <td>540</td>
          <td>120</td>
          <td>14</td>
          <td>2</td>
        </tr>

        <tr>
          <td>2025-01-02</td>
          <td>420</td>
          <td>95</td>
          <td>10</td>
          <td>1</td>
        </tr>

        <tr>
          <td>2025-01-03</td>
          <td>610</td>
          <td>150</td>
          <td>18</td>
          <td>0</td>
        </tr>
      </tbody>
    </table>
  </div>

</div>
`
};
