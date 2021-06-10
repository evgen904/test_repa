<i18n>
{
  "ru": {
    "forgot": "Напомнить пароль",
    "forgotAbout": "Введите адрес электронной почты или номер телефона, указанный при регистрации.",
    "forgotButton": "Восстановить пароль",
    "forgotSend": "Сейчас вам придет смс на номер {tel}. Используйте цифры как пароль",
    "forgotSendEmail": "На электронную почту {email} был выслан пароль для входа на сайт",
    "telMailPlaceholder": "Введите e-mail или телефон"
  },
  "en": {
    "forgot": "Reset password",
    "forgotAbout": "Enter your e-mail address or phone number provided during registration.",
    "forgotButton": "Restore password",
    "forgotSend": "Now you will receive an SMS to the {tel} number. Use numbers as password",
    "forgotSendEmail": "A password has been sent to the email address {email} to enter the site",
    "telMailPlaceholder": "Phone number or e-mail address"
  }
}
</i18n>

<template>
  <div class="wrapp">
    <div class="auth-header-title-wrapp">
      <h5 class="auth-header-title">
        <span class="back-login" @click="$emit('backLogin')"></span>
        {{ $t("forgot") }}
      </h5>
      <span class="close" @click="$emit('close')">&times;</span>
    </div>
    <div class="field-text">
      {{ $t("forgotAbout") }}
    </div>
    <Input 
      v-model.trim="val"
      class="auth-header-form-input"
      :class="{
        'is-invalid': valid.value === false,
        'mbottom-4': textError.length
      }"
      :placeholder="$t('telMailPlaceholder')"
      keyup="enter"
      @enter="$emit('onForgot')"
    />
    <div v-if="textError.length" class="field-error">
      <div v-for="(item, index) in textError" :key="index">
        {{ item }}
      </div>
    </div>
    <button
      type="button"
      class="btn btn-success w-100"
      :disabled="!value"
      @click="$emit('onForgot')"
    >{{ $t("forgotButton") }}</button
    >
  </div>
</template>

<script>
import Input from "@sutochno/input";

export default {
  props: {
    value: {
      type: String,
      required: true
    },
    valid: {
      type: Object,
      required: true
    },
    textError: {
      required: true
    }
  },
  data () {
    return {
      val: this.value
    }
  },
  components: {
    Input
  },
  watch: {
    val (value) {
      this.$emit('changeValue', value)
    }
  }
}
</script>

<style lang="scss" scoped>
  .wrapp {
    .auth-header-title-wrapp {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
    }
    .auth-header-form-input {
      margin-bottom: 20px!important;
    }
  }
</style>
