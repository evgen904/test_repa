<template>
  <div class="header-wl-wrap">
    <BaseDisconnect />
    <template v-if="whitelabel">
      <Cian v-if="whitelabel.name === 'cian'" />
      <Grandtrain v-if="whitelabel.name === 'grandtrain'" />
    </template>
  </div>
</template>

<script>
import BaseDisconnect from "../Base/BaseDisconnect.vue";
import Cian from "./cian/index.vue";
import Grandtrain from "./grandtrain/index.vue";
import { mapState } from 'vuex'

export default {
  name: "HeaderWhiteLabel",
  components: {
    BaseDisconnect,
    Cian,
    Grandtrain
  },
  computed: {
    ...mapState("user", ["whitelabel"])
  }
};
</script>

<style lang="scss">
.header-wl-wrap {
  width: 100%;
  height: 100%;
}
</style>
