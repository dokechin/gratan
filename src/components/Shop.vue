<template>
  <v-container fluid>
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
        <v-btn id="new" @click.stop="dialog = true" color="primary" dark slot="activator" class="mb-2">{{ $t('new item') }}</v-btn>
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
                  <v-text-field id="shopName" :label="$t('name')" :rules="nameRules" v-model="editedItem.name" required></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-checkbox id="taxIncluded" :label="$t('pretax')" v-model="editedItem.taxIncluded"></v-checkbox>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn id="cancel" color="blue darken-1" flat @click.native="close">{{ $t('cancel') }}</v-btn>
            <v-btn id="save" color="blue darken-1" flat @click.native="save" :disabled="!formValid">{{ $t('save') }}</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <v-data-table :rows-per-page-text="$t('row per page text')" :headers="headers" :search="search" :pagination.sync="pagination" :items="shops" class="elevation-1">
      <template slot="items" slot-scope="props">
          <td>{{ props.item.name }}</td>
          <td>{{ props.item.taxIncluded ? $t('pretax'): $t('w/o tax')}}</td>
          <td class="layout px-0">
            <v-btn icon class="mx-0" @click="editItem(props.item)">
              <v-icon color="teal">edit</v-icon>
            </v-btn>
            <v-btn icon class="mx-0" @click="deleteItem(props.item)" :disabled="shopIsReferenced(props.item.id)">
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
  name: 'shop',
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
        { text: this.$t('tax'), value: 'taxIncluded' },
        { text: this.$t('action'), value: 'name', sortable: false }
      ],
      editedIndex: -1,
      editedItem: {name: '', taxIncluded: false},
      defaultItem: {name: '', taxIncluded: false},
      updateValid: true,
      nameRules: [
        (v) => !!v || this.$t('message.name_empty'),
        (v) => !(v.length > 30) || this.$t('message.name_length_over_30')
      ]
    }
  },
  methods: {
    editItem (shop) {
      this.editedIndex = this.shops.indexOf(shop)
      this.editedItem = Object.assign({}, shop)
      this.dialog = true
    },
    deleteItem (shop) {
      this.$store.commit('removeShop', shop)
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
        this.$store.commit('updateShop', {index: this.editedIndex, shop: this.editedItem})
      } else {
        this.$store.commit('addShop', this.editedItem)
      }
      this.close()
    }
  },
  computed: {
    ...mapGetters(['shopIsReferenced']),
    shops () {
      return this.$store.state.shops
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
