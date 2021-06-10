<i18n>
{
  "ru": {
    "modalText": "С момента последней загрузки этой страницы прошло много времени. Обновите, чтобы увидеть актуальную версию.",
    "attention": "Обновите страницу",
    "refresh": "Обновить"
  },
  "en": {
    "modalText": "It has been a long time since this page was last uploaded. Please refresh to see the most current version.",
    "attention": "Refresh page",
    "refresh": "Refresh"
  }
}
</i18n>
<template>
  <div class="disconnect">
    <div @click="refreshPage()">
      <BaseModal
        ref="modalRef"
        class="custom-modal"
        :title="$t('attention')"
      >
        <div class="modal-wrapper">
          {{ $t("modalText") }}
        </div>
        <div slot="footer" class="text-right">
          <b-button class="btn-blue" @click="refreshPage()">{{ $t('refresh') }}</b-button>
        </div>
      </BaseModal>
    </div>
  </div>
</template>
<script>
import BaseModal from "./BaseModal.vue";

export default {
  name: "BaseDisconnect",
  components: {
    BaseModal
  },
  data() {
    return {
      disconnectDate: null,
      disconnectInterval: null
    }
  },
  mounted() {
    this.initDate();
    this.initDisconnectInterval();
    document.addEventListener(
      'visibilitychange', 
      () => this.handleVisibilityChange(),
      false
    );
  },
  destroyed() {
    document.removeEventListener('visibilitychange',() => this.handleVisibilityChange());
  },
  methods: {
    handleVisibilityChange() {
      if(document.visibilityState === 'visible') {
        this.disconnectCheckDate();
      }
    },
    initDate() {
      this.disconnectDate = new Date();
      sessionStorage.setItem('timeout', JSON.stringify(this.disconnectDate));
    },
    initDisconnectInterval() {
      this.disconnectInterval = setInterval(() => this.disconnectCheckDate(), 1800000);
    },
    disconnectCheckDate() {
      const dateNow = Date.now();
      const dateSaved = Date.parse(JSON.parse(sessionStorage.getItem('timeout')));

      const dateSubstract = dateNow - dateSaved;

      if(dateSubstract >= 43200000) {
        
        if(this.disconnectInterval && this.$refs.modalRef)
          this.showModal();

        clearInterval(this.disconnectInterval);
        this.disconnectInterval = null;
      }
    },
    hideModal() {
      this.$refs.modalRef.close();
    },
    showModal() {
      this.$refs.modalRef.show();
    },
    refreshPage() {
      this.hideModal();
      document.location.reload(true);
    }
  }
};
</script>
<style lang="scss" scoped>
.custom-modal {
  .modal-wrapper {
    padding: 10px 10px 20px 10px;
    font-size: 16px;
    color: #000;
  }
}
</style>
