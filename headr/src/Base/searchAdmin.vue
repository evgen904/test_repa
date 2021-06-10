<template>
  <div
    class="search-admin"
    :class="{ 'route-search': $route.name == 'Search' }"
  >
    <form
      action="/admin/modules/search/admin_search/"
      method="get"
      name="search-form"
      role="form"
      target="_blank"
    >
      <div>
        <div class="search-admin-form">
          <input
            name="user_query"
            placeholder="id/тел/mail ар-ля"
            title="id/тел/mail ар-ля"
            type="text"
            value=""
          />
          <span class="icon-wps-user"></span>
        </div>
        <div class="search-admin-form">
          <input
            name="object_query"
            placeholder="id/хэш синхр. объекта"
            title="id объекта"
            type="text"
            value=""
          />
          <span class="icon-wps-add-house"></span>
        </div>
        <div class="search-admin-form">
          <input
            name="hotel_query"
            placeholder="id отеля"
            title="id отеля"
            type="text"
            value=""
          />
          <span class="icon-wps-add-house"></span>
        </div>
        <div class="search-admin-form">
          <input
            name="order_query"
            placeholder="id заявки"
            title="id заявки"
            type="text"
            value=""
          />
          <span class="icon-wps-message"></span>
        </div>
      </div>
      <button>
        <img src="../assets/ico-search.svg" alt="" />
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "SearchAdmin",
};
</script>

<style lang="scss" scoped>
.search-admin {
  position: fixed;
  background-color: grey;
  margin-left: 40px;
  padding: 5px 5px 5px 10px;
  top: 80px;
  right: 20px;
  z-index: 10;
  &.route-search {
    top: 130px;
  }
  form {
    padding: 0;
    margin: 0;
    display: flex;
    width: 100%;
    .search-admin-form {
      display: flex;
      align-items: center;
      padding: 5px 0;
      margin-right: 20px;
      .icon-wps-user,
      .icon-wps-add-house,
      .icon-wps-message {
        font-size: 16px;
        color: #ffffff;
      }
    }
    input[type="text"] {
      padding: 0 10px;
      margin: 0 10px 0 0;
      outline-style: none;
      font-size: 14px;
      height: 32px;
    }
    button {
      padding: 0 20px;
      margin: 0;
      outline-style: none;
      background: rgba(255, 255, 255, 0.4);
      transition: 0.3s;
      border: none;
      border-radius: 3px;
      width: 60px;
      &:hover {
        background: rgba(255, 255, 255, 0.6);
      }
    }
  }
}
</style>
