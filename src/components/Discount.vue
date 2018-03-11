<template>
  <div>
  <v-dialog v-model="dialog" max-width="500px">
    <v-btn color="primary" dark slot="activator" class="mb-2" :disabled="this.$store.state.shops.length == 0">New Item</v-btn>
    <v-card>
      <v-form v-model="formValid" ref="form">
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs6 sm6 md6>
                <v-text-field label="Name" :rules="nameRules" v-model="editedItem.name" required></v-text-field>
              </v-flex>
              <v-flex xs6 sm6 md6>
                <v-select label="Shop" :rules="shopRules" item-text="name" item-value="id" :items="shops" v-model="editedItem.shop_id" required></v-select>
              </v-flex>
              <v-flex xs4 sm4 md4>
                <v-text-field label="Discount1" :rules="discountRules" v-model="editedItem.discount1"></v-text-field>
              </v-flex>
              <v-flex xs4 sm4 md4>
                <v-text-field label="Discount2" :rules="discountRules" v-model="editedItem.discount2"></v-text-field>
              </v-flex>
              <v-flex xs4 sm4 md4>
                <v-text-field label="Discount3" :rules="discountRules" v-model="editedItem.discount3"></v-text-field>
              </v-flex>
              <v-flex xs4 sm4 md4>
                <v-text-field label="Point1" :rules="pointRules" v-model="editedItem.point1"></v-text-field>
              </v-flex>
              <v-flex xs4 sm4 md4>
                <v-text-field label="Point2" :rules="pointRules" v-model="editedItem.point2"></v-text-field>
              </v-flex>
              <v-flex xs4 sm4 md4>
                <v-text-field label="Point3" :rules="pointRules" v-model="editedItem.point3"></v-text-field>
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
  <v-data-table :headers="headers" :items="discounts" hide-actions class="elevation-1">
    <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
        <td>{{ getShopById(props.item.shop_id).name }}</td>
        <td>{{ props.item.discount1 }}</td>
        <td>{{ props.item.discount2 }}</td>
        <td>{{ props.item.discount3 }}</td>
        <td>{{ props.item.point1 }}</td>
        <td>{{ props.item.point2 }}</td>
        <td>{{ props.item.point3 }}</td>
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
        <td>No Discounts</td>
    </template>
  </v-data-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'discount',
  created () {
  },
  data () {
    return {
      formValid: false,
      dialog: false,
      headers: [
        {
          text: 'Discounts',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Shop', value: 'shop.name' },
        { text: 'Discount1', value: 'discount1' },
        { text: 'Discount2', value: 'discount2' },
        { text: 'Discount3', value: 'discount3' },
        { text: 'Point1', value: 'point1' },
        { text: 'Point2', value: 'point2' },
        { text: 'Point3', value: 'point3' },
        { text: 'Actions', value: 'name', sortable: false }
      ],
      editedIndex: -1,
      editedItem: {name: '', shop_id: null, discount1: 0, discount2: 0, discount3: 0, point1: 0, point2: 0, point3: 0},
      defaultItem: {name: '', shop_id: null, discount1: 0, discount2: 0, discount3: 0, point1: 0, point2: 0, point3: 0},
      updateValid: true,
      nameRules: [
        (v) => !!v || '割引名を入力してください',
        (v) => !(v.length > 30) || '割引名は30文字以内で入力してください'
      ],
      shopRules: [
        (v) => !!v || '店舗を選択してください'
      ],
      discountRules: [
        (v) => !(v > 100 || v < 0) || '割引率は0-100で入力してください'
      ],
      pointRules: [
        (v) => !(v > 100 || v < 0) || 'ポイント率は0-100で入力してください'
      ]
    }
  },
  methods: {
    editItem (discount) {
      this.editedIndex = this.discounts.indexOf(discount)
      this.editedItem = Object.assign({}, discount)
      this.dialog = true
    },
    deleteItem (discount) {
      this.$store.commit('removeDiscount', discount)
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
        this.$store.commit('updateDiscount', {index: this.editedIndex, discount: this.editedItem})
      } else {
        this.$store.commit('addDiscount', this.editedItem)
      }
      this.close()
    }
  },
  computed: {
    ...mapGetters(['getShopById']),
    shops () {
      return this.$store.state.shops
    },
    discounts () {
      return this.$store.state.discounts
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
