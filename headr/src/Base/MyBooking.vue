<i18n>
{
  "en": {
    "allMessages": "All messages and notifications",
    "archive": "Archive",
    "currentBooks": "Current bookings",
    "myBooks": "My bookings",
    "books": "Bookings",
    "noMessages": "No new messages",
    "unreadButton": "See all items ({unread})",
    "needAuth": "Need auth",
    "requests_for_selection_housing_empty":"No request for the seaching of housing",
    "send_suggestions":"Send suggestions for inquiries from guests who are looking for accommodation in your city."
  },
  "ru": {
    "allMessages": "Все сообщения",
    "archive": "Архив",
    "currentBooks": "Текущие бронирования",
    "myBooks": "Мои бронирования",
    "books": "Бронирования",
    "noMessages": "Нет новых сообщений",
    "unreadButton": "Посмотреть все ({unread})",
    "needAuth": "Необходимо авторизоваться",
    "requests_for_selection_housing_empty":"Нет запросов на подбор жилья",
    "send_suggestions":"Отправляйте предложения на запросы от гостей, которые ищут жильё в вашем городе."
  }
}
</i18n>
<template>
  <div class="my-booking">
    <BaseNavList>

      <!-- slot -->
      <a
        :href="`${this.baseLink}/cabinet/notices`"
        target="_blank"
        class="no-link sc-nav-list-block"
        v-if="view != 'mobile'"
        slot="title"
      >
        <span class="my-booking-icon">
          <span class="sc-header-icon-tmp sc-header-icon-message"></span>
          <span v-if="ordersNew" class="badge">
            {{ data.messages.modules.orders.new }}
          </span>
        </span>
        <span class="title-btn" v-if="data.user_is_owner && data.user_is_owner > 0">
          {{ $t("books") }}
        </span>
        <span class="title-btn" v-else>
          {{ $t("myBooks") }}
        </span>
      </a>
      <!-- slot -->

      <template v-if="!isAuth">
        <div>
          <a :href="`${this.baseLink}/cabinet/notices`" target="_blank" class="no-link">
            <span>{{ $t("needAuth") }}</span>
          </a>
        </div>
      </template>

      <template v-else>
        <div>
          <a :href="`${this.baseLink}/cabinet/notices`" target="_blank" class="no-link f-d-c">
            <div
              class="new-messages"
              v-if="!ordersList"
            >
              {{ $t("noMessages") }}
            </div>
            <span>{{ $t("allMessages") }}</span>
          </a>
        </div>
        <div v-if="ordersList">
          <a
            v-for="(elem, i) in data.messages.modules.orders.list"
            :href="elem.url"
            target="_blank"
            class="no-link order"
            :key="i"
          >
            <span class="order-avatar">
              <img :src="elem.user_photo" />
            </span>
            <span class="order-name">
              {{ elem.user_name }}
            </span>
            <span class="order-time">
              {{ elem.date_add }}
            </span>
          </a>

          <div class="order-view-button" v-if="data.messages.modules.orders.new > 1">
            <b-button
              :href="`${this.baseLink}/cabinet/notices?filter[tp]=unread`"
              target="_blank"
              class="btn btn-transparent btn-view_all"
              variant="outline-light"
            >
              {{ $t("unreadButton", { unread: data.messages.modules.orders.new }) }}
            </b-button>
          </div>
        </div>
        <hr />
        <div>
          <a :href="`${this.baseLink}/cabinet/orders`" target="_blank" class="no-link">
            {{ $t("currentBooks") }}
          </a>
        </div>
        <hr />
        <div>
          <a
            :href="`${this.baseLink}/cabinet/orders?filter[type]=past`"
            target="_blank"
            class="gray no-link"
          >
            {{ $t("archive") }}
          </a>
        </div>
        <template v-if="isOwner">
          <hr />
          <a
            class="no-requests"
            :class="{ view }"
            :href="`${this.baseLink}/front/host/booking/list?from=bronirovaniya`"
          >
            <div>
              <div class="title">
                <span
                  v-if="data && data.hot_cnt_to_me && data.hot_cnt_to_me > 0"
                  >{{ data.hot_cnt_to_me_text }}</span
                >
                <span v-else>{{
                  $t("requests_for_selection_housing_empty")
                }}</span>
              </div>
              {{ $t("send_suggestions") }}
            </div>
            <div>
              <img src="../assets/request.png" alt="" />
            </div>
          </a>
        </template>
      </template>
    </BaseNavList>
  </div>
</template>

<script>
import BaseNavList from "../Base/BaseNavList.vue";
import { mapState } from "vuex";

export default {
  components: {
    BaseNavList,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
    view: {
      type: String,
    },
    isAuth: Boolean,
  },
  computed: {
    ...mapState("user", ["baseLink"]),
    ordersNew() {
      return this.data?.messages?.modules?.orders?.new
        ? this.data?.messages?.modules?.orders?.new : null
    },
    ordersList() {
      return this.data?.messages?.modules?.orders?.list?.length > 0
        ? true : false
    },
    isOwner(){
      return this.data?.user_is_owner > 0 ? true : false
    }
  }
};
</script>

<style lang="scss" scoped>
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
.my-booking {
  color: white;

  &-icon {
    position: relative;

    .badge {
      background: #f51449;
      font-size: 13px;
      line-height: 1.2;
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
      right: -3px;
    }
  }
  .new-messages {
    color: #717171;
  }

  .order {
    display: grid;
    grid-template-areas:
      "avatar . name"
      "avatar . time";
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 32px 8px auto;
    &-avatar {
      display: inline-block;
      height: 32px;
      width: 32px;
      min-width: 32px;
      border-radius: 50%;
      overflow: hidden;
      grid-area: avatar;
      align-self: center;
      img {
        width: 100%;
      }
    }
    &-name {
      grid-area: name;
      display: inline-block;
      width: 100%;
    }
    &-time {
      grid-area: time;
      color: #717171;
      display: inline-block;
      width: 100%;
    }
  }
  // .btn-unread {
  //   padding: 10px 20px;
  //   margin: 5px 20px;
  // }
  .order-view-button {
    display: flex;
  }
  .btn-view_all {
    flex-grow: 1;
    margin: 0 20px;
  }
  .title-btn {
    @media all and (max-width: 1120px) {
      display: none;
    }
  }
}
.f-d-c {
  flex-direction: column;
}
</style>
