<script>
  /* eslint-disable no-unused-vars */
  import { CurrencyDisplay } from '../currency';
  import { calculateAge } from '@/lib/date';
  // // import { DisplayLanguages } from '@/components/languages'; // eslint-disable-line no-unused-vars
  // // import { CodesDisplay } from '../codes'; // eslint-disable-line no-unused-vars
  import { FlagIcon } from '../flag';

  export default {
    functional: true,
    render(h, { props: { record } }) {
      const age = record.Birthdate
        ? `(${calculateAge(record.Birthdate)} yrs old)`
        : '';
      const links = {
        candidate: record.id ? `/details/candidate/${record.id}` : '',
        company: record.Company ? `/details/company/${record.Company.id}` : ''
      };
      const icon = (<v-icon class="mx-2">person</v-icon>);
      const company = (<span class="pr-2">
        <v-icon class="mx-2" small>mdi-domain</v-icon>
        <span>{ record.Company && record.Company.Name }</span>
      </span>);
      const job = (<span>
        <v-icon class="mx-2" small>business_center</v-icon>
        <span>{ record.JobTitle }</span>
      </span>);
      const salary = (<span>
        <v-icon class="mx-2" small>mdi-currency-cny</v-icon>
        <CurrencyDisplay value={ record.Salary } />
      </span>);

      return (<v-card height="100%" class="card-fill">
        <v-card-title primary-title>
          <div>
            <div class="headline">
              { icon } { `${record.Firstname || ''} ${record.Lastname || ''}` }
              { record.NationalityCode && <span class="ml-3"><FlagIcon country={record.NationalityCode} /></span> }
            </div>
            <span class="grey--text">{ `${record.FirstnameKanji || ''} ${record.LastnameKanji || ''}` }</span>
            { record.Birthdate && <span class="ml-3"><small class="caption">{ age }</small></span> }
          </div>
        </v-card-title>
        <v-card-text class="card-text-fill">
          <div class="pb-2">
            { company } { job }
          </div>
          <div class="pb-2">{ salary }</div>
          <div>{`Registered by ${record.Recruiter.Name} @${record.RegistrationDate}`}</div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat to={links.candidate}>View</v-btn>
        </v-card-actions>
      </v-card>);
    }
  };
</script>

<style scoped>
  .card-fill {
    display: flex;
    flex-direction: column;
  }

  .card-text-fill {
    flex: 1 1 auto;
  }
</style>
