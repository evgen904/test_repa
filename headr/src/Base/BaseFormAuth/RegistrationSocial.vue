<i18n>
{
  "ru": {
    "forgotPassword": "Забыли пароль?",
    "passwordPlaceholder": "Введите пароль",
    "iAgreeTo": "Я согласен на",
    "personalDataProcessing": "обработку персональных данных",
    "userAgreement": "пользовательского соглашения",
    "loginToSite":"Войти на сайт",
    "placeholderPhone":"Введите номер телефона",
    "thisPhoneNumberIsRegistered":"Этот номер телефона уже зарегистрирован в системе. Для работы с сайтом введите пароль",
    "passwordWasSentToPhone":"На номер телефона {phone} был отправлен пароль",
    "telMailPlaceholder": "Введите e-mail или телефон"
  },
  "en": {
    "forgotPassword": "lost your password?",
    "passwordPlaceholder": "enter your password",
    "iAgreeTo": "I agree to ",
    "personalDataProcessing": "personal data processing",
    "userAgreement": "the Terms of Use",
    "loginToSite":"Login to the site",
    "placeholderPhone":"enter phone number",
    "thisPhoneNumberIsRegistered":"This phone number is already registered in the system. Enter your password to use the site",
    "passwordWasSentToPhone":"A password has been sent to the phone number {phone}",
    "telMailPlaceholder": "Phone number or e-mail address"
  }
}
</i18n>

<template>
  <div class="wrapp-reg-social">
    <div class="auth-header-title-wrapp">
      <h5 class="auth-header-title">
        {{ `${dataSocialNetwork.data.translation.soc_your_enter_from} ${dataSocialNetwork.data.translation[dataSocialNetwork.data.enter_from]}` }}
      </h5>
      <span class="close" @click="$emit('close')">&times;</span>
    </div>
    <template v-if="viewSocial === 'enter-phone'">
      <div class="field-text">
        {{ dataSocialNetwork.data.translation.soc_for_continue_work_with_site }}
      </div>
      <div class="mb-15">
        <Input
          v-model.trim="phon"
          :placeholder="$t('placeholderPhone')"
        />
        <div v-if="errorSocial && errorSocial.length" class="field-error social">
          <div v-for="(item, index) in errorSocial" :key="index">
            {{ item }}
          </div>
        </div>
      </div>
      <button
        type="button"
        class="btn btn-success w-100 mb-0"
        @click="$emit('onRegistrationSocial')"
      >
        <span v-html="dataSocialNetwork.data.translation.soc_button_first"></span>
      </button>
    </template>
    <template v-else-if="viewSocial === 'number-registered'">
      <div class="field-text">
        {{ $t("thisPhoneNumberIsRegistered") }}
      </div>
      <Input 
        v-model.trim="code"
        @enter="$emit('onLoginSite', 'give me password please')"
        class="code-social auth-header-form-input"
        :class="{
          'is-invalid': valid.password === false,
          'mbottom-4': textError.length
        }"
        :placeholder="$t('passwordPlaceholder')"
        :type="togglePassword ? 'password' : 'text'"
        keyup="enter"
      />
      <div v-if="errorSocial && errorSocial.length" class="field-error social pdt-2 mb-0">
        <div v-for="(item, index) in errorSocial" :key="index">
          {{ item }}
        </div>
      </div>
      <div
        class="btn-show-hide-password"
        :class="{ show: togglePassword }"
        @click="$emit('changeTogglePass', !togglePassword)"
      >
        <span class="icon"></span>
      </div>
      <div v-if="!forgotSocial" class="forgot-password-link">
        <span @click="$emit('forgotPasswordSocial')">{{ $t("forgotPassword") }}</span>
      </div>
      <div v-else class="field-text pt-10">
        {{ forgotSocial }}
      </div>
      <button
        type="button"
        class="btn btn-success w-100 mb-0"
        @click="$emit('onLoginSite', 'give me password please')"
      >
        {{ $t("loginToSite") }}
      </button>
    </template>
    <template v-else-if="viewSocial === 'registered'">
      <div class="field-text">
        {{ $t("passwordWasSentToPhone", { phone }) }}
      </div>
      <Input 
        v-model.trim="code"
        @enter="$emit('onLoginSite', 'give me password')"
        class="auth-header-form-input"
        :class="{
          'is-invalid': valid.password === false,
          'mbottom-4': textError.length
        }"
        :placeholder="$t('passwordPlaceholder')"
        :type="togglePassword ? 'password' : 'text'"
        keyup="enter"
      />
      <div v-if="errorSocial && errorSocial.length" class="field-error social pt-0">
        <div v-for="(item, index) in errorSocial" :key="index">
          {{ item }}
        </div>
      </div>
      <div
        class="btn-show-hide-password"
        :class="{ show: togglePassword }"
        @click="$emit('changeTogglePass', !togglePassword)"
      >
        <span class="icon"></span>
      </div>
      <b-form-checkbox v-model="term" value="1" v-if="actionsAuthSocial === 'give me terms'">
        {{ $t("iAgreeTo") }}
        <a href="//sutochno.ru/rules/agreement">{{
          $t("personalDataProcessing")
          }}</a>
        {{ $t("andAcceptTerms") }}
        <a href="//sutochno.ru/rules">{{ $t("userAgreement") }}</a>
      </b-form-checkbox>
      <button
        type="button"
        class="btn btn-success w-100"
        @click="$emit('onLoginSite', 'give me password')"
      >
        {{ $t("loginToSite") }}
      </button>
    </template>
  </div>
</template>

<script>
// import inputPhones from "@sutochno/inputPhone";
import Input from "@sutochno/input";

export default {
  props: {
    phone: {
      type: [String, Number],
      required: true
    },
    codeSocial: {
      type: String,
      required: true
    },
    terms: {
      type: [Number, Boolean, String],
      required: true
    },
    actionsAuthSocial: {
      type: String,
      required: true
    },
    forgotSocial: {
      type: String,
      required: true
    },
    dataSocialNetwork: {
      type: Object,
      required: true
    },
    viewSocial: {
      required: true
    },
    togglePassword: {
      type: Boolean,
      required: true
    },
    valid: {
      type: Object,
      required: true
    },
    errorSocial: {
      required: true
    },
    textError: {
      required: true
    }
  },
  data () {
    return {
      code: this.codeSocial,
      phon: this.phone,
      term: this.terms
    }
  },
  components: {
    Input,
    // inputPhones
  },
  mounted () {
    console.log(this.viewSocial)
  },
  watch: {
    phon (phone) {
      this.$emit('changePhone', phone)
    },
    code (code) {
      this.$emit('changeCodeSocial', code)
    },
    term (terms) {
      this.$emit('changeTerms', terms)
    }
  }
}
</script>

<style lang="scss" scoped>
  .wrapp-reg-social {
    .auth-header-title-wrapp {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
    }
  }
</style>