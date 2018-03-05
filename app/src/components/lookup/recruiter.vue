<template>
  <lookup
    label="Recruiter"
    index="config"
    type="doc"
    :formatItem="format"
    extraQuery="Type:User"
    :value="value"
    @change="handleChange"
    item-text="Name"
    item-value="id"
    prepend-icon="mdi-account-star"
  />
</template>

<script>
  import firebullet from '@/lib/firebullet';
  import lookup from './lookup';

  export default {
    name: 'recruiter-lookup',
    components: { lookup },
    props: [ 'value' ],
    methods: {
      format(item) {
        const { Firstname, Lastname } = item._source;

        return {
          id: item._id,
          Name: `${Firstname || ''} ${Lastname || ''}`
        };
      },
      handleChange(value) {
        if (!value) {
          this.$emit('change', null);
        } else {
          const recruiter = {
            ...value,
            ref: firebullet.generateRef('Users', value.id)
          };

          this.$emit('value', recruiter);
        }
      }
    }
  };
</script>