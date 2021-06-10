import HTTP from "../http-common";

/**
 * getNewNotices
 *
 * @module getNewNotices
 * @return {object} Promise
 */

export default () =>
  HTTP.get("json/noticer/getNewNotices", {
    headers: {
      "api-version": String(null),
    },
    cache: false,
  });