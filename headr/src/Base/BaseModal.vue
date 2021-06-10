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
  <transition name="base-modal--fade">
    <!-- <div class="base-modal-wrap"> -->
    <div v-if="visible" class="base-modal">
      <div class="base-modal-wrap">
        <div class="base-modal-header">
          <div class="base-modal-close" @click="close()"></div>
          {{ title }}
          <div
            v-if="
              !!this.$slots['side-action'] || !!this.$scopedSlots['side-action']
            "
            class="base-modal-side-action"
          >
            <slot name="side-action"></slot>
          </div>
        </div>
        <div
          v-if="!!this.$slots['head'] || !!this.$scopedSlots['head']"
          class="base-modal-head"
        >
          <slot name="head"></slot>
        </div>
        <div class="base-modal-body">
          <slot></slot>
        </div>
        <div
          v-if="!!this.$slots['footer'] || !!this.$scopedSlots['footer']"
          class="base-modal-footer"
        >
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
    <!-- </div> -->
  </transition>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "BaseModal",
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      visible: false,
    };
  },
  watch: {
    "$attrs.value": function (value) {
      this.visible = Boolean(value);
      if (this.visible) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    },
  },
  computed: {
    ...mapState({
      viewPort: (state) => state.user.viewPort,
    }),
  },
  beforeDestroy() {
    // Возвращаем скрол в случае скрытия модалки путем выгрузки компонента
    document.body.style.overflow = "";
  },
  methods: {
    show() {
      this.visible = true;
      document.body.style.overflow = "hidden";
      this.$emit("show");
      this.$emit("input", this.visible);
    },
    close() {
      this.visible = false;
      document.body.style.overflow = "";
      this.$emit("close");
      this.$emit("input", this.visible);
    },
    toggle() {
      this.visible ? this.close() : this.show();
    },
  },
};
</script>
<style lang="scss" scoped>
.base-modal--fade-enter-active,
.base-modal--fade-leave-active {
  transform: translateX(0%);
  transition: transform 0.35s ease;
}
.base-modal--fade-enter,
.base-modal--fade-leave-to {
  transform: translateX(100%);
}
.base-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 200;
  overflow: auto;

  -webkit-overflow-scrolling: touch;

  background-color: white;

  display: flex;
  flex-direction: column;
  overflow: hidden;

  &-wrap {
    overflow: auto;
    max-height: 100%;
    // max-height: 100vh;
  }
  &-header {
    height: 50px;
    text-align: center;
    font-size: 17px;
    line-height: 50px;
    background-color: #444444;
    color: white;
    position: sticky;
    top: 0;
    z-index: 201;
  }
  &-top {
    border-bottom: 1px solid #dee2e6;
    position: sticky;
    top: 50px;
    left: 0;
    right: 0;
    background: #fff;
    padding: 10px;
    z-index: 150;
  }
  &-footer {
    border-top: 1px solid #dee2e6;
    position: sticky;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    padding: 10px;
    z-index: 1;
  }
  &-body {
    overflow: auto;
    overflow-x: hidden;
    color: #444444;
    min-height: 350px;
    .mobile & {
      height: 100% !important;
      height: 100vh !important; /* Fallback for browsers that do not support Custom Properties */
      height: calc(var(--vh, 1vh) * 100) !important;
      max-height: calc(100vh - 50px);
    }
  }
  &-close {
    position: absolute;
    font-size: 64px;
    line-height: 40px;
    width: 40px;
    height: 50px;
    transform: scale(0.7);
    cursor: pointer;
    &::before,
    &::after {
      content: "";
      background-color: white;
      width: 4px;
      height: 20px;
      display: inline-block;
    }
    &::before {
      transform: rotate(45deg) translate(-6px, -10px);
      transform-origin: 100% 50%;
    }
    &::after {
      transform: rotate(-45deg);
      transform-origin: 0% 50%;
    }
  }
}
.desktop {
  .base-modal {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    display: flex;
    justify-content: center;
    align-items: center;

    background: rgba(0, 0, 0, 0.25);
    &-wrap {
      background-color: white;
      overflow: auto;
      border: 1px solid rgba(0, 0, 0, 0.2);
      min-width: 630px;
      max-width: 750px;
      box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
      max-height: calc(100vh - 80px);
    }
    &-body {
      min-height: 50px;
      max-height: calc(100vh - 450px);
      &::-webkit-scrollbar {
        width: 6px;
        background: transparent;
      }
      &::-webkit-scrollbar-thumb {
        background: #b6b6b6;
        border-radius: 1px;
      }
      &::-webkit-scrollbar-thumb:hover {
        background: #787878;
      }
    }
    &-header {
      color: #444444;
      background: #fff;
      text-align: left;
      text-indent: 10px;
    }

    &-close {
      right: 0;
      &::before,
      &::after {
        content: "";
        background-color: black;
        width: 1px;
        height: 30px;
        display: inline-block;
      }
      &::before {
        transform: rotate(45deg) translate(-2px, -2px);
        transform-origin: 100% 50%;
      }
      &::after {
        transform: rotate(-45deg) translate(0px, -3px);
        transform-origin: 0% 50%;
      }
    }
  }
  .base-modal--fade-enter-active,
  .base-modal--fade-leave-active {
    opacity: 1;
    transition: opacity 0.25s ease;
  }
  .base-modal--fade-enter,
  .base-modal--fade-leave-to {
    opacity: 0;
  }
}
// .desktop {
//   .base-modal {
//     position: fixed;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     overflow-x: hidden;
//     border: 1px solid rgba(0, 0, 0, 0.2);
//     box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5), 0 0 0 1000px rgba(0, 0, 0, 0.25);
//     min-width: 630px;
//     &-wrap {
//       position: fixed;
//       top: 0;
//       right: 0;
//       bottom: 0;
//       left: 0;
//       background: rgba(0, 0, 0, 0.25);
//     }
//     &-header {
//       color: #444444;
//       background: #fff;
//       text-align: left;
//       text-indent: 10px;
//     }

//     &-close {
//       right: 0;
//       &::before,
//       &::after {
//         content: "";
//         background-color: black;
//         width: 1px;
//         height: 30px;
//         display: inline-block;
//       }
//       &::before {
//         transform: rotate(45deg) translate(-2px, -2px);
//         transform-origin: 100% 50%;
//       }
//       &::after {
//         transform: rotate(-45deg) translate(0px, -3px);
//         transform-origin: 0% 50%;
//       }
//     }
//   }
//   .base-modal--fade-enter-active,
//   .base-modal--fade-leave-active {
//     opacity: 1;
//     transition: opacity 0.25s ease;
//   }
//   .base-modal--fade-enter,
//   .base-modal--fade-leave-to {
//     opacity: 0;
//   }
// }
</style>
