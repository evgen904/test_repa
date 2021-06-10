<i18n>
{
  "ru": {
    "noOrder": "Нет счетов на оплату",
    "myBalance": "Всего средств",
    "afi": "Получить бонус 1000 ₽",
    "invoiceName": "Бронь №{id}",
    "invoicePrice": "внесите предоплату ",
    "topUpBalance":"Пополнить баланс",
    "header_invoices_list":"Счетов на оплату",
    "header_see_all":"Посмотреть все ({count})",
    "willEnter": "{price} поступит {date}",
    "precostBooking": "предоплата по брони №{id}",
    "totalFounds": "Всего средств"
  },
  "en": {
    "noOrder": "No invoices",
    "myBalance": "Total funds",
    "afi": "Get bonus 1000 ₽",
    "invoiceName": "Reservation №{id}",
    "invoicePrice": "make a prepayment ",
    "topUpBalance":"Top up balance",
    "header_invoices_list":"List of invoices",
    "header_see_all":"See all items ({count})",
    "willEnter": "{price} will enter {date}",
    "precostBooking": "precoast reservation №{id}",
    "totalFounds": "Total founds"
  }
}
</i18n>

<template>
  <div class="wallet">
    <BaseNavList direction="right">
      <!-- slot -->
      <a
        v-if="view != 'mobile'"
        slot="title"
        :href="`${baseLink}/cabinet/payments`"
        target="_blank"
        class="no-link sc-nav-list-block"
        style="display: flex; align-items: center;"
      >
        <span class="wallet-icon sc-header-icon-tmp sc-header-icon-wallet">
          <span v-if="data.invoices.cnt > 0" class="badge">{{
            data.invoices.cnt
          }}</span>
        </span>
        <span v-html="data.balance" />
      </a>
      <!-- slot -->

      <template v-if="data.invoices.cnt">
        <!-- <div v-if="data.invoices.cnt > 10" class="invoices-list">
          <span>{{ $t("header_invoices_list") }}</span>
          <span>{{ data.invoices.cnt }}</span>
        </div> -->
        <div>
          <template v-for="(elem, i) in data.invoices.list">
            <a
              v-if="i < 5"
              :key="i"
              :href="invoiceLink(elem)"
              target="_blank"
              class="no-link order"
            >
              <span class="order-name">
                {{ $t("invoiceName", { id: elem.order_id }) }}
              </span>
              <span class="order-price">
                {{ $t("invoicePrice") }} <span v-html="elem.amount_format" />
              </span>
            </a>
          </template>
        </div>
        <div v-if="data.invoices.cnt > 5" class="invoices-list-all">
          <a href="/cabinet/payments" class="btn-link">
            {{ $t("header_see_all", { count: data.invoices.cnt }) }}
          </a>
        </div>
        <!-- <template v-if="data.user_is_client >= 0 && data.user_is_owner == 0">
          <hr />
          <div>
            <a :href="`${baseLink}/afi`" class="no-link">
              {{ $t("afi") }}
            </a>
          </div>
        </template> -->
        <hr />
      </template>

      <template v-if="data.estimated && data.estimated.length > 0">
        <div>
          <template v-for="(estimate, i) in data.estimated">
            <a
              v-if="i < 5"
              :key="i"
              :href="`${baseLink}/cabinet/payments/#estimated`"
              target="_blank"
              class="no-link order"
            >
              <span
                class="order-name"
                v-html="
                  $t('willEnter', {
                    price: estimate.amount,
                    date: estimate.date_format,
                  })
                "
              />
              <div class="order-price">
                {{ $t("precostBooking", { id: estimate.id }) }}
              </div>
            </a>
          </template>
        </div>
        <div v-if="data.estimated.length > 5" class="estimated-list-all">
          <a :href="`${baseLink}/cabinet/payments/#estimated`" class="btn-link">
            {{ $t("header_see_all", { count: data.estimated.length }) }}
          </a>
        </div>
        <hr />
      </template>

      <template v-if="data.user_is_client > 0 || data.user_is_owner > 0">
        <div>
          <a :href="`${baseLink}/cabinet/payments`" class="count no-link">
            <span>{{ $t("totalFounds") }}</span>
            <span class="val" v-html="data.balance" />
          </a>
        </div>
      </template>

      <template v-if="data.user_is_client >= 0 && data.user_is_owner == 0">
        <hr />
        <div>
          <a :href="`${baseLink}/afi`" class="no-link">
            {{ $t("afi") }}
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
    view: {
      type: String,
    },
  },
  computed: {
    ...mapState("user", ["currency", "baseLink"]),
  },
  methods: {
    invoiceLink(el) {
      return (
        this.baseLink +
        (el?.order_id && el?.order_id > 0
          ? `/pay/${el.order_id}`
          : `/cabinet/payments/invoices/${el?.id}`)
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.wallet {
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
  &-balance {
    white-space: nowrap;
  }
  .order {
    display: flex;
    flex-direction: column;
    line-height: 1.3;
    &-name {
    }
    &-price {
      color: #717171;
    }
  }
}
.btn-up-balance {
  padding-top: 10px;
  padding-bottom: 4px;
}
.invoices-list {
  display: flex;
  justify-content: space-between;
  color: #717171;
  font-size: 14px;
  padding: 0 20px;
  margin-bottom: 6px;
}
.invoices-list-all {
  padding-top: 6px;
  margin-bottom: 10px;
}
</style>
