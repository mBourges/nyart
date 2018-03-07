<template>
  <record-details :type="type" />
</template>

<script>
  import RecordDetails from '@/components/details';

  export default {
    components: { RecordDetails },
    beforeMount() {
      this.$store.dispatch('details/fetch', {
        type: this.type,
        id: this.id
      });
    },
    destroyed() {
      this.$store.dispatch('details/clear');
    },
    computed: {
      type() {
        return this.$route.params.type;
      },
      id() {
        return this.$route.params.id;
      }
    }
  };
</script>