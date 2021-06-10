<template>
  <div class="header-wl">
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
    ...mapState("user", ["whitelabel"]),
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
.header-wl {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  font-size: 13px;

  div {
    height: inherit;
    margin: 0 5px;
  }

  .logo {
    height: inherit;
    margin-left: 20px;

    &-image {
      min-height: 1px;
      width: 171px;
      align-self: center;
    }
  }
}

.burger {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0 0 0 auto;
  border: none;
  font-size: 0;
  line-height: 0;
  background: transparent;
  outline-style: none;
  border-radius: 0;
  box-shadow: none;
  height: 70px;
  width: 60px;
  position: absolute;
  top: 0;
  right: 0;
  outline: none;

  &:hover,
  &:active,
  &:focus {
    background: none;
    box-shadow: none;
    outline: none;
    background: #f1f1f1;
  }
  &:active:focus {
    box-shadow: none;
  }
  .burger-line {
    display: block;
    width: 25px;
    height: 4px;
    background-color: #484848;
    margin: 4px 0 0 0;
    // border-radius: 2px;
    &:first-child {
      margin-top: 0;
    }
  }
}
</style>
