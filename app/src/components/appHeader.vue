<template>
  <v-toolbar
    color="blue darken-3"
    dark
    app
    :clipped-left="$vuetify.breakpoint.mdAndUp"
    fixed
  >
    <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
      <v-toolbar-side-icon @click.stop="toggleNavDrawer"></v-toolbar-side-icon>
      <span >Nyart</span>
    </v-toolbar-title>
    <search-input
      class="hidden-sm-and-down"
    />
    <v-spacer></v-spacer>
    <logout-button />
  </v-toolbar>
</template>

<script>
  import LogoutButton from './logoutButton';
  import { SearchInput } from './search';

  export default {
    name: 'app-header',
    components: { LogoutButton, SearchInput },
    methods: {
      toggleNavDrawer() {
        this.$emit('toggle-nav-drawer');
      }
    }
  };
</script>
