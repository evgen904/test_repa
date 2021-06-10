import HTTP from "./http-common";

/**
 * Получение данных о пользователе
 *
 * @module getUserData
 * @return {object} Promise
 */

export default (url, params) =>
  HTTP.get(`${url}json/users/getUserData`, {
    headers: {
      "api-version": String(null), // Если указать версию, то будет минимум данных
    },
    params,
    cache: false,
  });
