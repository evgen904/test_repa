import HTTP from "./http-common";

/**
 * addMobileToNotAuthUser
 *
 * @module addMobileToNotAuthUser
 * @return {object} Promise
 */

export default (formData) =>
  HTTP.post("json/users/addMobileToNotAuthUser/", formData, {
    headers: {
      "api-version": String(null),
    },
    cache: false,
  });
