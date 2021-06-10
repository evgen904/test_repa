export default function (userData) {
  var guestStatus = "new";

  if (userData.user_is_client > 0) {
    if (userData.user_is_client_loyal > 0) {
      guestStatus = "loyal";
    } else {
      guestStatus = "returning";
    }
  }

  return guestStatus;
}
