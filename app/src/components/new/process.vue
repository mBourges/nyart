<template>
  <v-container grid-list-sm>
    <v-layout row wrap>
      <v-flex xs12>
        <candidate-lookup
          :value="record.Candidate"
          @change="handleChange('Candidate', $event)"
          :rules="candidateRules"
        />
      </v-flex>
      <v-flex xs12>
        <job-lookup
          :value="record.Job"
          @change="handleChange('Job', $event)"
          :rules="jobRules"
        />
      </v-flex>
      <v-flex xs12 md6>
        <v-text-field
          required
          label="Application Date"
          type="date"
          :value="record.Application && record.Application.StageDate"
          @input="handleChange('RegistrationDate', $event)"
          :rules="stageDateRules"
          prepend-icon="mdi-calendar"
        ></v-text-field>
      </v-flex>
      <v-flex xs12 md6>
        <recruiter-lookup
          :value="record.Recruiter"
          @change="handleChange('Recruiter', $event)"
        />
      </v-flex>
      <v-flex xs12 md6>
        <v-text-field
          label="Registration Date"
          type="date"
          :value="record.RegistrationDate"
          @input="handleChange('RegistrationDate', $event)"
        ></v-text-field>
      </v-flex>
    </v-layout>
  </v-container>
  <!--<form @submit.prevent="handleSave">-->
  <!--  <div class="field is-horizontal">-->
  <!--    <div class="field-label is-normal">-->
  <!--      <label class="label">Candidate</label>-->
  <!--    </div>-->
  <!--    <div class="field-body">-->
  <!--      <div class="field">-->
  <!--        <p class="control is-expanded">-->
  <!--          <candidate-lookup :value="process.Candidate" @input="handleCandidateChange" />-->
  <!--          <p class="help is-danger" v-show="!validation.Candidate">-->
  <!--            Candidate is required.-->
  <!--          </p>-->
  <!--        </p>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--  </div>-->

  <!--  <div class="field is-horizontal">-->
  <!--    <div class="field-label is-normal">-->
  <!--      <label class="label">Job</label>-->
  <!--    </div>-->
  <!--    <div class="field-body">-->
  <!--      <div class="field">-->
  <!--        <p class="control is-expanded">-->
  <!--          <job-lookup :value="process.Job" @input="handleJobChange" />-->
  <!--          <p class="help is-danger" v-show="!validation.Job">-->
  <!--            Job is required.-->
  <!--          </p>-->
  <!--        </p>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--  </div>-->

  <!--  <div class="field is-horizontal">-->
  <!--    <div class="field-label is-normal">-->
  <!--      <label class="label">Registration</label>-->
  <!--    </div>-->
  <!--    <div class="field-body">-->
  <!--      <recruiter-lookup :value="process.Recruiter" @input="handleRecruiterChange" />-->

  <!--      <div class="field">-->
  <!--        <p class="control is-expanded">-->
  <!--          <input-->
  <!--            class="input"-->
  <!--            type="date"-->
  <!--            placeholder="Process Start Date"-->
  <!--            v-model="process.RegistrationDate"-->
  <!--            @change.lazy="handleRegistrationdateChange"-->
  <!--          />-->
  <!--        </p>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--  </div>-->

  <!--  <div class="field is-horizontal">-->
  <!--    <div class="field-label"></div>-->
  <!--    <div class="field-body">-->
  <!--      <div class="field is-grouped">-->
  <!--        <div class="control">-->
  <!--          <button type="submit" :class="saveButtonClass" :disabled="!isValid || isSaving">-->
  <!--            Save-->
  <!--          </button>-->
  <!--        </div>-->
  <!--        <div class="control">-->
  <!--          <button class="button" type="button" @click.prevent="cancel">Cancel</button>-->
  <!--        </div>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--  </div>-->
  <!--</form>-->
</template>

<script>
  import { CandidateLookup, JobLookup, RecruiterLookup } from '../lookup';

  export default {
    name: 'process-form',
    components: { CandidateLookup, JobLookup, RecruiterLookup },
    data() {
      return {
        candidateRules: [
          v => !!v || 'Candidate is required'
        ],
        jobRules: [
          v => !!v || 'Job is required'
        ],
        stageDateRules: [
          v => !!v || 'Application Date is required'
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
  // import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
  // import { CandidateLookup, JobLookup } from '../lookup';

  // @Component({
  //   components: { CandidateLookup, JobLookup }
  // })
  // class NewProcessForm extends Vue {
  //   @Prop() process
  //   @Prop() isSaving

  //   get saveButtonClass() {
  //     return {
  //       button: true,
  //       'is-primary': true,
  //       'is-loading': this.isSaving
  //     };
  //   }

  //   get validation() {
  //     return {
  //       Candidate: !!this.process.Candidate.Name,
  //       Job: !!this.process.Job.Title
  //     };
  //   }

  //   get isValid() {
  //     const validation = this.validation;
  //     return Object.keys(validation).every(function (key) {
  //       return validation[key];
  //     });
  //   }

  //   handleCandidateChange(candidate) {
  //     this.processUpdated({
  //       Candidate: candidate
  //     });
  //   }

  //   handleJobChange(job) {
  //     this.processUpdated({
  //       Job: job
  //     });
  //   }

  //   handleRecruiterChange(recruiter) {
  //     this.processUpdated({
  //       Recruiter: recruiter
  //     });
  //   }

  //   handleRegistrationdateChange(event) {
  //     const { value } = event.target;
  //     const application = Object.assign({}, this.process.Application, {
  //       StageDate: value
  //     });

  //     this.processUpdated({
  //       Application: application,
  //       RegistrationDate: value
  //     });
  //   }

  //   handleSave(event) {
  //     if (this.isValid) {
  //       this.save();
  //     }
  //   }

  //   @Emit() processUpdated(process) {}
  //   @Emit() save() {}
  //   @Emit() cancel() {}
  // }

  // export default NewProcessForm;
</script>
