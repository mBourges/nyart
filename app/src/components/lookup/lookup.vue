<template>
  <v-select
    :label="label"
    autocomplete
    :loading="loading"
    required
    :items="items"
    :search-input.sync="search"
    :value="value"
    @input="handleValueChanged"
    :clearable="clearable"
    return-object
    :item-text="itemText"
    :item-value="itemValue"
    :prepend-icon="prependIcon"
  />
</template>

<script>
  import debounce from 'debounce';
  import Elastic from '@/lib/elastic';

  export default {
    name: 'lookup',
    props: ['label', 'value', 'index', 'type', 'extraQuery', 'formatItem', 'clearable', 'itemText', 'itemValue', 'prependIcon'],
    data() {
      return {
        loading: false,
        items: [],
        search: null
      };
    },
    beforeMount() {
      this.elastic = new Elastic();
      this.elastic
        .setIndex(this.index)
        .setType(this.type)
        .size(15);

      if (this.value) {
        this.items = [ this.value ];
      }
    },
    watch: {
      search(val) {
        val && this.querySelections(val);
      }
    },
    methods: {
      handleValueChanged(value) {
        this.$emit('change', value || {});
      },
      querySelections: debounce(function (v) {
        this.loading = true;
        const that = this;
        const searchText = `${v}*`;
        const query = this.extraQuery ? searchText + ' ' + this.extraQuery : searchText;

        this.elastic.query(query)
          .search()
          .then(response => {
            that.items = response.hits.hits.map(that.formatItem);
            console.log(that.items);

            that.loading = false;
          });
      }, 300)
    }
  };
</script>
