<i18n>
{
  "ru": {
    "orderMore": "Подробнее"
  },
  "en": {
    "orderMore": "More details"
  }
}
</i18n>
<template>
  <div class="sc-nav-list" :class="{ 'sc-nav-list__left': direction == 'left' }" @mouseenter="hoverList(true)" @mouseleave="hoverList(false)">
    <div class="sc-nav-list-title">
      <slot
        v-if="!!this.$slots['title'] || !!this.$scopedSlots['title']"
        name="title"
      ></slot>
      <template v-else>{{ title }}</template>
    </div>
    <div class="sc-nav-list-body">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "BaseNavList",
  props: {
    title: {
      type: String,
      default: "",
    },
    direction: {
      type: String,
      default: "right",
    },
  },
  methods: {
    hoverList(val) {
      this.$emit('headerNavHover', val)
    }
  }
};
</script>
<style lang="scss">
// .base-modal--fade-enter-active,
// .base-modal--fade-leave-active {
//   transform: translateX(0%);
//   transition: transform 0.35s ease;
// }
// .base-modal--fade-enter,
// .base-modal--fade-leave-to {
//   transform: translateX(100%);
// }
.sc-nav-list {
  height: 100%;
  position: relative;
  &__left {
    .sc-nav-list-body {
      right: 0;
    }
  }
  &:active,
  &:hover {
    background-color: #666;
    .sc-nav-list-body {
      display: block;
    }
  }
  &-title {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    // padding: 0 8px;
    cursor: pointer;

    .sc-nav-list-block {
      display: flex;
      align-items: center;
      padding: 0 8px;
      height: 100%;
    }
  }
  &-body {
    position: absolute;
    display: none;

    // z-index: 51;
    z-index: 10000;
    background: #333333;
    border: 1px solid #626262;
    padding: 8px 0;
    min-width: 250px;
    @media all and (min-width: 960px) {
      overflow: auto;
      // max-height: 640px;
    }
    &:hover {
      display: block;
    }
    > div:not(.invoices-list) {
      & > a,
      & > span {
        color: #ffffff;
        text-decoration: none;
        padding: 10px 20px;
        display: flex;
        cursor: pointer;
        white-space: nowrap;
        @media all and (max-width: 960px) {
          padding: 7px 20px;
        }
        &:hover {
          background: #5d5d5d;
        }
        &.count {
          display: flex;
          justify-content: space-between;
          .info {
            & > span {
              &:first-child {
                color: #fff;
              }
              display: block;
            }
          }
          .val {
            color: #717171;
            margin-left: 10px;
          }
        }
        &.gray {
          color: #717171;
        }
      }
      .btn-transparent {
        &:hover,
        &:focus,
        &:active {
          color: #ffffff;
          background: transparent;
          box-shadow: none !important;
        }
      }
      .btn-link {
          text-align: center;
          border: 1px solid #d8d8d8;
          margin: 0 20px;
          padding: 6px 12px;
          font-size: 14px;
          line-height: 16px;
          border-radius: 3px;
          background: none;
          &:hover {
            color: #ffffff;
            text-decoration: none;
            border-color: #b2b2b2;
          }
        }
    }
    > hr {
      margin: 10px 0;
      border-top: 1px solid #626262;
      @media all and (max-width: 960px) {
        margin: 5px 0;
      }
    }
    &:empty {
      display: none !important;
    }
  }

  // Этот код нужно выкинуть после доработки шапки на мобиле
  .mobile & {
    background-color: transparent;
    &-title {
      justify-content: left;
    }
    &-body {
      background: transparent;
      position: relative;
      display: block;
      border-width: 0;
      padding: 5px 0;
    }
  }
}
</style>
