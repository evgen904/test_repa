<i18n>
{
  "ru": {
    "forgotSend": "Сейчас вам придет смс на номер {tel}. Используйте цифры как пароль",
    "forgotSendEmail": "На электронную почту {email} был выслан пароль для входа на сайт"
  },
  "en": {
    "forgotSend": "Now you will receive an SMS to the {tel} number. Use numbers as password",
    "forgotSendEmail": "A password has been sent to the email address {email} to enter the site"
  }
}
</i18n>

<template>
  <div class="auth-header" v-if="isVisible">
    <div class="auth-header-close" @click="close">
      <div class="auth-header-close-icon"></div>
    </div>
    <div class="auth-header-container">
      <!-- Авторизация -->
      <Auth
        v-if="state === 'auth'"
        @close="close"
        @changeState="changeState"
        @changeTogglePass="changeTogglePass"
        @changePassword="changePassword"
        @changeValue="changeValue"
        @changePersistent="changePersistent"
        @onAuth="onAuth"
        :togglePassword="togglePassword"
        :password="password"
        :value="value"
        :persistent="persistent"
        :valid="valid"
        :textError="textError"
      />

      <!-- Забыл пароль -->
      <ForgotPass
        v-if="state === 'forgot'"
        @close="close"
        @backLogin="backLogin"
        @onForgot="onForgot"
        @changeValue="changeValue"
        :valid="valid"
        :textError="textError"
        :value="value"
      />

      <!-- регистрация через соц сети ВК -->
      <RegistrationSocial
        v-if="state === 'login-via-social-network' && dataSocialNetwork"
        @close="close"
        @onLoginSite="onLoginSite"
        @forgotPasswordSocial="forgotPasswordSocial"
        @onRegistrationSocial="onRegistrationSocial"
        @changePhone="changePhone"
        @changeCodeSocial="changeCodeSocial"
        @changeTerms="changeTerms"
        @changeTogglePass="changeTogglePass"
        :phone="phone"
        :codeSocial="codeSocial"
        :terms="terms"
        :actionsAuthSocial="actionsAuthSocial"
        :forgotSocial="forgotSocial"
        :dataSocialNetwork="dataSocialNetwork"
        :viewSocial="viewSocial"
        :errorSocial="errorSocial"
        :valid="valid"
        :togglePassword="togglePassword"
        :textError="textError"
      />

      <!-- Регистрация -->
      <Registration
        v-if="state === 'registration'"
        @close="close"
        @onRegistration="onRegistration"
        @changeName="changeName"
        @changeValue="changeValue"
        @changeTerms="changeTerms"
        :name="name"
        :value="value"
        :terms="terms"
        :valid="valid"
        :textError="textError"
      />

      <!-- Окончание авторизации вход по паролю -->
      <RegistrationLast
        v-if="state === 'registration-last'"
        @close="close"
        @backLoginReg="backLoginReg"
        @backLogin="backLogin"
        @onAuthLast="onAuthLast"
        @changeTogglePass="changeTogglePass"
        @changePassword="changePassword"
        :forgotStatus="forgotStatus"
        :textForgot="textForgot"
        :togglePassword="togglePassword"
        :password="password"
        :value="value"
        :valid="valid"
        :textError="textError"
        :lastForm="lastForm"
      />

      <!-- Пользовательское соглашение, нужно вкл. галку -->
      <TermsOfUse
        v-if="state === 'registration-last-user-agreement'"
        @close="close"
        @changeState="changeState"
        :state="state"
      />

      <!-- Вы уже зарегистрированы в системе -->
      <AlreadyRegistered
        v-if="state === 'you-already-registered'"
        @close="close"
        @changeState="changeState"
        @backLoginReg="backLoginReg"
        @onAuthLast="onAuthLast"
        @changeTogglePass="changeTogglePass"
        @changePassword="changePassword"
        @changePersistent="changePersistent"
        :state="state"
        :togglePassword="togglePassword"
        :password="password"
        :persistent="persistent"
        :valid="valid"
        :textError="textError"
      />

      <NotRegistrationLast
        v-if="state !== 'forgot' && state !== 'registration-last-user-agreement'"
        @close="close"
        @changeState="changeState"
        @onResendSms="onResendSms"
        :state="state"
        :timers="timers"
        :linkHost="linkHost"
      />

      <!-- подвал связанный с регистрацией через соц сети ВК -->
      <LoginSocial
        v-if="state === 'login-via-social-network' && timeoutSocial"
        @close="close"
        @forgotPasswordSocial="forgotPasswordSocial"
        :timers="timers"
      />
    </div>
  </div>
