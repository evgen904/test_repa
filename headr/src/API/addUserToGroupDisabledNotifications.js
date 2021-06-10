import HTTP from "./http-common";

/**
 * Добавить пользователя в группу "Отключены уведомления"
 *
 * @module addUserToGroupDisableNotifications
 * @param {boolean} $enabled - вкл/выкл
 * @access admin
 * @return {Array}
 */

export default (enabled = false) =>{
  let formData = new FormData();
  formData.append("enabled", enabled)
  return HTTP.post("json/users/addUserToGroupDisabledNotifications", formData, {
    headers: {
      "api-version": String(null),
    },
    cache: false,
  });
}
