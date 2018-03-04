<script>
  import CandidateForm from './candidate';
  import ClientContactForm from './clientContact';
  import CompanyForm from './company';
  import JobForm from './job';

  export default {
    functional: true,
    render(h, { props, listeners }) {
      const { type, ...rest } = props;
      let component = null;

      switch (type) {
        case 'candidate':
          component = CandidateForm;
          break;
        case 'clientContact':
          component = ClientContactForm;
          break;
        case 'company':
          component = CompanyForm;
          break;
        case 'job':
          component = JobForm;
          break;
        default:
      }

      return h(component, { props: rest, on: listeners });
    }
  };
</script>