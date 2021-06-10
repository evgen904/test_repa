<i18n>
{
  "ru": {
    "cabinet": "Личный кабинет",
    "profile": "Профиль",
    "settingsNotice": "Настройка уведомлений",
    "passwordAndSecurity": "Пароль и безопасность",
    "linkedAccounts": "Связаные аккаунты",
    "exit": "Выход",
    "priority_location":"Приоритетное размещение",
    "requests_for_selection_housing":"Запросы на подбор жилья",
    "my_orders":"Мои бронирования",
    "title_help":"Помощь",
    "favorites":"Избранное",
    "add_rental_object":"Сдать жильё",
    "housing_request":"Создать запрос на подбор жилья",
    "text_select_city":"Для создания запроса на подбор жилья выберите город.",
    "modal_select_city":"Выберите город",
    "myBooks": "Мои бронирования",
    "support": "Служба поддержки {tel}",
    "rentHouse": "Сдавайся на Суточно.ру"
  },
  "en": {
    "cabinet": "Your account",
    "profile": "Profile",
    "settingsNotice": "Configure Notifications",
    "passwordAndSecurity": "Password and safety",
    "linkedAccounts": "Linked accounts",
    "exit": "Log out",
    "priority_location":"Priority location",
    "requests_for_selection_housing":"Requests for the selection of housing",
    "my_orders":"My booking",
    "title_help":"Help",
    "favorites":"Favorites",
    "add_rental_object":"Host`s proposal",
    "housing_request":"Make a request to find housing",
    "text_select_city":"To make a request on a search of housing,choose a city.",
    "modal_select_city":"Choose a city",
    "myBooks": "My bookings",
    "support": "Support service {tel}",
    "rentHouse": "Rent house on Sutochno.ru"
  }
}
</i18n>

