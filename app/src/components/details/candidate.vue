<template>
  <v-layout v-if="isFetching">
    <v-flex xs12 d-flex align-center class="mt-5">
      <v-progress-circular  indeterminate :size="75" color="primary"></v-progress-circular>
    </v-flex>
  </v-layout>
  <v-layout column v-else>
    <v-toolbar flat tabs>
      <v-toolbar-side-icon>
        <v-icon>person</v-icon>
      </v-toolbar-side-icon>
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
      <v-tabs
        align-with-title
        slot="extension"
        slider-color="accent"
        v-model="tab"
      >
        <v-tab href="#tab-information">
          <v-icon class="pr-1" small>account_box</v-icon>
          Informaton
        </v-tab>
        <v-tab href="#tab-interviewNotes">
          <v-icon class="pr-1" small>mdi-message-processing</v-icon>
          Interview Notes
        </v-tab>
        <v-tab href="#tab-ats">
          <v-icon class="pr-1" small>mdi-view-dashboard</v-icon>
          ATS
        </v-tab>
      </v-tabs>
    </v-toolbar>

    <v-tabs-items v-model="tab" class="scrollable">
      <v-tab-item id="tab-information">
        <v-container class="scrollable fluid profile">
          <v-layout row>
            <v-flex xs12 sm4 md3>
              <v-list :dense="$vuetify.breakpoint.smAndDown">
                <v-layout row align-center>
                  <v-flex xs6>
                    <v-subheader>Information</v-subheader>
                  </v-flex>
                  <v-flex xs6 class="text-xs-center">
                    <v-btn flat icon color="accent">
                      <v-icon :small="$vuetify.breakpoint.smAndDown">edit</v-icon>
                    </v-btn>
                  </v-flex>
                </v-layout>
                <v-list-tile avatar>
                  <v-list-tile-avatar>
                    <v-icon>business_center</v-icon>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>
                      {{ record.JobTitle }}
                    </v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>

                <v-list-tile avatar>
                  <v-list-tile-avatar>
                    <v-icon>mdi-domain</v-icon>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>
                      <router-link :to="links.company">{{ record.Company && record.Company.Name }}</router-link>
                    </v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>

                <v-list-tile avatar>
                  <v-list-tile-avatar>
                    <v-icon>mdi-currency-cny</v-icon>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>
                      <currency-display :value="record.Salary" />
                    </v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>

                <v-list-tile avatar>
                  <v-list-tile-avatar>
                    <v-icon>mdi-account-star</v-icon>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>{{ record.Recruiter && record.Recruiter.Name }}</v-list-tile-title>
                    <v-list-tile-sub-title>{{ record.RegistrationDate }} {{ record.Source }}</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>

                <v-layout row align-center>
                  <v-flex xs6>
                    <v-subheader>Resumes</v-subheader>
                  </v-flex>
                  <v-flex xs6 class="text-xs-center">
                    <v-btn flat icon color="accent">
                      <v-icon :small="$vuetify.breakpoint.smAndDown">edit</v-icon>
                    </v-btn>
                  </v-flex>
                </v-layout>
                <v-list-tile avatar v-for="resume in resumes" :key="resume.test">
                  <v-list-tile-avatar>
                    <v-icon>mdi-file-account</v-icon>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>
                      <a :href="resume.Url">{{ resume.Name }}</a>
                    </v-list-tile-title>
                    <v-list-tile-sub-title>
                      {{ resume.Size }} {{ resume.Type }}
                    </v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-flex>
          </v-layout>
        </v-container>
      </v-tab-item>
      <v-tab-item id="tab-interviewNotes">
        Interview Notes
      </v-tab-item>
      <v-tab-item id="tab-ats">
        <v-card flat>
          <v-card-text>ats</v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-layout>

    <!--<v-container class="scrollable fluid profile">-->
    <!--  <v-layout row>-->
    <!--    <v-flex xs12 sm4 md3>-->
    <!--      <v-list :dense="$vuetify.breakpoint.smAndDown">-->
    <!--        <v-layout row align-center>-->
    <!--          <v-flex xs6>-->
    <!--            <v-subheader>Information</v-subheader>-->
    <!--          </v-flex>-->
    <!--          <v-flex xs6 class="text-xs-center">-->
    <!--            <v-btn flat icon color="accent">-->
    <!--              <v-icon :small="$vuetify.breakpoint.smAndDown">edit</v-icon>-->
    <!--            </v-btn>-->
    <!--          </v-flex>-->
    <!--        </v-layout>-->
    <!--        <v-list-tile avatar>-->
    <!--          <v-list-tile-avatar>-->
    <!--            <v-icon>business_center</v-icon>-->
    <!--          </v-list-tile-avatar>-->
    <!--          <v-list-tile-content>-->
    <!--            <v-list-tile-title>-->
    <!--              {{ record.JobTitle }}-->
    <!--            </v-list-tile-title>-->
    <!--          </v-list-tile-content>-->
    <!--        </v-list-tile>-->

    <!--        <v-list-tile avatar>-->
    <!--          <v-list-tile-avatar>-->
    <!--            <v-icon>mdi-domain</v-icon>-->
    <!--          </v-list-tile-avatar>-->
    <!--          <v-list-tile-content>-->
    <!--            <v-list-tile-title>-->
    <!--              <router-link :to="links.company">{{ record.Company && record.Company.Name }}</router-link>-->
    <!--            </v-list-tile-title>-->
    <!--          </v-list-tile-content>-->
    <!--        </v-list-tile>-->

    <!--        <v-list-tile avatar>-->
    <!--          <v-list-tile-avatar>-->
    <!--            <v-icon>mdi-currency-cny</v-icon>-->
    <!--          </v-list-tile-avatar>-->
    <!--          <v-list-tile-content>-->
    <!--            <v-list-tile-title>-->
    <!--              <currency-display :value="record.Salary" />-->
    <!--            </v-list-tile-title>-->
    <!--          </v-list-tile-content>-->
    <!--        </v-list-tile>-->

    <!--        <v-list-tile avatar>-->
    <!--          <v-list-tile-avatar>-->
    <!--            <v-icon>mdi-account-star</v-icon>-->
    <!--          </v-list-tile-avatar>-->
    <!--          <v-list-tile-content>-->
    <!--            <v-list-tile-title>{{ record.Recruiter && record.Recruiter.Name }}</v-list-tile-title>-->
    <!--            <v-list-tile-sub-title>{{ record.RegistrationDate }} {{ record.Source }}</v-list-tile-sub-title>-->
    <!--          </v-list-tile-content>-->
    <!--        </v-list-tile>-->

    <!--        <v-layout row align-center>-->
    <!--          <v-flex xs6>-->
    <!--            <v-subheader>Resumes</v-subheader>-->
    <!--          </v-flex>-->
    <!--          <v-flex xs6 class="text-xs-center">-->
    <!--            <v-btn flat icon color="accent">-->
    <!--              <v-icon :small="$vuetify.breakpoint.smAndDown">edit</v-icon>-->
    <!--            </v-btn>-->
    <!--          </v-flex>-->
    <!--        </v-layout>-->
    <!--        <v-list-tile avatar v-for="resume in resumes" :key="resume.test">-->
    <!--          <v-list-tile-avatar>-->
    <!--            <v-icon>mdi-file-account</v-icon>-->
    <!--          </v-list-tile-avatar>-->
    <!--          <v-list-tile-content>-->
    <!--            <v-list-tile-title>-->
    <!--              {{ resume.test }}-->
    <!--            </v-list-tile-title>-->
    <!--          </v-list-tile-content>-->
    <!--        </v-list-tile>-->
    <!--      </v-list>-->

          <!--<v-layout row justify-space-around class="height-auto px-3 py-1">-->
          <!--  <div class="subheading">Information</div>-->
          <!--  <v-icon small>edit</v-icon>-->
          <!--</v-layout>-->



          <!--<v-layout row justify-space-around class="height-auto">-->
          <!--  <v-icon small class="px-2">mdi-currency-cny</v-icon>-->
          <!--  <v-flex>-->
          <!--    <currency-display :value="record.Salary" />-->
          <!--  </v-flex>-->
          <!--</v-layout>-->

          <!--<v-layout row justify-space-around class="height-auto">-->
          <!--  <v-icon small class="px-2">mdi-account-star</v-icon>-->
          <!--  <v-flex>-->
          <!--    {{ record.Recruiter && record.Recruiter.Name }}-->
          <!--  </v-flex>-->
          <!--</v-layout>-->

          <!--<v-layout row justify-space-around class="height-auto">-->
          <!--  <div class="px-2">Registered on:</div>-->
          <!--  <v-flex>-->
          <!--    {{ record.RegistrationDate }}-->
          <!--  </v-flex>-->
          <!--</v-layout>-->

          <!--<v-layout row justify-space-around class="height-auto">-->
          <!--  <div class="px-2">From:</div>-->
          <!--  <v-flex>-->
          <!--    {{ record.Source }}-->
          <!--  </v-flex>-->
          <!--</v-layout>-->



                  <!--<div class="column is-half column-label">Registration Date</div>-->
                  <!--<div class="column is-half">{{ record.RegistrationDate }}</div>-->
                  <!--<div class="column is-half column-label">Recruiter Name</div>-->
                  <!--<div class="column is-half">{{ record.Recruiter && record.Recruiter.Name }}</div>-->
                  <!--<div class="column is-half column-label">Source</div>-->
                  <!--<div class="column is-half">{{ record.Source }}</div>-->








          <!--<v-layout row justify-space-around class="height-auto">-->
          <!--  <v-flex d-flex class="px-1">-->
          <!--    <v-icon small>person</v-icon>-->
          <!--    <v-flex>Source</v-flex>-->
          <!--  </v-flex>-->
          <!--  <v-flex>{{ record.Source }}</v-flex>-->
          <!--</v-layout>-->


                <!--  <v-flex>-->
                <!--    <v-icon small>person</v-icon>-->
                <!--  </v-flex>-->
                <!--  <v-flex>Source</v-flex>-->
                <!--  <v-flex>{{ record.Source }}</v-flex>-->

          <!--<v-layout row>-->
          <!--  <v-flex class="subheading">Information</v-flex>-->
          <!--  <v-spacer />-->
          <!--  <v-icon small>edit</v-icon>-->
          <!--</v-layout>-->
          <!--<v-layout row>-->
          <!--  <v-flex class="subheading">Information</v-flex>-->
          <!--  <v-spacer />-->
          <!--  <v-icon small>edit</v-icon>-->
          <!--</v-layout>-->
          <!--<v-layout row>-->
          <!--  <v-flex class="subheading">Information</v-flex>-->
          <!--  <v-spacer />-->
          <!--  <v-icon small>edit</v-icon>-->
          <!--</v-layout>-->
  <!--      </v-flex>-->
  <!--    </v-layout>-->
  <!--  </v-container>-->
  <!--</v-layout>-->
          <!--<v-flex xs12 sm4>-->
          <!--  <v-flex xs12 column>-->
          <!--      <v-layout row>-->
          <!--        <v-flex class="subheading">Information</v-flex>-->
          <!--        <v-flex><v-icon small>edit</v-icon></v-flex>-->
          <!--      </v-layout>-->
          <!--      <v-layout row>-->
          <!--        <v-flex class="subheading">Information</v-flex>-->
          <!--        <v-flex><v-icon small>edit</v-icon></v-flex>-->
          <!--      </v-layout><v-layout row>-->
          <!--        <v-flex class="subheading">Information</v-flex>-->
          <!--        <v-flex><v-icon small>edit</v-icon></v-flex>-->
          <!--      </v-layout><v-layout row>-->
          <!--        <v-flex class="subheading">Information</v-flex>-->
          <!--        <v-flex><v-icon small>edit</v-icon></v-flex>-->
          <!--      </v-layout><v-layout row>-->
          <!--        <v-flex class="subheading">Information</v-flex>-->
          <!--        <v-flex><v-icon small>edit</v-icon></v-flex>-->
          <!--      </v-layout><v-layout row>-->
          <!--        <v-flex class="subheading">Information</v-flex>-->
          <!--        <v-flex><v-icon small>edit</v-icon></v-flex>-->
          <!--      </v-layout><v-layout row>-->
          <!--        <v-flex class="subheading">Information</v-flex>-->
          <!--        <v-flex><v-icon small>edit</v-icon></v-flex>-->
          <!--      </v-layout><v-layout row>-->
          <!--        <v-flex class="subheading">Information</v-flex>-->
          <!--        <v-flex><v-icon small>edit</v-icon></v-flex>-->
          <!--      </v-layout><v-layout row>-->
          <!--        <v-flex class="subheading">Information</v-flex>-->
          <!--        <v-flex><v-icon small>edit</v-icon></v-flex>-->
          <!--      </v-layout><v-layout row>-->
          <!--        <v-flex class="subheading">Information</v-flex>-->
          <!--        <v-flex><v-icon small>edit</v-icon></v-flex>-->
          <!--      </v-layout><v-layout row>-->
          <!--        <v-flex class="subheading">Information</v-flex>-->
          <!--        <v-flex><v-icon small>edit</v-icon></v-flex>-->
          <!--      </v-layout><v-layout row>-->
          <!--        <v-flex class="subheading">Information</v-flex>-->
          <!--        <v-flex><v-icon small>edit</v-icon></v-flex>-->
          <!--      </v-layout><v-layout row>-->
          <!--        <v-flex class="subheading">Information</v-flex>-->
          <!--        <v-flex><v-icon small>edit</v-icon></v-flex>-->
          <!--      </v-layout><v-layout row>-->
          <!--        <v-flex class="subheading">Information</v-flex>-->
          <!--        <v-flex><v-icon small>edit</v-icon></v-flex>-->
          <!--      </v-layout><v-layout row>-->
          <!--        <v-flex class="subheading">Information</v-flex>-->
          <!--        <v-flex><v-icon small>edit</v-icon></v-flex>-->
          <!--      </v-layout><v-layout row>-->
          <!--        <v-flex class="subheading">Information</v-flex>-->
          <!--        <v-flex><v-icon small>edit</v-icon></v-flex>-->
          <!--      </v-layout><v-layout row>-->
          <!--        <v-flex class="subheading">Information</v-flex>-->
          <!--        <v-flex><v-icon small>edit</v-icon></v-flex>-->
          <!--      </v-layout><v-layout row>-->
          <!--        <v-flex class="subheading">Information</v-flex>-->
          <!--        <v-flex><v-icon small>edit</v-icon></v-flex>-->
          <!--      </v-layout><v-layout row>-->
          <!--        <v-flex class="subheading">Information</v-flex>-->
          <!--        <v-flex><v-icon small>edit</v-icon></v-flex>-->
          <!--      </v-layout><v-layout row>-->
          <!--        <v-flex class="subheading">Information</v-flex>-->
          <!--        <v-flex><v-icon small>edit</v-icon></v-flex>-->
          <!--      </v-layout><v-layout row>-->
          <!--        <v-flex class="subheading">Information</v-flex>-->
          <!--        <v-flex><v-icon small>edit</v-icon></v-flex>-->
          <!--      </v-layout><v-layout row>-->
          <!--        <v-flex class="subheading">Information</v-flex>-->
          <!--        <v-flex><v-icon small>edit</v-icon></v-flex>-->
          <!--      </v-layout><v-layout row>-->
          <!--        <v-flex class="subheading">Information</v-flex>-->
          <!--        <v-flex><v-icon small>edit</v-icon></v-flex>-->
          <!--      </v-layout><v-layout row>-->
          <!--        <v-flex class="subheading">Information</v-flex>-->
          <!--        <v-flex><v-icon small>edit</v-icon></v-flex>-->
          <!--      </v-layout><v-layout row>-->
          <!--        <v-flex class="subheading">Information</v-flex>-->
          <!--        <v-flex><v-icon small>edit</v-icon></v-flex>-->
          <!--      </v-layout><v-layout row>-->
          <!--        <v-flex class="subheading">Information</v-flex>-->
          <!--        <v-flex><v-icon small>edit</v-icon></v-flex>-->
          <!--      </v-layout><v-layout row>-->
          <!--        <v-flex class="subheading">Information</v-flex>-->
          <!--        <v-flex><v-icon small>edit</v-icon></v-flex>-->
          <!--      </v-layout><v-layout row>-->
          <!--        <v-flex class="subheading">Information</v-flex>-->
          <!--        <v-flex><v-icon small>edit</v-icon></v-flex>-->
          <!--      </v-layout><v-layout row>-->
          <!--        <v-flex class="subheading">Information</v-flex>-->
          <!--        <v-flex><v-icon small>edit</v-icon></v-flex>-->
          <!--      </v-layout><v-layout row>-->
          <!--        <v-flex class="subheading">Information</v-flex>-->
          <!--        <v-flex><v-icon small>edit</v-icon></v-flex>-->
          <!--      </v-layout><v-layout row>-->
          <!--        <v-flex class="subheading">Information</v-flex>-->
          <!--        <v-flex><v-icon small>edit</v-icon></v-flex>-->
          <!--      </v-layout><v-layout row>-->
          <!--        <v-flex class="subheading">Information</v-flex>-->
          <!--        <v-flex><v-icon small>edit</v-icon></v-flex>-->
          <!--      </v-layout><v-layout row>-->
          <!--        <v-flex class="subheading">Information</v-flex>-->
          <!--        <v-flex><v-icon small>edit</v-icon></v-flex>-->
          <!--      </v-layout><v-layout row>-->
          <!--        <v-flex class="subheading">Information</v-flex>-->
          <!--        <v-flex><v-icon small>edit</v-icon></v-flex>-->
          <!--      </v-layout><v-layout row>-->
          <!--        <v-flex class="subheading">Information</v-flex>-->
          <!--        <v-flex><v-icon small>edit</v-icon></v-flex>-->
          <!--      </v-layout><v-layout row>-->
          <!--        <v-flex class="subheading">Information</v-flex>-->
          <!--        <v-flex><v-icon small>edit</v-icon></v-flex>-->
          <!--      </v-layout><v-layout row>-->
          <!--        <v-flex class="subheading">Information</v-flex>-->
          <!--        <v-flex><v-icon small>edit</v-icon></v-flex>-->
          <!--      </v-layout><v-layout row>-->
          <!--        <v-flex class="subheading">Information</v-flex>-->
          <!--        <v-flex><v-icon small>edit</v-icon></v-flex>-->
          <!--      </v-layout><v-layout row>-->
          <!--        <v-flex class="subheading">Information</v-flex>-->
          <!--        <v-flex><v-icon small>edit</v-icon></v-flex>-->
          <!--      </v-layout><v-layout row>-->
          <!--        <v-flex class="subheading">Information</v-flex>-->
          <!--        <v-flex><v-icon small>edit</v-icon></v-flex>-->
          <!--      </v-layout><v-layout row>-->
          <!--        <v-flex class="subheading">Information</v-flex>-->
          <!--        <v-flex><v-icon small>edit</v-icon></v-flex>-->
          <!--      </v-layout><v-layout row>-->
          <!--        <v-flex class="subheading">Information</v-flex>-->
          <!--        <v-flex><v-icon small>edit</v-icon></v-flex>-->
          <!--      </v-layout><v-layout row>-->
          <!--        <v-flex class="subheading">Information</v-flex>-->
          <!--        <v-flex><v-icon small>edit</v-icon></v-flex>-->
          <!--      </v-layout>-->
          <!--  </v-flex>-->


                <!--<v-flex class="pr-1">-->
                <!--    <v-icon small>home</v-icon>-->
                <!--    Job Title-->
                <!--  </v-flex>-->
                <!--  <v-flex class="pl-1">{{ record.JobTitle }}</v-flex>-->

                <!--  <v-flex>-->
                <!--    <v-icon small>person</v-icon>-->
                <!--  </v-flex>-->
                <!--  <v-flex>Source</v-flex>-->
                <!--  <v-flex>{{ record.Source }}</v-flex>-->

  <!--        </v-flex>-->
  <!--      </v-layout>-->
  <!--    </v-container>-->
  <!--  </v-container>-->
  <!--</v-layout>-->
</template>

<script>
  import { CurrencyDisplay } from '../currency';

  export default {
    name: 'candidate-details',
    components: { CurrencyDisplay },
    data() {
      return {
        tab: 'tab-information'
      };
    },
    computed: {
      record() {
        return this.$store.state.details.record;
      },
      resumes() {
        return this.$store.getters['details/getRelated']('Resumes');
      },
      isFetching() {
        return this.$store.state.details.isFetching;
      },
      links() {
        return {
          company: this.record.Company ? `/details/company/${this.record.Company.id}` : '',
          applyJob: `/process/new?candidateId=${this.id}&candidateName=${this.record.Firstname} ${this.record.Lastname}`,
          edit: `/edit-info/Candidate/${this.id}`,
          resumes: `/edit-resumes/${this.id}`,
          interviewNotes: `/edit-notes/Candidate/InterviewNotes/${this.id}`
        };
      }
    }
  };
</script>

<style scoped>
  .profile .height-auto {
    height: auto;
  }
</style>