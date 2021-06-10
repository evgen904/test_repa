import API from "./API/";
import gaClientID from "./GA/gaClientID";
import gaCreateUser from "./GA/gaCreateUser";
import gaPageView from "./GA/gaPageView";
import Vue from "vue";
import VueCookies from "vue-cookies";

// import { TMDL } from './utils/tagManagerDataLayer';

// initial state
const state = () => ({
  userData: {},
  isAuth: null,
  // items: [],
  viewPort: null,
  screenWidth: null,
  currency: {
    id: 1,
    title: "RUB",
  },
  currenciesList: null,
  dataSocialNetwork: null,
  location: null,
  baseLink: '//sutochno.ru',
  app: true,
  auth: {
    isAuth: null,
    token: null,
    data: null
  },
  isVkApp: false,
  authState: "",
  vkAppInfo: {},
  pageType: null,
  envBaseUrl: "",
  isDocumentHidden: false,
  whitelabel: null
});

// getters
const getters = {
  currenciesList: (state) => {
    if (state.currenciesList) {
      return state.currenciesList;
    }
  },
  auth:() => {
    const IA_COOKIE = VueCookies.get("_ia_");
    const ia = IA_COOKIE && IA_COOKIE.includes("1-", 0) ? IA_COOKIE : null;
    let decodeIa = null;
    if(ia)
      decodeIa = JSON.parse(window.atob(ia.replace('1-', '')))
    return {
      isAuth: ia
        ? true
        : false,
      token: ia
        ? ia
        : null,
      data: decodeIa
    }
  },
  getPermission: (state) => (permission) => {
    //state.userData?.user?.permissions?.length - на такой вид иногда ругается webpack, т.к. не может прочесть
    if (state.userData.user && permission && state.userData.user.permissions && state.userData.user.permissions.length > 0){
      return state.userData.user.permissions.includes(permission)
    }else{
      return false
    }
  }
};

// actions
const actions = {
  loadUserData({ state, commit }, location) {
    commit('setAuth')
    return API.getUserData(state.envBaseUrl, location ? location : {})
      .then((response) => {
        if (response.data && response.data.data) {
          if (!!!response.is_auth){
            // TMDL.initUserData(response)
            // document.dispatchEvent("online-chat")
          }
          commit("setUserData", response.data.data);
          gaCreateUser(response.data.data);
          gaClientID(response.data.data);
          gaPageView(state.pageType);
          const IA_COOKIE = VueCookies.get("_ia_");

          if (!response.data.data.user && IA_COOKIE.includes("1-", 0)) {
            if (typeof window !== 'undefined') {
              const { host } = window.location
              let newHost = host;
              newHost = newHost.split('.')
              if(newHost.length >= 3) {
                newHost = newHost.slice(1)
              }
              newHost = newHost.join('.')
              VueCookies.set("_ia_", '0', "30d", "/", `.${newHost}`)
              commit('setAuthNull')
            }
          }
        }
        return response;
      })
      .catch((error) => {
        console.log(
          "Ошибка при получении данных о пользователе",
          "Ajax error:",
          error
        );
      });
  },
  initSessionDomain({ state, commit }) {
    return API.initSessionDomain(state.envBaseUrl)
      .then(response => {
        if (response.data.actions.enough_contacts_required) {
          API.checkEnoughContacts()
            .then(res => {
              commit("setDataSocialNetwork", res.data);
            })
            .catch(err => {
              console.log(err);
            })
        }
      })
      .catch(err => {
        console.log(err);
      })
  },
  setCurrency({ commit }, currency) {
    let formData = new FormData();
    let currencyObj = {
      id: currency.id,
      title: currency.code,
    };
    formData.append("id", currencyObj.id);
    return API.setCurrency(currencyObj.id)
      .then((res) => {
        commit("currency", currencyObj)
        const { host } = window.location
        let newHost = host;

        newHost = newHost.split('.')

        if(newHost.length >= 3) {
          newHost = newHost.slice(1)
        }

        newHost = newHost.join('.')

        VueCookies.set("wp_currency_id", currencyObj.id, "30d", "/", `.${newHost}`)
        VueCookies.set("wp_currency_title", currencyObj.title, "30d", "/", `.${newHost}`)
        return res
      })
      .catch((error) => {
        console.log("Ошибка при смене валюты", "Ajax error:", error);
      });
  },
  getCurrencies({ state, commit }) {
    API.getCurrencies(state.envBaseUrl)
      .then((response) => {
        if (response.data) commit("currencies", response.data);
      })
      .catch((error) => {
        console.log("Ошибка при получении данных", "Ajax error:", error);
      });
  },
  setWhitelabel({ state, commit }, payload) {
    commit("whitelabelMutate", payload)
  }
};

