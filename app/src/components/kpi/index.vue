<template>
  <v-card>
    <v-toolbar flat dense>
      <v-toolbar-title class="title">Kpi</v-toolbar-title>
      <v-spacer></v-spacer>
      <selectors
        :period="period"
        @change="handlePeriodChange"
        :recruiter="recruiter"
        @change-recruiter="handleRecruiterChange"
        @refresh="refresh"
      />
    </v-toolbar>
    <v-progress-linear v-if="isLoading" class="my-0" indeterminate></v-progress-linear>
    <v-card-title>
      <h4>{{ recruiter.Name }} <small>({{ period.label }})</small></h4>
    </v-card-title>
    <v-list dense>
      <stat label="Candidates" :stat="stats.candidate" />
      <stat label="Client Contacts" :stat="stats.clientContact" />
      <stat label="Companies" :stat="stats.company" />
      <stat label="Jobs" :stat="stats.job" />
    </v-list>
  </v-card>
</template>

<script>
  import Selectors from './selectors';
  import Stat from './stat';

  export default {
    name: 'kpi',
    components: { Selectors, Stat },
    beforeMount() {
      this.$store.commit('kpi/updateRecruiter', this.$store.getters['user/recruiter']);
      this.refresh();
    },
    computed: {
      isLoading() {
        return this.$store.state.kpi.isLoading;
      },
      stats() {
        return this.$store.getters['kpi/stats'];
      },
      period() {
        return this.$store.getters['kpi/period'];
      },
      recruiter() {
        return this.$store.state.kpi.recruiter;
      }
    },
    methods: {
      handleRecruiterChange(value) {
        this.$store.commit('kpi/updateRecruiter', value);
      },
      handlePeriodChange(value) {
        this.$store.commit('kpi/updatePeriod', value);
      },
      refresh() {
        this.$store.dispatch('kpi/refresh');
      }
    }
  };
</script>
