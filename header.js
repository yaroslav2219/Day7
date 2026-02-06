export const header = {
  data() {
    return {
      parent: null,
      active: false,
      menu: false
    };
  },

  mounted() {
    this.parent = this.$root;
  },

  methods: {
    toggleActive() {
      this.active = !this.active;
    },

    closeMenu() {
      this.menu = false;
    }
  },

  template: `
<header class="header">
  <div class="wrapper">
    <div class="flex">

      <div class="w20 logo">
        <img
          :src="parent?.url + '/favicon.ico'"
          style="cursor:pointer"
          @click="parent.page('/')"
        />
      </div>

      <!-- MENU -->
      <div class="w70">
        <div id="menu">
          <i class="fas fa-bars" @click="menu = true"></i>

          <!-- ADMIN MENU -->
          <ul
            v-if="parent?.user?.id && parent.user.type === 'admin'"
            :class="{ active: menu }"
          >
            <li class="al" v-if="menu">
              <i class="fas fa-times" @click="closeMenu"></i>
            </li>

            <li>
              <router-link
                to="/campaigns"
                @click="closeMenu"
              >
                Campaigns
              </router-link>
            </li>

            <li>
              <router-link
                to="/users"
                @click="closeMenu"
              >
                Users
              </router-link>
            </li>
          </ul>

          <ul
            v-else-if="parent?.user?.id"
            :class="{ active: menu }"
          >
            <li class="al" v-if="menu">
              <i class="fas fa-times" @click="closeMenu"></i>
            </li>

            <li>
              <router-link to="/statistic" @click="closeMenu">
                Statistics
              </router-link>
            </li>

            <li>
              <router-link to="/ads" @click="closeMenu">
                Ads
              </router-link>
            </li>

            <li>
              <router-link to="/sites" @click="closeMenu">
                Sites
              </router-link>
            </li>

            <li>
              <router-link to="/payments" @click="closeMenu">
                Payments
              </router-link>
            </li>
          </ul>
        </div>
      </div>

      <div
        class="w10 al"
        id="user-top"
        v-if="parent?.user?.id"
      >
        <div id="user-circle" @click="toggleActive">
          {{ (parent.user.name || parent.user.email || 'U')[0].toUpperCase() }}
        </div>

        <i class="fas fa-caret-down" @click="toggleActive"></i>

        <div id="user-info" :class="{ active: active }">
          <a href="#" @click.prevent="parent.logout()">
            <i class="fas fa-sign-out-alt"></i>
            Log out
          </a>
        </div>
      </div>

    </div>
  </div>

  <msg ref="msg" />
</header>
`
};

