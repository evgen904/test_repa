<i18n>
{
  "ru": {
    "podbor": "Подбор жилья",
    "create_request_accommodation":"Создать запрос на подбор жилья",
    "all_options_in":"Все варианты в ",
    "with_instant_booking":"С мгновенным бронированием",
    "last_minute_offers":"Горящие предложения дня",
    "text_select_city":"Для создания запроса на подбор жилья выберите город.",
    "modal_select_city":"Выберите город",
    "all_variants": "Все варианты в {city}",
    "booking_now_variants": "С мгновенным бронированием",
    "is_hot_sale_variants": "Горящие предложения дня",
    "hint": "Подходящее жильё занято? Хозяева сами предложат вам свободные варианты."
  },
  "en": {
    "podbor": "Search your housing",
    "create_request_accommodation":"Create a request for a housing",
    "all_options_in":"All options in ",
    "with_instant_booking":"Instant Booking",
    "last_minute_offers":"Hot offers",
    "text_select_city":"To make a request on a search of housing,choose a city.",
    "modal_select_city":"Choose a city",
    "all_variants": "All variants in {city}",
    "booking_now_variants": "With booking now",
    "is_hot_sale_variants": "Hot sale of day",
    "hint": "Is a suitable home occupied? The hosts will offer you free options themselves."
  }
}
</i18n>
<template>
  <div class="select-rent">
    <BaseNavList>
      <div slot="title" class="rent-block">
        <span v-if="data.hot_offers_cnt_to_me > 0" class="badge">
          {{ data.hot_offers_cnt_to_me }}
        </span>
        <a
          class="no-link rent-block-hide"
          :href="housingSelection"
          @click.prevent=""
        >
          <span>{{ $t("podbor") }}</span>
        </a>
        <a
          class="no-link rent-block-view"
          @click.prevent="housingSelectionFunc"
        >
          <span>{{ $t("podbor") }}</span>
        </a>
      </div>

      <template v-if="isAuth">
        <template v-if="data && data.hot_orders && data.hot_orders.length > 0">
          <div class="hotorder-list header-scroll">
            <a
              v-for="hot in data.hot_orders"
              :key="hot.id"
              class="count gray"
              :href="`${baseLink}/front/host/booking/offers/${hot.id}`"
            >
              <div class="info">
                <span>{{ hot.location }}</span>
                <span>{{ hot.dateBegin }} {{ hot.dateEnd }}</span>
              </div>
              <span class="val">{{ hot.cnt }}</span>
            </a>
          </div>
        </template>
      </template>

      <template v-if="data && data.filters_counts">
        <div class="select-find">
          <a class="count" :href="linkFilters()" @click.prevent="resetFilters">
            <span>
              {{ $t("all_variants", { city: data.location_w }) }}
            </span>
            <span class="val">{{ data.filters_counts.all }}</span>
          </a>
          <a
            class="count"
            :href="linkFilters('booking_now=1')"
            @click.prevent="resetFilters"
          >
            <span>
              {{ $t("booking_now_variants") }}
            </span>
            <span class="val">{{ data.filters_counts.booking_now }}</span>
          </a>
        </div>
        <hr />
      </template>
      <div class="housing-request">
        <a :href="linkHousing" class="btn-link">
          {{ $t("create_request_accommodation") }}
        </a>
      </div>

      <div class="housing-hinter">
        {{ $t("hint") }}
      </div>
    </BaseNavList>
    <BaseModal
      ref="modalRef"
      class="custom-modal"
      :title="$t('modal_select_city')"
    >
      <div class="modal-wrapper">
        <div>
          {{ $t("text_select_city") }}
        </div>
        <div class="text-right">
          <b-button class="btn-blue" @click="hideModal()">Ok</b-button>
        </div>
      </div>
    </BaseModal>
  </div>
</template>

<script>
import BaseNavList from "../Base/BaseNavList.vue";
import BaseModal from "../Base/BaseModal.vue";
import { mapState, mapGetters } from "vuex";
import VueCookies from "vue-cookies";

