<i18n>
{
  "en": {
    "loginButton": "Login"
  },
  "ru": {
   "loginButton": "Войти"
  }
}
</i18n>
<template>
  <div class="header-desktop">
    <BaseDisconnect />
    <a :href="baseLink" title="Суточно.ру — сервис бронирования жилья для поездок" class="logo"></a>

    <template
      v-if="
        !!this.$slots['suggest-desktop'] ||
        !!this.$scopedSlots['suggest-desktop']
      "
    >
      <slot name="suggest-desktop"></slot>
    </template>
    <!-- <BaseSuggestionsSearchHeader
      v-if="this.$route.name != 'Main' && this.$route.name != 'Search'"
    /> -->
    <SelectRent :data="userData" :is-auth="isAuth"/>
    <div class="header-right">
      <template v-if="viewRentHouse">
        <RentHouse :data="userData" :is-auth="auth.isAuth" />
      </template>

      <Favorite :data="userData" :is-auth="auth.isAuth" />
      <MyBooking :data="userData" :is-auth="auth.isAuth" />
      <!-- v-if="auth.isAuth" -->
      <Wallet v-if="isAuth" :data="userData" />
      <Account v-if="auth.isAuth" :data="userData" :is-auth="auth.isAuth" />

      <span>
        <BaseFormAuth ref="FormAuth" />
      </span>

      <b-button
        v-if="auth.isAuth === false"
        target="_blank"
        class="btn btn-transparent btn-login"
        variant="outline-light"
        @click="$refs.FormAuth.show('auth')"
      >
        {{ $t("loginButton") }}
      </b-button>

      <LanguageSwitch />
      <Help :data="userData" :is-auth="auth.isAuth" />
    </div>
    <WarningBalance />
  </div>
</template>

<script>
import SelectRent from "../Base/SelectRent.vue";
import RentHouse from "../Base/RentHouse.vue";
import MyBooking from "../Base/MyBooking.vue";
import Favorite from "../Base/Favorite.vue";
import BaseDisconnect from "../Base/BaseDisconnect.vue";

import WarningBalance from "../Base/WarningBalance.vue";

import Wallet from "../Base/Wallet.vue";
import Account from "../Base/Account.vue";
import LanguageSwitch from "../Base/LanguageSwitch.vue";
import Help from "../Base/Help.vue";
import BaseFormAuth from "../Base/BaseFormAuth/index.vue";
// import BaseSuggestionsSearchHeader from "@/components/base/BaseSuggestions/SearchHeader";
import { mapActions, mapState, mapGetters } from "vuex";

export default {
  name: "HeaderDesktop",
  components: {
    SelectRent,
    RentHouse,
    MyBooking,
    Favorite,
    Wallet,
    Account,
    LanguageSwitch,
    Help,
    BaseDisconnect,
    WarningBalance,
    // BaseSuggestionsSearchHeader,

    BaseFormAuth,
  },
  methods: {
    ...mapActions("user", ["loadUserData", "initSessionDomain"]),
    ...mapActions("user", ["getCurrencies"]),
  },
  computed: {
    ...mapState("user", ["userData", "isAuth", "dataSocialNetwork", "authState"]),
    ...mapState("user", ["currency", "baseLink", "auth"]),
    viewRentHouse() {
      return !this.auth.isAuth || this.userData?.user_is_owner > 0
        ? true
        : false
    },
    searchPagePlatform() {
      if (window) {
        return window.location.host.split(".").length > 2 ? true : false;
      } else {
        return false;
      }
    },
  },
  watch: {
    // location(val) {
    //   if (this.$route.name == "Search") {
    //     this.loadUserData({
    //       location_id: val.id,
    //       location_type: val.type,
    //     });
    //   }
    // },
    "$i18n.locale": function (val) {
      setTimeout(() => {
        this.getCurrencies();
      }, 1000);
    },
    dataSocialNetwork(val) {
      if (val) {
        this.$refs.FormAuth.show("login-via-social-network");
      }
    },
    authState(newVal){
      switch (newVal) {
        case "open":
          this.$refs.FormAuth.show('auth')
          break;
        case "registration":
          this.$refs.FormAuth.$data.state = "registration"
          this.$refs.FormAuth.$data.isVisible = true
          break;
        default:
          break;
      }
    }
  },
  mounted() {
    // this.loadUserData()
    //   .then(() => {
    //     if (!this.isAuth) {
    //       this.initSessionDomain();
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  },
};
</script>

<style lang="scss">
.header-desktop {
  background-color: #333333;
  display: flex;
  align-items: center;
  flex-direction: row;
  height: 50px;
  font-size: 13px;
  .choice-city {
    font-size: 16px;
  }

  .logo {
    display: flex;
    margin-left: 20px;
    width: 173px;
    height: 50px;
    background: url("../assets/logo-horizontal.svg") 0 50% no-repeat;
    background-size: 100% auto;
    @media only screen and (max-width: 1024px) {
      width: 32px;
      height: 28px;
      overflow: hidden;
      background-size: 173px auto;
    }
  }

  .rent-house {
    margin-left: auto;
  }
  .btn {
    align-self: center;
  }
  .header-right {
    margin-left: auto;
    display: flex;
    align-items: center;
    flex-direction: row;
    height: 50px;
  }
  &,
  .header-right{
    > div,
    > a {
      height: inherit;
      margin: 0 5px;
    }
    ::v-deep a:hover {
      color: #ffffff;
    }
  }
}
.btn-login {
  margin: 0 8px;
  padding-left: 20px;
  padding-right: 20px;
  &:hover,
  &:focus,
  &:active {
    border-color: #b2b2b2;
    background: transparent;
    color: #ffffff;
    box-shadow: none;
  }
}
</style>
