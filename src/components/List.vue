<template>
  <v-card>
    <v-card-title>
      Nutrition
      <v-spacer></v-spacer>
      <v-text-field
        append-icon="search"
        label="Search"
        single-line
        hide-details
        v-model="search">
      </v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="getGratanList" hide-actions :search="search" class="elevation-1">
    <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.shop }}</td>
        <td>{{ props.item.discount }}</td>
        <td>{{ props.item.price }}</td>
        <td>{{ props.item.amount }}</td>
        <td>{{ props.item.gratan }}</td>
    </template>
    <template slot="no-data">
        <td>No Lists</td>
    </template>
  </v-data-table>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'list',
  created () {
  },
  data () {
    return {
      search: '',
      dialog: false,
      headers: [
        {
          text: 'List',
          align: 'left',
          sortable: true,
          value: 'name'
        },
        { text: 'shop', value: 'shop' },
        { text: 'discount', value: 'price' },
        { text: 'price', value: 'price' },
        { text: 'amount', value: 'amount' },
        { text: 'gratan', value: 'gratan' }
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
