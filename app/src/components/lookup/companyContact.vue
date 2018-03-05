<template>
  <v-layout wrap>
    <v-flex xs12 md6>
      <company-lookup
        :value="company"
        @change="handleCompanyChange"
      />
    </v-flex>
    <v-flex xs12 md6>
      <v-select
        prepend-icon="mdi-account-multiple"
        label="Client Contact"
        :items="clients"
        :value="contact"
        @change="handleClientChange"
        item-text="Name"
        item-value="id"
        return-object
        :disabled="hasNoContact"
        :loading="isLoading"
      />
    </v-flex>
  </v-layout>
</template>

<script>
  import { firestore } from '@/lib/firebase';
  import firebullet from '@/lib/firebullet';
  import CompanyLookup from './company';

  export default {
    name: 'company-contact-lookup',
    components: { CompanyLookup },
    props: [ 'company', 'contact' ],
    data() {
      return {
        isLoading: false,
        clients: []
      };
    },
    computed: {
      hasNoContact() {
        return this.clients.length <= 0;
      }
    },
    methods: {
      handleCompanyChange(value) {
        if (!value) {
          this.$emit('company-change', null);
          this.$emit('contact-change', null);
        } else {
          this.$emit('company-change', value);
        }
      },
      handleClientChange(value) {
        if (!value) {
          this.$emit('contact-change', null);
        } else {
          const contact = {
            ...value,
            ref: firebullet.generateRef('ClientContact', value.id)
          };

          this.$emit('contact-change', contact);
        }
      }
    },
    watch: {
      company(newValue, oldValue) {
        if (!oldValue || newValue.id !== oldValue.id) {
          this.isLoading = true;

          firestore.collection('ClientContact')
            .where('Company.ref', '==', newValue.ref)
            .get()
            .then(querySnapshot => {
              let results = [];

              querySnapshot.forEach(doc => {
                const contact = doc.data();

                results = [
                  ...results, {
                    Name: `${contact.Firstname} ${contact.Lastname}`,
                    id: doc.id
                  }
                ];
              });

              this.clients = results;
              this.isLoading = false;

              if (results.length > 0) {
                this.handleClientChange(results[0]);
              }
            });
        }
      }
    }
  };
</script>
