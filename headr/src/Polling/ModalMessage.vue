<i18n>
{
  "en": {
    "Cron_OrderAutoRejectUnreadOwner_title": "Reservation request cancelled",
    "Cron_OrderAutoRejectUnreadOwner_body": "Application №{sevenId} annulled: you did not make a decision in time.New booking message",
    "Cron_OrderAutoRejectUnreadOwner_btn": "To access the correspondence",

    "OrdersCancelByClient_title": "The client canceled the application",
    "OrdersCancelByClient_body": "Application №{sevenId} cancelled by the customer.",
    "OrdersCancelByClient_btn": "To access the correspondence",

    "OrdersNewMessage_title": "New booking message",
    "OrdersNewMessage_body": "New booking message №{sevenId}",
    "OrdersNewMessage_btn": "Read the message"
  },
  "ru": {
    "Cron_OrderAutoRejectUnreadOwner_title": "Заявка на бронь аннулирована",
    "Cron_OrderAutoRejectUnreadOwner_body": "Заявка №{sevenId} аннулирована: вы не приняли решение вовремя.Новое сообщение по бронированию",
    "Cron_OrderAutoRejectUnreadOwner_btn": "Открыть переписку",

    "OrdersCancelByClient_title": "Клиент отменил заявку",
    "OrdersCancelByClient_body": "Заявка №{sevenId} отменена клиентом.",
    "OrdersCancelByClient_btn": "Открыть переписку",

    "OrdersNewMessage_title": "Новое сообщение по бронированию",
    "OrdersNewMessage_body": "Новое сообщение по бронированию №{sevenId}",
    "OrdersNewMessage_btn": "Прочитать сообщение"
  }
}
</i18n>
<template>
  <transition name="message--fade">
    <div v-if="visible && body" class="orders-message" :class="bgColor">
      <div class="orders-message--header">
        {{ title }}
      </div>
      <div class="orders-message--body">
        {{ body }}
      </div>
      <div class="orders-message--footer">
        <a :href="`/cabinet/notices/${sevenId}/`" :class="bgColor">{{ btn }}</a>
      </div>
      <div class="orders-message--close" @click="hide"></div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "ModalMessage",
  props: {
    token: {
      type: String,
      default: "",
    },
    sevenId: {
      type: String,
      defauld: "",
    },
  },
  data() {
    return {
      visible: true,
      title: "",
      body: "",
      btn: "",
      bgColor: "",
    };
  },
  mounted() {
    switch (this.token) {
      // Заявка на бронь аннулирована
      case "Cron_OrderAutoRejectUnreadOwner":
        this.title = this.$t("Cron_OrderAutoRejectUnreadOwner_title");
        this.body = this.$t("Cron_OrderAutoRejectUnreadOwner_body", {
          sevenId: this.sevenId,
        });
        this.btn = this.$t("Cron_OrderAutoRejectUnreadOwner_btn");
        this.bgColor = "red";
        break;
      // Клиент отменил заявку
      case "OrdersCancelByClient":
        this.title = this.$t("OrdersCancelByClient_title");
        this.body = this.$t("OrdersCancelByClient_body", {
          sevenId: this.sevenId,
        });
        this.btn = this.$t("OrdersCancelByClient_btn");
        this.bgColor = "red";
        break;
      // Новое сообщение по бронированию
      case "OrdersNewMessage":
        this.title = this.$t("OrdersNewMessage_title");
        this.body = this.$t("OrdersNewMessage_body", { sevenId: this.sevenId });
        this.btn = this.$t("OrdersNewMessage_btn");
        break;
    }
  },
  methods: {
    show() {
      this.visible = true;
    },
    hide() {
      this.visible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.message--fade-enter-active,
.message--fade-leave-active {
  opacity: 1;
  transition: opacity 0.35s ease;
}
.message--fade-enter,
.message--fade-leave-to {
  opacity: 0;
}
.orders-message {
  position: relative;
  background-color: #fff;
  border: 1px solid #d9d9d9;
  color: #444;
  padding: 20px 40px 20px 20px;
  width: 320px;
  margin-bottom: 20px;
  &.red {
    background-color: #fee;
    border: 1px solid #ffd6d6;
  }
  &.green {
    background-color: #f9fffa;
    border: 1px solid #d2e2d1;
  }
  &--header {
    font-size: 17px;
    line-height: 1;
    margin-bottom: 12px;
  }
  &--body {
    margin-bottom: 5px;
    font-size: 15px;
    line-height: 20px;
  }
  &--footer {
    a {
      display: inline-block;
      vertical-align: top;
      font-size: 14px;
      line-height: 16px;
      border-radius: 3px;
      color: #3e76a5;
      text-decoration: none;
      background: #fff;
      border: 1px solid #3e76a5;
      padding: 8px 20px;
      &.red {
        color: #000;
        background-color: #ffd0d0;
        border: 1px solid #dc7a7a;
      }
      &.green {
        background-color: #f9fffa;
        border: 1px solid #d2e2d1;
      }
    }
  }
  &--close {
    cursor: pointer;
    position: absolute;
    top: 20px;
    right: 20px;
    width: 16px;
    height: 16px;
    &:after,
    &:before {
      content: "";
      display: block;
      width: 16px;
      height: 1px;
      background: #555;
      position: absolute;
      top: 0;
      left: 0;
      margin: 7px 0 0;
    }
    &:after {
      transform: rotate(-45deg);
    }
    &:before {
      transform: rotate(45deg);
    }
  }
}
</style>
