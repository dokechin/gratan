<template>
  <v-form v-model="valid" ref="form" lazy-validation>
    <v-layout row wrap>
      <v-flex xs10>
        <v-slider label="再生間隔" ref="refRepeadInterval" v-bind:min="12" v-bind:max="30" v-model="repeatInterval" required></v-slider>
      </v-flex>
      <v-flex xs2>
        <v-text-field v-model="repeatInterval" :rules="repeatIntervalRules" type="number"></v-text-field>
      </v-flex>
      <v-flex xs10>
        <v-slider label="再生速度" ref="refReadingSpeed" v-bind:min="70" v-bind:max="130" v-model="readingSpeed" required></v-slider>
      </v-flex>
      <v-flex xs2>
        <v-text-field v-model="readingSpeed" :rules="readingSpeedRules" type="number"></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-btn @click="update" :disabled="!valid">保存</v-btn>
      </v-flex>
      <v-flex xs12>
        <v-btn to="/">メニューへ戻る</v-btn>
      </v-flex>
    </v-layout>
  </v-form>
</template>

<script>
export default {
  name: 'ogura',
  created () {
  },
  data () {
    return {
      valid: true,
      repeatInterval: '',
      repeatIntervalRules: [
        (v) => !!v || '再生間隔を入力してください',
        (v) => !(v < 12 || v > 30) || '12から30の値を設定してください',
        (v) => /^\d+$/.test(v) || '再生間隔は数字で入力してください'
      ],
      readingSpeed: '',
      readingSpeedRules: [
        (v) => !!v || '再生速度を入力してください',
        (v) => !(v < 70 || v > 130) || '50から150の値を入力してください',
        (v) => /^\d+$/.test(v) || '再生速度は数字で入力してください'
      ]
    }
  },
  methods: {
    update () {
      this.$store.commit('setParameter', { repeatInterval: this.$refs.refRepeadInterval.value, readingSpeed: this.$refs.refReadingSpeed.value })
    }
  },
  mounted () {
    this.repeatInterval = this.$store.state.repeatInterval
    this.readingSpeed = this.$store.state.readingSpeed
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
