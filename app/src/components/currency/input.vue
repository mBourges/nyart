<template>
  <v-text-field
    type="number"
    :label="label"
    v-model="currency"
    @keyup="handleInput"
    prepend-icon="mdi-currency-cny"
    hint="type m, k for millions or thousand."
  ></v-text-field>
</template>

<script>
  export default {
    name: 'currencyInput',
    props: [ 'value', 'label' ],
    computed: {
      currency: {
        get() {
          return this.value;
        },
        set(value) {
          this.$emit('input', value);
        }
      }
    },
    methods: {
      handleInput(event) {
        const { value } = event.target;
        const valueNumber = Number(value);

        if (Number.isNaN(valueNumber)) {
          return;
        }

        switch (event.key) {
          case 'm':
            this.$emit('input', valueNumber * 1e6);
            break;
          case 'k':
            this.$emit('input', valueNumber * 1e4);
            break;
          default:
        }
      }
    }
  };
</script>
