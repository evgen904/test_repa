<i18n>
{
  "en": {
  },
  "ru": {
  }
}
</i18n>
<template>
  <div ref="modalNotice" class="modal-notice">
    <Modal
      id="BootstrapModalWindow"
      v-model="noteGiveReview"
      class="give-review"
      :title="title"
      :min-width="'630px'"
      :max-width="'750px'"
      @close="readNotice()"
    >
      <template v-if="notices && notices[0] && modal">
        <div slot="head" v-html="modal.header"></div>
        <div class="modal-body" v-html="modal.text"></div>
        <div slot="footer" v-html="modal.footer"></div>
      </template>
    </Modal>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Polling } from "../API/index.js";
import Modal from "@sutochno/modal";
import VueCookies from "vue-cookies";

export default {
  name: "ModalNotice",
  components: {
    Modal,
  },
  data() {
    return {
      notices: [],
      noteGiveReview: false,
      modal: null,
    };
  },
  computed: {
    ...mapState("user", ["userData", "isAuth"]),
    title() {
      return this.modal?.title || "";
    },
  },
  watch: {
    isAuth(val) {
      if (val) {
        this.init();
      }
    },
  },
  methods: {
    init() {
      Polling.getNewNotices().then((response) => {
        if (response?.data?.data?.notices?.length) {
          this.notices = response.data.data.notices;
          this.noteGiveReview = true;
          if (this.notices[0].type == "modal") {
            let params = JSON.parse(this.notices[0].params);
            if (params) {
              params.id = this.notices[0].id;
              // eslint-disable-next-line prettier/prettier
              const 
                // eslint-disable-next-line prettier/prettier
                // все элементы перед этим пойдут в header окна
                HEADER = "<!--[/HEADER]-->",
                //
                // все элементы после этого пойдут в footer окна
                FOOTER = "<!--[FOOTER]-->",
                // класс элемента в окне, при клике на который окно будет считаться прочитанным
                READ = "jsn-button-mark-read",
                //
                // класс к любому элементу в окне, если нужно чтобы оно считалось непрочитанным
                DONT_READ = "jsn-dont-mark-read",
                //
                // класс к элементу, чтобы при закрытии окна считать его непрочитанным и
                // отложить следующий показ на время указанное в атрибуте data-delay элемента
                DELAY = "jsn-button-mark-close-delay";
              //
              // header
              if (!!!params.title && params.text.indexOf(HEADER) > -1) {
                params.header = params.text.substring(
                  0,
                  params.text.indexOf(HEADER)
                );
                params.text = params.text.substring(
                  params.text.indexOf(HEADER) + HEADER.length,
                  params.text.length
                );
              }
              //
              //footer
              if (params.text.indexOf(FOOTER) > -1) {
                params.footer = params.text.substring(
                  params.text.indexOf(FOOTER),
                  params.text.length
                );
                params.text = params.text.substring(
                  0,
                  params.text.indexOf(FOOTER)
                );
              }
              //
              // поиск классов в тексте
              const FULL_TEXT = `${
                params.header + params.text + params.footer
              }`;
              params.read = !FULL_TEXT.includes(DONT_READ);
              this.modal = params;
              this.$nextTick(() => {
                const MODAL = this.$refs.modalNotice;
                //
                // поиск времени для куки
                this.modal.delay =
                  MODAL.getElementsByClassName(DELAY)[0]?.getAttribute(
                    "data-delay"
                  ) || 0;
                if (this.modal.delay > 0) this.modal.read = true;
                //
                // поиск элементов по клику на которые будем отправлять запрос о прочтении
                this.$refs.modalNotice
                  .getElementsByClassName(READ)
                  ?.forEach((e) => (e.onclick = () => this.readNotice()));
              });
            }
          }
        }
      });
    },
    parseData(value) {
      let text = value;
      text = text.replace(/^=/, "");
      text = decodeURIComponent(text);
      text = text.replace(/\\'/g, "'");
      return JSON.parse(text);
    },
    readNotice() {
      if (this.modal?.read) {
        Polling.setNoticeRead(this.modal.id)
          .then((response) => {
            if (response.data.success) {
              const { host } = window.location;
              let newHost = host;
              newHost = newHost.split(".");
              if (newHost.length >= 3) {
                newHost = newHost.slice(1);
              }
              newHost = newHost.join(".");
              VueCookies.set(
                `note_delay['${this.modal.id}']`,
                this.modal.id,
                `${this.modal.delay}h`,
                "/",
                `.${newHost}`
              );
            } else {
              console.log("setNoticeRead -", "Ajax error:", "success: false");
            }
          })
          .catch((error) => {
            console.log("setNoticeRead -", "Ajax error:", error);
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-body {
  padding: 20px;
  .desktop & {
    padding-top: 0;
    padding-bottom: 0;
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
::v-deep .sc-modal-head {
  .modal-review-content {
    @media (max-width: 767px) {
      padding-top: 20px;
    }
  }
}
</style>
