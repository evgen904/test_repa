import bridge from "@vkontakte/vk-bridge";

/**
 * @description слушает событие OPEN_REGISTER и открывает форму регистрации
 * @param {Object} store - прокинуть хранилмще vuex
 * @param {DOM NODE} payload - элемент дом дерева на котором слушается событие OPEN_REGISTER
 */
const openRegister = (store, payload) => {
  const {elem} = payload
  elem.addEventListener('OPEN_REGISTER', () => {
    store.commit("user/authStateMutate", "open")
  })
}

/**
 * @description слушает событие OPEN_REGISTER_BY_TELEPHONE и открывает форму регистрации по телефону
 * @param {Object} store - прокинуть хранилмще vuex
 * @param {DOM NODE} payload - элемент дом дерева на котором слушается событие OPEN_REGISTER_BY_TELEPHONE
 */
const registerByTelephone = (store, payload) => {
  const {elem} = payload
  elem.addEventListener('OPEN_REGISTER_BY_TELEPHONE', () => {
    store.commit("user/authStateMutate", "registration")
  })
}

/**
 * @description слушает событие VK_GET_PHONE_NUMBER и вызывает запрос номера телефона пользователя в vk-mini-app
 * @param {Object} store - прокинуть хранилмще vuex
 * @param {DOM NODE} payload - элемент дом дерева на котором слушается событие VK_GET_PHONE_NUMBER
 */

let mountCount = 0
const vkGetUserPhoneNumber = (store, payload) => {
  const {elem} = payload
  mountCount++

  if (mountCount === 1) {
    elem.addEventListener('VK_GET_PHONE_NUMBER', () => {
      bridge
          .send("VKWebAppGetPhoneNumber", {})
          .then((res) => {
            //alert(JSON.stringify(res));//debug vk-app-bridge
            store.commit("user/vkAppInfoMutate", {phone_number: res.phone_number})
          });
    })
  }
}

/**
 * @description слушает событие VK_GET_USER_INFO и вызывает запрос инф-и пользователя в vk-mini-app
 * @param {Object} store - прокинуть хранилмще vuex
 * @param {DOM NODE} payload - элемент дом дерева на котором слушается событие VK_GET_USER_INFO
 */
const VKWebAppGetUserInfo = (store, payload) => {
  const {elem} = payload
  elem.addEventListener('VK_GET_USER_INFO', () => {
    bridge
      .send("VKWebAppGetUserInfo", {})
      .then((res) => {
        //alert(JSON.stringify(res));//debug vk-app-bridge
        store.commit("user/vkAppInfoMutate", {first_name: res.first_name})
      });
    
  })
}

/**
 * @description слушает событие VK_GET_USER_MAIL и вызывает запрос инф-и email пользователя в vk-mini-app
 * @param {Object} store - прокинуть хранилмще vuex
 * @param {DOM NODE} payload - элемент дом дерева на котором слушается событие VK_GET_USER_MAIL
 */
const VKWebAppGetEmailResult = (store, payload) => {
  const {elem} = payload
  elem.addEventListener('VK_GET_USER_MAIL', () => {
    bridge
      .send("VKWebAppGetEmailResult", {})
      .then((res) => {
        // alert(JSON.stringify(res)); //debug vk-app-bridge
        store.commit("user/vkAppInfoMutate", {email: res.email})
      });
    
  })
}

let callCount = 0
const isDocumentHidden = (store, payload) => {
  callCount++
  if (callCount === 1) {
    const {elem} = payload
    elem.addEventListener("visibilitychange", function(){
      if (elem.hidden){
        store.commit("user/setIsDocumentHidden", true)
      } else {
        store.commit("user/setIsDocumentHidden", false)
      }
    });
  }
}

export {
  openRegister,
  registerByTelephone,
  vkGetUserPhoneNumber,
  VKWebAppGetUserInfo,
  VKWebAppGetEmailResult,
  isDocumentHidden
}
