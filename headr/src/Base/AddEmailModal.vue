<i18n>
{
  "ru": {
    "enterEmail": "Укажите электронную почту",
    "confirmEmail": "Подтвердите электронную почту",
    "note": "Вы сможете получать важные уведомления и защитить свой аккаунт.",
    "placeholder": "Введите e-mail",
    "btn": "Подтвердить e-mail",
    "resendLetterText": "Перейдите по ссылке из письма, которое мы отправили Вам на ",
    "resendLetterText2": "Если письмо не пришло, запросите повторную отправку.",
    "resendLetter": "Выслать письмо повторно",
    "timerText":"Вы можете запросить письмо повторно через",
    "minutes": " |{n} минуту |{n} минуты|{n} минут",
    "seconds": " |{n} секунду |{n} секунды|{n} секунд"
  },
  "en": {
    "enterEmail": "Enter your email",
    "confirmEmail": "Confirm Email",
    "note": "You will be able to receive important notifications and protect your account.",
    "placeholder": "Enter your e-mail",
    "btn": "Confirm e-mail",
    "resendLetterText": "Follow the link from the letter that we sent you to ",
    "resendLetterText2": "If the letter has not arrived, request a re-sending.",
    "resendLetter": "Resend the letter",
    "timerText":"You can request a letter again through",
    "minutes": " |{n} minute |{n} minutes|{n} minutes",
    "seconds": " |{n} second |{n} seconds|{n} seconds"
  }
}
</i18n>
<template>
  <Modal
    ref="addEmail"
    :title="modalTitle"
    class="add-email"
    @close="close"
  >
    <div class="add-email--body">
      <form v-if="!isFollowLink" @submit.prevent="send" class="add-email--field">
        <div class="add-email--note">
          {{ $t("note") }}
        </div>
        <input
          class="input-email"
          :placeholder="$t('placeholder')"
          type="email"
          v-model.trim="email"
          required
        />
        <b-button class="btn-blue" type="submit">{{ $t("btn") }}</b-button>
      </form>
      <template v-else>
        <p>
          {{ $t("resendLetterText") }}
          <strong>{{ sentToEmail }}</strong>. <br />
          {{ $t("resendLetterText2") }}
        </p>
        <div class="btn-resend-letter">
          <b-button
            class="btn-blue"
            :disabled="currentTime > 0 && isClickSendEmail"
            @click="sendEmail"
          >
            {{ $t("resendLetter") }}
          </b-button>
          <div class="timer" v-show="currentTime > 0 && isClickSendEmail">
            {{ $t("timerText") }}<br />
            {{ $tc("minutes", Math.floor(this.currentTime / 60)) }}
            {{ $tc("seconds", this.currentTime % 60) }}
          </div>
        </div>
      </template>
    </div>
  </Modal>
</template>

<script>
import VueCookies from "vue-cookies";
import Modal from "@sutochno/modal";
import { mapState } from "vuex";
import API from "../API/index";

export default {
  name: "AddEmailModal",
  components: {
    Modal,
  },
  mounted() {
    if (this.isAuth) {
      this.init();
    }
  },
  watch: {
    isAuth(val) {
      if (val) {
        this.init();
      }
    },
  },
  data() {
    return {
      email: "",
      sentToEmail: "",
      currentTime: 0,
      timer: null,
      isModal: false,
      isRequestApprove: false,
      isFollowLink: false,
      isClickSendEmail: false,
    };
  },
  computed: {
    ...mapState("user", ["userData", "isAuth"]),
    modalTitle() {
      if (this.sentToEmail) {
        return this.$t("confirmEmail");
      } else {
        return this.$t("enterEmail");
      }
    },
  },
  methods: {
    show() {
      this.$refs.addEmail.show();
    },
    close() {
      VueCookies.set("email-modal", true, "1d");
    },
    init() {
      this.isModal = VueCookies.get("email-modal");
      let isConfirmed = this.userData.user.contacts.findIndex(item => item.type_name == 'email' && item.visible == '1' && item.check == '1')

      if (!this.isModal && this.userData.user_is_owner > 0 && isConfirmed == -1) {
        if (this.userData.email_modal) {
          this.sentToEmail = this.userData.email_modal
          this.email = this.userData.email_modal
          this.isRequestApprove = true
        }
        this.show();
      }
    },
    send() {
      if (!this.isRequestApprove) {
        let formData = new FormData();
        formData.append("contactValue", this.email);
        formData.append("typeId", "1");
        formData.append("isLandline", "0");
        formData.append("version", "1");

        API.addContact(formData)
          .then(() => {
            this.requestApproveContact()
          })
          .catch((err) => console.log(err));
      } else {
        this.requestApproveContact()
      }
    },
    requestApproveContact() {
      let formData = new FormData();
      formData.append("value", this.email);
      formData.append("version", "1");

      API.requestApproveContact(formData)
        .then((res) => {
          this.currentTime = res.data.data.timeout || 0;
          this.startTimer();
          this.isFollowLink = true
        })
        .catch((err) => console.log(err));
    },
    sendEmail() {
      this.isClickSendEmail = true
      if (this.currentTime === 0) {
        this.requestApproveContact()
      }
    },
    startTimer() {
      if (!this.timer) {
        this.timer = setInterval(() => {
          if (this.currentTime > 0) {
            this.currentTime--;
          } else {
            clearTimeout(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.add-email {
  .desktop & {
    ::v-deep .sc-modal-wrap {
      padding: 0 10px;
    }
  }
  .mobile & {
    .add-email--body {
      padding: 20px;
    }
  }
  &--body {
    padding: 0 10px 20px;
  }
  &--note {
    font-size: 14px;
    color: #717171;
    margin-bottom: 14px;
  }
  &--field {
    .input-email {
      vertical-align: top;
      margin-right: 16px;
      border: 1px solid #d6d6d6;
      padding: 0 14px;
      height: 32px;
      outline-style: none;
      border-radius: 3px;
      margin-bottom: 12px;
      &:focus-visible {
        border: 1px solid #d6d6d6;
      }
    }
  }
  .btn-resend-letter {
    text-align: center;
    .btn-blue {
      margin-bottom: 0;
    }
  }
  .btn-blue {
    vertical-align: top;
    margin-bottom: 12px;
    &:hover,
    &:focus,
    &.disabled {
      background-color: #3c95e0;
      border-color: #3c95e0;
      color: #fff;
    }
  }
  .timer {
    padding-top: 10px;
  }
}
</style>
