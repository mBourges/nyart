<template>
  <v-text-field
    :flat="$vuetify.breakpoint.mdAndUp"
    :solo="$vuetify.breakpoint.smAndDown"
    :solo-inverted="$vuetify.breakpoint.mdAndUp"
    prepend-icon="search"
    label="Search"
    v-model="query"
    @keyup.enter="search"
  ></v-text-field>
</template>

<script>
  export default {
    name: 'search-input',
    props: ['flat', 'soloInverted'],
    computed: {
      query: {
        get() {
          return this.$store.state.search.query;
        },
        set(value) {
          this.$store.commit('search/updateQuery', value);
        }
      }
    },
    methods: {
      search() {
        this.$store.dispatch('search/search');
        this.$router.push('/search');
      }
    }
  };
</script>