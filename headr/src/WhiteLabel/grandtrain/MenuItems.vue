<template>
  <ul class="header-grandtrain__items" :class="{ open }">
    <li class="header-grandtrain-item">
      <a 
        href="https://grandtrain.ru/"
        class="link"
        target="_blank"
      >Купить билет</a>
    </li>
    <li class="header-grandtrain-item">
      <a 
        href="https://grandtrain.ru/raspisanie/"
        class="link"
        target="_blank"
      >Расписание</a>
    </li>
    <li class="header-grandtrain-item dropdown">
      <a
        :href="viewPort === 'desktop' ? `https://grandtrain.ru/trains/` : null"
        class="link"
        target="_blank"
        @click="view.train = !view.train"
      >Поезда</a>
      <ul class="header-grandtrain__submenu" v-show="view.train || viewPort === 'desktop'">
        <li>
          <a 
            href="https://grandtrain.ru/trains/ge/" 
            class="header-grandtrain__submenu-item"
            target="_blank"
          >Гранд Экспресс</a>
        </li>
        <li>
          <a 
            href="https://grandtrain.ru/trains/tav/"
            class="header-grandtrain__submenu-item"
            target="_blank"
          >Таврия</a>
        </li>
      </ul>
    </li>
    <li class="header-grandtrain-item dropdown">
      <a
        :href="viewPort === 'desktop' ? `https://grandtrain.ru/passazhiram/` : null"
        class="link"
        target="_blank"
        @click="view.passanger = !view.passanger"
      >Пассажирам</a>
      <ul class="header-grandtrain__submenu" v-show="view.passanger || viewPort === 'desktop'">
        <li>
          <a 
            href="https://grandtrain.ru/vozvrat-biletov/" 
            class="header-grandtrain__submenu-item"
            target="_blank"
          >Возврат билетов</a>
        </li>
        <li>
          <a 
            href="https://grandtrain.ru/obratnaya-svyaz/" 
            class="header-grandtrain__submenu-item"
            target="_blank"
          >Обратная связь</a>
        </li>
        <li>
          <a 
            href="https://grandtrain.ru/passazhiram/" 
            class="header-grandtrain__submenu-item"
            target="_blank"
          >Частые вопросы</a>
        </li>
        <li>
          <a 
            href="https://grandtrain.ru/sales/" 
            class="header-grandtrain__submenu-item"
            target="_blank"
          >Акции и льготы</a>
        </li>
      </ul>
    </li>
    <li class="header-grandtrain-item dropdown">
      <a
        :href="viewPort === 'desktop' ? `https://grandtrain.ru/uslugi/` : null"
        class="link"
        target="_blank"
        @click="view.service = !view.service"
      >Услуги</a>
      <ul class="header-grandtrain__submenu" v-show="view.service || viewPort === 'desktop'">
        <li>
          <a 
            href="https://grandtrain.ru/uslugi/individualnoe-puteshestvie/" 
            class="header-grandtrain__submenu-item"
            target="_blank"
          >Индивидуальное путешествие</a>
        </li>
        <li>
          <a 
            href="https://grandtrain.ru/biznes-zaly/" 
            class="header-grandtrain__submenu-item"
            target="_blank"
          >Бизнес-залы</a>
        </li>
        <li>
          <a 
            href="https://grandtrain.ru/uslugi/pitanie/tavria/" 
            class="header-grandtrain__submenu-item"
            target="_blank"
          >Питание в поездах Таврия</a>
        </li>
        <li>
          <a 
            href="https://grandtrain.ru/uslugi/perevozka-avtomobilya/" 
            class="header-grandtrain__submenu-item"
            target="_blank"
          >Автомобилевозы</a>
        </li>
      </ul>
    </li>
    <li class="header-grandtrain-item dropdown">
      <a
        :href="viewPort === 'desktop' ? `https://grandtrain.ru/o-kompanii/` : null"
        class="link"
        target="_blank"
        @click="view.about = !view.about"
      >О компании</a>
      <ul class="header-grandtrain__submenu" v-show="view.about || viewPort === 'desktop'">
        <li>
          <a 
            href="https://grandtrain.ru/news/" 
            class="header-grandtrain__submenu-item"
            target="_blank"
          >Новости</a>
        </li>
        <li>
          <a 
            href="https://grandtrain.ru/o-kompanii/" 
            class="header-grandtrain__submenu-item"
            target="_blank"
          >Миссия и ценности</a>
        </li>
        <li>
          <a 
            href="https://grandtrain.ru/blagotvoritelnost/" 
            class="header-grandtrain__submenu-item"
            target="_blank"
          >Благотворительность</a>
        </li>
        <li>
          <a 
            href="https://grandtrain.ru/oprosy/" 
            class="header-grandtrain__submenu-item"
            target="_blank"
          >Опросы</a>
        </li>
      </ul>
    </li>
    <li class="header-grandtrain-item">
      <a
        href="https://grandtrain.ru/avtobusnye-perevozki-v-krumy/"
        class="link"
        target="_blank"
      >Автобусные перевозки</a>
    </li>
  </ul>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: "MenuItems",
  props: {
    open: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      view: {
        train: false,
        passanger: false,
        service: false,
        about: false
      }
    }
  },
  computed: {
    ...mapState("user", ["viewPort"]),
  }
};
</script>

<style lang="scss">
.header-grandtrain {

}
</style>
