<template>
  <v-app light>
    <v-toolbar app>
      <v-toolbar-title class="mr-5">
        <v-btn flat to="/" active-class><img src="./assets/logo.png"/></v-btn>
      </v-toolbar-title>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat to="/shop">{{ $t("shop") }}</v-btn>
        <v-btn flat to="/discount">{{ $t("discount") }}</v-btn>
        <v-btn flat to="/item">{{ $t("item") }}</v-btn>
        <v-btn flat to="/list">{{ $t("gratan") }}</v-btn>
        <v-btn flat to="/tax">{{ $t("tax rate") }}</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer class="blue darken-2">
      <v-layout row wrap align-center>
        <v-flex xs12>
          <div class="white--text ml-3">
            Made by <a class="white--text" href="https://twitter.com/dokechin">@dokechin</a>, Icons made by <a class="white--text" href="http://www.freepik.com" title="Freepik">Freepik</a> from <a class="white--text" href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a class="white--text" href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>
          </div>
        </v-flex>
      </v-layout>
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
