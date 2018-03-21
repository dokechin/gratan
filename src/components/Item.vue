<template>
  <v-container>
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
      <v-flex xs5 />
      <v-flex xs1>
      <v-btn @click.stop="dialog = true" color="primary" dark slot="activator" class="mb-2" :disabled="this.$store.state.discounts.length == 0">{{ $t('new item') }}</v-btn>
      </v-flex>
    </v-layout>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-form v-model="formValid" ref="form">
          <v-card-title>
            <span class="headline">{{ $t(formTitle) }}</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md6>
                  <v-text-field :label="$t('name')" :rules="nameRules" v-model="editedItem.name" required></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-select :label="$t('shop')" :rules="shopRules" item-text="name" item-value="id" :items="shops" v-model="editedItem.shop_id" single-line required bottom></v-select>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-text-field :label="$t('price')" :rules="priceRules" v-model="editedItem.price"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-text-field :label="$t('amount')" :rules="amountRules" v-model="editedItem.amount"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click.native="save" :disabled="!formValid">Save</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <v-data-table :rows-per-page-text="$t('row per page text')" :headers="headers" :items="items" :pagination.sync="pagination" :search="search" class="elevation-1">
      <template slot="items" slot-scope="props">
          <td>{{ props.item.name }}</td>
          <td>{{ getShopById(props.item.shop_id).name }}</td>
          <td>{{ props.item.price }}</td>
          <td>{{ props.item.amount }}</td>
          <td class="layout px-0">
            <v-btn icon class="mx-0" @click="editItem(props.item)">
              <v-icon color="teal">edit</v-icon>
            </v-btn>
            <v-btn icon class="mx-0" @click="deleteItem(props.item)">
              <v-icon color="pink">delete</v-icon>
            </v-btn>
          </td>
      </template>
      <template slot="no-data">
          <td>{{ $t('no items')}}</td>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'item',
  created () {
  },
  data () {
    return {
      pagination: {
        sortBy: 'name'
      },
      search: '',
      formValid: false,
      dialog: false,
      headers: [
        {
          text: this.$t('name'),
          align: 'left',
          value: 'name'
        },
        { text: this.$t('shop'), value: 'shop' },
        { text: this.$t('price'), value: 'price' },
        { text: this.$t('amount'), value: 'amount' },
        { text: this.$t('action'), value: 'name', sortable: false }
      ],
      editedIndex: -1,
      editedItem: {name: '', shop_id: null, price: 0, amount: 0},
      defaultItem: {name: '', shop_id: null, price: 0, amount: 0},
      updateValid: true,
      nameRules: [
        (v) => !!v || this.$t('message.name_empty'),
        (v) => !(v.length > 30) || this.$t('message.name_length_over_30')
      ],
      shopRules: [
        (v) => !!v || this.$t('message.shop_is_empty')
      ],
      priceRules: [
        (v) => !(v <= 0) || this.$t('message.price_under_zero')
      ],
      amountRules: [
        (v) => !(v <= 0) || this.$t('message.amount_under_zero')
      ]
    }
  },
  methods: {
    editItem (item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem (item) {
      this.$store.commit('removeItem', item)
    },
    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },
    save () {
      if (this.editedIndex > -1) {
        this.$store.commit('updateItem', {index: this.editedIndex, item: this.editedItem})
      } else {
        this.$store.commit('addItem', this.editedItem)
      }
      this.close()
    }
  },
  computed: {
    ...mapGetters(['getShopById']),
    shops () {
      return this.$store.state.shops
    },
    items () {
      return this.$store.state.items
    },
    formTitle () {
      return this.editedIndex === -1 ? 'register' : 'update'
    }
  },
  mounted () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
