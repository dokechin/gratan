<template>
  <div class="ogura">
    <v-layout row justify-center>
      <img src="../assets/logo.png"/>
    </v-layout>
    <v-layout row justify-center>
      <h2>{{ display }}</h2>
    </v-layout>
    <v-layout row justify-center>
      <template v-for="(player,index) in players">
        <v-btn large v-on:click="countUp(player)" :disabled="buttonDisabled">{{ members[player]}}</v-btn>
      </template>
    </v-layout>
    <br>
    <v-layout row justify-center>
      <v-btn large v-on:click="play">{{ buttonValue }}</v-btn>
    </v-layout>
  </div>
</template>

<script>

export default {
  name: 'ogura',
  created () {
  },
  data () {
    return {
      items: [
        { yomi: '秋の田の　かりほのいおの　苫をあらみ　わが衣手は　露にぬれつつ' },
        { yomi: '春すぎて　夏きにけらし　白妙の　衣ほすちょう　あまのかぐ山' },
        { yomi: 'あしびきの　山鳥の尾の　しだり尾の　ながながしよを　ひとりかもねん' },
        { yomi: '田子の浦に　うちいでてみれば　白妙の　富士の高嶺に　雪は降りつつ' },
        { yomi: '奥山に　紅葉踏みわけ　鳴く鹿の　声きく時ぞ　秋は悲しき' },
        { yomi: 'かささぎの　渡せる橋に　おく霜の　白きをみれば　よぞふけにける' },
        { yomi: 'あまの原　ふりさけ見れば　かすがなる　三笠の山に　いでし月かも' },
        { yomi: 'わがいおは　みやこのたつみ　鹿ぞすむ　世をうじ山と　人はいうなり' },
        { yomi: '花の色は　うつりにけりな　いたづらに　わが身世にふる　ながめせしまに' },
        { yomi: 'これやこの　行くも帰るも　別れては　知るも知らぬも　逢坂の関' },
        { yomi: 'わたの原　やそしまかけて　こぎいでぬと　人には告げよ　海女のつり舟' },
        { yomi: 'あまつ風　雲のかよいじ　ふきとじよ　をとめの姿　しばしとどめん' },
        { yomi: '筑波嶺の　峰よりおつる　みなのがわ　恋ぞつもりて　淵となりぬる' },
        { yomi: '陸奥の　しのぶもぢずり　だれゆゑに　乱れそめにし　われならなくに' },
        { yomi: '君が為　春の野にいでて　若菜つむ　わが衣手に　雪は降りつつ' },
        { yomi: 'たち別れ　いなばの山の　峰におうる　まつとしきかば　今帰りこん' },
        { yomi: 'ちハやぶる　神代も聞かず　竜田川　からくれなゐに　水くくるとは' },
        { yomi: 'すみの江の　岸による波　よるさえや　夢のかよいじ　人めよくらん' },
        { yomi: 'なにわ潟　みじかき芦の　ふしのまも　あはでこの世を　すぐしてよとや' },
        { yomi: 'わびぬれば　今はた同じ　なにわなる　みをつくしても　あはんとぞおもう' },
        { yomi: 'いまこんと　いいしばかりに　長月の　有明の月を　待ちいずるかな' },
        { yomi: '吹くからに　秋の草木の　しをるれば　むべ山風を　嵐というらん' },
        { yomi: '月見れば　ちぢにものこそ　悲しけれ　わがみ一つの　秋にはあらねど' },
        { yomi: 'このたびは　ぬさもとりあへず　たむけ山　紅葉の錦　神のまにまに' },
        { yomi: '名にしおわば　逢坂山の　さねかづら　人にしられで　くるよしもがな' },
        { yomi: '小倉山　峰のもみぢば　心あらば　今ひとたびの　みゆきまたなん' },
        { yomi: 'みかの原　わきてながるる　泉川　いつ見きとてか　恋しかるらん' },
        { yomi: '山里は　冬ぞさびしさ　まさりける　人目も草も　かれぬと思えば' },
        { yomi: '心あてに　おらばやおらん　初霜の　置きまどはせる　しらぎくの花' },
        { yomi: 'ありあけの 　つれなくみえし　わかれより　あかつきばかり　うきものはなし' },
        { yomi: '朝ぼらけ　有明の月と　見るまでに　吉野の里に　降れる白雪' },
        { yomi: '山川に　風のかけたる　しがらみは　流れもあへぬ　紅葉なりけり' },
        { yomi: 'ひさかたの　光のどけき　春の日に　静心なく　花の散るらん' },
        { yomi: '誰をかも　知る人にせむ　高砂の　松も昔の　友ならなくに' },
        { yomi: '人はいさ　心も知らず　ふるさとは　花ぞ昔の　かににおいける' },
        { yomi: '夏のよわ　まだ宵ながら　明けぬるを　雲のいづこに　月宿るらん' },
        { yomi: '白露に　風の吹きしく　秋の野は　つらぬきとめぬ　玉ぞ散りける' },
        { yomi: 'わすらるる　身をばおもわず　ちかいてし　人の命の　惜しくもあるかな' },
        { yomi: '浅茅生の　小野のしの原　しのぶれど　あまりてなどか　人の恋しき' },
        { yomi: 'しのぶれど　色にいでにけり　わが恋は　物やおもうと　人のとうまで' },
        { yomi: '恋すちょう　わが名はまだき　立ちにけり　人知れずこそ　おもいそめしか' },
        { yomi: '契りきな　かたみに袖を　しぼりつつ　末の松山　波こさじとは' },
        { yomi: 'あい見ての　のちの心に　くらぶれば　昔は物を　おもわざりけり' },
        { yomi: 'あうことの　絶えてしなくば　なかなかに　人をも身をも　恨みざらまし' },
        { yomi: 'あはれとも　いうべき人は　おもほえで　身のいたづらに　なりぬべきかな' },
        { yomi: '由良のとを　渡る舟人　かぢを絶え　ゆくへも知らぬ　恋の道かな' },
        { yomi: '八重葎　しげれる宿の　さびしきに　人こそ見えね　秋は来にけり' },
        { yomi: '風をいたみ　岩うつ波の　おのれのみ　くだけて物を　おもうころかな' },
        { yomi: 'みかきもり　衛士のたく火の　夜は燃え　昼は消えつつ　物をこそおもえ' },
        { yomi: '君がため　惜しからざりし　命さえ　長くもがなと　おもいけるかな' },
        { yomi: 'かくとだに　えやわいぶきの　さしもぐさ　さしも知らじな　もゆるおもいを' },
        { yomi: '明けぬれば　くるるものとは　知りながら　なおうらめしき　朝ぼらけかな' },
        { yomi: '嘆きつつ　ひとり寝るよの　あくるまは　いかに久しき　ものとかは知る' },
        { yomi: '忘れじの　行く末までは　かたければ　今日を限りの　命ともがな' },
        { yomi: '滝の音は　絶えて久しく　なりぬれど　名こそ流れて　なお聞こえけれ' },
        { yomi: 'あらざらん　この世のほかの　おもいでに　今ひとたびの　あうこともがな' },
        { yomi: 'めぐりあいて　見しやそれとも　わかぬまに　雲がくれにし　よはの月かな' },
        { yomi: '有馬山　いなの笹ばら　かぜ吹けば　いでそよ人を　忘れやはする' },
        { yomi: 'やすらはで　ねなましものを　さ夜更けて　かたぶくまでの　月を見しかな' },
        { yomi: '大江山　いく野の道の　遠ければ　まだふみもみず　あまの橋立' },
        { yomi: 'いにしへの　奈良のみやこの　八重桜　きょう九重に　においぬるかな' },
        { yomi: 'よをこめて　鳥のそらねわ　はかるとも　よに逢坂の　関はゆるさじ' },
        { yomi: '今はただ　おもい絶えなん　とばかりを　人づてならで　いうよしもがな' },
        { yomi: '朝ぼらけ　宇治の川霧　たえだえに　あらわれわたる　せぜの網代木' },
        { yomi: '恨みわび　ほさぬ袖だに　あるものを　恋に朽ちなん　名こそ惜しけれ' },
        { yomi: 'もろともに　あはれとおもえ　山桜　花よりほかに　知る人もなし' },
        { yomi: '春のよの　夢ばかりなる　手枕に　かいなく立たん　名こそ惜しけれ' },
        { yomi: '心にも　あらでうき世に　ながらえば　恋しかるべき　よはの月かな' },
        { yomi: '嵐吹く　みむろの山の　もみぢばわ　竜田の川の　錦なりけり' },
        { yomi: 'さびしさに　宿を立ちいでて　ながむれば　いづこも同じ　秋の夕暮れ' },
        { yomi: 'ゆうされば　かどだの稲葉　おとづれて　芦のまろやに　秋風ぞ吹く' },
        { yomi: '音に聞く　高師の浜の　あだ波は　かけじや袖の　ぬれもこそすれ' },
        { yomi: '高砂の　尾の上の桜　咲きにけり　外山の霞　立たずもあらなん' },
        { yomi: 'うかりける　人を初瀬の　山おろしよ　はげしかれとは　祈らぬものを' },
        { yomi: '契りおきし　させもが露を　命にて　あはれ今年の　秋もいぬめり' },
        { yomi: 'わたの原　漕ぎいでて見れば　ひさかたの　雲居にまがう　沖つ白波' },
        { yomi: '瀬をはやみ　岩にせかるる　滝川の　われても末に　あはんとぞおもう' },
        { yomi: '淡路島　かよう千鳥の　鳴く声に　いくよ寝覚めぬ　須磨の関守' },
        { yomi: '秋風に　たなびく雲の　絶え間より　もれいづる月の　影のさやけさ' },
        { yomi: 'ながからん　心も知らず　黒髪の　乱れて今朝は　物をこそおもえ' },
        { yomi: 'ほととぎす　鳴きつるかたを　ながむれば　ただ有明の　月ぞ残れる' },
        { yomi: 'おもいわび　さても命は　あるものを　憂きにたへぬわ　涙なりけり' },
        { yomi: '世の中よ　道こそなけれ　おもいいる　山の奥にも　鹿ぞなくなる' },
        { yomi: 'ながらえば　またこのごろや　しのばれん　うしと見しよぞ　今は恋しき' },
        { yomi: '夜もすがら　物おもうころは　明けやらで　閨のひまさへ　つれなかりけり' },
        { yomi: '嘆けとて　月やは物を　おもわする　かこちがおなる　わが涙かな' },
        { yomi: '村雨の　露もまだひぬ　まきの葉に　霧立ちのぼる　秋の夕暮れ' },
        { yomi: 'なにわ江の　芦のかりねの　ひとよゆゑ　みをつくしてや　こいわたるべき' },
        { yomi: '玉の緒よ　絶えなば絶えね　ながらえば　しのぶることの　よわりもぞする' },
        { yomi: '見せばやな　おじまのあまの　袖だにも　ぬれにぞぬれし　色はかわらず' },
        { yomi: 'きりぎりす　鳴くや霜夜の　さむしろに　衣かたしき　ひとりかも寝ん' },
        { yomi: 'わが袖は　潮干に見えぬ　沖の石の　人こそ知らね　かわくまもなし' },
        { yomi: '世の中は　常にもがもな　渚こぐ　あまの小舟の　綱手かなしも' },
        { yomi: 'み吉野の　山の秋風　さ夜更けて　ふるさと寒く　衣うつなり' },
        { yomi: 'おほけなく　うき世の民に　おおうかな　わが立つ杣に　墨染の袖' },
        { yomi: '花さそう　嵐の庭の　雪ならで　ふりゆくものは　わが身なりけり' },
        { yomi: '来ぬ人を　まつほの浦の　ゆうなぎに　焼くや藻塩の　身もこがれつつ' },
        { yomi: '風そよぐ　ならの小川の　夕暮れは　みそぎぞ夏の　しるしなりける' },
        { yomi: '人も惜し　人も恨めし　あぢきなく　世をおもうゆゑに　物おもう身は' },
        { yomi: 'ももしきや　古き軒端の　しのぶにも　なおあまりある　昔なりけり' }
      ]
    }
  },
  methods: {
    mounted () {
    },
    nextFuda () {
      if (this.$store.state.readingIndex === 99) {
        clearTimeout(this.$store.state.timeoutHandle)
        this.$store.commit('incrementIndex')
        this.$router.push('/ending')
      } else {
        this.$store.commit('incrementIndex')
        this.read()
      }
    },
    countUp (index) {
      this.$store.commit('incrementScore', index)
      this.nextFuda()
    },
    play () {
      if (this.$store.state.readingIndex === -1) {
        this.nextFuda()
      } else {
        clearTimeout(this.$store.state.timeoutHandle)
        this.$router.push('/ending')
      }
    },
    read () {
      speechSynthesis.cancel()
      var u = new SpeechSynthesisUtterance()
      u.text = this.items[this.$store.state.readingOrder[this.$store.state.readingIndex]].yomi
      u.lang = 'ja-JP'
      u.rate = this.$store.state.readingSpeed / 100
      speechSynthesis.speak(u)

      if (this.$store.state.timeoutHandle != null) {
        clearTimeout(this.$store.state.timeoutHandle)
        this.$store.commit('setTimeoutHandle', null)
      }
      var that = this
      var handle = setTimeout(function () { that.read() }, that.$store.state.repeatInterval * 1000)
      this.$store.commit('setTimeoutHandle', handle)
    }
  },
  computed: {
    buttonDisabled () {
      if (this.$store.state.readingIndex === -1) {
        return true
      } else {
        return false
      }
    },
    display () {
      if (this.$store.state.readingIndex === -1) {
        return '開始前'
      } else {
        return (this.$store.state.readingIndex + 1) + '首目'
      }
    },
    buttonValue () {
      if (this.$store.state.readingIndex === -1) {
        return '開始'
      } else {
        return '終了'
      }
    },
    members () {
      return this.$store.state.members
    },
    players () {
      return this.$store.state.players
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
