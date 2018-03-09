<template>
  <v-list :dense="$vuetify.breakpoint.smAndDown">
    <v-layout row align-center>
      <v-flex xs6>
        <v-subheader>{{ label }}</v-subheader>
      </v-flex>
      <v-flex xs6 class="text-xs-center">
        <v-btn flat icon color="accent">
          <v-icon :small="$vuetify.breakpoint.smAndDown">edit</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
    <v-list-tile two-line v-for="(code, index) in codes" :key="index">
      <v-list-tile-content>
        <v-list-tile-title>
          {{ code.Code }}
        </v-list-tile-title>
        <v-list-tile-sub-title>{{ code.Category }}</v-list-tile-sub-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>

<script>
  export default {
    name: 'codes-display',
    props: [ 'label', 'codes' ]
  };
</script>
