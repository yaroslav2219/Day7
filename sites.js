export const sites = {
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

  <h1>Sites</h1>

  <div class="table">
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
        <tr>
          <td>2</td>
          <td>14</td>
          <td>120</td>
          <td>540</td>
          <td>
            <a href="https://treepark.com" target="_blank">
              https://treepark.com
            </a>
          </td>
          <td>
            <toogle :modelValue="1" />
          </td>
        </tr>

        <tr>
          <td>0</td>
          <td>6</td>
          <td>80</td>
          <td>310</td>
          <td>
            <a href="https://lookingforjob.com" target="_blank">
              https://lookingforjob.com
            </a>
          </td>
          <td>
            <toogle :modelValue="0" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
`
};

