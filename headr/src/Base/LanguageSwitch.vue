<i18n>
{
  "ru": {
    "more":"ещё"
  },
  "en": {
    "more":"more"
  }
}
</i18n>
<template>
  <div class="language-switch" :class="{ mobile: view == 'mobile' }">
    <BaseNavList direction="left">
      <!-- slot -->
      <div
        slot="title"
        class="language-switch-title sc-nav-list-block"
        @click="toggleLang = !toggleLang"
      >
        <span
          class="language-switch-icon"
          :class="`language-switch-icon__${this.$i18n.locale}`"
        ></span>
        <template v-if="view == 'mobile'">
          <span>
            {{
              this.$i18n.locale == "ru"
                ? "Русский язык"
                : this.$i18n.locale == "en"
                ? "English language"
                : ""
            }}
          </span>
          <span>·</span>
        </template>
        {{ currency.title }}
      </div>
      <!-- slot -->

      <template v-if="(toggleLang && view == 'mobile') || view != 'mobile'">
        <div>
          <span class="no-link" @click="changeLang('ru')">
            <span
              class="icon-wps-check"
              :class="{ active: this.$i18n.locale == 'ru' }"
            ></span>
            Русский язык
            <span class="language-switch-icon language-switch-icon__ru"></span>
          </span>
        </div>
        <div>
          <span class="no-link" @click="changeLang('en')">
            <span
              class="icon-wps-check"
              :class="{ active: this.$i18n.locale == 'en' }"
            ></span>
            English language
            <span class="language-switch-icon language-switch-icon__en"></span>
          </span>
        </div>
        <hr />
        <div class="currencies-list header-scroll">
          <template v-for="(item, index) in currenciesList">
            <span
              v-if="index < currencies"
              :key="item.id"
              @click="applyСurrency(item)"
            >
              <span
                class="icon-wps-check"
                :class="{ active: currency.id == item.id }"
              ></span>
              {{ item.code }} - {{ item.title }}
            </span>
          </template>
        </div>
        <div v-if="btnMore" class="more">
          <button
            class="btn-link"
            variant="outline-light"
            @click="currenciesAll"
          >
            {{ $t("more") }}
          </button>
        </div>
      </template>
    </BaseNavList>
  </div>
</template>

<script>
import BaseNavList from "../Base/BaseNavList.vue";
import { mapState, mapActions, mapMutations } from "vuex";
import VueCookies from "vue-cookies";

export default {
  components: {
    BaseNavList,
  },
  props: {
    view: {
      type: String,
    },
  },
  created() {},
  mounted() {
    this.checkLang();
    this.checkCurrency();
  },
  methods: {
    ...mapActions("user", ["setCurrency"]),
    ...mapMutations("user", { currencyMutate: "currency" }),
    currenciesAll() {
      this.currencies = this.currenciesList.length;
      this.btnMore = false;
    },
    checkCurrency() {
      if (
        VueCookies.get("wp_currency_title") &&
        VueCookies.get("wp_currency_id")
      ) {
        const curr = {
          title: VueCookies.get("wp_currency_title"),
          id: VueCookies.get("wp_currency_id"),
        };
        this.currencyMutate(curr);
        this.$emit("input", 0);
        // this.setCurrency(curr)
      }
    },
    applyСurrency(val) {
      this.setCurrency({
        code: val.code,
        id: val.id,
      }).then((res) => {
        this.$emit("input", 0);
        if (!this.app) {
          window.location.reload();
        }
      });
    },
    checkLang() {
      let url = window.location.host;
      if (url.indexOf(".net") !== -1 || url.indexOf(".com") !== -1) {
        this.$root.$i18n.locale = "en";
      } else {
        this.$root.$i18n.locale = "ru";
      }
    },
    changeLang(lang) {
      // VueCookies.set("language_id", lang, "30d")
      // if (process.env.NODE_ENV === "production") {
      let url = window.location.origin;
      if (url.indexOf(".test") !== -1 || url.indexOf(".net") !== -1) {
        if (lang == "ru") {
          url = url.replace(".net", ".test");
        } else {
          url = url.replace(".test", ".net");
        }
        
      } else {
        if (lang == "ru") {
          url = url.replace(".com", ".ru");
        } else {
          url = url.replace(".ru", ".com");
        }
      }
      document.location.href = `${url}${window.location.pathname}${window.location.search}`
      // } else {
      //   //for test just change language with vuex
      //   this.$root.$i18n.locale = lang;
      // }
      // }
    },
  },
  computed: {
    ...mapState("user", ["currency", "currenciesList", "app"]),
  },
  data() {
    return {
      toggleLang: false,
      currencies: 5,
      btnMore: true,
    };
  },
};
</script>

<style lang="scss" scoped>
.language-switch {
  color: white;
  &.mobile {
    .language-switch-title {
      width: 100%;
      padding-left: 4px;
      padding-top: 7px;
      padding-bottom: 7px;
      .language-switch-icon {
        margin-left: 6px;
        margin-right: 9px;
        ~ span {
          margin-right: 6px;
        }
      }
    }
    ::v-deep .sc-nav-list-body {
      span {
        padding-left: 20px;
      }
    }
  }
  &-title {
    display: flex;
    align-items: center;
  }
  &-icon {
    margin-left: auto;
    width: 20px;
    min-width: 20px;
    height: 20px;
    background-repeat: no-repeat;
    text-indent: -9999px;
    background-size: 240px;
    background-image: url("../assets/spr_header_2x.png");
    display: inline-block;
    vertical-align: middle;
    margin-right: 6px;
    position: relative;
    &__ru {
      background-position: -120px 0;
    }
    &__en {
      background-position: -140px 0;
    }
  }
  ::v-deep .sc-nav-list-body {
    span {
      display: flex;
    }
  }
  .more {
    padding: 10px 30px 8px;
    .btn {
      padding: 7px 20px;
      width: 100%;
      &:hover {
        border-color: #b2b2b2;
      }
    }
    .btn-link {
      margin: 0;
      width: 100%;
      color: #fff;
      cursor: pointer;
    }
  }
  .icon-wps-check {
    position: relative;
    top: -2px;
    left: -8px;
    font-size: 20px;
    opacity: 0;
    &.active {
      opacity: 1;
    }
  }
  .header-scroll {
    max-height: calc(var(--vh, 1vh) * 100 - 169px);
    @media all and (max-width: 960px) {
      max-height: calc(var(--vh, 1vh) * 100 - 146px);
    }
  }
}
</style>
