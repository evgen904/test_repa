import HTTP from "./http-common";

export default (formData) => {
  return HTTP.post("/json/users/requestApproveContact", formData)
}
