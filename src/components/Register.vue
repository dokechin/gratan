<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-list two-line>
        <v-subheader>一覧</v-subheader>
        <template v-for="(member,index) in members">
          <v-list-tile avatar v-bind:key="member" @click="">
            <v-list-tile-content>
            <v-list-tile-title v-html="member"></v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn @click="remove(index)">削除</v-btn>
            </v-list-tile-action>
          </v-list-tile>
          <v-divider v-if="!(index == members.length -1)"></v-divider>
        </template>
      </v-list>
    </v-flex>
    <v-form v-model="valid" ref="form" lazy-validation>
      <v-text-field v-model="name" :rules="nameRules" type="text"></v-text-field>
      <div>
        <v-btn @click="add" :disabled="!valid">追加</v-btn>
      </div>
      <v-btn to="/">メニューへ戻る</v-btn>
    </v-form>
  </v-layout>
</template>

<script>
export default {
  name: 'ogura',
  created () {
  },
  data () {
    return {
      valid: true,
      name: '',
      nameRules: [
        (v) => !!v || '名前を入力してください',
        (v) => (v && v.length <= 10) || '10文字以内で入力してください',
        (v) => !(this.$store.state.members.includes(v)) || '既に登録済みの名前です'
      ]
    }
  },
  methods: {
    add () {
      this.$store.commit('addMember', this.name)
      this.$refs.form.reset()
    },
    remove (index) {
      this.$store.commit('removeMember', index)
    }
  },
  computed: {
    members () {
      return this.$store.state.members
    }
  },
  mounted () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
