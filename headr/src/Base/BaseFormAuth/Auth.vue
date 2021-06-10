<i18n>
{
  "ru": {
    "auth": "Вход",
    "valuePlaceholder": "Введите e-mail или телефон",
    "passwordPlaceholder": "Введите пароль",
    "persistentAuth": "запомнить меня",
    "forgotPassword": "Забыли пароль?",
    "buttonAuth": "Войти",
    "questionAuth": "Уже зарегистрированы?",
    "viaPhoneOrMail": "С помощью телефона или почты",
    "socialTitle": "через социальную сеть"
  },
  "en": {
    "auth": "Log in",
    "valuePlaceholder": "phone number or e-mail address",
    "passwordPlaceholder": "enter your password",
    "persistentAuth": "remember me",
    "forgotPassword": "lost your password?",
    "buttonAuth": "Login",
    "questionAuth": "Already have an account?",
    "viaPhoneOrMail": "via phone or e-mail",
    "socialTitle": "with your social account"
  }
}
</i18n>

<template>
  <div class="auth-header-wrapp">
    <div class="auth-header-title-wrapp">
      <h5 class="auth-header-title">{{ $t("auth") }}</h5>
      <span class="close" @click="$emit('close')">&times;</span>
    </div>
    <div class="social-login-wrapp">
      <div class="social-login space-between">
        <b-button
          type="button"
          class="btn btn-vk"
          @click="loginSocial('vk')"
        >
          <span class="name-btn">С помощью Вконтакте</span>
        </b-button>
        <b-button
          type="button"
          class="btn btn-mailru"
          @click="loginSocial('ml')"
        >
          <span class="name-btn">С помощью mail.ru</span>
        </b-button>
        <!-- <div class="fb" @click="loginSocial('fb')"></div> -->
      </div>
      <div class="social-login bot">
        <div class="icon yandex" @click="loginSocial('ya')"></div>
        <div class="icon google" @click="loginSocial('gg')"></div>
        <div class="icon ok" @click="loginSocial('ok')"></div>
      </div>
    </div>
    <div class="field-text">
      {{ $t("viaPhoneOrMail") }}
    </div>
    <Input 
      v-model.trim="val"
      class="auth-header-form-input"
      :class="{
      'is-invalid': valid.value === false
      }"
      :placeholder="$t('valuePlaceholder')"
      keyup="enter"
      @enter="$emit('onAuth')"
    />
    <div class="field-password">
      <Input 
        v-model.trim="pass"
        class="auth-header-form-input"
        :class="{
          'is-invalid': valid.password === false,
          'mbottom-4': textError.length
        }"
        :placeholder="$t('passwordPlaceholder')"
        :type="togglePassword ? 'password' : 'text'"
        keyup="enter"
        @enter="$emit('onAuth')"
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
    <div class="forgot-password">
      <b-form-checkbox v-model="persis" value="1">
      {{ $t("persistentAuth") }}
      </b-form-checkbox>
      <a href="#" @click.prevent="$emit('changeState', 'forgot')">{{ $t("forgotPassword") }}</a>
    </div>
    <button
      type="button"
      class="btn btn-success w-100"
      :disabled="!val || !pass"
      @click="$emit('onAuth')"
    >{{ $t("buttonAuth") }}</button>
  </div>
</template>

<script>
import Input from "@sutochno/input";

export default {
  name: 'BaseFormAuthAuth',
  props: {
    password: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    },
    persistent: {
      type: [Number, Boolean, String],
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
    }
  },
  data () {
    return {
      val: this.value,
      pass: this.password,
      persis: this.persistent
    }
  },
  components: {
    Input
  },
  methods: {
    loginSocial(type) {
      const url = `/auth.html?type=${type}&js`;
      const popupWindowOpts = {
        width: 640,
        height: 480,
      };
      const centerPopup = {
        left: (window.innerWidth - popupWindowOpts.width) / 2,
        top: (window.innerHeight - popupWindowOpts.height) / 2,
      };

      window.open(
          url,
          "soc_auth_popup_window",
          `width=${popupWindowOpts.width},
      height=${popupWindowOpts.height},
      left=${centerPopup.left},
      top=${centerPopup.top},
      resizable=yes,scrollbars=no,toolbar=no,menubar=no,location=no,directories=no,status=yes`
      );
    },
  },
  watch: {
    pass (pass) {
      this.$emit('changePassword', pass)
    },
    val (value) {
      this.$emit('changeValue', value)
    },
    persis (persistent) {
      this.$emit('changePersistent', persistent)
    }
  }
}
</script>

