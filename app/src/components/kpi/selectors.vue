<template>
  <v-dialog v-model="dialog" persistent max-width="500px">
    <v-btn icon primary slot="activator">
      <v-icon>edit</v-icon>
    </v-btn>
    <v-card>
      <v-card-title>
        <span class="headline">Select Recruiter & Period</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12>
              <v-select
                :value="period"
                @change="handlePeriodChange"
                label="Period"
                required
                :items="periods"
              ></v-select>
            </v-flex>
            <v-flex xs12>
              <recruiter-lookup
                :value="recruiter"
                @change="handleRecruiterChange"
              />
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click.prevent="refresh">Refresh</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import { periodsArray } from '@/lib/date';
  import { RecruiterLookup } from '../lookup';

  export default {
    props: ['period', 'recruiter'],
    components: { RecruiterLookup },
    data: () => ({
      periods: periodsArray,
      dialog: false
    }),
    methods: {
      handleRecruiterChange(value) {
        this.$emit('change-recruiter', value);
      },
      handlePeriodChange(value) {
        this.$emit('change', value);
      },
      refresh() {
        this.dialog = false;
        this.$emit('refresh');
      },
      format(item) {
        return {
          value: item._id,
          text: item._source.Lastname
        };
      }
    }
  };
</script>
