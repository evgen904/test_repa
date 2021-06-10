export default function (userData) {
  var ownerStatus = "";
  if (userData.user_is_superhost) {
    ownerStatus += " " + "superhost";
  }
  if (userData.user_is_newbie) {
    ownerStatus += " " + "newbie";
  }
  ownerStatus =
    ownerStatus.trim().length === 0 ? "ordinary" : ownerStatus.trim();

  return ownerStatus;
}
