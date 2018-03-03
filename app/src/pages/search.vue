<template>
  <v-layout column>
    <v-flex>
      <div class="display-1">
        Search <span v-if="total">({{ total }} Results)</span>
      </div>
    </v-flex>
    <v-flex xs12 class="scrollable">
      <v-layout v-if="isSearching">
        <v-flex xs12 d-flex align-center class="mt-5">
          <v-progress-circular  indeterminate :size="75" color="primary"></v-progress-circular>
        </v-flex>
      </v-layout>
      <v-container v-else class=" fluid px-1 py-1">
        <v-layout row>
          <search-results />
        </v-layout>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
  import { SearchResults } from '@/components/search';

  export default {
    name: 'search',
    components: { SearchResults },
    computed: {
      total() {
        return this.$store.state.search.resultTotal;
      },
      isSearching() {
        return this.$store.state.search.isSearching;
      },
      searchState() {
        return this.$store.state.search;
      }
    }
  };
</script>