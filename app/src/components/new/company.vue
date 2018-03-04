<template>
  <v-container grid-list-sm>
    <v-layout row wrap>
      <v-flex xs6>
        <v-text-field
          autofocus
          prepend-icon="mdi-domain"
          label="Name"
          :value="record.Name"
          @input="handleChange('Name', $event)"
          :rules="nameRules"
        ></v-text-field>
      </v-flex>
      <v-flex xs6>
        <selectbox
          label="Type"
          type="CompanyType"
          :value="record.Type"
          @change="handleChange('Type', $event)"
          :rules="typeRules"
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
          type="CompanySource"
          :value="record.Source"
          @change="handleChange('Source', $event)"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { RecruiterLookup } from '../lookup';
  import { Selectbox } from '../selectbox';

  export default {
    name: 'candidate-form',
    components: { RecruiterLookup, Selectbox },
    data() {
      return {
        nameRules: [
          v => !!v || 'Name is required',
          v => (v && v.length >= 2) || 'Name must be at least 2 characters'
        ],
        typeRules: [
          v => !!v || 'Type is required'
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
