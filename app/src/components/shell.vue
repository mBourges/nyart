<template>
  <v-app>
    <app-header @toggle-nav-drawer="toggleDrawer(!isOpen)" />
    <v-navigation-drawer
      fixed
      :clipped="$vuetify.breakpoint.mdAndUp"
      app
      :value="isOpen"
      @input="toggleDrawer"
     >
      <v-container fluid>
        <search-input class="hidden-md-and-up" />
      </v-container>
      <nav-menu />
    </v-navigation-drawer>
    <v-content class="content-full">
      <v-container fluid fill-height class="px-0 py-0">
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import AppHeader from './appHeader';
  import NavMenu from './navMenu';
  import { SearchInput } from './search';

  export default {
    components: { AppHeader, NavMenu, SearchInput },
    data() {
      return { drawer: null };
    },
    computed: {
      isOpen() {
        return this.$store.state.app.navDrawer;
      },
      state() {
        return this.$store.state.user;
      }
    },
    methods: {
      toggleDrawer(v) {
        this.$store.commit('app/toggleDrawer', v);
      }
    }
  };
</script>
