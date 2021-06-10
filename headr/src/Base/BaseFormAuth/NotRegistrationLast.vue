<i18n>
{
  "ru": {
    "auth": "Вход",
    "questionRegistration": "Нет аккаунта?",
    "registration": "Регистрация",
    "questionAuth": "Уже зарегистрированы?",
    "smsRegistration": "Пароль не пришел?",
    "smsAgainRegistration": "Запросить повторно",
    "youCanRequestNewPasswordVia":"Вы можете запросить новый пароль через",
    "minutes": " |{n} минута |{n} минуты|{n} минут",
    "seconds": " |{n} секунда |{n} секунды|{n} секунд"
  },
  "en": {
    "auth": "Log in",
    "questionRegistration": "No account? Sign up!",
    "registration": "Join",
    "questionAuth": "Already have an account?",
    "smsRegistration": "Didn’t wait for the call?",
    "smsAgainRegistration": "request again",
    "youCanRequestNewPasswordVia":"You can request a new password via",
    "minutes": " |{n} minute |{n} minutes|{n} minutes",
    "seconds": " |{n} second |{n} seconds|{n} seconds"
  }
}
</i18n>

<template>
  <div class="auth-header-footer">
    <template v-if="state == 'auth'">
      {{ $t("questionRegistration") }}
      <a href="#" @click.prevent="$emit('changeState', 'registration')">{{
        $t("registration")
        }}</a>
    </template>
    <template v-if="state === 'registration'">
      {{ $t("questionAuth") }}
      <a href="#" @click.prevent="$emit('changeState', 'auth')">{{ $t("auth") }}</a>
    </template>
    <template v-if="state === 'registration-last'">
      <template v-if="timers === 0">
        <div class="text-left">
          {{ $t("smsRegistration") }}
          <a href="#" @click.prevent="$emit('onResendSms')">
            {{ $t("smsAgainRegistration") }}
          </a>
        </div>
      </template>
      <template v-else-if="timers > 0">
        <div class="text-left">
          {{ $t("youCanRequestNewPasswordVia", this.timers) }}
          {{ $tc("minutes", Math.floor(this.timers / 60)) }}
          {{ $tc("seconds", this.timers % 60) }}
        </div>
      </template>
      <div v-if="linkHost" class="link-host text-left">
        <a :href="`//${linkHost}`" target="_blank">
          <img src="./../../assets/link-to.svg" alt="" />
        </a>
        {{ $t("goTo") }}
        <a :href="`//${linkHost}`" target="_blank">{{ linkHost }}</a>
      </div>
    </template>
    <template v-if="state === 'you-already-registered'">
      <div class="text-left">
        {{ $t("smsRegistration") }}
        <a href="#" @click.prevent="$emit('onResendSms', 'you-already-registered')">
          {{ $t("smsAgainRegistration") }}
        </a>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'BaseFormNotRegistrationLast',
  props: {
    state: {
      type: String,
      required: true
    },
    timers: {
      required: true
    },
    linkHost: {
      type: String,
      required: true
    }
  }
}
</script>
