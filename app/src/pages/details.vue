<template>
  <v-layout column>
    <v-flex>
      <v-toolbar flat>
        <v-toolbar-title>{{ record.Firstname }} {{ record.Lastname }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn flat>
            Set Off Limit
          </v-btn>
          <v-btn flat>
            Apply
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-flex>
    <v-flex xs12 class="scrollable">
      <v-container class=" fluid px-1 py-1">
        <v-layout row>
          <v-flex xs12 sm4>
            <v-card>
              <v-card-title primary-title class="py-1">
                <v-flex d-flex>
                  Information
                  <v-icon>edit</v-icon>
                </v-flex>
              </v-card-title>
              <v-card-text>
                <v-layout row>
                  <v-flex class="pr-1">
                    <v-icon small>home</v-icon>
                    Job Title
                  </v-flex>
                  <v-flex class="pl-1">{{ record.JobTitle }}</v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex>
                    <v-icon small>person</v-icon>
                  </v-flex>
                  <v-flex>Source</v-flex>
                  <v-flex>{{ record.Source }}</v-flex>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: 'recordDetails',
    beforeMount() {
      const { type, id } = this.$route.params;

      this.$store.dispatch('details/fetch', { type, id });
    },
    destroyed() {
      this.$store.dispatch('details/clear');
    },
    computed: {
      record() {
        console.log('DETAILS', this.$store.state.details.record);
        return this.$store.state.details.record;
      }
    }
  };
</script>