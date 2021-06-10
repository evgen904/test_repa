<i18n>
{
  "en": {
    "faq": "F.A.Q.",
    "help": "Help",
    "support": "Support",
    "text_messages_from_administration":"Support messages"
  },
  "ru": {
    "faq": "Вопросы и ответы",
    "help": "Помощь",
    "support": "Служба поддержки",
    "text_messages_from_administration":"Сообщения от службы поддержки"
  }
}
</i18n>
<template>
  <div class="help">
    <BaseNavList direction="left">
      <!-- slot -->
      <a
        slot="title"
        href="tel:88004448049"
        class="no-link sc-nav-list-block"
      >
        <span class="title-btn">8 800 444 8049</span>
      </a>
      <!-- slot -->

      <div>
        <a
          :href="`${this.baseLink}/help/${
            isAuth && data.user_is_owner > 0 ? 'arendodateli' : 'gosti'
          }`"
          target="_blank"
          class="no-link"
        >
          {{ $t("faq") }}
        </a>
      </div>
      <div>
        <a
          :href="`${this.baseLink}/about/feedback`"
          target="_blank"
          class="no-link"
        >
          {{ $t("support") }}
        </a>
      </div>
      <div v-if="isAuth">
        <a
          :href="`${this.baseLink}/cabinet/notices?filter[tp]=admin`"
          target="_blank"
          class="no-link count"
        >
          <span>{{ $t("text_messages_from_administration") }}</span>
          <span v-if="adminMessages" class="val">
            {{ data.messages.modules.messages.new }}
          </span>
        </a>
      </div>
    </BaseNavList>
  </div>
</template>

<script>
import BaseNavList from "../Base/BaseNavList.vue";
import { mapState, mapGetters } from "vuex";

export default {
  components: {
    BaseNavList,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
    isAuth: {
      type: Boolean,
    },
  },
  computed: {
    ...mapState("user", ["baseLink", "app"]),
    adminMessages() {
      return this.data?.messages?.modules?.messages?.new > 0;
    },
  },
};
</script>

<style lang="scss" scoped>
.help {
  color: white;
  &-icon {
    position: relative;
    .badge {
      background: #f51449;
      font-size: 13px;
      line-height: 1;
      color: #fff;
      border-radius: 9px;
      padding: 2px 5px 3px;
      min-width: 18px;
      height: 18px;
      overflow: hidden;
      text-align: center;
      vertical-align: middle;
      display: inline-block;
      text-indent: 0;
      position: absolute;
      top: -7px;
      right: -10px;
    }
  }
  .icon-wps-question {
    font-size: 20px;
    color: #a6a6a6;
    margin-right: 6px;
  }
}
</style>
