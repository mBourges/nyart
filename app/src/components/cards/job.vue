<script>
  // import { DisplayLanguages } from '@/components/languages'; // eslint-disable-line no-unused-vars
  // import { CodesDisplay } from '../codes'; // eslint-disable-line no-unused-vars

  export default {
    functional: true,
    render(h, { props: { id, record } }) {
      const icon = <v-icon class="mx-2" small>business_center</v-icon>;
      const links = {
        job: `/details/job/${id}`,
        company: record.Company && `/details/company/${record.Company.id}`,
        clientContact: record.ClientContact && `/details/clientContact/${record.ClientContact.id}`
      };
      const recruiterName = record.Recruiter && record.Recruiter.Name;
      const registrationDate = record.RegistrationDate && `@${record.RegistrationDate}`;
      const company = (<span class="pr-2">
        <v-icon class="mx-2" small>mdi-domain</v-icon>
        <span>{ record.Company && record.Company.Name }</span>
      </span>);
      const clientContact = (<span class="pr-2">
        <v-icon class="mx-2" small>mdi-account-multiple</v-icon>
        <span>{ record.ClientContact && record.ClientContact.Name }</span>
      </span>);
      const salary = (<span>
        <v-icon class="mx-2" small>mdi-currency-cny</v-icon>
        <span>{ record.SalaryMinimum }</span>
      </span>);

      return (<v-card height="100%">
        <v-card-title primary-title>
          <div>
            <div class="headline">
              { icon } { record.JobTitle }
            </div>
            <span class="grey--text">{ record.Status }</span>
          </div>
        </v-card-title>
        <v-card-text>
          <div class="pb-2">
            { company } { clientContact }
          </div>
          <div class="pb-2">{ salary }</div>
          <div>{`Registered by ${recruiterName} ${registrationDate}`}</div>
        </v-card-text>
        <v-card-actions>
          <v-btn flat to={links.job}>View</v-btn>
        </v-card-actions>
      </v-card>);
    }
  };

  // return (<div class="box is-fullheight">
  //   <article class="media">
  //     <div class="media-left">
  //       <span class="icon">
  //         <i class="fa fa-briefcase"></i>
  //       </span>
  //     </div>
  //     <div class="media-content">
  //       <div class="content">
  //         <p>
  //           <strong><router-link to={ links.job }>{ record.JobTitle }</router-link></strong> <small> { record.Status }</small>
  //           <br />
  //           Job for <router-link to={ links.company }>{ record.Company.Name }</router-link> followed by <router-link to={ links.clientContact }>{ record.ClientContact.Name }</router-link> with a salary range of <currency-display value={ record.SalaryMinimum } symbol="¥" /> - <currency-display value={ record.SalaryMaximum } symbol="¥" />
  //           <br />
  //           { record.Recruiter.Name && `Registered by ${record.Recruiter.Name}` } <small>{ record.RegistrationDate && `@${record.RegistrationDate}` }</small>
  //         </p>
  //         <CodesDisplay codes={ record.JobFunction } />
  //       </div>
  //       <DisplayLanguages languages={ record.Languages } />
  //       <p></p>
  //     </div>
  //   </article>
  // </div>);
// }
</script>
