<i18n>
{
  "en": {
    "WriteToMe": "User is writing to you..."
  },
  "ru": {
    "WriteToMe": "Вам пишут сообщение..."
  }
}
</i18n>
<template>
  <div class="modal-message">

    <template v-if="bonus">
      <ModalBonus :bonus.sync="bonus"/>
    </template>
    <template v-else-if="!bonus">
      <ModalNotice />
    </template>

    <template v-if="notices.length">
      <ModalMessage
        v-for="(item, index) in notices"
        :key="index"
        :token="item.token"
        :seven-id="item.seven_id"
      />
    </template>
    <transition name="message--fade">
      <div v-if="writeToMe" class="write-to-me">
        {{ $t("WriteToMe") }}
      </div>
    </transition>

  </div>
</template>

<script>
import ModalMessage from "./ModalMessage.vue";
import { mapState, mapActions } from "vuex";
import { Polling } from "../API/index.js";
import ModalNotice from './ModalNotice.vue';
import ModalBonus from './ModalBonus.vue';


export default {
  name: "BasePushNotice",
  components: {
    ModalMessage,
    ModalNotice,
    ModalBonus
  },
  data() {
    return {
      notices: [],
      writeToMe: false,
      bonus: null
    };
  },
  computed: {
    ...mapState("user", ["userData", "isAuth", "isDocumentHidden"]),
  },
  watch: {
    isAuth(val) {
      if (val) {
        //  && process.env.NODE_ENV === "production"
        //this.init();
      }
    },
    writeToMe(val) {
      if (val) {
        setTimeout(() => {
          this.writeToMe = false;
        }, 5000);
      }
    },
  },
  mounted() {
    this.bonus = this.findGetParameter('bonus');
  },
  methods: {
    ...mapActions("user", ["loadUserData"]),
    findGetParameter(parameterName) {
      var result = null,
          tmp = [];
      location.search
          .substr(1)
          .split("&")
          .forEach(function (item) {
            tmp = item.split("=");
            if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
          });
      return result;
    },
    initMethodPlatform(method, orderId) {
      // вызываем методы с платформы, стр. /cabinet/notices/<order_id>

      // перезагружает переписку с сообщениями
      if (method === "initMessagesOrder" && typeof initMessagesOrder === "function") {
        initMessagesOrder(orderId)
      }

      // перезагружает всю заявку с сообщениями и блоками написания/подтверждения/отмены
      if (method === "initOrderData" && typeof initOrderData === "function") {
        initOrderData(orderId)
      }
    },
    init() {
      let pathUrl = document.location.pathname.split('/')
      let orderId = pathUrl[3]
      // isCabinetNotices --- находимся ли на стр. /cabinet/notices/<order_id>
      let isCabinetNotices = (pathUrl[1] === "cabinet" && pathUrl[2] === "notices" && orderId !== "") ? true : false;
      let isCalendar = pathUrl.findIndex(item => item === "calendar")
      let isTop = pathUrl.findIndex(item => item === "top")

      if (isCalendar === -1 && isTop === -1) {
        const apiPolling = (callback = null) => {
          Polling.pushUser({
            userId: this.userData.user.id,
          })
            .then((response) => {
              if (response.data) {
                if (!this.isDocumentHidden) apiPolling(callback);
                if (callback) callback(response);
              }
            })
            .catch((error) => {
              if (!this.isDocumentHidden) apiPolling(callback);
            });
        };

        apiPolling((res) => {
          if (res.data) {
            let dataCallback = this.parseData(res.data.text);

            // Вам пишут сообщение...
            if (dataCallback.callback == "_writeToMe") {
              this.writeToMe = true;
            }

            // Пришли сообщения
            if (dataCallback.token) {
              Polling.getNewNotices()
                      .then((response) => {
                        if (response.data && response.data.data) {
                          this.notices = response.data.data.notices;
                        }
                      })
                      .catch((error) => {
                        console.log(error);
                      });

              switch (dataCallback.token) {
                case "OrdersNewMessage":
                  if (isCabinetNotices) {
                    this.initMethodPlatform('initMessagesOrder', orderId)
                  } else {
                    this.loadUserData();
                  }
                  break;
                case "OrdersNewBookingOwner":
                  this.loadUserData();
                  break;
                case "OrdersPayedOwner":
                  if (isCabinetNotices) {
                    this.initMethodPlatform('initOrderData', orderId)
                  } else {
                    this.loadUserData();
                  }
                  break;
                case "OrdersCancelByClient":
                  if (isCabinetNotices) {
                    this.initMethodPlatform('initOrderData, orderId')
                  } else {
                    this.loadUserData();
                  }
                  break;
                case "OrdersCancelByOwner":
                  if (isCabinetNotices) {
                    this.initMethodPlatform('initMessagesOrder', orderId)
                  } else {
                    this.loadUserData();
                  }
                  break;
                case "OrdersAcceptByOwner":
                  if (isCabinetNotices) {
                    this.initMethodPlatform('initMessagesOrder', orderId)
                  } else {
                    this.loadUserData();
                  }
                  break;
              }

            }
          }
        });
      }
    },
    parseData(value) {
      let text = value;
      text = text.replace(/^=/, "");
      text = decodeURIComponent(text);
      text = text.replace(/\\'/g, "'");
      console.log(JSON.parse(text));
      return JSON.parse(text);
    },
  }
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

.modal-message {
  position: fixed;
  z-index: 10;
  bottom: 40px;
  right: 10px;
  max-height: calc(100% - 170px);
  overflow-y: auto;
  .write-to-me {
    position: sticky;
    bottom: 0;
    right: 0;
    z-index: 50;
    background-color: #ededef;
    border-color: #ededef;
    color: #444;
    padding: 10px 20px;
    width: 204px;
    float: right;
  }
}
</style>