<template>
  <div class="account">
    <BaseNavList direction="right">
      <template v-if="auth.isAuth">
        <!-- slot -->
        <a
          slot="title"
          :href="`${this.baseLink}/cabinet`"
          class="account-user no-link sc-nav-list-block"
          :class="{ mobile: view == 'mobile' }"
          :aria-label="$t('cabinet')"
        >
          <span class="account-user-avatar">
            <img
              v-if="data && data.user && data.user.avatar"
              :src="data.user.avatar"
              alt=""
            />
            <img v-else-if="auth.data.g == 2" :src="defaultAvatarFemale" />
            <img v-else :src="defaultAvatar" />
          </span>
          <span v-if="view == 'mobile' && auth.data" class="account-user-name">
            <span class="text-gray">{{ $t("cabinet") }}:</span>
            {{ auth.data.name }}
          </span>
          <span v-else-if="auth.data" class="account-user-name">
            {{ auth.data.name }}
          </span>
          <span
            v-else-if="data.user && data.user.name"
            class="account-user-name"
          >
            {{ data.user.name }}
          </span>
        </a>
        <!-- slot -->

        <div>
          <a :href="`${this.baseLink}/cabinet/profile/edit`" class="no-link">
            {{ $t("profile") }}
          </a>
        </div>
        <div>
          <a
            :href="`${this.baseLink}/cabinet/profile/contacts`"
            class="no-link"
          >
            {{ $t("settingsNotice") }}
          </a>
        </div>
        <div>
          <a
            :href="`${this.baseLink}/cabinet/profile/security`"
            class="no-link"
          >
            {{ $t("passwordAndSecurity") }}
          </a>
        </div>
        <div>
          <a :href="`${this.baseLink}/cabinet/profile/socials`" class="no-link">
            {{ $t("linkedAccounts") }}
          </a>
        </div>
        <hr />
      </template>
      <template v-if="view == 'mobile'">
        <template v-if="auth.isAuth">
          <!-- <div>
            <a :href="`${this.baseLink}/cabinet/objects/top`" class="no-link">
              {{ $t("priority_location") }}
            </a>
          </div> -->
          <!-- <div>
            <a class="no-link" :href="housingSelection" @click.prevent="housingSelectionFunc">
              {{ $t("requests_for_selection_housing") }}
            </a>
          </div>
          <hr /> -->
          <!-- <div>
            <a :href="`${this.baseLink}/cabinet/orders`" class="no-link">
              {{ $t("my_orders") }}
            </a>
          </div>
          <div>
            <a :href="`${this.baseLink}/cabinet/favorites`" class="count no-link">
              <span>{{ $t("favorites") }}</span>
              <span
                class="val"
                v-if="data && data.objects && data.objects.favorites"
              >
                {{ data.objects.favorites }}
              </span>
            </a>
          </div>
          <hr /> -->
        </template>

        <template v-if="!auth.isAuth">
          <div>
            <a :href="`${baseLink}/cabinet/notices`" class="no-link">
              <span class="my-booking-icon">
                <span class="sc-header-icon-tmp sc-header-icon-message" />
              </span>
              <span class="title-btn">{{ $t("myBooks") }}</span>
            </a>
          </div>
          <hr />

          <div>
            <a :href="`${baseLink}/cabinet/favorites`" class="no-link">
              <span class="sc-header-icon-tmp sc-header-icon-favorite"></span>
              <span>{{ favorite }}</span>
            </a>
          </div>
          <hr />

          <div>
            <a
              class="no-link"
              :href="housingSelection"
              @click.prevent="housingSelectionFunc"
            >
              <span class="sc-header-icon-tmp sc-header-icon-plane"></span>
              <span>{{ $t("housing_request") }}</span>
            </a>
          </div>
          <hr />

          <div>
            <a
              :href="`${baseLink}/help/${
                isAuth && data.user_is_owner > 0 ? 'arendodateli' : 'gosti'
              }`"
              target="_blank"
              class="no-link"
            >
              <span class="sc-header-icon-tmp sc-header-icon-help"></span>
              <span>{{ $t("title_help") }}</span>
            </a>
          </div>
          <hr />

          <div>
            <a href="tel:88004448049" target="_blank" class="no-link">
              <span class="sc-header-icon-tmp sc-header-icon-phone"></span>
              <span>{{ $t("support", { tel: "8 800 444 8049" }) }}</span>
            </a>
          </div>
          <hr />

          <div>
            <a :href="`https://сдавайся.рф`" target="_blank" class="no-link">
              <span class="sc-header-icon-tmp sc-header-icon-rent-house"></span>
              <span>{{ $t("rentHouse") }}</span>
            </a>
          </div>
          <hr />
        </template>
      </template>
      <div v-if="!auth.isAuth" class="lang">
        <LanguageSwitch view="mobile" />
      </div>
      <template v-if="auth.isAuth">
        <template v-if="data.user_is_owner <= 0 && view == 'mobile'">
          <div>
            <a
              v-if="!isVkApp"
              :href="housingSelection"
              class="no-link"
              @click.prevent="housingSelectionFunc"
            >
              {{ $t("housing_request") }}
            </a>
          </div>
          <hr />
          <div>
            <a
              v-if="!isVkApp"
              :href="`https://сдавайся.рф`"
              target="_blank"
              class="no-link"
            >
              {{ $t("rentHouse") }}
            </a>
          </div>
          <hr />
        </template>
        <template v-if="view == 'mobile'">
          <LanguageSwitch view="mobile" />
          <hr />
          <div>
            <a
              :href="`${this.baseLink}/help/${
                isAuth && data.user_is_owner > 0 ? 'arendodateli' : 'gosti'
              }`"
              class="no-link"
              target="_blank"
            >
              {{ $t("title_help") }}
            </a>
          </div>
          <div>
            <a href="tel:88004448049" target="_blank" class="no-link">
              <span>{{ $t("support", { tel: "8 800 444 8049" }) }}</span>
            </a>
          </div>
        </template>
        <template v-if="data.user_is_owner <= 0 && view != 'mobile'">
          <div>
            <a
              v-if="!isVkApp"
              :href="`https://сдавайся.рф`"
              target="_blank"
              class="no-link"
            >
              {{ $t("rentHouse") }}
            </a>
          </div>
          <hr />
        </template>
        <hr v-if="view == 'mobile'" />
        <div>
          <a v-if="!isVkApp" href="/logout.html" class="no-link gray">
            {{ $t("exit") }}
          </a>
        </div>
        <template v-if="auth.isAuth && data.user_is_moder">
          <hr />
          <div>
            <a class="count no-link" @click="showClientInfo">
              <span>Информация о владельце</span>
              <span class="val">
                <input v-model="isClientInfo" type="checkbox" />
              </span>
            </a>
          </div>
          <div>
            <a class="count no-link" @click="showFiltersParams">
              <span>Дополнительные фильтры</span>
              <span class="val">
                <input v-model="isSupportFilters" type="checkbox" />
              </span>
            </a>
          </div>
          <div>
            <a class="count no-link" @click="showSearch">
              <span>Быстрый поиск</span>
              <span class="val">
                <input v-model="isSearchAdmin" type="checkbox" />
              </span>
            </a>
          </div>
          <div>
            <a class="count no-link" @click="editLocation">
              <span>Редактировать локацию</span>
            </a>
          </div>
          <div>
            <a class="count no-link" @click="editSeo">
              <span>Редактировать SEO</span>
            </a>
          </div>
          <div>
            <a class="count no-link" @click="editArticle">
              <span>Редактировать статью</span>
            </a>
          </div>
          <!-- <div>
            <a class="count no-link" @click="setTranslationMode">
              <span>Режим перевода</span>
              <span class="val">
                <input v-model="isTranslationMode" type="checkbox" />
              </span>
            </a>
          </div> -->
          <div>
            <a class="count no-link" @click="searchAppUrls">
              <span>Отключить searchApp urls</span>
              <span class="val">
                <input v-model="isSearchAppUrls" type="checkbox" />
              </span>
            </a>
          </div>
          <div>
            <a class="count no-link" @click="disabledNotifications($event)">
              <span>Отключить уведомления</span>
              <span class="val">
                <input v-model="isDisabledNotifications" type="checkbox" />
              </span>
            </a>
          </div>
          <div>
            <a class="count no-link" @click="showSearchGeocoderMap">
              <span>Поиск по геокодеру карты</span>
              <span class="val">
                <input v-model="isSearchGeocoderMap" type="checkbox" />
              </span>
            </a>
          </div>
        </template>
      </template>
    </BaseNavList>
    <BaseModal
      ref="modalRef"
      class="custom-modal"
      :title="$t('modal_select_city')"
    >
      <div class="modal-wrapper">
        {{ $t("text_select_city") }}
      </div>
      <div slot="footer" class="text-right">
        <b-button class="btn-blue" @click="hideModal()">Ok</b-button>
      </div>
    </BaseModal>
    <template v-if="isAuth && data.user_is_moder">
      <SearchAdmin v-if="isSearchAdmin" />
      <DetailClientInfo v-if="isClientInfo" :owner="owner" :pathObject="pathObject" />
    </template>
  </div>
