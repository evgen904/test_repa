<template>
  <div class="header-grandtrain">
    <a href="/" title="" class="logo">
      <img class="logo-image" :src="logoLink" alt="" loading="lazy" />
    </a>
    <button
      class="burger"
      @click="openMenu"
    >
      <div class="burger-line"></div>
      <div class="burger-line"></div>
      <div class="burger-line"></div>
    </button>
    <MenuItems :open="menu"/>
  </div>
</template>

<script>
import VueCookies from "vue-cookies";
import MenuItems from './MenuItems.vue'
import { mapState } from 'vuex'

export default {
  name: "HeaderWhiteLabel",
  components: {
    MenuItems
  },
  data(){
    return {
      menu: false
    }
  },
  computed: {
    ...mapState("user", ["viewPort", "whitelabel"]),
    logoLink() {
      return `https://storage.yandexcloud.net/whitelabel.sutochno.ru/${this.whitelabel?.name}/images/logo.svg`;
    },
  },
  methods: {
    openMenu() {
      this.menu = !this.menu
    }
  }
};
</script>

<style lang="scss">
</style>
