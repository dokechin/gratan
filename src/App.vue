<template>
  <v-app light>
    <v-navigation-drawer 
      absolute
      class="hidden-md-and-up"
      v-model="sideNav">
      <v-toolbar flat>
        <v-list>
          <v-list-tile>
            <v-list-tile-title class="title">
              <v-btn flat to="/" active-class><img src="./assets/logo.png"/></v-btn>
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-list>
        <v-list-tile v-for="item in items" :key="item.title" :to="item.to">
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app>
      <v-toolbar-side-icon @click.stop="sideNav = !sideNav" class="hidden-md-and-up" ma-0 />
      <v-toolbar-title class="ml-0">
        <v-btn flat to="/" active-class><img src="./assets/logo.png" width="150"/></v-btn>
      </v-toolbar-title>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn v-for="item in items" :key="item.title" flat :to="item.to">{{ item.title }}</v-btn>
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
      title: 'Gratan',
      sideNav: false,
      items: [
        {title: this.$t('shop'), to: '/shop'},
        {title: this.$t('discount'), to: '/discount'},
        {title: this.$t('item'), to: '/item'},
        {title: this.$t('list'), to: '/list'},
        {title: this.$t('tax'), to: '/tax'}
      ]
    }
  }
}
</script>

<style>
</style>
