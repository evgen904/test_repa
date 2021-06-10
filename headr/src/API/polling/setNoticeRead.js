import HTTP from "../http-common";

/**
 * setNoticeRead
 *
 * @module setNoticeRead
 * @return {object} Promise
 */

export default (note_id = null) => {
  let formData = new FormData();
  formData.append("note_id", note_id);
  HTTP.post("json/noticer/setNoticeRead", formData, {
    headers: {
      "api-version": String(null),
    },
    cache: false,
  });
};