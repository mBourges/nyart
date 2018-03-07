<template>
    <v-list-tile avatar>
      <v-list-tile-avatar>
        <v-icon>phone</v-icon>
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title>
          {{ phone.Number }}
        </v-list-tile-title>
        <v-list-tile-sub-title>{{ phone.Type }}</v-list-tile-sub-title>
      </v-list-tile-content>
    </v-list-tile>
</template>

<script>
  export default {
    name: 'phone-list-item',
    props: [ 'phone' ]
  };
</script>
