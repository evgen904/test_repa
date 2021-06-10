import HTTP from "./http-common";

/**
 * clearSocialAccountData
 *
 * @module clearSocialAccountData
 * @return {object} Promise
 */

export default () =>
  HTTP.post("json/users/clearSocialAccountData/", {
    headers: {
      "api-version": String(null),
    },
    cache: false,
  });
