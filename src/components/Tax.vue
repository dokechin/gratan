<template>
  <v-container>
    <v-form v-model="formValid" ref="form">
      <v-text-field :label="$t('tax rate')" :rules="taxRules" v-model="tax" required></v-text-field>
      <v-btn color="blue darken-1" flat @click.native="save" :disabled="!formValid">{{ $t('save') }}</v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  name: 'tax',
  created () {
  },
  data () {
    return {
      formValid: false,
      tax: null,
      taxRules: [
        (v) => !!v || this.$t('message.tax_empty'),
        (v) => !(v < 0) || this.$t('message.tax_under_zero')
      ]
    }
  },
  methods: {
    save () {
      this.$store.commit('updateTax', this.tax)
    }
  },
  computed: {
  },
  mounted () {
    this.tax = this.$store.state.taxRate
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
