<i18n>
{
  "ru": {
    "attantion": "Внимание!",
    "warningText": "На вашем балансе недостаточно средств для оплаты подключенных услуг!",
    "balance": "Средств на балансе:",
    "writeOff": "К списанию в 00 часов:",
    "upYourBalance": "Пополните баланс на {money} {currency}",
    "btnBalance": "Пополнить баланс"
  },
  "en": {
    "attantion": "Attantion!",
    "warningText": "There are not enough funds on your balance to pay for the connected services!"
  }
}
</i18n>
<template>
  <transition name="fade" tag="div">
    <div class="warning-balance" v-if="warningView">
      <div class="warning-balance__wrap">
        <div class="warning-balance__close" @click="warningClose" />
        <p class="warning-balance__title">{{ $t('attantion') }}</p>
        <p class="warning-balance__text">{{ $t('warningText') }}</p>
        <div class="warning-balance__resources">
          <div class="resources__item">
            <div class="resources__text">{{ $t('balance') }}</div>
            <div
              class="resources__money"
              v-html="`${warning.balance}&nbsp;${warningCurrency.sign_html}`"
            />
          </div>
          <div class="resources__item">
            <div class="resources__text">{{ $t('writeOff') }}</div>
            <div
              class="resources__money"
              v-html="`${warning.write_off}&nbsp;${warningCurrency.sign_html}`"
            />
          </div>
        </div>
        <p
          class="warning-balance__text"
          v-html="$t('upYourBalance', { money: warning.amount_up, currency: warningCurrency.sign_html })"
        />
        <a
          :href="payLink"
          class="btn btn-primary warning-balance__btn"
          target="_blank"
        >{{ $t('btnBalance') }}</a>
      </div>
    </div>
  </transition>
</template>

<script>
import VueCookies from "vue-cookies";
import { mapState, mapGetters } from "vuex";

export default {
  name: "WarningBalance",
  data() {
    return {
      warningShow: true,
    };
  },
  mounted() {},
  watch: {},
  computed: {
    ...mapState("user", ["currency", "userData"]),
    ...mapState("user", ["currenciesList"]),
    warningView() {
      return this.warning &&
        this.warningShow &&
        !VueCookies.get("warning-info") &&
        location.pathname !== "/cabinet/payments/" &&
        location.pathname !== "/cabinet/objects/calendar/"
        ? true
        : false;
    },
    warning() {
      const warning = this?.userData?.warning_info;
      return warning ? warning : false;
    },
    warningCurrency() {
      return this?.currenciesList?.find(
        (el) => el.id === this.warning.currency
      );
    },
    payLink() {
      const { protocol, host } = location;
      return `${protocol}//${host}/cabinet/payments/?amount=${this.warning.amount}&amp;currency=${this.warning.currency}`;
    },
  },
  methods: {
    warningClose() {
      this.warningShow = false;
      VueCookies.set("warning-info", true, "1h");
    },
  },
};
</script>

<style lang="scss" scoped>
p {
  margin: 0;
}
.header-desktop {
  .warning-balance {
    height: max-content;
    margin: 0;
  }
}
.warning-balance {
  display: flex;
  justify-content: center;
  position: fixed;
  left: 0;
  width: 100%;
  bottom: 0;
  z-index: 99999;
  background: #ffeda2;
  &__wrap {
    position: relative;
    width: 1200px;
    height: 100%;
    padding: 20px 20px 40px 270px;
  }
  &__title {
    font-size: 22px;
    line-height: 22px;
  }
  &__text {
    margin-top: 15px;
    font-size: 16px;
    line-height: 18px;
  }
  &__resources {
    display: flex;
    flex-direction: column;
    margin-top: 15px;
    font-size: 13px;

    .resources {
      &__item {
        color: #e10600;
        display: flex;
      }
      &__text {
        width: 145px;
      }
    }
  }
  &__btn {
    margin-top: 15px;
  }
  &__close {
    position: absolute;
    top: 50%;
    right: 20px;
    background-image: url("../assets/cross.svg");
    background-size: contain;
    width: 28px;
    height: 28px;
    transform: translate(0, -50%);
    cursor: pointer;
  }
}
// .header-mobile {
//   .warning-balance {
//     &__wrap {
//       padding: 20px 60px 20px 20px;
//     }
//   }
// }
@media (min-width: 1024px) and (max-width: 1279px) {
  .warning-balance {
    &__wrap {
      width: 1004px;
      padding: 20px 20px 40px 270px;
    }
  }
}
@media (min-width: 768px) and (max-width: 1023px) {
  .warning-balance {
    &__wrap {
      width: 768px;
      padding: 20px 60px 40px 20px;
    }
  }
}
@media (max-width: 767px) {
  .warning-balance {
    &__wrap {
      width: 100%;
      padding: 20px 60px 40px 20px;
    }
  }
}
</style>