<style lang="scss" scoped>
  .auth-header-wrapp {
    .auth-header-title-wrapp {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .social-login-wrapp {
      margin-top: 20px;
      margin-bottom: 30px;
      .social-login {
        display: flex;
        align-items: center;
        padding: 6px 0 0;
        margin: 0 auto 10px;
        width: 100%;
        .btn-mailru,
        .btn-vk {
          width: 100%;
          padding: 13px 26px 12px 27px;
          border-radius: 3px;
        }
        .btn-vk {
          border: 0;
          margin-right: 10px;
          text-align: left;
          background-color: #4d77a1;
          outline: none;
          position: relative;
          &:before {
            content: '';
            display: block;
            cursor: pointer;
            width: 20px;
            height: 12px;
            background: url("./../../assets/icon/vk-1@3x.png") 0 0 no-repeat;
            background-size: contain;
            transform: translate(0, -50%);
            position: absolute;
            top: 50%;
            left: 27px;
          }
          &:hover {
            background-color: rgba(77, 119, 161, .9);
          }
          .name-btn {
            margin-left: 27px;
            color: #fff;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            font-style: normal;
            line-height: normal;
            letter-spacing: normal;
          }
        }
        .btn-mailru {
          border: 0;
          text-align: left;
          background-color: #0059fd;
          outline: none;
          position: relative;
          &:before {
            content: '';
            display: block;
            cursor: pointer;
            width: 16px;
            height: 16px;
            background: url("./../../assets/icon/mailru@3x.png") 0 0 no-repeat;
            background-size: contain;
            transform: translate(0, -50%);
            position: absolute;
            top: 50%;
            left: 27px;
          }
          &:hover {
            background-color: rgba(0, 89, 253, .85);
          }
          .name-btn {
            margin-left: 27px;
            color: #fff;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            font-style: normal;
            line-height: normal;
            letter-spacing: normal;
          }
        }
        &.space-between {
          justify-content: space-between;
        }
        &.bot {
          margin-bottom: 6px;
          .icon {
            width: 42px;
            height: 42px;
            margin-right: 10px;
            padding: 15px;
            background-color: #f6f6f6;
            border-radius: 50%;
            cursor: pointer;
            position: relative;
            &:last-child {
              margin-right: 0;
            }
            &:before {
              content: '';
              display: block;
            }
          }
        }
        .fb {
          cursor: pointer;
          width: 135px;
          height: 40px;
          background: url("./../../assets/spr_login_vk_fb_2x.png") 100% 0 no-repeat;
          background-size: 270px;
        }
        .ok:before {
          width: 13px;
          height: 20px;
          background: url("./../../assets/icon/ok@3x.png") 0 0 no-repeat;
          background-size: contain;
          transform: translate(-50%, -50%);
          position: absolute;
          top: 50%;
          left: 50%;
        }
        .yandex:before {
          width: 10px;
          height: 20px;
          background: url("./../../assets/icon/yandex@3x.png") 0 0 no-repeat;
          background-size: contain;
          transform: translate(-50%, -50%);
          position: absolute;
          top: 50%;
          left: 50%;
        }
        .google:before {
          width: 16px;
          height: 16px;
          background: url("./../../assets/icon/google@3x.png") 0 0 no-repeat;
          background-size: contain;
          transform: translate(-50%, -50%);
          position: absolute;
          top: 50%;
          left: 50%;
        }
      }
    }
    .mobile & {
      .close {
        display: none;
      }
      .social-login {
        &.space-between {
          flex-direction: column;
          .btn {
            text-align: center;
            &:before {
              display: inline-block;
              transform: unset;
              position: unset;
            }
            .name-btn {
              margin-left: 10px;
            }
          }
          .btn-vk {
            margin: 0 0 10px 0;
          }
        }
      }
    }
  }
</style>