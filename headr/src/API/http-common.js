import axios from "axios";
import {
  cacheAdapterEnhancer,
  throttleAdapterEnhancer,
  retryAdapterEnhancer,
} from "axios-extensions";
import VueCookies from "vue-cookies";



//проверка, является ли сайт партнерским (isWhiteLabel)
const IS_WHITE_LABEL = typeof window !== "undefined" && VueCookies.get("whiteLabel");

// проверяем на VK приложение для замены токена
let isVkApp = false;
if (typeof location === "object" && location.search !== "") {
  isVkApp = location.search.includes("vk_app_id");
}

let TOKEN = "Hy6U3z61fflbgT2yJ/VdlQ2719"

if(
  process &&
  process.env &&
  process.env.NODE_ENV &&
  process.env.NODE_ENV === 'production'
) {
  if(isVkApp) {
    TOKEN = "c8DbUrMUVJDHEgBbLxkpEg289958783"
  } else if (IS_WHITE_LABEL) {
    TOKEN = "QeVopIr1QKyCIBK53/5gZQ294283465"
  }
}

// Common Base Instance
export default axios.create({
  adapter: throttleAdapterEnhancer(
    cacheAdapterEnhancer(retryAdapterEnhancer(axios.defaults.adapter))
  ),
  baseURL: "/api",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "api-version": "1.7",
    platform: "js",
    token: TOKEN,
  },
});
