<template>
  <v-container>
    <v-layout v-if="isSearching">
      <v-flex xs12 d-flex align-center class="mt-5">
        <v-progress-circular  indeterminate :size="75" color="primary"></v-progress-circular>
      </v-flex>
    </v-layout>
    <search-results v-else />
  </v-container>
</template>

<script>
  import { SearchResults } from '@/components/search';

  export default {
    name: 'search',
    components: { SearchResults },
    computed: {
      isSearching() {
        return this.$store.state.search.isSearching;
      },
      searchState() {
        return this.$store.state.search;
      }
    }
  };
</script>