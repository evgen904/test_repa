import HTTP from "./http-common";

/**
 * checkEnoughContacts
 *
 * @module checkEnoughContacts
 * @return {object} Promise
 */

export default () =>
  HTTP.post("json/users/checkEnoughContacts/", {
    headers: {
      "api-version": String(null),
    },
    cache: false,
  });
