import getCurrencies from "./getCurrencies";
import setCurrency from "./setCurrency";
import getUserData from "./getUserData";
import auth from "./auth";
import checkEnoughContacts from "./checkEnoughContacts";
import initSessionDomain from "./initSessionDomain";
import addMobileToNotAuthUser from "./addMobileToNotAuthUser";
import addUserToGroupDisabledNotifications from "./addUserToGroupDisabledNotifications";
import clearSocialAccountData from "./clearSocialAccountData";
import Polling from "./polling"
import Payments from "./payments"
import HTTP from "./http-common";
import addContact from "./addContact";
import requestApproveContact from "./requestApproveContact";

/**
 * Работа с запросами приложения
 *
 * @module Application
 */
export default {
  HTTP,
  getCurrencies,
  setCurrency,
  getUserData,
  checkEnoughContacts,
  initSessionDomain,
  addMobileToNotAuthUser,
  addUserToGroupDisabledNotifications,
  clearSocialAccountData,
  auth,
  addContact,
  requestApproveContact
};

export {
  Polling,
  Payments
}