// mutations
const mutations = {
  setUserData(state, value) {
    state.userData = value;
    state.isAuth = value.hasOwnProperty("user");
    state.auth.isAuth = state.isAuth
  },
  viewPort(state, value) {
    state.viewPort = value;
  },
  screenWidth(state, value) {
    state.screenWidth = value;
  },
  currency(state, value) {
    const curr = {
      id: value.id,
      title: value.title,
    };
    state.currency = curr;
    localStorage.setItem("currency", curr);
  },
  currencies(state, value) {
    state.currenciesList = value.data.currencies;
  },
  setDataSocialNetwork(state, value) {
    state.dataSocialNetwork = value;
  },
  setLocation(state, value) {
    state.location = value;
  },
  changeBaseLink(state, value) {
    state.baseLink = value
  },
  initAsApp(state, value) {
    state.app = value
  },
  setAuth(state, value) {
    const IA_COOKIE = VueCookies.get("_ia_");
    const ia = IA_COOKIE && IA_COOKIE.includes("1-", 0) ? IA_COOKIE : null;
    let decodeIa = null;
    if(ia)
      decodeIa = JSON.parse(window.atob(ia.replace('1-', '')))
    state.auth = {
      isAuth: ia
        ? true
        : false,
      token: ia
        ? ia
        : null,
      data: decodeIa
    }
    // тут более правильное поведение проверки авторизации, но чето не работает говорят
    // const iaCookie = VueCookies.get("_ia_")
    // const ia = iaCookie && iaCookie != 0 && /^1\-/.test(iaCookie)
    //   ? iaCookie
    //   : null
    // let decodeIa = null;
    // if(ia && ia != 1)
    //   decodeIa = JSON.parse(window.atob(ia.replace('1-', '')))
    // state.auth = {
    //   isAuth: ia
    //     ? true
    //     : false,
    //   token: ia
    //     ? ia
    //     : null,
    //   data: decodeIa
    // }
  },
  setAuthNull(state) {
    state.auth = {
      isAuth: false,
      token: null,
      data: null
    }
  },
  setInvisibleAuth(state, value) {
    const { host } = window.location
    let newHost = host;

    newHost = newHost.split('.')

    if(newHost.length >= 3) {
      newHost = newHost.slice(1)
    }

    newHost = newHost.join('.')

    VueCookies.set("_ia_", '1', "30d", "/", `.${newHost}`)
    state.auth = {
      ...state.auth,
      isAuth: true
    }
  },
  isVkAppMutate(state, value) {
    state.isVkApp = value;
  },
  authStateMutate(state, value) {
    state.authState = value;
  },
  vkAppInfoMutate(state, payload) {
    // state.vkAppInfo.user = payload;
    for (const key in payload) {
      if (Object.hasOwnProperty.call(payload, key)) {
        const element = payload[key];
        Vue.set(state.vkAppInfo, key, element)
      }
    }
  },
  pageTypeMutate(state, value) {
    state.pageType = value;
  },
  addPermission(state, permission) {
    //state.userData?.user?.permissions- на такой вид иногда ругается webpack, т.к. не может прочесть
    if(state.userData.user && state.userData.user.permissions)
      state.userData.user.permissions.push(permission)
  },
  removePermission(state, permission) {
    //state.userData?.user?.permissions?.length > 0 - на такой вид иногда ругается webpack, т.к. не может прочесть
    if (state.userData.user && state.userData.user.permissions && state.userData.user.permissions.length > 0)
      Vue.set(state.userData.user, "permissions", state.userData.user.permissions.filter(p => p !== permission))
  },
  envBaseUrlMutate(state, payload) {
    if(payload)
      state.envBaseUrl = `${payload}/`
  },
  setIsDocumentHidden(state, value) {
    state.isDocumentHidden = value;
  },
  whitelabelMutate(state, payload) {
    state.whitelabel = payload
  }
};

export default {
  namespaced: true,
  namespace: "user",
  state,
  getters,
  actions,
  mutations,
};
