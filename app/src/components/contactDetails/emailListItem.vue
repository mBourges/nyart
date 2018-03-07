<template>
    <v-list-tile avatar>
      <v-list-tile-avatar>
        <v-icon>mdi-at</v-icon>
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title>
          {{ email.Address }}
        </v-list-tile-title>
        <v-list-tile-sub-title>{{ email.Type }}</v-list-tile-sub-title>
      </v-list-tile-content>
    </v-list-tile>
</template>

<script>
  export default {
    name: 'email-list-item',
    props: [ 'email' ]
  };
</script>
