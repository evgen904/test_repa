<i18n>
{
  "ru": {
    "cityTitle": "Выбрать направление",
    "loginOrRegister": "Войти или зарегистрироваться"
  },
  "en": {
    "cityTitle": "",
    "loginOrRegister": "Sign in or sign up"
  }
}
</i18n>

<template>
  <div>
    <div class="site-header">
      <BaseDisconnect />
      <div
        ref="header-wr"
        class="site-header-in"
        :class="{
          'inner-page': isAuth,
        }"
      >
        <a
          v-if="isVkApp"
          href="#"
          title="Суточно.ру — сервис бронирования жилья для поездок"
          class="logo"
          @click="routerHandler"
        ></a>
        <a
          v-else
          :href="baseLink"
          title="Суточно.ру — сервис бронирования жилья для поездок"
          class="logo"
        ></a>
        <div
          class="site-header-right"
          :style="isVkApp ? 'visibility:hidden;' : ''"
        >
          <template v-if="isAuth">
            <template
              v-if="userData.user_is_owner && userData.user_is_owner > 0"
            >
              <button
                v-if="!isVkApp"
                class="btn-head"
                :class="{ active: activeMod == 1 }"
                @click="openPopup(1)"
              >
                <span
                  class="sc-header-icon-tmp sc-header-icon-rent-house"
                ></span>
              </button>
            </template>
            <button
              v-if="!isVkApp"
              class="btn-head"
              :class="{ active: activeMod === 5 }"
              @click="openPopup(5)"
            >
              <span class="sc-header-icon-tmp sc-header-icon-favorite"></span>
            </button>
            <button
              class="btn-head"
              :class="{ active: activeMod == 2 }"
              @click="openPopup(2)"
            >
              <span class="sc-header-icon-tmp sc-header-icon-message">
                <span
                  v-if="userData.messages.modules.orders.new > 0"
                  class="badge"
                >
                  {{ userData.messages.modules.orders.new }}
                </span>
              </span>
            </button>
            <button
              class="btn-head wallet"
              :class="{ active: activeMod == 3 }"
              @click="openPopup(3)"
            >
              <span class="sc-header-icon-tmp sc-header-icon-wallet">
                <span v-if="userData.invoices.cnt > 0" class="badge">
                  {{ userData.invoices.cnt }}
                </span>
              </span>
              <span v-html="userData.balance" />
            </button>
          </template>

          <b-button
            :aria-expanded="activeMod == 4 ? 'true' : 'false'"
            :class="burgerClass"
            class="burger"
            aria-label="menu"
            @click="openPopup(4)"
          >
            <div class="burger-line"></div>
            <div class="burger-line"></div>
            <div class="burger-line"></div>
          </b-button>
        </div>
      </div>

      <template v-if="isAuth">
        <div v-if="activeMod == 1" class="popup">
          <RentHouse :data="userData" :is-auth="isAuth" view="mobile" />
        </div>
        <div v-if="activeMod == 2" class="popup">
          <MyBooking :data="userData" :is-auth="isAuth" view="mobile" />
        </div>
        <div v-if="activeMod == 3" class="popup">
          <Wallet :data="userData" view="mobile" />
        </div>
        <div v-if="activeMod == 5" class="popup">
          <Favorite :data="userData" :is-auth="isAuth" view="mobile" />
        </div>
      </template>
      <template v-if="activeMod == 4 && !isVkApp">
        <Burger v-model="activeMod" />
      </template>
    </div>
    <BaseFormAuth ref="FormAuth" />
    <WarningBalance />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import BaseFormAuth from "../Base/BaseFormAuth/index.vue";
import MyBooking from "../Base/MyBooking.vue";
import Wallet from "../Base/Wallet.vue";
import RentHouse from "../Base/RentHouse.vue";
import Burger from "./Burger.vue";
import BaseDisconnect from "../Base/BaseDisconnect.vue";
import WarningBalance from "../Base/WarningBalance.vue";
import Favorite from "../Base/Favorite.vue";

