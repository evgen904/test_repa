
 import HTTP from "./http-common";

 /**
  * Установка валюты
  *
  * @module setCurrency
  * @return {object} Promise
  */

 export default (id) => {
  let formData = new FormData();
  formData.append("id", id);
  return HTTP.post("/json/currencies/setCurrency", formData)
}
