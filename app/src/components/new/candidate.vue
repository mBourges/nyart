<template>
  <v-container grid-list-sm>
    <v-layout row wrap>
      <v-flex xs6>
        <v-text-field
          autofocus
          prepend-icon="person"
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

      <v-flex xs6>
        <currency-input
          label="Salary"
          :value="record.Salary"
          @input="handleChange('Salary', $event)"
        />
      </v-flex>
      <v-flex xs6>
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
          type="CandidateSource"
          :value="record.Source"
          @change="handleChange('Source', $event)"
        />
      </v-flex>
      <v-flex xs12 d-flex justify-center>
        <label class="file btn btn--large btn--outline btn--depressed btn--round indigo--text">
          <input
            type="file"
            multiple="multiple"
            name="file"
            id="file"
            @change="handleFileChange"
          />
          <span>
            Add Resumes
            <v-icon right class="indigo--text">cloud_upload</v-icon>
          </span>
        </label>
      </v-flex>
      <v-flex xs6>
        <v-list two-line subheader dense>
          <v-subheader>Resumes</v-subheader>
          <template v-for="(resume, index) in record.Resumes">
            <v-list-tile  :key="resume.name">
              <v-list-tile-content>
                <v-list-tile-title>{{ resume.name }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ resume.type }} ({{ resume.size }})</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn icon @click="deleteResume(index)">
                  <v-icon color="pink lighten-1">delete</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider v-if="index + 1 < record.Resumes.length" :key="index"></v-divider>
          </template>
        </v-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { CompanyLookup, RecruiterLookup } from '../lookup';
  import { CurrencyInput } from '../currency';
  import { Selectbox } from '../selectbox';

  export default {
    name: 'candidate-form',
    components: { CompanyLookup, RecruiterLookup, CurrencyInput, Selectbox },
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
      },
      handleFileChange(event) {
        const { files } = event.target;
        let value = this.record.Resumes || [];

        for (let i = 0; i < files.length; i++) {
          const file = files[i];

          value = [ ...value, file ];
        }

        this.$store.commit('newRecord/updateRecord', { name: 'Resumes', value });
      },
      deleteResume(index) {
        const value = [
          ...this.record.Resumes.slice(0, index),
          ...this.record.Resumes.slice(index + 1, this.record.Resumes.length)
        ];

        this.$store.commit('newRecord/updateRecord', { name: 'Resumes', value });
      }
    }
  };
</script>

<style scope>
  .file {
    position: relative;
    cursor: pointer;
  }

  .file > input {
    height: 0.01em;
    left: 0;
    outline: none;
    position: absolute;
    top: 0;
    width: 0.01em;
  }
</style>