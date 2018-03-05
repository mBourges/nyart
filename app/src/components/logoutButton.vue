<template>
  <v-tooltip bottom>
    <v-btn icon @click="logout" slot="activator">
      <v-icon>exit_to_app</v-icon>
    </v-btn>
    <span>logout</span>
  </v-tooltip>
</template>

<script>
  import { auth } from '@/lib/firebase';

  export default {
    name: 'logout-button',
    methods: {
      logout() {
        auth.signOut()
          .then(() => this.$router.replace('login'));
      }
    }
  };
</script>
