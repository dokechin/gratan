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
      <v-flex xs5 />
      <v-flex xs1>
        <v-btn @click.stop="dialog = true" color="primary" dark slot="activator" class="mb-2" :disabled="this.$store.state.shops.length == 0">{{ $t('new item') }}</v-btn>
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
                <v-flex xs6 sm6 md6>
                  <v-text-field :label="$t('name')" :rules="nameRules" v-model="editedItem.name" required></v-text-field>
                </v-flex>
                <v-flex xs6 sm6 md6>
                  <v-select :label="$t('shop')" :rules="shopRules" item-text="name" item-value="id" :items="shops" v-model="editedItem.shop_id" required></v-select>
                </v-flex>
                <v-flex xs4 sm4 md4>
                  <v-text-field :label="$t('discount1')" :rules="discountRules" v-model="editedItem.discount1"></v-text-field>
                </v-flex>
                <v-flex xs4 sm4 md4>
                  <v-text-field :label="$t('discount2')" :rules="discountRules" v-model="editedItem.discount2"></v-text-field>
                </v-flex>
                <v-flex xs4 sm4 md4>
                  <v-text-field :label="$t('discount3')" :rules="discountRules" v-model="editedItem.discount3"></v-text-field>
                </v-flex>
                <v-flex xs4 sm4 md4>
                  <v-text-field :label="$t('point1')" :rules="pointRules" v-model="editedItem.point1"></v-text-field>
                </v-flex>
                <v-flex xs4 sm4 md4>
                  <v-text-field :label="$t('point2')" :rules="pointRules" v-model="editedItem.point2"></v-text-field>
                </v-flex>
                <v-flex xs4 sm4 md4>
                  <v-text-field :label="$t('point3')" :rules="pointRules" v-model="editedItem.point3"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="close">{{ $t('cancel') }}</v-btn>
            <v-btn color="blue darken-1" flat @click.native="save" :disabled="!formValid">{{ $t('save') }}</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <v-data-table :rows-per-page-text="$t('row per page text')" :headers="headers" :search="search" :items="discounts" :pagination.sync="pagination" class="elevation-1">
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
          <td>{{ $t('no items')}}</td>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'discount',
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
        { text: this.$t('shop'), value: 'shop.name' },
        { text: this.$t('discount1'), value: 'discount1' },
        { text: this.$t('discount2'), value: 'discount2' },
        { text: this.$t('discount3'), value: 'discount3' },
        { text: this.$t('point1'), value: 'point1' },
        { text: this.$t('point2'), value: 'point2' },
        { text: this.$t('point3'), value: 'point3' },
        { text: this.$t('action'), value: 'name', sortable: false }
      ],
      editedIndex: -1,
      editedItem: {name: '', shop_id: null, discount1: 0, discount2: 0, discount3: 0, point1: 0, point2: 0, point3: 0},
      defaultItem: {name: '', shop_id: null, discount1: 0, discount2: 0, discount3: 0, point1: 0, point2: 0, point3: 0},
      updateValid: true,
      nameRules: [
        (v) => !!v || this.$t('message.name_empty'),
        (v) => !(v.length > 30) || this.$t('message.name_length_over_30')
      ],
      shopRules: [
        (v) => !!v || this.$t('message.shop_is_empty')
      ],
      discountRules: [
        (v) => !(v > 100 || v < 0) || this.$t('discount_between_0_100')
      ],
      pointRules: [
        (v) => !(v > 100 || v < 0) || this.$t('point_between_0_100')
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