</template>

<script>
  import API from "./../../API";
  import VueCookies from "vue-cookies";
  import { mapActions, mapState } from "vuex";
  import inputPhones from "@sutochno/inputPhone";
  import Input from "@sutochno/input";

  //components import
  import Auth from './Auth.vue'
  import ForgotPass from './ForgotPass.vue'
  import RegistrationSocial from './RegistrationSocial.vue'
  import Registration from './Registration.vue'
  import RegistrationLast from './RegistrationLast.vue'
  import TermsOfUse from './TermsOfUse.vue'
  import AlreadyRegistered from './AlreadyRegistered.vue'
  import NotRegistrationLast from './NotRegistrationLast.vue'
  import LoginSocial from './LoginSocial.vue'

  export default {
    name: "BaseFormAuth",
    components: {
      inputPhones,
      Input,
      Auth,
      ForgotPass,
      RegistrationSocial,
      Registration,
      RegistrationLast,
      TermsOfUse,
      AlreadyRegistered,
      NotRegistrationLast,
      LoginSocial
    },
    mounted() {
      this.toggleAuth();
    },
    methods: {
      changeState (state) {
        this.state = state
      },
      changeTogglePass (toggle) {
        this.togglePassword = toggle
      },
      changeName (name) {
        this.name = name
      },
      changeValue (val) {
        this.value = val
      },
      changeTerms (terms) {
        this.terms = terms
      },
      changePassword (pass) {
        this.password = pass
      },
      changePhone (phone) {
        this.phone = phone
      },
      changeCodeSocial (code) {
        this.codeSocial = code
      },
      changePersistent (persistent) {
        this.persistent = persistent
      },
      ...mapActions("user", ["loadUserData"]),
      toggleAuth() {
        document.addEventListener('toggleAuthForm', () => {
          this.isVisible = true;
        });
      },
      show(state) {
        this.isVisible = true;
        if (["auth", "registration", "login-via-social-network"].includes(state)) this.state = state;
      },
      onLoginSite(status) {
        const formData = new FormData();
        formData.append("phone", this.phone)
        formData.append("code", this.codeSocial)
        formData.append("status", (this.actionsAuthSocial == "give me terms") ? "give me terms" : status)
        if (this.terms) {
          formData.append("terms", "1")
        }

        API.addMobileToNotAuthUser(formData)
          .then(response => {
            this.errorSocial = response.data.errors;
            if (response.data.success) {
              this.close();
              this.loadUserData();
            }
            this.actionsAuthSocial = response.data.actions.auth || "";
            // if (response.data.actions.redirect) {
            //   document.location.href = response.data.actions.redirect;
            // }
          })
          .catch(err => {
            console.error(err);
          })
      },
      onRegistrationSocial() {
        const formData = new FormData();
        formData.append("phone", this.phone)

        API.addMobileToNotAuthUser(formData)
          .then(response => {
            this.errorSocial = response.data.errors;
            if (response.data.success) {
              this.close();
              this.loadUserData();
            }
            if (response.data.data.messages.phone) {
              this.viewSocial = "number-registered";
            }
            if (response.data.data.timeout) {
              this.viewSocial = "registered";
              this.timers = response.data.data.timeout;
              this.timeoutSocial = response.data.data.timeout;
            }
          })
          .catch(err => {
            console.log(err);
          })
      },
      clearSocialAccount() {
        API.clearSocialAccountData()
          .then(response => {
            const { host } = window.location
            let newHost = host;

            newHost = newHost.split('.')

            if(newHost.length >= 3) {
              newHost = newHost.slice(1)
            }

            newHost = newHost.join('.')

            VueCookies.set("_ia_", '1', "30d", "/", `.${newHost}`)
          })
          .catch(err => {
            console.log(err);
          })
      },
      close() {
        this.isVisible = false;
        if (this.state == "login-via-social-network") {
          this.clearSocialAccount();
        }
        this.state = "auth";
        this.timers = 0;
        this.$store.commit("user/authStateMutate", "")
      },
      onAuth() {
        const { value, password, persistent } = this;
        this.valid.value = null
        API.auth({
          value,
          password,
          persistent,
        })
            .then((response) => {
              if (
                  response.data.data.messages.already &&
                  response.data.errors.length == 0
              ) {
                this.isVisible = false;
                this.loadUserData();
                this.valid.value = true;
                this.valid.password = null;
                this.textError = [];
              }
              if (response.data.errors.length) {
                this.valid.value = false;
                this.valid.password = false;
                this.textError = response.data.errors;
                
              }
            })
            .catch((error) => {
              console.log("Ajax error: ", error);
            });
      },
      onAuthLast() {
        const { value, password, status = "auth-header-login-last", persistent } = this;
        API.auth({
          value,
          password,
          status,
          persistent,
        })
            .then((response) => {
              if (response.data.data.user_id && response.data.errors.length == 0) {
                this.isVisible = false;
                
                this.loadUserData();
                this.valid.value = null;
                this.valid.password = null;
                this.textError = [];
              }
              if (response.data.errors.length) {
                this.valid.value = false;
                this.valid.password = false;
                this.textError = response.data.errors;
              }
            })
            .catch((error) => {
              console.log("Ajax error: ", error);
            });
      },
      forgotPasswordSocial() {
        const formData = new FormData();
        formData.append("phone", this.phone)
        formData.append("status", "remind")

        API.addMobileToNotAuthUser(formData)
          .then(response => {
            this.errorSocial = response.data.errors;
            this.forgotSocial = response.data.data?.messages?.forgot || ""
            if (response.data.data?.timeout) {
              this.timers = response.data.data.timeout || 0;
              this.timeoutSocial = response.data.data.timeout || 0;
            }
          })
          .catch(err => {
            console.log(err);
          })
      },
      onRegistration() {
        const { name, value, status = "auth-header-registration", terms } = this;
        API.auth({
          name,
          value,
          status,
          terms,
        })
            .then((response) => {
              if (response.data.errors.length) {
                this.valid.value = false;
                this.textError = response.data.errors;
              }
              if (response.data.errors.length == 0) {
                this.timers = response.data.actions.auth != "show terms" ? 180 : 0;
                this.state = response.data.actions.auth != "show terms" ? "registration-last" : "registration-last-user-agreement";
                this.textError = [];
                this.forgotStatus = "registration";
                this.textForgot = response.data.data.messages.registration || "";
              }

              if (
                  (response.data.data.messages.already &&
                      response.data.data.messages.already ==
                      "Вы уже зарегистрированы в системе") ||
                  (response.data.actions && response.data.actions.auth && response.data.actions.auth == "show password for new user")
              ) {
                this.state = "you-already-registered";
                this.textError = response.data.errors;
              }
            })
            .catch((error) => {
              console.log("Ajax error: ", error);
            });
      },
      onResendSms(state) {
        this.password = "";
        this.forgotStatus = "forgot";
        const {
          name,
          value,
          password,
          status = "auth-header-registration-last",
          forgot = "1",
          terms,
          transport_notice = "sms"
        } = this;
        API.auth({
          name,
          value,
          password,
          status,
          forgot,
          terms,
          transport_notice
        })
            .then((response) => {
              this.timers = response.data.data.timeout;
              if (state === "you-already-registered") {
                this.state = "registration-last";
                this.textForgot = response.data.data.messages.forgot || "";
                this.textError = [];
              }
            })
            .catch((error) => {
              console.log("Ajax error: ", error);
            });
      },
      onForgot() {
        this.password = "";
        this.textForgot = "";
        this.linkHost = "";
        this.forgotStatus = "forgot";
        const {
          name,
          value,
          password,
          status = "auth-header-forgot",
          forgot = "1",
          terms
        } = this;
        API.auth({
          name,
          value,
          password,
          status,
          forgot,
          terms,
          isEmail: this.isEmail
        })
            .then((response) => {
              if (response.data.errors.length == 0) {
                // this.timers = 180;
                this.timers = response.data.data.timeout || 180
                this.state = "registration-last";
                this.valid.value = null;
                this.textError = [];
                if(this.isEmail) {
                  this.textForgot = this.$t('forgotSendEmail', {email: this.value})
                } else {
                  this.textForgot = this.$t('forgotSend', {tel: this.value})
                }
                this.linkHost = response.data.data.messages.host || "";
              }
              if (response.data.errors.length) {
                this.valid.value = false;
                this.textError = response.data.errors;
              }
            })
            .catch((error) => {
              console.log("Ajax error: ", error);
            });
      },
      
      backLogin() {
        this.state = "auth";
        this.timers = 0;
      },
      backLoginReg() {
        this.state = "registration";
        this.timers = 0;
      },
      iAccept() {
        this.terms = 1;
        this.onRegistration();
      }
    },
    data() {
      return {
        isVisible: false,
        state: "auth",
        value: "",
        name: "",
        password: "",
        persistent: false,
        terms: false,
        timers: 0,
        valid: {
          value: null,
          password: null,
          name: null,
        },
        togglePassword: true,
        textError: [],
        textForgot: "",
        linkHost: "",
        forgotStatus: "forgot",
        phone: "",
        errorSocial: [],
        codeSocial: "",
        timeoutSocial: 0,
        forgotSocial: "",
        viewSocial: "enter-phone",
        actionsAuthSocial: "",
        lastForm: 'backLogin'
      };
    },
    watch: {
      state(val) {
        if (val === 'auth') {
          this.lastForm = "backLogin";
        } else if (val === 'registration') {
          this.lastForm = "backLoginReg";
        }
        if (val != "registration-last" && val != "you-already-registered" && val != "registration-last-user-agreement") {
          this.value = "";
          this.name = "";
          this.password = "";
          this.textError = [];
          this.valid = {
            value: null,
            password: null,
            name: null,
          };
        }
      },
      timers(value) {
        if (value > 0) {
          setTimeout(() => {
            this.timers -= 1;
          }, 950);
        }
      },
      isVisible (val) {
        if (val) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = '';
        }
      }
    },
    computed: {
      ...mapState("user", ["dataSocialNetwork"]),
      isEmail() {
        const validEmail = /\S+@\S+\.\S+/;
        return validEmail.test(this.value)
      }
    }
  };
