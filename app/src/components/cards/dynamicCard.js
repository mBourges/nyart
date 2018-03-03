import CandidateCard from './candidate';
import ClientContactCard from './clientContact';
import CompanyCard from './company';
import JobCard from './job';

export default {
  functional: true,
  render(h, { props: { record } }) {
    let component = null;
    const { index, Type } = record;
    const is = {
      candidate: index === 'contacts' && Type === 'candidate',
      clientContact: index === 'contacts' && Type === 'client contact',
      company: index === 'companies',
      job: index === 'jobs'
    };

    if (is.candidate) {
      component = CandidateCard;
    } else if (is.clientContact) {
      component = ClientContactCard;
    } else if (is.company) {
      component = CompanyCard;
    } else if (is.job) {
      component = JobCard;
    }

    return h(component, { props: { record } });
  }
};
