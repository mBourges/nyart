<template>
  <v-container fluid grid-list-sm>
    <v-layout row wrap>
      <v-flex xs12 sm4 v-for="result in results" :key="result._id" class="pa-1">
        <dynamic-card :record="result" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { DynamicCard } from '../cards';

  export default {
    name: 'searchResults',
    components: { DynamicCard },
    computed: {
      results() {
        return this.$store.state.search.results;
      }
    }
  };
</script>