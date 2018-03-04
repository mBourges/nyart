<template>
  <v-container grid-list-sm>
    <v-layout row wrap>
      <v-flex xs12 md6>
        <v-text-field
          autofocus
          prepend-icon="mdi-domain"
          label="Job Title"
          :value="record.JobTitle"
          @input="handleChange('JobTitle', $event)"
          :rules="jobTitleRules"
        ></v-text-field>
      </v-flex>
      <v-flex xs12 md6>
        <v-text-field
          label="Headcount"
          type="number"
          :value="record.Headcount"
          @input="handleChange('Headcount', $event)"
          :rules="headcountRules"
        ></v-text-field>
      </v-flex>

      <v-flex xs12>
        <company-contact-lookup
          :company="record.Company"
          @company-change="handleChange('Company', $event)"
          :contact="record.ClientContact"
          @contact-change="handleChange('ClientContact', $event)"
        />
      </v-flex>

       <v-flex xs12 md6>
        <currency-input
          label="Salary Minimum"
          :value="record.SalaryMinimum"
          @input="handleChange('SalaryMinimum', $event)"
        />
      </v-flex>
       <v-flex xs12 md6>
        <currency-input
          label="Salary Maximum"
          :value="record.SalaryMaximum"
          @input="handleChange('SalaryMaximum', $event)"
        />
      </v-flex>

      <v-flex xs12 md4>
        <recruiter-lookup
          :value="record.Recruiter"
          @change="handleChange('Recruiter', $event)"
        />
      </v-flex>
      <v-flex xs12 md4>
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
          type="JobSource"
          :value="record.Source"
          @change="handleChange('Source', $event)"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { RecruiterLookup, CompanyContactLookup } from '../lookup';
  import { CurrencyInput } from '../currency';
  import { Selectbox } from '../selectbox';

  export default {
    name: 'candidate-form',
    components: { RecruiterLookup, CompanyContactLookup, CurrencyInput, Selectbox },
    data() {
      return {
        jobTitleRules: [
          v => !!v || 'Job Title is required',
          v => (v && v.length >= 2) || 'Job Title must be at least 2 characters'
        ],
        headcountRules: [
          v => !!v || 'Headcount is required',
          v => (v && v.length >= 1) || 'Headcount should be 1 or more'
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

  // <template>
  //   <form @submit.prevent="handleSave">
  //     <div class="field is-horizontal">
  //       <div class="field-label is-normal">
  //         <label class="label">Position</label>
  //       </div>
  //       <div class="field-body">
  //         <div class="field">
  //           <p class="control is-expanded">
  //             <input
  //               :class="{ input: true, 'is-danger': !validation.JobTitle }"
  //               type="text"
  //               placeholder="Job Title"
  //               v-model.trim="JobTitle"
  //             />
  //           </p>
  //           <p class="help is-danger" v-show="!validation.JobTitle">
  //             Job title is required.
  //           </p>
  //         </div>
  //         <div class="field">
  //           <p class="control is-expanded">
  //             <input
  //               class="input"
  //               type="number"
  //               placeholder="Headcount"
  //               v-model.number="Headcount"
  //             />
  //           </p>
  //         </div>
  //       </div>
  //     </div>

  //     <div class="field is-horizontal">
  //       <div class="field-label is-normal">
  //         <label class="label">Employer</label>
  //       </div>
  //       <company-contact-lookup
  //         :company="Company"
  //         :contact="ClientContact"
  //         @companyChanged="handleCompanyChange"
  //         @contactChanged="handleContactChange"
  //       />
  //     </div>

  //     <div class="field is-horizontal">
  //       <div class="field-label is-normal">
  //         <label class="label">Salary</label>
  //       </div>
  //       <div class="field-body">
  //         <div class="field">
  //           <p class="control is-expanded">
  //             <currency-input v-model.number="SalaryMinimum" placeholder="Minimum" />
  //           </p>
  //           <p class="help">Type 'm' for million, 'k' for thousand.</p>
  //         </div>
  //         <div class="field">
  //           <p class="control is-expanded">
  //             <currency-input v-model.number="SalaryMaximum" placeholder="Maximum" />
  //           </p>
  //         </div>
  //       </div>
  //     </div>

  //   <div class="field is-horizontal">
  //     <div class="field-label is-normal">
  //       <label class="label">Registration</label>
  //     </div>
  //     <div class="field-body">
  //       <recruiter-lookup v-model="Recruiter" />

  //       <div class="field">
  //         <p class="control is-expanded">
  //           <input
  //             class="input"
  //             type="date"
  //             placeholder="Registration Date"
  //             v-model="RegistrationDate"
  //           />
  //         </p>
  //       </div>

  //       <Selectbox
  //         placeholder="Source"
  //         type="JobSource"
  //         v-model="Source"
  //       />
  //     </div>
  //   </div>

  //     <div class="field is-horizontal">
  //       <div class="field-label"></div>
  //       <div class="field-body">
  //         <div class="field is-grouped">
  //           <div class="control">
  //             <button type="submit" :class="saveButtonClass" :disabled="!isValid || isSaving">
  //               Save
  //             </button>
  //           </div>
  //           <div class="control">
  //             <button class="button" type="button" @click.prevent="cancel">Cancel</button>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </form>
  // </template>

  // <script>
  //   import { isEmpty } from '@/lib/utils';
  //   import { formatdateForInput } from '@/lib/date';

  //   export default {
  //     name: 'jobForm',
  //     props: ['recruiter', 'isSaving'],
  //     data: function () {
  //       return {
  //         JobTitle: '',
  //         Headcount: 1,
  //         Company: {
  //           id: '',
  //           Name: ''
  //         },
  //         ClientContact: {
  //           id: '',
  //           Name: ''
  //         },
  //         SalaryMinimum: 0,
  //         SalaryMaximum: 0,
  //         RegistrationDate: formatdateForInput(new Date()),
  //         Source: '',
  //         Status: 'Open',
  //         Recruiter: {
  //           id: this.recruiter.id,
  //           Name: this.recruiter.displayName
  //         }
  //       };
  //     },
  //     computed: {
  //       saveButtonClass() {
  //         return {
  //           button: true,
  //           'is-primary': true,
  //           'is-loading': this.isSaving
  //         };
  //       },
  //       validation() {
  //         return {
  //           JobTitle: !!this.JobTitle
  //         };
  //       },
  //       isValid() {
  //         var validation = this.validation;
  //         return Object.keys(validation).every(function (key) {
  //           return validation[key];
  //         });
  //       }
  //     },
  //     methods: {
  //       handleCompanyChange: function (company) {
  //         this.Company = company;
  //       },
  //       handleContactChange: function (contact) {
  //         this.ClientContact = contact;
  //       },
  //       handleSave: function (event) {
  //         if (this.isValid) {
  //           const company = Object.keys(this.$data)
  //             .filter(key => !isEmpty(this.$data[key]))
  //             .reduce((aggr, key) =>
  //               Object.assign({}, aggr, { [key]: this.$data[key] }), {}
  //             );

  //           this.$emit('addRecord', company);
  //         }
  //       },
  //       cancel: function () {
  //         this.$emit('cancel');
  //       }
  //     }
  //   };
</script>
