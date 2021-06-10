<i18n>
{
  "ru": {
    "registration": "Регистрация",
    "namePlaceholder": "Введите имя",
    "placeholderPhone":"Введите номер телефона",
    "passwordWillPhoneNumber": "на номер телефона будет отправлен пароль",
    "iAgreeTo": "Я согласен на",
    "personalDataProcessing": "обработку персональных данных",
    "andAcceptTerms": "и принимаю условия",
    "userAgreement": "пользовательского соглашения",
    "buttonRegistration": "Зарегистрироваться"
  },
  "en": {
    "registration": "Join",
    "namePlaceholder": "enter a name",
    "placeholderPhone":"enter phone number",
    "passwordWillPhoneNumber": "a phone number will be dialed",
    "iAgreeTo": "I agree to ",
    "personalDataProcessing": "personal data processing",
    "andAcceptTerms": " and accept the conditions",
    "userAgreement": "the Terms of Use",
    "buttonRegistration": "Sign up"
  }
}
</i18n>

<template>
  <div class="registration-wrapp">
    <div class="auth-header-title-wrapp">
      <h5 class="auth-header-title">{{ $t("registration") }}</h5>
      <span class="close" @click="$emit('close')">&times;</span>
    </div>
    
    <Input 
      v-model.trim="nameValue"
      :placeholder="$t('namePlaceholder')"
      class="auth-header-form-input"
      :class="{
        'is-invalid': valid.name
      }"
      keyup="enter"
      @enter="$emit('onRegistration')"
    />
    <Input
      v-model.trim="phone"
      :is-valid="false"
      class="input-phone"
      :class="{ 'error' : textError.length }"
      :placeholder="$t('placeholderPhone')"
    />
    <div v-if="textError.length" class="field-error">
      <div v-for="(item, index) in textError" :key="index">
        {{ item }}
      </div>
    </div>
    <div class="field-hint">
      {{ $t("passwordWillPhoneNumber") }}
    </div>
    <b-form-checkbox v-model="termsValue" value="1">
      <span class="agree-to-wrapp">
        {{ $t("iAgreeTo") }}
        <a href="//sutochno.ru/rules/agreement">{{ $t("personalDataProcessing") }}</a>
        {{ $t("andAcceptTerms") }}
        <a href="//sutochno.ru/rules">{{ $t("userAgreement") }}</a>
      </span>
    </b-form-checkbox>
    <button
      type="button"
      class="btn btn-success w-100"
      @click="$emit('onRegistration')"
    >{{ $t("buttonRegistration") }}</button>
  </div>
</template>

<script>
// import inputPhones from "@sutochno/inputPhone";
import Input from "@sutochno/input";

export default {
  props: {
    name: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    },
    terms: {
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
      nameValue: this.name,
      phone: this.value,
      termsValue: this.terms
    }
  },
  components: {
    // inputPhones,
    Input
  },
  watch: {
    nameValue (name) {
      this.$emit('changeName', name)
    },
    phone (value) {
      this.$emit('changeValue', value)
    },
    termsValue (terms) {
      this.$emit('changeTerms', terms)
    }
  }
}
</script>

<style lang="scss" scoped>
  .registration-wrapp {
    .auth-header-title-wrapp {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
      .close {
        display: block;
        padding: 0 0 0 5px;
        color: #a6a6a6;
        font-size: 18px;
        cursor: pointer;
        &:hover {
          color: #666;
        }
      }
    }
    .input-phone {
      margin-bottom: 10px;
    }
    .field-hint {
      margin-bottom: 20px;
      color: #000;
      font-weight: 500;
      font-size: 14px;
    }
    .agree-to-wrapp {
      font-size: 14px;
      font-weight: 500;
    }
  }
</style>