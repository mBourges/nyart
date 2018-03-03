<script>
  export default {
    functional: true,
    render(h, { props: { country } }) {
      const countryCode = country && country.toLowerCase();
      const flagUrl = countryCode && `/static/img/flags/${countryCode}.svg`;

      return flagUrl && h('img', {
        attrs: { src: flagUrl }
      });
    }
  };
</script>