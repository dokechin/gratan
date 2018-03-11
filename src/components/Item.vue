<template>
  <div>
  <v-dialog v-model="dialog" max-width="500px">
    <v-btn color="primary" dark slot="activator" class="mb-2">New Item</v-btn>
    <v-card>
      <v-form v-model="formValid" ref="form">
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Name" :rules="nameRules" v-model="editedItem.name"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-select label="Shop" :rules="shopRules" item-text="name" item-value="id" :items="shops" v-model="editedItem.shop_id" single-line required bottom></v-select>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Price" :rules="nameRules" v-model="editedItem.price"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Amount" :rules="nameRules" v-model="editedItem.amount"></v-text-field>
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
  <v-data-table :headers="headers" :items="items" hide-actions class="elevation-1">
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
        <td>No Items</td>
    </template>
  </v-data-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'item',
  created () {
  },
  data () {
    return {
      formValid: false,
      dialog: false,
      headers: [
        {
          text: 'Items',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'shop', value: 'shop' },
        { text: 'price', value: 'price' },
        { text: 'amount', value: 'amount' },
        { text: 'Actions', value: 'name', sortable: false }
      ],
      editedIndex: -1,
      editedItem: {name: '', shop_id: null, price: 0, amount: 0},
      defaultItem: {name: '', shop_id: null, price: 0, amount: 0},
      updateValid: true,
      nameRules: [
        (v) => !!v || 'アイテム名を入力してください',
        (v) => !(v.length > 30) || 'アイテム名は30文字以内で入力してください'
      ],
      shopRules: [
        (v) => !!v || '店舗を選択してください'
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
      return this.editedIndex === -1 ? '新規登録' : '更新'
    }
  },
  mounted () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
