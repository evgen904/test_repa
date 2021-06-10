
export default function () {
  if (!window.ga || !window.ga.getAll) {
    return false;
  }
  ga('set', "dimension16", window.ga.getAll()[0].get("clientId"));
}
