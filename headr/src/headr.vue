<template>
  <div
   class="sc-header"
    :class="{
      desktop: viewPort === 'desktop',
      mobile: viewPort === 'mobile',
      'header-up': !app,
    }"
  >
    <Polling />
    <HeaderWhiteLabel v-if="whitelabel"/>
    <HeaderDesktop v-if="viewPort === 'desktop'" v-show="!whitelabel"/>
    <HeaderMobile v-else v-show="!whitelabel"/>
    <AddEmailModal />
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";
import HeaderDesktop from "./Desktop/index.vue";
import HeaderMobile from "./Mobile/index.vue";
import HeaderWhiteLabel from "./WhiteLabel/index.vue";
import Polling from "./Polling/index.vue";
import headerEventsDispatcher from "../headerEventsDispatcher.js";
import { openRegister, registerByTelephone,
  vkGetUserPhoneNumber,
  VKWebAppGetUserInfo,
  VKWebAppGetEmailResult } from "../headerPublicMethods.js";
import bridge from "@vkontakte/vk-bridge";
import axios from "axios";
import VueCookies from "vue-cookies";
import AddEmailModal from "./Base/AddEmailModal.vue"

export default {
  name: "Header",
  components: {
    HeaderDesktop,
    HeaderMobile,
    HeaderWhiteLabel,
    Polling,
    AddEmailModal,
  },
  props: {
    location: {
      type: Object,
    },
    app: {
      type: Boolean,
      default: true,
    },
    pageType: {
      default: null,
    },
  },
  render(h) {
    // const slots = this.$slots;
    // const scopedSlots = {};
    // Object.keys(slots).map(key => (scopedSlots[key] = () => slots[key]));
    // const Component = this.viewPort == 'desktop' ? HeaderDesktop : HeaderMobile
    // return h(Component, {
    //   class: {
    //     [this.viewPort]: true,
    //   },
    //   attrs: this.$attrs,
    //   props: this.$props,
    //   on: this.$listeners,
    //   scopedSlots
    // });
  },
  data(){
    return {
    }
  },
  watch: {
    currency(val, oVal) {
      if (val.id !== oVal.id)
        setTimeout(() => {
          this.initUserData();
        }, 1000);
    },
    pageType(val) {
      this.pageTypeMutate(val);
    },
  },
  computed: {
    ...mapState("user", ["viewPort", "baseLink", "auth", "currency", "isAuth", "whitelabel"]),
  },
  serverPrefetch() {
    const ua = this.$ssrContext.req.headers["user-agent"].toLowerCase();
    //check viewport on server side
    if (
      !/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        ua
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        ua.substr(0, 4)
      )
    ) {
      this.$store.commit("user/viewPort", "desktop");
    } else {
      this.$store.commit("user/viewPort", "mobile");
    }
  },
  created() {
    this.initAsApp(this.app);
  },
  mounted() {
    this.pageTypeMutate(this.pageType);
    this.setAuth();
    this.linkChange();
    if (this.location) {
      this.setLocation(this.location);
    }
    this.initUserData();
    this.handleWindowResize();
    this.$nextTick(function () {
      window.addEventListener("resize", this.handleWindowResize);
      this.getCurrencies();
    });
    this.runPublicMethods();
    headerEventsDispatcher("HEADER_INIT", document); // уведомляем страницу о том что шапка загрузилась
    this.vkAppScriptInit();
  },
  destroyed() {
    window.removeEventListener("resize", this.handleWindowResize);
  },
  methods: {
    ...mapActions("user", [
      "getCurrencies",
      "loadUserData",
      "initSessionDomain",
    ]),
    ...mapMutations("user", [
      "setLocation",
      "changeBaseLink",
      "initAsApp",
      "setAuth",
      "pageTypeMutate",
      "setInvisibleAuth",
    ]),
    initUserData() {
      this.loadUserData(
        this.location
          ? {
              location_id: this.location.id,
              location_type: this.location.type,
            }
          : null
      )
        .then(() => {
          console.log(this.isAuth);
          if (!this.auth.isAuth && this.isAuth) {
            console.log("invis");
            this.setInvisibleAuth();
          }
          if (!this.isAuth) {
            this.initSessionDomain();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleWindowResize() {
      let screenSize = null;
      if (window.innerWidth <= 768) {
        screenSize = "mobile";
      } else if (window.innerWidth > 768) {
        screenSize = "desktop";
      }
      this.$store.commit("user/viewPort", screenSize);
      this.$store.commit("user/screenWidth", window.innerWidth);
    },
    /**
    @description инициализация публичных методов
     */
    runPublicMethods() {
      const options = { elem: document }
      openRegister(this.$store, options); //инициализация публичного метода
      registerByTelephone(this.$store, options); //инициализация публичного метода
      vkGetUserPhoneNumber(this.$store, options);//инициализация публичного метода
      registerByTelephone(this.$store, options);
      vkGetUserPhoneNumber(this.$store, options);
      VKWebAppGetUserInfo(this.$store, options);
      VKWebAppGetEmailResult(this.$store, options);
    },
    /**
    @description инициализация логики для vk mini app
     */
    async vkAppScriptInit() {
      if (location?.search !== "" && !this.isAuth) {
        const isVkApp = location.search.includes("vk_app_id");
        // this.$store.commit("user/isVkAppMutate", true)
        if (isVkApp) {
          this.$store.commit("user/isVkAppMutate", true);
          this.$root.$i18n.locale = "ru"; // ставим хардкодом потому что неправильно определяется на мобильном приложении
          headerEventsDispatcher("VK_APP_INIT", this.$el);
          bridge.send("VKWebAppInit", {}).then((response) => {
            // const type = "vk"
            // const url = `/auth.html?type=${type}&js`;
            // const popupWindowOpts = {
            //   width: window.innerWidth ,
            //   height: window.innerHeight,
            // };
            // const centerPopup = {
            //   left: (window.innerWidth - popupWindowOpts.width) / 2,
            //   top: (window.innerHeight - popupWindowOpts.height) / 2,
            // };

            // axios
            //   .get("/auth.html?type=vk&js", {
            //     headers: { Referer: "https://sutochno.ru" },
            //   })
            //   .then((res) => {
            //     window.location.reload();
            //   });

            // location.href = url
            // window.open(
            //     url,
            //     "soc_auth_popup_window",
            //     `width=${popupWindowOpts.width},
            // height=${popupWindowOpts.height},
            // left=${centerPopup.left},
            // top=${centerPopup.top},
            // resizable=yes,scrollbars=no,toolbar=no,menubar=no,location=no,directories=no,status=yes`
            // );
          });
        }
      }
    },
    linkChange() {
      if (window?.location) {
        const { host } = window.location;
        let newHost = host;

        newHost = newHost.split(".");

        if (newHost.length >= 3) {
          newHost = newHost.slice(1);
        }

        newHost = newHost.join(".");

        this.changeBaseLink(`//${newHost}`);
      }
    },
  },
};
</script>

<style lang="scss">
// Иконочный шрифт для наших приложений на VueJS
@import "./assets/styles/icons.scss";

.header {
  &-up {
    position: relative;
    z-index: 10000;
  }

  &-scroll {
    overflow-y: auto;
    // max-height: 580px;
    max-height: calc(var(--vh, 1vh) * 100); //пример как использовать max-height: calc(var(--vh, 1vh) * 100 - 144px)

    &::-webkit-scrollbar {
      width: 6px;
      background: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background: #b6b6b6;
      border-radius: 1px;
    }
    &::-webkit-scrollbar-thumb:hover {
      background: #787878;
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  opacity: 1;
  transition: opacity 0.35s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

@import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap");

.sc-header {
  font-family: 'Inter', sans-serif;
}

.sc-header-icon {
  &-tmp {
    background-repeat: no-repeat;
    background-size: contain;
    width: 20px;
    height: 20px;
    min-width: 20px;
    text-indent: 0;
    display: inline-block;
    vertical-align: top;
    margin-right: 6px;
    position: relative;
    @media all and (max-width: 1280px) {
      margin-left: 6px;
    }
  }

  &-message {
    background-image: url("./assets/message.svg");
  }

  &-rent-house {
    background-size: 240px;
    background-image: url("./assets/spr_header_2x.png");
    background-position: -220px 0;
  }

  &-favorite {
    background-size: 240px;
    background-image: url("./assets/spr_header_2x.png");
  }
  &-wallet {
    background-position: -60px 0;
    background-size: 240px;
    background-image: url("./assets/spr_header_2x.png");
  }

  &-help {
    background-image: url("./assets/question.svg");
  }
  &-phone {
    background-image: url("./assets/phone.svg");
  }
  &-plane {
    background-image: url("./assets/plane.svg");
  }
}

.button {
  display: block;
  padding: 0px 20px;
  line-height: 32px;
  outline: none;
  background: transparent;
  border: 1px solid #d1d1d1;
  color: #444;
  border-radius: 3px;
  font-size: 14px;
  transition: 0.3s;
  position: relative;
  white-space: nowrap;
  cursor: pointer;
  text-decoration: none;

  &:hover,
  &:active,
  &:focus {
    outline: none;
  }

  &:hover {
    border: 1px solid #a6a6a6;
  }
  &.button {
    &_link {
      cursor: pointer;
      color: #2d6cb4;
      background: transparent;
      border: none;
      text-decoration: none;
      outline: none;
      padding: 0;
      border: 0;
      line-height: 14px;
      &:hover {
        color: #f51449;
        border: 0;
      }
    }

    &_white {
      border: 1px solid #fff;
      color: #fff;

      &:hover {
        color: #444 !important;
        background: #fff !important;
      }
    }

    &_phone {
      .icon-wps-phone {
        display: inline-block;
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translate(0, -50%);
        color: #d1d1dc;
        font-size: 20px;
      }
      padding-left: 39px;
    }

    &_blue {
      background: #498bc3;
      border: 1px solid rgba(0, 0, 0, 0.15);
      color: #fff;

      &:hover {
        color: #fff !important;
        background: #5c97c9 !important;
        border: 1px solid rgba(0, 0, 0, 0.1);
      }
    }
    &_green {
      background: #6fa759;
      border: solid 1px rgba(0, 0, 0, 0.15);
      color: #fff;

      &:hover {
        color: #fff !important;
        opacity: 0.9;
        border: solid 1px rgba(0, 0, 0, 0.15);
      }
    }

    &_disabled {
      opacity: 0.5;

      &:hover {
        opacity: 0.6;
      }
    }

    &_size {
      &_md {
        line-height: 40px;
        min-height: 42px;
      }
    }

    &_w-100 {
      width: 100%;
    }

    &_shadow {
      box-shadow: -2px 2px 6px rgba(0, 0, 0, 0.1);
    }

    &_text-shadow {
      text-shadow: -2px 2px 2px rgba(0, 0, 0, 0.3);
    }
  }
}
.mobile {
  .account {
    .sc-header-icon {
      &-tmp {
        margin-right: 9px;
      }
    }
  }
  .text-gray {
    color: #717171;
  }
}
</style>
