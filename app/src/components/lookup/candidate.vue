<template>
  <v-select
    label="Candidate"
    extra-query="AND Type:candidate"
    autocomplete
    :loading="loading"
    required
    :items="items"
    :search-input.sync="search"
    :value="value"
    @input="handleChange"
    clearable
    return-object
    prepend-icon="person"
    item-text="Name"
    item-value="id"
    :rules="rules"
  >
    <template slot="item" slot-scope="data">
      <v-list-tile-content>
        <v-list-tile-title>{{ data.item.Name }}</v-list-tile-title>
        <v-list-tile-sub-title>{{ data.item.Company }}</v-list-tile-sub-title>
      </v-list-tile-content>
    </template>
  </v-select>
</template>

<script>
  import debounce from 'debounce';
  import Elastic from '@/lib/elastic';
  import firebullet from '@/lib/firebullet';

  export default {
    name: 'candidate-lookup',
    props: ['value', 'rules'],
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
      formatItem(item) {
        const { Firstname, Lastname, Company } = item._source;

        return {
          id: item._id,
          Name: `${Firstname || ''} ${Lastname || ''}`,
          Company: Company.Name
        };
      },
      handleChange(value) {
        const candidate = {
          ...value,
          ref: firebullet.generateRef('Candidate', value.id)
        };

        this.$emit('value', candidate);
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
