<script>
  import { calculateAge } from '@/lib/date';
  // import { DisplayLanguages } from '@/components/languages'; // eslint-disable-line no-unused-vars
  // import { CodesDisplay } from '../codes'; // eslint-disable-line no-unused-vars
  import { FlagIcon } from '../flag';

  export default {
    functional: true,
    render(h, { props: { record } }) {
      const icon = h('v-icon', { class: 'mx-2' }, 'person');
      const company = h('span', { class: 'pr-2' }, [
        h('v-icon', { class: 'mx-2', props: { small: true } }, 'mdi-domain'),
        h('span', record.Company && record.Company.Name)
      ]);
      const job = h('span', [
        h('v-icon', { class: 'mx-2', props: { small: true } }, 'business_center'),
        h('span', record.JobTitle)
      ]);
      const salary = h('span', [
        h('v-icon', { class: 'mx-2', props: { small: true } }, 'mdi-currency-cny'),
        h('span', record.Salary)
      ]);
      const age = record.Birthdate
        ? `(${calculateAge(record.Birthdate)} yrs old)`
        : '';
      const links = {
        candidate: record.id ? `/details/candidate/${record.id}` : '',
        company: record.Company ? `/details/company/${record.Company.id}` : ''
      };

      return h('v-card', [
        h('v-card-title', { props: { 'primary-title': true } }, [
          h('div', [
            h('div', { class: 'headline' }, [
              icon,
              `${record.Firstname || ''} ${record.Lastname || ''}`,
              record.NationalityCode && h('span', { class: 'ml-3' }, [ h(FlagIcon, { props: { country: record.NationalityCode } }) ]),
              record.Birthdate && h('span', { class: 'ml-3' }, [ h('small', { class: 'caption' }, age) ])
            ]),
            h('span', { class: 'grey--text' }, `${record.FirstnameKanji || ''} ${record.LastnameKanji || ''}`)
          ])
        ]),
        h('v-card-text', [
          h('div', { class: 'pb-2' }, [ company, job ]),
          h('div', { class: 'pb-2' }, [ salary ]),
          h('div', `Registered by ${record.Recruiter.Name} @${record.RegistrationDate}`)
        ]),
        h('v-card-actions', [
          h('v-btn', { props: { flat: true, to: links.candidate } }, 'View')
        ])
      ]);
    }
  };
</script>
