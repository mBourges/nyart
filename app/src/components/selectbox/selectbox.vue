<template>
  <v-select
    v-model="selected"
    :label="label"
    :items="sources"
    :loading="isLoading"
  />
</template>

<script>
  export default {
    name: 'selectbox',
    props: [ 'label', 'type', 'value' ],
    beforeMount() {
      if (!this.sources) {
        this.$store.dispatch('app/fetchPicklist', this.type);
      }
    },
    computed: {
      isLoading() {
        return !this.sources;
      },
      sources() {
        return this.$store.state.app.picklists[this.type];
      },
      selected: {
        get() {
          return this.value;
        },
        set(value) {
          this.$emit('change', value);
        }
      }
    }
  };
</script>
