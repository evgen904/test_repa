<i18n>
{
  "en": {
    "howToStart": "How do I start rent a housing",
    "rentHouse": "Host's proposal",
    "my_objects": "My listings",
    "my_hotels": "My hotels",
    "armor": "Orders",
    "the_calendar": "Calendar",
    "position_management": "Positions management",
    "statistics": "Statistics",
    "create_new_ad": "Create new ad",
    "free_insurance": "Free insurance",
    "requests_for_selection_housing_empty":"No request for the seaching of housing",
    "send_suggestions":"Send suggestions for inquiries from guests who are looking for accommodation in your city.",
    "has_reviews": "Reviews",
    "blogPartners": "Blog for partners Sutochno.ru"
  },
  "ru": {
    "howToStart": "Как начать сдавать жильё",
    "rentHouse": "Сдавайся",
    "my_objects": "Мои объекты",
    "my_hotels": "Мои гостиницы",
    "armor": "Брони",
    "the_calendar": "Календарь",
    "position_management": "Управление позициями",
    "statistics": "Статистика",
    "create_new_ad": "Создать новое объявление",
    "free_insurance": "Бесплатная страховка",
    "requests_for_selection_housing_empty":"Нет запросов на подбор жилья",
    "send_suggestions":"Отправляйте предложения на запросы от гостей, которые ищут жильё в вашем городе.",
    "has_reviews": "Отзывы",
    "blogPartners": "Блог для партнеров Суточно.ру"
  }
}
</i18n>
<template>
  <div class="rent-house">
    <BaseNavList>

      <!-- slot -->
      <a
        :href="isAuth && data.user_is_owner > 0
          ? `${this.baseLink}/cabinet/objects`
          : `https://сдавайся.рф`
        "
        :target="isAuth && data.user_is_owner > 0 
          ? '_self' : '_blank'"
        class="no-link sc-nav-list-block"
        :aria-label="$t('rentHouse')"
        v-if="view != 'mobile'"
        slot="title"
      >
        <span class="sc-header-icon-tmp sc-header-icon-rent-house"></span>
        <span class="title-btn">
          {{ $t("rentHouse") }}
        </span>
      </a>
      <!-- slot -->

      <template v-if="isAuth">
        <div>
          <a :href="`${this.baseLink}/cabinet/objects`" class="count no-link">
            <span>{{ $t("my_objects") }}</span>
            <span class="val">
              {{ data.objects_count }}
            </span>
          </a>
        </div>
        <div>
          <a :href="`${this.baseLink}/cabinet/objects/hotels`" class="count no-link">
            <span>{{ $t("my_hotels") }}</span>
            <span class="val">
              {{ data.hotels_count }}
            </span>
          </a>
        </div>
        <div>
          <a :href="`${this.baseLink}/cabinet/objects/orders`" class="count no-link">
            <span>{{ $t("armor") }}</span>
            <span class="val">
              {{ data.cnt_booking_owner }}
            </span>
          </a>
        </div>
        <div>
          <a :href="`${this.baseLink}/cabinet/objects/calendar`" class="no-link">
            {{ $t("the_calendar") }}
          </a>
        </div>
        <hr />
        <div>
          <a :href="`${this.baseLink}/cabinet/objects/top`" class="no-link">
            {{ $t("position_management") }}
          </a>
        </div>
        <div>
          <a :href="`${this.baseLink}/front/searchapp/search?isPosition=true`" class="no-link">
            <p class="position">
              <span>{{ $t("position_management") }}</span>
              <span class="badge">новое</span>
            </p>
          </a>
        </div>
        <div>
          <a :href="`${this.baseLink}/cabinet/objects/stats`" class="no-link">
            {{ $t("statistics") }}
          </a>
        </div>
        <div>
          <a :href="`${this.baseLink}/front/host/add`" class="no-link">
            {{ $t("create_new_ad") }}
          </a>
        </div>
        <div>
          <a href="https://сдавайся.рф/strahovka" target="_blank" class="no-link">
            <p class="position">
              <span>{{ $t("free_insurance") }}</span>
              <span class="badge">новое</span>
            </p>
          </a>
        </div>
        <hr />
        <div v-if="hasReviews">
          <a :href="`${this.baseLink}/cabinet/objects/ocens`" class="no-link">
            {{ $t("has_reviews") }}
          </a>
        </div>
        <a class="no-requests" :class="{ view }" :href="`${this.baseLink}/front/host/booking/list?from=sdavajsya`">
          <div>
            <div class="title">
              <span v-if="data && data.hot_cnt_to_me && data.hot_cnt_to_me > 0">{{ data.hot_cnt_to_me_text }}</span>
              <span v-else>{{ $t("requests_for_selection_housing_empty") }}</span>
            </div>
            {{ $t("send_suggestions") }}
          </div>
          <div>
            <img v-if="view === 'mobile'" src="../assets/request-mobile.png" alt="" />
            <img v-else src="../assets/request.png" alt="" />
          </div>
        </a>
        <template v-if="data.user_is_owner > 0">
          <hr />
          <div>
            <a :href="`https://sutochno.ru/blog`" class="no-link">
              {{ $t("blogPartners") }}
            </a>
          </div>
        </template>
      </template>
      <template v-else>
        <div>
          <a href="https://сдавайся.рф" target="_blank" class="no-link">
            {{ $t("howToStart") }}
          </a>
        </div>
      </template>
    </BaseNavList>
  </div>
</template>

<script>
import BaseNavList from "../Base/BaseNavList.vue";
import { mapActions, mapState, mapGetters } from "vuex";

export default {
  components: {
    BaseNavList,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
    isAuth: {
      type: Boolean,
    },
    view: {
      type: String,
    },
  },
  computed: {
    ...mapState("user", ["baseLink"]),
    hasReviews() {
      return this?.data?.messages?.modules?.objects?.has_reviews
    }
  }
};
</script>

<style lang="scss" scoped>
.position {
  position: relative;
  margin: 0;
  .badge {
    background: #f51449;
    font-size: 13px;
    line-height: 14px;
    font-weight: 100;
    color: #fff;
    border-radius: 9px;
    padding: 2px 7px 2px 5px;
    height: 18px;
    position: absolute;
    top: 0;
    right: -55px;
  }
}
.rent-house {
  color: white;
  &-title {
    display: flex;
  }
}
.no-requests {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #717171;
  text-decoration: none;
  font-size: 13px;
  min-width: 300px;
  &:hover {
    background: #5d5d5d;
  }
  &.mobile {
    min-width: auto;
  }
  > div {
    padding: 10px 20px;
    &:nth-child(1) {
      .title {
        color: #ffffff;
      }
    }
    &:nth-child(2) {
      padding: 10px 20px 10px 0;
    }
  }
}
.title-btn {
  @media all and (max-width: 1120px) {
    display: none;
  }
}
</style>
