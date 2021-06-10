import getGuestStatus from "./getGuestStatus";
import getOwnerStatus from "./getOwnerStatus";


export default function (userData) {
  if (userData.user == undefined) {
    ga('set', "dimension8", "unauthorized");
  } else {
    ga('set', "userId", userData.user.id);
    ga('set', "dimension8", "authorized");

    ga('set', "dimension9", userData.user_is_owner > 0 ? "owner" : "guest");
    ga('set', "dimension11", getGuestStatus(userData));

    if (userData.user_is_owner > 0) {
      ga('set', "dimension10", getOwnerStatus(userData));
    }
  }
}
