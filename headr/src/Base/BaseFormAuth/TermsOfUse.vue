<i18n>
{
  "ru": {
    "userAgreementText":"Пользовательское соглашение",
    "terms-error":"Чтобы зарегистрироваться на сайте, нужно принять условия",
    "terms-error-link":"пользовательского соглашения",
    "doNotAccept":"Не принимаю",
    "iAccept":"Принимаю"
  },
  "en": {
    "userAgreementText":"Terms of use",
    "terms-error":"To register on the site, you must accept the conditions",
    "terms-error-link":"user agreement",
    "doNotAccept":"Do not accept",
    "iAccept":"I accept"
  }
}
</i18n>

<template>
  <div class="terms-of-use-wrapp">
    <div class="auth-header-title-wrapp">
      <h5 class="text-center auth-header-title">{{ $t("userAgreementText") }}</h5>
      <span class="close" @click="$emit('close')">&times;</span>
    </div>
    {{ $t("terms-error") }} <a href="//sutochno.ru/rules">{{ $t("terms-error-link") }}</a>
    <div class="btn-footer text-center">
      <b-button type="button" class="btn btn-white" @click="$emit('changeState', 'registration')">
        {{ $t("doNotAccept") }}
      </b-button>
      <button type="button" class="btn btn-success" @click="$emit('iAccept')">
        {{ $t("iAccept") }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseFormTermsOfUse',
  props: {
    state: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .terms-of-use-wrapp {
    .auth-header-title-wrapp {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
</style>
