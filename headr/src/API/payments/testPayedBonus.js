import HTTP from "../http-common";

/**
 * getNewNotices
 *
 * @module getNewNotices
 * @return {object} Promise
 */

export default (payload) => {
  let formData = new FormData();
  formData.append("serviceName", payload.serviceName || "");

  return HTTP.post("json/payments/testPayedBonus", formData, {
    headers: {
      "api-version": String(null), // Если указать версию, то будет минимум данных
    },
  });
};
