import HTTP from "./http-common";

/**
 * Авторизация пользователя
 *
 * @module auth
 * @param {object} payload Информация для входа
 * @param {string} payload.name Имя
 * @param {string} payload.value Номер телефона
 * @param {string} payload.password Номер телефона
 * @param {boolean} payload.persistent [n=0] Запомнить?
 * @param {string} payload.status [n="auth-login"] ("auth-registration" - регистрация, "auth-login" - авторизация )
 * @param {boolean} payload.forgot [n=0] Забыл пароль?
 * @param {boolean} payload.terms [n=0] Принял правила?
 * @return {object} Promise
 * @example
 *   auth({ value, password })
 */
export default (payload) => {
  let formData = new FormData();
  formData.append("name", payload.name || "");
  formData.append("value", payload.value);
  formData.append("password", payload.password || "");
  formData.append("persistent", payload.persistent || 0);
  formData.append("terms", payload.terms || 0);
  formData.append("forgot", payload.forgot || 0);
  formData.append("status", payload.status || "auth-login");
  if(!payload.isEmail) {
    formData.append("transport_notice", "sms");
  }
  // status: auth-registration
  return HTTP.post("json/users/auth", formData, {
    headers: {
      "api-version": String(null), // Если указать версию, то будет минимум данных
    },
  });
};
