<i18n>
{
  "en": {
    "ok": "Okey"
  },
  "ru": {
    "ok": "Понятно"
  }
}
</i18n>
<template>
  <div class="modal-bonus" v-if="modalData">
    <BaseModal 
      ref="bonusModal"
      v-model="bonusView" 
      class="modal-bonus"
      :title="modalData && modalData.bonus_title ? modalData.bonus_title : ''"
      @close="closeBonus"
    >
      <div class="modal-bonus__body">
        <div v-html="modalData.bonus_text" class="modal-body"></div>
        <div class="modal-footer">
          <button class="button button_blue"  @click="closeBonus">{{ $t('ok') }}</button>
        </div>
      </div>
    </BaseModal>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { Payments } from "../API/index.js";
import BaseModal from '../Base/BaseModal.vue';


export default {
  name: "ModalBonus",
  props: {
    bonus: {
      default: null
    }
  },
  components: {
    BaseModal
  },
  data() {
    return {
      bonusView: false,
      modalData: null
    };
  },
  watch: {
    isAuth(val) {
      if (val) {
        this.init();
      }
    },
  },
  computed: {
    ...mapState("user", ["userData", "isAuth"])
  },
  methods: {
    ...mapActions("user", ["loadUserData", "initSessionDomain"]),
    init() {
      Payments.testPayedBonus({
        serviceName: this.bonus
      })
        .then(res => {
          const data = res.data.data;
          this.modalData = data;
          setTimeout(() => {
            this.bonusView = true;
            this.$refs.bonusModal.show();
            if(data.bonus === 1){
              this.loadUserData()
                .then(() => {
                  if (!this.isAuth) {
                    this.initSessionDomain();
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          }, 0);
        })
    },
    closeBonus() {
      this.bonusView = false;
      let query = Object.assign({}, this.$route.query);
      if(query.bonus) {
        history.replaceState(null, document.title, location.pathname)
      }
      this.$emit("bonus", null);
    }
  }
};
</script>

<style lang="scss">
.desktop .modal-bonus{
  .base-modal-wrap{
    min-width: auto !important;
  }

  .base-modal-header {
    padding: 0 40px;
    display: grid;
    justify-items: center;
    overflow: hidden; 
  }

  .modal{
    &-body{
      padding: 0 20px 20px; 
    }
  }
}
</style>

<style lang="scss" scoped>
p {
  margin: 0;
}
.modal {
  &-header {
    padding-top: 0;
    padding-bottom: 0;
    border: none;
    position: relative;
    min-height: 43px;
  }
  &-body {
    position: relative;
    padding: 20px;
  }
  &-footer {
    display: grid;
    justify-items: center;
    border: none;
    padding: 0 20px 20px;
    z-index: 9999 !important;
  }
}
.give-review {
  &__body {
  }
  ::v-deep {
    p {
      margin: 0 0 10.5px;
    }
    .text-center {
      text-align: center;
    }
    .star {
      display: inline-block;
      background-size: contain !important;
      background-position: 0 0 !important;
      opacity: 0.2;
      &-full {
        background-image: url("../assets/big-star.svg") !important;
      }
      &-empty {
        background-image: url("../assets/big-star-stroke.svg") !important;
      }
    }
    .modal-review-content {
      // margin-bottom: 0 !important;
    }
    .primary-title {
      font-size: 22px;
      line-height: 26px;
    }
    .visible-inline-block {
      display: inline-block !important;
    }
    .rating-list {
      margin: 0;
      padding: 0;
      list-style: none;
      display: block;
      overflow: hidden;
    }
  }
}
</style>
