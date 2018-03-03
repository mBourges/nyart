<script>
  import Flag from './flag';

  function flagWithIcon(flagComponent) {
    return {
      functional: true,
      render(h, { props: { country } }) {
        if (!country) {
          return null;
        }

        return h('v-avatar', { props: { tile: true, size: 20 } }, [
          h(flagComponent, { props: { country } })
        ]);
      }
    };
  }

  export default flagWithIcon(Flag);
</script>