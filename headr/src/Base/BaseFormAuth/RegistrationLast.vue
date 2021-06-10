<i18n>
{
  "ru": {
    "registration": "Регистрация",
    "forgot": "Напомнить пароль",
    "forgotSend": "Сейчас вам придет смс на номер {tel}. Используйте цифры как пароль",
    "passwordPlaceholder": "Введите пароль"
  },
  "en": {
    "registration": "Join",
    "forgot": "Reset password",
    "forgotSend": "Now you will receive an SMS to the {tel} number. Use numbers as password",
    "passwordPlaceholder": "enter your password"
  }
}
</i18n>

<template>
  <div class="auth-header-registration-last">
    <div class="auth-header-title-wrapp">
      <h5 class="auth-header-header-title">
        <span class="back-login" @click="$emit(lastForm)"></span>
        <template v-if="forgotStatus === 'registration'">
          {{ $t("registration") }}
        </template>
        <template v-else>
          {{ $t("forgot") }}
        </template>
      </h5>
      <span class="close" @click="$emit('close')">&times;</span>
    </div>
    <div class="text-forgot">
      <template v-if="forgotStatus === 'registration'">
        {{ $t('forgotSend', { tel: value }) }}
      </template>
      <template v-else>
        <div v-html="textForgot"></div>
      </template>
    </div>
    <div class="field-password">
      <Input 
        v-model.trim="pass"
        :placeholder="$t('passwordPlaceholder')"
        :type="togglePassword ? 'password' : 'text'"
        class="auth-header-form-input"
        :class="{
          'is-invalid': valid.password,
          'mbottom-4': textError.length
        }"
        keyup="enter"
        @enter="$emit('onAuthLast')"
      />
      <div v-if="textError.length" class="field-error">
        <div v-for="(item, index) in textError" :key="index">
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
    </div>
    <button
      type="button"
      class="btn btn-success w-100"
      :disabled="!value || !password"
      @click="$emit('onAuthLast')"
    >Ok</button>
  </div>
</template>

<script>
import Input from "@sutochno/input";

export default {
  props: {
    forgotStatus: {
      type: String,
      required: true
    },
    textForgot: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    },
    password: {
      type: String,
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
    textError: {
      required: true
    },
    lastForm: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      pass: this.password
    }
  },
  components: {
    Input
  },
  watch: {
    pass (pass) {
      this.$emit('changePassword', pass)
    }
  }
}
</script>

<style lang="scss" scoped>
  .auth-header-registration-last {
    .auth-header-title-wrapp {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
    }
  }
</style>
