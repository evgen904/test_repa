<i18n>
{
  "ru": {
    "enterPasswordTitle":"Введите пароль",
    "youAlreadyRegistered":"Вы уже зарегистрированы в системе",
    "passwordPlaceholder": "Введите пароль",
    "persistentAuth": "запомнить меня",
    "forgotPassword": "Забыли пароль?"
  },
  "en": {
    "enterPasswordTitle":"Enter the password",
    "youAlreadyRegistered":"You are already registered in the system",
    "passwordPlaceholder": "enter your password",
    "persistentAuth": "remember me",
    "forgotPassword": "lost your password?"
  }
}
</i18n>

<template>
  <div class="wrapp">
    <div class="auth-header-title-wrapp">
      <h5 class="auth-header-title">
        <span class="back-login" @click.prevent="$emit('backLoginReg')"></span>
        {{ $t("enterPasswordTitle") }}
      </h5>
      <span class="close" @click="$emit('close')">&times;</span>
    </div>
    <div class="text-forgot">
      {{ $t("youAlreadyRegistered") }}
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
      <div
        class="btn-show-hide-password"
        :class="{ show: togglePassword }"
        @click="$emit('changeTogglePass', togglePassword = !togglePassword)"
      >
        <span class="icon"></span>
      </div>
    </div>
    <div v-if="textError.length" class="field-error">
      <div v-for="(item, index) in textError" :key="index">
        {{ item }}
      </div>
    </div>
    <div class="forgot-password">
      <b-form-checkbox v-model="pers" value="1">
        {{ $t("persistentAuth") }}
      </b-form-checkbox>
      <a href="#" @click.prevent="$emit('changeState', 'forgot')">{{ $t("forgotPassword") }}</a>
    </div>
    <button
      type="button"
      class="btn btn-success w-100"
      :disabled="!password"
      @click="$emit('onAuthLast')"
    >Ok</button>
  </div>
</template>

<script>
import Input from "@sutochno/input";

export default {
  name: 'BaseFormAlreadyRegistered',
  props: {
    state: {
      type: String,
      required: true
    },
    togglePassword: {
      type: Boolean,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    persistent: {
      type: [Number, Boolean, String],
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
      pers: this.persistent,
      pass: this.password
    }
  },
  components: {
    Input
  },
  watch: {
    pass (password) {
      this.$emit('changePassword', password)
    },
    pers (persistent) {
      this.$emit('changePersistent', persistent)
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
  }
</style>