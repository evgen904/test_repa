import HTTP from "./http-common";

/**
 * initSessionDomain
 *
 * @module initSessionDomain
 * @return {object} Promise
 */

export default (url) => {
  let formData = new FormData();
  let friendInput = document.querySelector('#jsn-friend-id')

  if (friendInput) {
    formData.append("friend", friendInput.value);
  }

  return HTTP.post(`${url}json/users/initSessionDomain/`, formData, {
    headers: {
      "api-version": String(null),
    },
    cache: false,
  });
}
