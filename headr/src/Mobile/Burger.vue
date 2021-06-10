<i18n>
{
  "ru": {
    "loginOrRegister": "Войти или зарегистрироваться"
  },
  "en": {
    "loginOrRegister": "Sign in or sign up"
  }
}
</i18n>
<template>
  <div class="collapse-menu">
    <div class="sc-header-navbar-nav">
      <div v-if="isAuth === false" class="nav-item">
        <a
          class="nav-link"
          target="_blank"
          @click="$parent.$refs.FormAuth.show('auth')"
        >
          <span class="ico-authorization"></span>{{ $t("loginOrRegister") }}
        </a>
      </div>
    </div>
    <Account
      v-model="modalHead"
      :data="userData"
      :is-auth="isAuth"
      view="mobile"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import Account from "../Base/Account.vue";

export default {
  name: "Burger",
  components: {
    Account,
  },
  computed: {
    ...mapState("user", ["userData", "isAuth"]),
  },
  watch: {
    modalHead: function (val) {
      this.$emit("input", val);
    },
  },
  data() {
    return {
      modalHead: null,
    };
  },
};
</script>

<style lang="scss" scoped>
.collapse-menu {
  .navbar-nav {
    width: 100%;
  }
  & > *:not(:first-child):not(:last-child) {
    border-bottom: 1px solid #626262;
  }
}
.sc-header-navbar-nav {
  border-top: 1px solid #626262;
  .nav-item {
    padding: 12px 25px;
    border-bottom: 1px solid #626262;
    .nav-link {
      display: inline-block;
      color: #ffffff;
      .ico-authorization {
        display: inline-block;
        vertical-align: sub;
        width: 20px;
        height: 20px;
        background-repeat: no-repeat;
        background-size: 240px;
        background-image: url("../assets/spr_header_2x.png");
        background-position: -100px 0;
        margin-right: 10px;
      }
    }
  }
}
::v-deep .sc-nav-list-title .sc-nav-list-block.account-user {
  padding: 10px 20px 0;
  width: 100%;
}
</style>
