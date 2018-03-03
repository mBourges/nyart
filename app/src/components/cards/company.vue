<script>
  export default {
    functional: true,
    render(h, { props: { id, record } }) {
      const companyLink = `/details/company/${id}`;
      const recruiterName = record.Recruiter && record.Recruiter.Name;
      const registrationDate = record.RegistrationDate && `@${record.RegistrationDate}`;
      const icon = (<v-icon class="mx-2">business</v-icon>);

      return (<v-card height="100%">
        <v-card-title primary-title>
          <div>
            <div class="headline">
              { icon } { record.Name }
            </div>
          </div>
        </v-card-title>
        <v-card-text>
          <div>{`Registered by ${recruiterName} ${registrationDate}`}</div>
        </v-card-text>
        <v-card-actions>
          <v-btn flat to={companyLink}>View</v-btn>
        </v-card-actions>
      </v-card>);
    }
  };
</script>
