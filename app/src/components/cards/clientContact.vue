<script>
  // import { DisplayLanguages } from '@/components/languages'; // eslint-disable-line no-unused-vars
  import { FlagIcon } from '../flag'; // eslint-disable-line no-unused-vars

  export default {
    functional: true,
    render(h, { props: { id, record } }) {
      const links = {
        clientContact: `/details/clientcontact/${id}`,
        company: record.Company && `/details/company/${record.Company.id}`
      };
      const icon = (<v-icon class="mx-2">mdi-account-multiple</v-icon>);
      const company = (<span class="pr-2">
        <v-icon class="mx-2" small>mdi-domain</v-icon>
        <span>{ record.Company && record.Company.Name }</span>
      </span>);
      const job = (<span>
        <v-icon class="mx-2" small>business_center</v-icon>
        <span>{ record.JobTitle }</span>
      </span>);

      return (<v-card height="100%" class="card-fill">
        <v-card-title primary-title>
          <div>
            <div class="headline">
              { icon } { `${record.Firstname || ''} ${record.Lastname || ''}` }
              { record.NationalityCode && <span class="ml-3"><FlagIcon country={record.NationalityCode} /></span> }
            </div>
            <span class="grey--text">{ `${record.FirstnameKanji || ''} ${record.LastnameKanji || ''}` }</span>
          </div>
        </v-card-title>
        <v-card-text class="card-text-fill">
          <div class="pb-2">
            { company } { job }
          </div>
          <div>{`Registered by ${record.Recruiter.Name} @${record.RegistrationDate}`}</div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat to={links.clientContact}>View</v-btn>
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
