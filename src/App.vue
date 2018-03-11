<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="mr-5">
        <v-btn fab color="cyan" to="/">{{ title }}</v-btn>
      </v-toolbar-title>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat to="/shop">店舗</v-btn>
        <v-btn flat to="/discount">割引/ポイント</v-btn>
        <v-btn flat to="/item">アイテム</v-btn>
        <v-btn flat to="/list">グラム単価</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer app>
      <v-spacer></v-spacer>
      <div>© dokechin{{ new Date().getFullYear() }}</div>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'Gratan',
  data () {
    return {
      title: 'Gratan'
    }
  }
}
</script>

<style>
</style>
