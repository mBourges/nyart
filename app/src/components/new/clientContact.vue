<template>
  <v-container grid-list-sm>
    <v-layout row wrap>
      <v-flex xs6>
        <v-text-field
          autofocus
          prepend-icon="mdi-account-multiple"
          label="First name"
          :value="record.Firstname"
          @input="handleChange('Firstname', $event)"
        ></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-text-field
          label="Last name"
          :value="record.Lastname"
          @input="handleChange('Lastname', $event)"
          :rules="nameRules"
        ></v-text-field>
      </v-flex>
      <v-flex xs6>
        <company-lookup
          :value="record.Company"
          @change="handleChange('Company', $event)"
        />
      </v-flex>
      <v-flex xs6>
        <v-text-field
          label="Job title"
          :value="record.JobTitle"
          @input="handleChange('JobTitle', $event)"
        ></v-text-field>
      </v-flex>

      <v-flex xs12>
        <selectbox
          label="Level"
          type="RoleLevel"
          :value="record.RoleLevel"
          @change="handleChange('RoleLevel', $event)"
        />
      </v-flex>
      <v-flex xs6 md4>
        <recruiter-lookup
          :value="record.Recruiter"
          @change="handleChange('Recruiter', $event)"
        />
      </v-flex>
      <v-flex xs6 md4>
        <v-text-field
          label="Registration Date"
          type="date"
          :value="record.RegistrationDate"
          @input="handleChange('RegistrationDate', $event)"
        ></v-text-field>
      </v-flex>
      <v-flex xs12 md4>
        <selectbox
          label="Source"
          type="ClientContactSource"
          :value="record.Source"
          @change="handleChange('Source', $event)"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { CompanyLookup, RecruiterLookup } from '../lookup';
  import { Selectbox } from '../selectbox';

  export default {
    name: 'candidate-form',
    components: { CompanyLookup, RecruiterLookup, Selectbox },
    data() {
      return {
        nameRules: [
          v => !!v || 'Last name is required',
          v => (v && v.length >= 2) || 'Name must be at least 2 characters'
        ]
      };
    },
    computed: {
      record() {
        return this.$store.state.newRecord.record;
      }
    },
    methods: {
      handleChange(name, value) {
        this.$store.commit('newRecord/updateRecord', { name, value });
      }
    }
  };
</script>
