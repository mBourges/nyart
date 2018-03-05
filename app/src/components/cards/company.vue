<script>
  export default {
    functional: true,
    render(h, { props: { id, record } }) {
      const companyLink = `/details/company/${id}`;
      const recruiterName = record.Recruiter && record.Recruiter.Name;
      const registrationDate = record.RegistrationDate && `@${record.RegistrationDate}`;
      const icon = (<v-icon class="mx-2">business</v-icon>);

      return (<v-card height="100%" class="card-fill">
        <v-card-title primary-title>
          <div>
            <div class="headline">
              { icon } { record.Name }
            </div>
          </div>
        </v-card-title>
        <v-card-text class="card-text-fill">
          <div>{`Registered by ${recruiterName} ${registrationDate}`}</div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat to={companyLink}>View</v-btn>
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
