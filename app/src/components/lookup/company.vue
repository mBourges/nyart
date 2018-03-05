<template>
  <lookup
    label="Company"
    index="companies"
    type="doc"
    :formatItem="format"
    :value="value"
    @change="handleChange"
    item-text="Name"
    item-value="id"
    prepend-icon="business"
  />
</template>

<script>
  import firebullet from '@/lib/firebullet';
  import lookup from './lookup';

  export default {
    name: 'company-lookup',
    components: { lookup },
    props: [ 'value' ],
    methods: {
      format(item) {
        const { Name } = item._source;

        return {
          id: item._id,
          Name
        };
      },
      handleChange(value) {
        if (!value) {
          this.$emit('change', null);
        } else {
          const company = {
            ...value,
            ref: firebullet.generateRef('Company', value.id)
          };

          this.$emit('change', company);
        }
      }
    }
  };
</script>