</template>

<script>
import defaultAvatar from "../assets/default-avatar_small.jpg";
import defaultAvatarFemale from "../assets/default-avatar_small_female.jpg";
import API from "../API";
import BaseNavList from "./BaseNavList.vue";
import BaseModal from "../Base/BaseModal.vue";
import LanguageSwitch from "./LanguageSwitch.vue";
import SearchAdmin from "./searchAdmin.vue";
import DetailClientInfo from "./DetailClientInfo.vue";
import { mapMutations, mapState, mapGetters } from "vuex";
import VueCookies from "vue-cookies";
import HTTP from "../API/http-common";

export default {
  components: {
    BaseNavList,
    BaseModal,
    LanguageSwitch,
    SearchAdmin,
    DetailClientInfo,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
    view: {
      type: String,
    },
    isAuth: {
      type: Boolean,
    },
  },
  data() {
    return {
      modalHead: null,
      isSearchAdmin: false,
      isClientInfo: false,
      isSupportFilters: false,
      isSearchGeocoderMap: false,
      isTranslationMode: false,
      isSearchAppUrls: false,
      defaultAvatar,
      defaultAvatarFemale,
      owner: null,
    };
  },
  watch: {
    modalHead: function (val) {
      this.$emit("input", val);
    },
    isSupportFilters(val) {
      this.setSupportFilters(val);
    },
    isClientInfo(val) {
      if (val && !this.owner) {
        this.adminGetDopDatas()
      }
    },
    data() {
      if (this.data.user_is_moder && this.$route.name == 'Detail') {
        this.adminGetDopDatas()
      }
    }
  },
  computed: {
    ...mapState("user", ["isVkApp", "location", "app", "auth", "baseLink"]),
    ...mapGetters("user", ["getPermission"]),
    ...mapGetters("search", ["maxGuests"]),
    pathObject() {
      if (this.owner) {
        // если нужно отобразить гостей в новом формате
        // const listQuery = ["guests_adults", "guests_childrens", "occupied"];
        // const filteredObj = _.pick(this.$route.query, listQuery);
        //
        // return `https://sutochno.ru/${this.owner.object.id}?${Object.entries(filteredObj).map(v=>v.join("=")).join("&")}`

        let occupied = this.$route.query.occupied
            ? `&occupied=${this.$route.query.occupied}`
            : "";
        return `https://sutochno.ru/${this.owner.object.id}?max_guests=${this.maxGuests}${occupied}`;
      }
    },
    favorite() {
      return this.data?.objects?.favorites > 0
        ? `${this.$t("favorites")} (${this.data.objects.favorites})`
        : this.$t("favorites");
    },
    housingSelection() {
      if (this.$store.state.search?.location?.url) {
        return `${this.$store.state.search.location.url}`;
      }
      if (this.data && this.data.location_url) {
        return `${this.data.location_url}/podbor`;
      } else if (this.$store.state.search?.location?.subdomain) {
        let domain = this.$store.state.search?.location?.subdomain
          ? `${this.$store.state.search?.location?.subdomain}.`
          : null;
        if (domain) return `//${domain}sutochno.ru/podbor`;
      } else {
        return `${this.baseLink}/podbor`;
      }
    },
    getSearchappUrls() {
      return VueCookies.get("admin_disableSearchAppMode") &&
        VueCookies.get("admin_disableSearchAppMode") != 0
        ? true
        : false;
    },
    article() {
      const SELECTOR =
        document?.querySelector(".article-wrapper") ||
        document?.querySelector(".old-article-wrapper");
      const ARTICLE = SELECTOR?.getAttribute("data-article-id");
      return ARTICLE ? ARTICLE : null;
    },
    supportFilters() {
      return VueCookies.get("admin_showExtendedFilters") &&
        VueCookies.get("admin_showExtendedFilters") != 0
        ? 1
        : 0;
    },
    isDisabledNotifications: {
      get() {
        return this.getPermission("disabled_notifications");
      },
      set(val) {
        this.setPermission(val);
        API.addUserToGroupDisabledNotifications(val)
          .then((response) => {
            if (response.data?.errors?.length) {
              this.setPermission(!val);
              console.log(response.data?.errors[0]);
            }
          })
          .catch((err) => {
            this.setPermission(!val);
            console.log(err);
          });
      },
    },
  },
  mounted() {
    if (this.$route.name == 'Detail') {
      this.isClientInfo = true;
    }
    this.isSearchAppUrls = this.getSearchappUrls;
    this.isSupportFilters = this.supportFilters;
    if (this.isAuth && this.data.user_is_moder) {
      this.getLocalStoragAdmin();
    }
  },
  methods: {
    ...mapMutations("search", ["setSupportFilters"]),
    ...mapMutations("user", ["removePermission", "addPermission"]),
    hideModal() {
      this.$refs.modalRef.close();
      window.scrollTo(
        0,
        this.$parent.$parent.$parent.$refs.blockSearch.offsetTop
      );
    },
    housingSelectionFunc() {
      if (this.location?.id && this.location?.type)
        location.href = `${this.baseLink}/front/host/booking/request?type=${this.location?.type}&id=${this.location?.id}`;
      else location.href = `${this.baseLink}/front/host/booking/request`;
    },
    // housingSelection() {
    //   if (this.$store.state.search?.location?.url) {
    //     location.href = `https://${this.$store.state.search.location.url}`;
    //   }
    //   if (this.$route.name == "Main") {
    //     this.$refs.modalRef.show();
    //   } else {
    //     if (this.data && this.data.location_url) {
    //       location.href = `${this.data.location_url}/podbor`;
    //     } else {
    //       // let domain = /:\/\/([^\/]+)/.exec(window.location.href)[1];
    //       let domain = this.$store.state.search?.location?.subdomain
    //         ? `${this.$store.state.search?.location?.subdomain}.`
    //         : null;
    //       if (domain) location.href = `https://${domain}sutochno.ru/podbor`;
    //     }
    //   }
    // },
    setLocalStoragAdmin() {
      this.$localStorage._lsSet(
        "adminInfo",
        {
          search: this.isSearchAdmin,
          infoClient: this.isClientInfo,
          filter: this.isSupportFilters,
          isSearchGeocoderMap: this.isSearchGeocoderMap,
        },
        Object
      );
    },
    getLocalStoragAdmin() {
      const adminInfo = this.$localStorage.get("adminInfo", null, Object);
      if (this.app && adminInfo) {
        this.isSearchAdmin = adminInfo.search;
        this.isSupportFilters = adminInfo.filter;
        this.isSearchGeocoderMap = adminInfo.isSearchGeocoderMap;
        this.setSupportFilters(this.isSupportFilters);
        if (adminInfo.infoClient && !this.owner) {
          this.isClientInfo = adminInfo.infoClient;
          this.adminGetDopDatas()
        }
      }
    },
    setSupportFiltersCookie() {
      const param = Number(!this.isSupportFilters);
      VueCookies.set("admin_showExtendedFilters", param, "30d");
      location.reload();
    },
    showSearch() {
      this.isSearchAdmin = !this.isSearchAdmin;
      this.setLocalStoragAdmin();
    },
    showClientInfo() {
      this.isClientInfo = !this.isClientInfo;
      this.setLocalStoragAdmin();
    },
    showFiltersParams() {
      if (!this.app) this.setSupportFiltersCookie();
      this.isSupportFilters = !this.isSupportFilters;
      this.setLocalStoragAdmin();
    },
    editLocation() {
      const locations = {
        city: "citiesedit",
        country: "countriesedit",
        region: "regionsedit",
      };

      location.href = `/admin/modules/locations/${
        locations[this.location.type]
      }/id/${this.location.id}`;
    },
    editSeo() {
      location.href = `/admin/modules/locations/seo/?operation=list_urls&locationId=${this.location.id}&locationType=${this.location.type}`;
    },
    editArticle() {
      if (this.article)
        location.href = `/admin/modules/text/editarticle/id/${this.article}`;
      else {
        alert("На странице нет статьи");
      }
    },
    setTranslationMode() {
      // VueCookies.set("admin_enableTranslationMode", !this.isTranslationMode, "30d")
    },
    searchAppUrls() {
      const param = Number(!this.isSearchAppUrls);
      const { host } = window.location;
      let newHost = host;

      newHost = newHost.split(".");

      if (newHost.length >= 3) {
        newHost = newHost.slice(1);
      }

      newHost = newHost.join(".");
      VueCookies.set("admin_disableSearchAppMode", param, "30d", "/", newHost);
      location.reload();
    },
    showSearchGeocoderMap() {
      this.isSearchGeocoderMap = !this.isSearchGeocoderMap;
      this.setLocalStoragAdmin();
    },
    disabledNotifications(e) {
      if (e?.target?.tagName !== "INPUT")
        this.isDisabledNotifications = !this.isDisabledNotifications;
    },
    setPermission(val) {
      if (val === true) {
        this.addPermission("disabled_notifications");
      } else if (val === false) {
        this.removePermission("disabled_notifications");
      }
    },
    adminGetDopDatas() {
      HTTP.post("json/objects/adminGetDopDatas/")
        .then((response) => {
          if (response.data.data.owner_data) {
            this.owner = response.data.data;
          }
        })
        .catch((error) => {
          console.log("Ajax error:", error);
        });
    }
  },
};
</script>

<style lang="scss" scoped>
.account {
  color: white;
  .language-switch {
    &.mobile {
      padding: 0 9px;
    }
  }
  .lang {
    padding: 0 7px;
  }
  &-user {
    display: flex;
    align-items: center;
    // white-space: nowrap;
    overflow: hidden;

    &.mobile {
      padding-left: 20px;
    }

    &-avatar {
      display: inline-block;
      height: 32px;
      width: 32px;
      min-width: 32px;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
    &-name {
      line-height: 1.2;
      padding-left: 8px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      max-width: 65px;
      @media all and (min-width: 1280px) {
        max-width: 60px;
      }
      @media all and (min-width: 1366px) {
        max-width: 230px;
      }
      @media all and (max-width: 768px) {
        max-width: 100%;
      }
    }
  }
}
.modal-wrapper {
  font-size: 15px;
  padding: 18px 20px;
}
::v-deep .base-modal-body {
  min-height: 100%;
}
</style>
