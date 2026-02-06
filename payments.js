export const payments = {
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

  <h1>Payments</h1>

  <div class="table">
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Description</th>
          <th>Date</th>
          <th>Value</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>1</td>
          <td>Affiliate payout</td>
          <td>2025-01-10</td>
          <td>$120.00</td>
        </tr>

        <tr>
          <td>2</td>
          <td>Bonus payout</td>
          <td>2025-02-01</td>
          <td>$50.00</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
`
};