export default {
  name: "SelectRent",
  components: {
    BaseNavList,
    BaseModal,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
    isAuth: Boolean,
  },
  data() {
    return {
      locationApp: {
        id: 123,
        type: "city",
        title: "asdasd",
      },
    };
  },
  // inject: ['location'],
  computed: {
    ...mapState("user", ["baseLink", "app", "location"]),
    // ...mapState("user", { locationApps: "location" }),
    getSearchappUrls() {
      return VueCookies.get("admin_disableSearchAppMode") &&
        VueCookies.get("admin_disableSearchAppMode") != 0
        ? true
        : false;
    },
    linkHousing() {
      if (this.location?.id && this.location?.type)
        return `${this.baseLink}/front/host/booking/request?type=${this.location?.type}&id=${this.location?.id}`;
      else return `${this.baseLink}/front/host/booking/request`;
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
  },
  methods: {
    linkFilters(filter) {
      if (this.data?.filters_counts) {
        if (this.getSearchappUrls) {
          return `${this.data.location_url}${filter ? `/?${filter}` : ""}`;
        } else {
          if (this.location && filter) {
            return `${this.baseLink}/front/searchapp/search?${filter}&id=${this.location.id}&type=${this.location.type}&term=${this.location.title}`;
          } else if (this.location) {
            return `${this.baseLink}/front/searchapp/search?id=${this.location.id}&type=${this.location.type}&term=${this.location.title}`;
          } else if (filter) {
            return `${this.baseLink}/front/searchapp/search?${filter}`;
          } else {
            return `${this.baseLink}/front/searchapp/search`;
          }
        }
      } else {
        return "";
      }
    },
    async resetData() {
      localStorage.removeItem("query");
      localStorage.removeItem("select_guests");
      this.$store.commit("search/setCheckIn", null);
      this.$store.commit("search/setCheckOut", null);
      return 1;
    },
    resetFilters(e) {
      if (this.app)
        this.resetData().then(() => {
          location.href = e.target.href;
        });
      else location.href = e.target.href;
    },
    hideModal() {
      this.$refs.modalRef.close();
    },
    allOptions() {
      this.$store.commit("search/setMaxGuests", 1);
      this.$store.commit("search/setFilters");
    },
    housingSelectionFunc() {
      if (this.location?.id && this.location?.type)
        window.location.href = `${this.baseLink}/front/host/booking/request?type=${this.location?.type}&id=${this.location?.id}`;
      else window.location.href = `${this.baseLink}/front/host/booking/request`;
    },
    instantBooking() {
      this.$store.commit("search/setMaxGuests", 1);
      this.$store.commit("search/setFilters");
      this.$store.commit("search/setFilters", {
        booking_now: 1,
      });
    },
    isHotSale() {
      this.$store.commit("search/setMaxGuests", 1);
      this.$store.commit("search/setFilters");
      this.$store.commit("search/setFilters", {
        is_hot_sale: 1,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.select-find {
  & > .count {
    & > span {
      pointer-events: none;
    }
  }
}
.rent-block {
  width: 100px;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  .no-link {
    position: absolute;
  }

  &-hide {
    color: #333333;
    z-index: 1;
  }
  &-view {
    z-index: 2;
  }
}
.header-scroll {
  max-height: calc(var(--vh, 1vh) * 100 - 144px);
}
.badge {
  padding: 4px 5px 4px 4px;
  background: #f51449;
  font-size: 13px;
  line-height: 10px;
  color: #fff;
  border-radius: 60px;
  min-width: 18px;
  height: 18px;
  position: absolute;
  top: 7px;
  right: -10px;
}
.select-rent {
  color: white;
}
.housing-request {
  padding-top: 4px;
}
.housing-hinter {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #717171;
  text-decoration: none;
  font-size: 13px;
  min-width: 300px;
  padding: 5px 20px 0 20px;
}
.modal-wrapper {
  font-size: 15px;
  padding: 0 20px;
  .text-right {
    text-align: right;
  }
  .btn {
    margin-left: auto;
    padding-left: 20px;
    padding-right: 20px;
    margin-bottom: 10px;
  }
}
</style>
