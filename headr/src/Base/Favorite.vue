<i18n>
{
  "ru": {
    "favorite": "Избранное"
  },
  "en": {
    "favorite": "favorites"
  }
}
</i18n>
<template>
  <div class="favorite">
    <BaseNavList direction="right">
      <!-- slot -->
      <a
        v-if="view !== 'mobile'"
        slot="title"
        :href="`${this.baseLink}/cabinet/favorites`"
        class="no-link sc-nav-list-block"
        :aria-label="$t('favorite')"
      >
        <span class="sc-header-icon-tmp sc-header-icon-favorite"></span>
        <span class="title-btn">{{ favoriteTitle }}</span>
      </a>
      <div v-else>
        <a
          :href="`${this.baseLink}/cabinet/favorites`"
          class="count no-link"
          :aria-label="$t('favorite')"
        >
          <span>{{ $t("favorite") }}</span>
          <span class="val">{{ favorite }}</span>
        </a>
      </div>
      <!-- slot -->

      <template v-if="view !== 'mobile'">
        <div>
          <a :href="`${this.baseLink}/cabinet/favorites`" class="no-link" style="display: flex;">
            {{ $t("favorite") }}
            <span class="right-value">{{ favorite }}</span>
          </a>
        </div>
      </template>
    </BaseNavList>
  </div>
</template>

<script>
import BaseNavList from "../Base/BaseNavList.vue";
import { mapState } from "vuex";

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
    view: {
      type: String,
    },
  },
  computed: {
    ...mapState("user", ["baseLink"]),
    // checkFavorites() {
    //   return this.data?.objects?.favorites > 0 ? true : false;
    // },
    favorite() {
      return this.data?.objects?.favorites >= 0
        ? this.data.objects.favorites
        : 0;
    },
    favoriteTitle() {
      return this.data?.objects?.favorites > 0
        ? `${this.$t("favorite")}`
        : this.$t("favorite");
    },
  },
};
</script>

<style lang="scss" scoped>
.favorite {
  color: white;
  .icon-wps-heart {
    color: #a6a6a6;
  }
  .right-value {
    margin-left: auto;
    color: #a6a6a6;
  }
  .title-btn {
    white-space: nowrap;
    @media all and (max-width: 1120px) {
      display: none;
    }
  }
}
</style>
