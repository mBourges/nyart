<template>
  <div>
    <v-btn
      dark
      color="accent"
      @click.stop="dialog = !dialog"
    >
      <v-icon left>add</v-icon>
      New
    </v-btn>
    <v-dialog v-model="dialog" full-width>
      <v-card>
        <v-card-title class="pb-0">
          <v-select
            :items="types"
            v-model="selectedType"
            label="Type"
            single-line
            bottom
          ></v-select>
        </v-card-title>
        <v-divider></v-divider>
        <v-form v-model="valid" ref="form" lazy-validation>
          <v-card-text>
            <RecordForm :type="selectedType" />
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions v-if="selectedType != null">
            <v-spacer></v-spacer>
            <v-btn flat @click="dialog = false" :disabled="isSaving">Cancel</v-btn>
            <v-btn flat color="primary" @click="submit" :disabled="!valid || isSaving">Save</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import RecordForm from './recordForm';
  import { formatdateForInput } from '@/lib/date';

  export default {
    components: { RecordForm },
    data() {
      return {
        valid: true,
        types: [
          { text: 'Candidate', value: 'candidate' },
          { text: 'Client Contact', value: 'clientContact' },
          { text: 'Company', value: 'company' },
          { text: 'Job', value: 'job' },
          { text: 'Application', value: 'process' }
        ]
      };
    },
    computed: {
      dialog: {
        get() {
          return this.$store.state.newRecord.isOpen;
        },
        set(value) {
          this.$store.commit('newRecord/toggleDialog', value);
        }
      },
      selectedType: {
        get() {
          return this.$store.state.newRecord.type;
        },
        set(value) {
          this.$store.commit('newRecord/updateType', value);
          this.$store.commit('newRecord/updateRecord', { name: 'RegistrationDate', value: formatdateForInput(new Date()) });
          this.$store.commit('newRecord/updateRecord', { name: 'Recruiter', value: this.$store.getters['user/recruiter'] });
        }
      },
      isSaving() {
        return this.$store.state.newRecord.isSaving;
      }
    },
    methods: {
      submit() {
        if (this.$refs.form.validate()) {
          this.$store.dispatch('newRecord/insert')
            .then(url => this.$router.push(url));
        }
      }
    },
    watch: {
      selectedType(newV, oldV) {
        if (newV && newV !== oldV) {
          setTimeout(() => this.$refs.form.validate(), 0);
        }
      }
    }
  };
</script>