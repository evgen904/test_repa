import HTTP from "./http-common";

/**
 * Получение списка валют
 *
 * @module getCurrencies
 * @return {object} Promise
 */

export default (url) =>
  HTTP.post(`${url}/json/currencies/getList`);
