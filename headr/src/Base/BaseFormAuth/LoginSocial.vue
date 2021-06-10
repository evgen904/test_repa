<i18n>
{
  "ru": {
    "didntReceiveYourPassword":"Пароль не пришёл?",
    "getPasswordAgain":"получить пароль повторно",
    "youCanRequestNewPasswordVia":"Вы можете запросить новый пароль через"
  },
  "en": {
    "didntReceiveYourPassword":"I didn't get my password?",
    "getPasswordAgain":"get your password again",
    "youCanRequestNewPasswordVia":"You can request a new password via"
  }
}
</i18n>

<template>
  <div class="auth-header-footer">
    <div class="footer-social">
      <template v-if="timers === 0">
        <div class="text-left">
          {{ $t("didntReceiveYourPassword") }}
          <a href="#" @click.prevent="$emit('forgotPasswordSocial')">
            {{ $t("getPasswordAgain") }}
          </a>
        </div>
      </template>
      <template v-if="timers > 0">
        <div class="text-left">
          {{ $t("youCanRequestNewPasswordVia") }}<br>
          {{ `${Math.floor(this.timers / 60)}:${this.timers % 60}` }}
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseFormLoginSocial',
  props: {
    timers: {
      type: Number,
      required: true
    }
  }
}
</script>