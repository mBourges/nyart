<template>
  <v-container fluid grid-list-sm>
    <v-layout row wrap>
      <v-flex>
        <div class="display-1">
          Search <span v-if="total">({{ total }} Results)</span>
        </div>
      </v-flex>
      <v-flex xs12 sm3 v-for="result in results" :key="result._id">
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
      total() {
        return this.$store.state.search.resultTotal;
      },
      results() {
        return this.$store.state.search.results;
      }
    }
  };
</script>