</script>
<style lang="scss">
  .sc-header {
    .auth-header-form-input {
      margin-bottom: 10px!important;
    }
    .auth-header input {
      width: 100%;
      height: auto;
      padding: 13px 15px;
      padding-right: 45px;
      border-radius: 3px;
      border: solid 1px #d8d8d8;
      background-color: #ffffff;
    }
    .mobile & {
      .auth-header {
        flex-direction: column;
      }
    }
    .auth-header {
      &-close {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 50;
      }
      .desktop & {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 200;
        overflow: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(0, 0, 0, 0.5);
        &-container {
          display: block;
          width: 530px;
          padding: 19px 20px;
          background-color: #fff;
          box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
          position: relative;
          z-index: 200;
          .close {
            display: block;
            padding: 15px 20px;
            font-size: 18px;
            color: #a6a6a6;
            cursor: pointer;
            position: absolute;
            right: 0;
            top: 0;
            &:hover {
              color: #666;
            }
          }
        }
        .modal-close {
          cursor: pointer;
          width: 16px;
          height: 16px;
          position: absolute;
          right: 20px;
          top: 20px;
          opacity: .7;
          &:after,
          &:before {
            content: "";
            display: block;
            width: 18px;
            height: 1px;
            background: #3e3e3e;
            position: relative;
            top: 8px;
            left: 0;
          }
          &:after {
            transform: rotate(45deg);
          }
          &:before {
            transform: rotate(-45deg);
          }
        }
      }
      .mobile & {
        .auth-header-close {
          display: block;
          width: 100%;
          height: 50px;
          background-color: #f6f6f6;
          cursor: pointer;
          position: relative;
          &-icon {
            margin-top: 14px;
            margin-left: 20px;
            &:after,
            &:before {
              content: "";
              display: block;
              width: 18px;
              height: 1px;
              background: #3e3e3e;
              position: relative;
              top: 8px;
              left: 0;
            }
            &:after {
              transform: rotate(45deg);
            }
            &:before {
              transform: rotate(-45deg);
            }
          }
        }
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 200;
        overflow: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(0, 0, 0, 0.5);
        &-container {
          background: #fff;
          display: block;
          padding: 30px 20px 20px;
          width: 100%;
          height: 100%;
          overflow: auto;
          
        }
      }
      &-container {
        .form-control,
        .sc-checkbox {
          margin-bottom: 15px;
          &.is-invalid,
          &:invalid {
            background: #fff;
            border-color: red;
            &:focus {
              box-shadow: none;
            }
          }
        }
        .mbottom-4 {
          margin-bottom: 4px;
        }
        .auth-header-footer {
          margin: 10px -20px -20px -20px;
          padding: 15px 20px 14px;
          background: #ededef;
          text-align: center;
          font-size: 15px;
          line-height: 1.4;
          .text-left {
            text-align: left;
          }
          .link-host {
            padding-top: 4px;
            img {
              margin-right: 4px;
            }
          }
        }
      }
      &-title {
        font-weight: 600;
        line-height: 19px;
        margin-top: 0;
        margin-bottom: 0;
      }
      .auth-header-title {
        font-size: 22px!important;
        font-weight: 500;
      }
      h5 {
        font-size: 17px;
      }
      .field-password {
        position: relative;
        padding-bottom: 15px;
        .btn-show-hide-password {
          cursor: pointer;
          position: absolute;
          top: 0;
          right: 0;
          height: 30px;
          width: 46px;
          text-align: center;
          .icon {
            display: inline-block;
            vertical-align: middle;
            width: 25px;
            height: 16px;
            background-image: url("./../../assets/icon/show@2x.png");
            background-position: 0;
            background-repeat: no-repeat;
            background-size: contain;
            margin-top: 50%;
            transform: translate(0, -50%);
          }
          &.show {
            .icon {
              background-image: url("./../../assets/icon/not_show@2x.png");
            }
          }
        }
        .form-control {
          &.is-invalid {
            background: #fff;
          }
          &.error {
            border-color: red;
          }
        }
      }
      .btn-secondary.disabled,
      .btn-secondary:disabled {
        color: #ffffff;
        background-color: #498bc3;
        border-color: #3671a3;
        opacity: 1;
        &:hover,
        &:focus,
        &:active {
          background-color: #498bc3;
          border-color: #3671a3;
        }
      }
      .btn-primary:hover,
      .btn-primary:focus,
      .btn-primary:active,
      .btn-blue:hover,
      .btn-blue:focus,
      .btn-blue:active {
        background-color: #5c97c9;
        border-color: #498bc3;
        color: #ffffff;
      }
      .btn.btn-primary {
        margin-bottom: 10px;
      }
      .btn.btn-success {
        height: 42px;
        margin-bottom: 15px;
        border-radius: 3px;
        background-color: #6fa759;
        border: 0;
        &:hover {
          background-color: rgba(110, 167, 88, .9);
        }
      }
      .field-text {
        line-height: 17px;
        margin-bottom: 15px;
        color: #000;
        font-size: 14px;
        font-weight: normal;
        &.pt-10 {
          padding-top: 10px;
        }
      }
      .text-forgot {
        line-height: 1.4;
        margin-bottom: 10px;
        font-size: 15px;
        span, ::v-deep > div > span {
          text-decoration: underline;
        }
      }
      ::v-deep .custom-control-label {
        line-height: 1.2;
      }
      .back-login {
        display: inline-block;
        vertical-align: middle;
        cursor: pointer;
        position: relative;
        height: 20px;
        width: 16px;
        &:after,
        &:before {
          content: "";
          display: block;
          width: 8px;
          height: 1px;
          background: #000;
          position: absolute;
          top: 0;
          left: 0;
          transform: rotate(-45deg);
          margin: 6px 0 0 2px;
        }
        &:before {
          top: 5px;
          transform: rotate(45deg);
        }
      }
      .field-error {
        color: #e10600;
        font-size: 13px;
        line-height: 1.3;
        padding: 0 10px;
        margin-bottom: 14px;
        &.social {
          padding: 10px 0 0;
          &.pdt-2 {
            padding-top: 2px;
          }
        }
      }
      a {
        color: #0056b3;
        &:hover {
          color: #f51449 !important;
        }
      }
      .forgot-password {
        display: flex;
        justify-content: space-between;
      }
      .error-input {
        border-color: #e10600;
      }
      .registration-terms-error {
        color: #e10600;
        font-size: 12px;
        a {
          color: #e10600;
        }
      }
      .text-center {
        text-align: center;
      }
      .btn-footer {
        padding-top: 14px;
        .btn {
          margin: 0 10px;
        }
      }
      .code-social {
        margin-bottom: 6px;
      }
      .forgot-password-link {
        text-align: right;
        font-size: 14px;
        margin-bottom: 6px;
        span {
          cursor: pointer;
          color: #2d6cb4;
          text-transform: lowercase;
          &:hover {
            color: #f51449;
          }
        }
      }
      .footer-social {
        font-size: 14px;
        line-height: 16px;
        text-align: center;
        .text-left {
          text-align: center;
        }
      }
    }
  }
</style>
