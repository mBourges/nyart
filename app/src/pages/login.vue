<template>
  <v-app>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-btn
            :loading="isProcessing"
            :disabled="isProcessing"
            @click.prevent="handleGoogleSignIn"
            outline
            large
            class="primary primary--text"
          >
            <v-icon left>mdi-google</v-icon>
            Sign In with Google
          </v-btn>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import { auth, googleAuthProvider } from '@/lib/firebase';

  export default {
    name: 'login',
    data() {
      return {
        isProcessing: false,
        errorMessage: null
      };
    },
    computed: {
      redirection() {
        return this.$route.query.redirect || '/';
      }
    },
    methods: {
      handleGoogleSignIn(event) {
        this.isProcessing = true;

        auth.signInWithPopup(googleAuthProvider)
          .then(this.onLoginSuccess)
          .catch(this.onLoginError);
      },
      onLoginSuccess(user) {
        this.$router.replace(this.redirection);
      },
      onLoginError({ message }) {
        this.isProcessing = false;
        this.errorMessage = message;
      }
    }
  };
</script>