export default {
  name: "Header",
  components: {
    BaseFormAuth,
    RentHouse,
    MyBooking,
    Wallet,
    Burger,
    BaseDisconnect,
    WarningBalance,
    Favorite,
  },
  methods: {
    ...mapActions("user", ["loadUserData", "initSessionDomain"]),
    ...mapActions("user", ["getCurrencies"]),
    openPopup(val) {
      this.key = this.activeMod;
      this.activeMod = val;
      if (this.key == this.activeMod) {
        this.activeMod = 0;
      }
    },
    routerHandler(e) {
      if (this.isVkApp) {
        e.preventDefault();
        this.$router.push("/");
      }
    },
  },
  computed: {
    ...mapState("user", [
      "userData",
      "isAuth",
      "dataSocialNetwork",
      "isVkApp",
      "authState",
    ]),
    ...mapState("user", ["currency", "baseLink"]),
    burgerClass() {
      return {
        "burger--hide": this.isVkApp && !this.isAuth,
        collapsed: this.activeMod == 4,
      };
    },
    // location: {
    //   get() {
    //     return this.$store.state.search.location;
    //   },
    //   set(value) {
    //     // NOTHING
    //   },
    // },
  },
  watch: {
    $route(to) {
      this.activeMod = 0;
    },
    // currency: function () {
    //   setTimeout(() => {
    //     this.loadUserData();
    //   }, 1000);
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
    authState(newVal) {
      switch (newVal) {
        case "open":
          this.$refs.FormAuth.show("auth");
          break;
        case "registration":
          this.$refs.FormAuth.$data.state = "registration";
          this.$refs.FormAuth.$data.isVisible = true;
          break;
        default:
          break;
      }
    },
    // location(val) {
    //   if (this.$route.name == "Search") {
    //     this.loadUserData({
    //       location_id: val.id,
    //       location_type: val.type,
    //     });
    //   }
    // },
  },
  data() {
    return {
      key: 0,
      activeMod: 0
    };
  },
};
</script>
<style lang="scss">
.site-header {
  width: 100%;
  background: #333;
  color: #ffffff;
  position: relative;
  z-index: 1;
  .site-header-in {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    .site-header-right {
      display: flex;
    }
    &.inner-page {
      .logo {
        width: 35px;
        overflow: hidden;
        background-size: 173px auto;
      }
      .site-header-right {
        width: 100%;
        display: flex;
        .search-top {
          align-self: center;
          width: 100%;
          padding-right: 10px;
          .search-city {
            background-color: #666666;
            color: white;
            border-radius: 4px;
            padding: 4px 12px;
          }
          .search-top-in {
            width: 100%;
          }
        }
      }
    }
  }
  .logo {
    display: flex;
    margin: 0 10px;
    width: 173px;
    height: 50px;
    background: url("../assets/logo-horizontal.svg") 0 50% no-repeat;
    background-size: 100% auto;
  }
  .burger {
    padding: 15px 10px;
    margin: 0 0 0 auto;
    border: none;
    font-size: 0;
    line-height: 0;
    background: transparent;
    outline-style: none;
    border-radius: 0;
    box-shadow: none;
    height: 50px;
    width: 40px;
    &:hover,
    &:active,
    &:focus {
      background: none;
      box-shadow: none;
    }
    &:active:focus {
      box-shadow: none;
    }
    .burger-line {
      display: block;
      width: 20px;
      height: 4px;
      margin-top: 4px;
      background-color: #fff;
      border-radius: 2px;
      &:first-child {
        margin-top: 0;
      }
    }
  }

  .btn-head {
    display: block;
    padding: 0;
    margin: 0;
    outline-style: none;
    border: none;
    background: transparent;
    color: #ffffff;
    font-size: 13px;
    flex-grow: 1;
    &.active {
      background: #5e5e5e;
    }
    .badge {
      background: #f51449;
      font-size: 13px;
      line-height: 1;
      color: #fff;
      border-radius: 9px;
      padding: 2px 5px 3px;
      min-width: 18px;
      height: 18px;
      overflow: hidden;
      text-align: center;
      vertical-align: middle;
      display: inline-block;
      text-indent: 0;
      position: absolute;
      top: -7px;
      right: -10px;
    }
  }
  .btn-icon {
    width: 20px;
    height: 20px;
    min-width: 20px;
    background-repeat: no-repeat;
    text-indent: -9999px;
    // background-size: 240px;
    // background-image: url("../assets/spr_header_2x.png");
    display: inline-block;
    vertical-align: top;
    margin-right: 6px;
    position: relative;
    &.rent-house-icon {
      background-position: -220px 0;
    }
    &.my-booking-icon {
      background: none;
      text-indent: 0;
      .icon-wps-message {
        color: #afafaf;
        font-size: 20px;
        position: absolute;
        top: -1px;
        left: -2px;
      }
    }
    &.wallet-icon {
      background-position: -60px 0;
    }
  }
}
.popup {
  // position: absolute;
  // left: 0;
  // top: 50px;
  width: 100%;
  z-index: 200;
  background: #333;
  border: 1px solid #444;
  color: #ffffff;
  font-size: 14px;
  padding: 5px 0;
  a {
    color: #ffffff;
  }
}
</style>
