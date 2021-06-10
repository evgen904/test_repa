<template>
  <div v-if="owner" class="info-client">
    <div class="info-client--title">
      <span class="icon-wps-man"></span>
      <span class="id-client"> ID: {{ owner.owner_data.id }} </span>
      <a
        :href="`/admin/modules/users/admin_edit/id/${owner.owner_data.id}`"
        target="_blank"
        >{{ owner.owner_data.name }}</a
      >
    </div>
    <div v-if="owner.answer_stat" class="info-client--body">
      <p>
        {{ owner.answer_stat.handle_request }}
      </p>
      <p>
        {{ owner.answer_stat.response_time }}
      </p>
    </div>
    <div class="info-client--edit">
      <a
        class="btn btn-primary btn-price"
        :href="`/admin/modules/objects/admin_edit/id/${owner.object.id}/?mode=edit`"
        target="_blank"
      >
        <span class="icon-wps-pencil"></span>
        Изменить объект
      </a>
    </div>
    <div class="info-client--phone">
      <span v-for="(item, index) in owner.owner_data.phones" :key="index">
        {{ item.phone_parse }}
      </span>
    </div>
    <div class="info-client--path">
      <span>{{ pathObject }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailClientInfo",
  props: {
    owner: {
      type: Object,
      default: null
    },
    pathObject: {
      type: String,
      default: ''
    }
  },
};
</script>

<style lang="scss" scoped>
div.info-client {
  position: fixed;
  bottom: 10px;
  right: 10px;
  z-index: 10000;
  background-color: #f2dede;
  width: 320px;
  max-height: 90%;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 20px 20px 40px;
  color: #444444;
  &--title {
    margin-bottom: 15px;
    font-size: 19px;
    .icon-wps-man {
      font-size: 19px;
    }
    .id-client {
      font-weight: 500;
    }
    a:hover {
      color: #f51449;
    }
  }
  &--body {
    p {
      padding: 0;
      margin: 0 0 10px;
    }
  }
  &--edit {
    margin-bottom: 10px;
    .btn {
      .icon-wps-pencil {
        font-size: 14px;
        margin-right: 4px;
      }
      &:hover {
        color: #444444;
      }
    }
  }
  &--phone {
    margin-bottom: 20px;
  }
  &--phone,
  &--path {
    span {
      display: inline-block;
      vertical-align: top;
      background-color: #6fa759;
      padding: 5px 10px;
      font-size: 10px;
      line-height: 1;
      font-weight: 400;
      margin: 0 2px 2px 0;
      color: #fff;
      white-space: normal;
    }
  }
}
</style>
