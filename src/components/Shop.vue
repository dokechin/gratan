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
                <v-text-field label="Shop name" :rules="nameRules" v-model="editedItem.name" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-checkbox label="Tax Display" v-model="editedItem.taxIncluded"></v-checkbox>
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
  <v-data-table :headers="headers" :items="shops" hide-actions class="elevation-1">
    <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.taxIncluded ? '税込表示':'税抜表示'}}</td>
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
        <td>No Shops</td>
    </template>
  </v-data-table>
  </div>
</template>

<script>
export default {
  name: 'shop',
  created () {
  },
  data () {
    return {
      formValid: false,
      dialog: false,
      headers: [
        {
          text: 'Shops',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Tax', value: 'taxIncluded' },
        { text: 'Actions', value: 'name', sortable: false }
      ],
      editedIndex: -1,
      editedItem: {name: '', taxIncluded: false},
      defaultItem: {name: '', taxIncluded: false},
      updateValid: true,
      nameRules: [
        (v) => !!v || '店舗名を入力してください',
        (v) => !(v.length > 30) || '店舗名は30文字以内で入力してください'
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
    shops () {
      return this.$store.state.shops
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
