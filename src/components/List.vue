<template>
  <v-container pa-0>
    <v-layout row wrap mb-2>
      <v-flex xs6>
        <v-text-field
          append-icon="search"
          :label="$t('search')"
          single-line
          hide-details
          v-model="search">
        </v-text-field>
      </v-flex>
    </v-layout>
    <v-data-table :rows-per-page-text="$t('row per page text')" :headers="headers" :items="getGratanList" :pagination.sync="pagination" :search="search" class="elevation-1">
      <template slot="items" slot-scope="props">
          <td>{{ props.item.name }}</td>
          <td>{{ props.item.shop }}</td>
          <td>{{ props.item.discount }}</td>
          <td>{{ props.item.price }}</td>
          <td>{{ props.item.amount }}</td>
          <td>{{ props.item.gratan }}</td>
      </template>
      <template slot="no-data">
          <td>{{ $t('no items') }}</td>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'list',
  created () {
  },
  data () {
    return {
      pagination: {
        sortBy: 'name'
      },
      search: '',
      dialog: false,
      headers: [
        {
          text: this.$t('name'),
          align: 'left',
          value: 'name'
        },
        { text: this.$t('shop'), value: 'shop' },
        { text: this.$t('discount'), value: 'price' },
        { text: this.$t('price'), value: 'price' },
        { text: this.$t('amount'), value: 'amount' },
        { text: this.$t('gratan'), value: 'gratan' }
      ]
    }
  },
  methods: {
  },
  computed: {
    ...mapGetters(['getGratanList'])
  },
  mounted () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
