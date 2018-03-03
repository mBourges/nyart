<script>
  import CandidateForm from './candidate';

  export default {
    functional: true,
    render(h, { props, listeners }) {
      const { type, ...rest } = props;
      let component = null;

      if (type === 'candidate') {
        component = CandidateForm;
      }

      return h(component, { props: rest, on: listeners });
    }
  };
</script>