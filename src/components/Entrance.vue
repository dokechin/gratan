<template>
  <v-layout row wrap>
    <v-flex xs12>
      <template v-for="(member,index) in members">
        <v-checkbox :label="member" v-model="players" :value="index"></v-checkbox>
      </template>
    </v-flex>
    <v-btn @click="submit" :disabled="players.length == 0">プレイ</v-btn>
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
      players: []
    }
  },
  methods: {
    submit () {
      this.$store.commit('setPlayers', this.players)
      this.$store.commit('initializeGame')
      this.$router.push('/play')
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
