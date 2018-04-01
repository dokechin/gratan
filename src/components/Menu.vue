<template>
  <div class="gratan">
      <section>
        <v-parallax pb-0 mb-0 :src="require('../assets/hero.jpeg')" height="400">
          <v-layout
            column
            align-center
            justify-center
            class="white--text"
          >
            <h1 class="white--text mb-2 display-3 text-xs-center">Gratan - Unit Price Memo Tool</h1>
          </v-layout>
        </v-parallax>
      </section>

      <section>
          <v-flex xs12>
            <v-container grid-list-xl>
              <v-layout row wrap align-center>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">color_lens</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">{{ $t('discount') }}</div>
                    </v-card-title>
                    <v-card-text>
                    {{ $t('discount text') }}
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">flash_on</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline">{{ $t('light operability' )}}</div>
                    </v-card-title>
                    <v-card-text>
                    {{ $t('light operability text' )}}
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">build</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">PWA</div>
                    </v-card-title>
                    <v-card-text>
                      {{ $t('pwa text')}}
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
      </section>
  </div>
</template>

<script>

export default {
  name: 'gratan',
  created () {
  },
  data () {
    return {
    }
  },
  methods: {
  },
  computed: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
