<template>
  <div class="header-wl__items" :class="{ open }">
    <a 
      href="https://cian.ru/snyat/"
      class="header-wl-item link"
      target="_blank"
    >Аренда</a>
    <a 
      href="https://cian.ru/kupit/"
      class="header-wl-item link"
      target="_blank"
    >Продажа</a>
    <a
      href="https://cian.ru/novostrojki/"
      class="header-wl-item link"
      target="_blank"
    >Новостройки</a>
    <a
      href="https://cian.ru/commercial/"
      class="header-wl-item link"
      target="_blank"
    >Коммерческая</a>
    <a
      href="https://cian.ru/kalkulator-nedvizhimosti/"
      class="header-wl-item link"
      target="_blank"
    >Оценка</a>
    <a
      href="https://cian.ru/ipoteka-main"
      class="header-wl-item link"
      target="_blank"
    >Ипотека</a>
  </div>
</template>

<script>

export default {
  name: "MenuItems",
  props: {
    open: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss">
.header-wl {

  &__items {
    display: flex;
    align-items: center;
  }

  &-item {
    margin-right: 16px;
    // color: #ffffff;
    display: block;
    height: 70px;
    line-height: 70px;
    font-size: 14px;
    position: relative;

    &:before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: #ced1d7;
      opacity: 0;
    }

    &:hover {
      &:before {
        opacity: 1;
      }
    }
  }
}
</style>
