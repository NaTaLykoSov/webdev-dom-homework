/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ ;(() => {
    // webpackBootstrap
    /******/ 'use strict'
    /******/ var __webpack_modules__ = {
        /***/ './api.js':
            /*!****************!*\
  !*** ./api.js ***!
  \****************/
            /***/ (
                __unused_webpack_module,
                __webpack_exports__,
                __webpack_require__,
            ) => {
                eval(
                    '__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   commentsGet: () => (/* binding */ commentsGet),\n/* harmony export */   commentsPost: () => (/* binding */ commentsPost),\n/* harmony export */   login: () => (/* binding */ login),\n/* harmony export */   setToken: () => (/* binding */ setToken),\n/* harmony export */   token: () => (/* binding */ token)\n/* harmony export */ });\nconst host = "https://wedev-api.sky.pro/api/v2/nata_kosovskaya/comments";\r\nconst userURL = "https://wedev-api.sky.pro/api/user/login";\r\n\r\nlet token;\r\nconst setToken = (newToken) =>{\r\n  token = newToken;\r\n};\r\nconst commentsGet = () => {\r\nreturn fetch(host,\r\n    {\r\n      method: "GET",\r\n      headers:{\r\n        Authorization: `Bearer ${token}`,\r\n      }\r\n    }\r\n  )\r\n    .then((response) => {\r\n      console.log(response);\r\n      if (response.status === 200) {\r\n        return response.json();\r\n      } else {\r\n        return Promise.reject("Сервер упал");\r\n      }\r\n    });\r\n    }\r\n\r\nconst commentsPost = (text, name) => {\r\n    return fetch(host,\r\n        {\r\n          method: "POST",\r\n          headers:{\r\n            Authorization: `Bearer ${token}`,\r\n          },\r\n          body: JSON.stringify({\r\n            text: text.value,\r\n            name: name.value,\r\n            //forceError: true,\r\n          }),\r\n        })\r\n        .then((response) => {\r\n          return response.json();\r\n        })\r\n}\r\n\r\nconst login = ({login, password}) => {\r\n  return fetch(userURL,\r\n      {\r\n        method: "POST",\r\n        body: JSON.stringify({\r\n        login, \r\n        password,\r\n      }),\r\n      })\r\n      .then((response) => {\r\n          return response.json();\r\n        })\r\n}\n\n//# sourceURL=webpack://webdev-dom-homework/./api.js?',
                )

                /***/
            },

        /***/ './like.js':
            /*!*****************!*\
  !*** ./like.js ***!
  \*****************/
            /***/ (
                __unused_webpack_module,
                __webpack_exports__,
                __webpack_require__,
            ) => {
                eval(
                    '__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   initEventListeners: () => (/* binding */ initEventListeners)\n/* harmony export */ });\n/* harmony import */ var _renderComments_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./renderComments.js */ "./renderComments.js");\n\r\n\r\nconst initEventListeners = (comments, AuthName) => {\r\n    const likeButtonElements = document.querySelectorAll(".like-button");\r\n    for (const likeButtonElement of likeButtonElements) {\r\n      likeButtonElement.addEventListener("click", (event) => {\r\n        event.stopPropagation();\r\n        const index = likeButtonElement.dataset.index;\r\n        if (comments[index].isLiked === false) {\r\n          comments[index].likes++;\r\n          comments[index].isLiked = true;\r\n        } else {\r\n          comments[index].likes--;\r\n          comments[index].isLiked = false;\r\n        }\r\n      \r\n      (0,_renderComments_js__WEBPACK_IMPORTED_MODULE_0__.renderComments)(comments, AuthName);\r\n\r\n      });\r\n    }\r\n  };\n\n//# sourceURL=webpack://webdev-dom-homework/./like.js?',
                )

                /***/
            },

        /***/ './main.js':
            /*!*****************!*\
  !*** ./main.js ***!
  \*****************/
            /***/ (
                __unused_webpack_module,
                __webpack_exports__,
                __webpack_require__,
            ) => {
                eval(
                    '__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   fetchPromiseGet: () => (/* binding */ fetchPromiseGet)\n/* harmony export */ });\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.js */ "./api.js");\n/* harmony import */ var _renderComments_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renderComments.js */ "./renderComments.js");\n/* harmony import */ var _like_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./like.js */ "./like.js");\n/* harmony import */ var _renderLogin_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./renderLogin.js */ "./renderLogin.js");\n\r\n\r\n\r\n\r\n\r\nlet comments = [\r\n  //\r\n];\r\nvar AuthName="";\r\n\r\n\r\nconst fetchPromiseGet = (AuthName) => {\r\n  (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.commentsGet)().then((responseData) => {\r\n      const appComments = responseData.comments.map((comment) => {\r\n        return {\r\n          name: comment.author.name,\r\n          date: new Date(comment.date),\r\n          text: comment.text,\r\n          likes: comment.likes,\r\n          isLiked: false,\r\n        };\r\n      });\r\n      comments = appComments;\r\n      (0,_renderComments_js__WEBPACK_IMPORTED_MODULE_1__.renderComments)(comments, AuthName);\r\n      // hidePreloader.style.display = "none";\r\n    })\r\n    .catch((error) => {\r\n      if (error.message === "Сервер упал") {\r\n        alert("Сервер сломался, попробуй позже");\r\n      } else {\r\n        alert(error);\r\n        alert("Ошибка загрузки данных!");\r\n        return Promise.reject("Сервер упал");\r\n      }\r\n    });\r\n// fetchPromiseGet();\r\n};\r\n\r\nfetchPromiseGet("");\r\n\r\n(0,_renderLogin_js__WEBPACK_IMPORTED_MODULE_3__.renderLogin)();\r\n\r\n(0,_like_js__WEBPACK_IMPORTED_MODULE_2__.initEventListeners)(comments,AuthName);\r\n\r\n\r\n//\r\n// answerComment();\r\n// renderComments ();\r\n\r\n// function answerComment() {\r\n//   const commentAnswer = document.querySelectorAll(\'.comment\');\r\n//   const formText = document.querySelector(\'.add-form-text\');\r\n\r\n//   commentAnswer.forEach((comment, index) =>{\r\n//     comment.addEventListener(\'click\', () => {\r\n//       console.log(index);\r\n//       formText.value = `-${comments[index].name} \\n -${comments[index].comment}`;\r\n//     renderComments()\r\n//     });\r\n//   });\r\n// };\r\n// answerComment();\r\n\n\n//# sourceURL=webpack://webdev-dom-homework/./main.js?',
                )

                /***/
            },

        /***/ './renderComments.js':
            /*!***************************!*\
  !*** ./renderComments.js ***!
  \***************************/
            /***/ (
                __unused_webpack_module,
                __webpack_exports__,
                __webpack_require__,
            ) => {
                eval(
                    '__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   renderComments: () => (/* binding */ renderComments)\n/* harmony export */ });\n/* harmony import */ var _like_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./like.js */ "./like.js");\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api.js */ "./api.js");\n/* harmony import */ var _renderLogin_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./renderLogin.js */ "./renderLogin.js");\n/* harmony import */ var _main_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./main.js */ "./main.js");\n\r\n\r\n\r\n\r\n\r\n\r\nconst renderComments = (comments, AuthName) => {\r\n  const appElement = document.getElementById("app");\r\n  const commentsHTML = comments.map((comment, index) => {\r\n   \r\n          return `<li class="comment">\r\n           <div class="comment-header">\r\n             <div class="comment-name">${comment.name}</div>\r\n             <div>${dateTime} </div>\r\n           </div>\r\n           <div class="comment-body">\r\n             <div class="comment-text">${comment.text}\r\n             </div>\r\n           </div>\r\n          <div class="comment-footer">\r\n             <div class="likes">\r\n               <span  class="likes-counter">${comment.likes}</span>\r\n               <button data-index =\'${index}\' class="${\r\n          comments[index].isLiked ? "like-button -active-like" : "like-button"\r\n        }">\r\n                 <div></div>\r\n                 </button>\r\n             </div>\r\n           </div>\r\n  \r\n         </li>`;\r\n      })\r\n      .join("");\r\n    \r\n\r\n      const appHTML = \r\n      `<div class="container">\r\n      <ul id = "list-input" class="comments">  ${commentsHTML}\r\n  <!-- Список в JS -->\r\n      </ul>\r\n      <div class="add-form">\r\n      <input\r\n        type="text"\r\n        class="add-form-name"\r\n        id = "name-input"\r\n        placeholder="Введите ваше имя"\r\n      />\r\n      <textarea\r\n        type="textarea"\r\n        class="add-form-text"\r\n        id = "text-input"\r\n        placeholder="Введите ваш комментарий"\r\n        rows="4"\r\n      ></textarea>\r\n      <div class="add-form-row">\r\n        <button class="add-form-button" id = "add-button">Написать</button>\r\n        </div>\r\n        </div>\r\n        <br />\r\n        <button class="add-form-button-auth" id = "auth-button"> Чтобы добавить комментарий, необходимо авторизоваться</button>`\r\n      \r\n    appElement.innerHTML = appHTML;\r\n\r\n        \r\n    (0,_like_js__WEBPACK_IMPORTED_MODULE_0__.initEventListeners)(comments, AuthName);\r\n\r\n    const buttonElement = document.getElementById("add-button");\r\n    const nameInputElement = document.getElementById("name-input");\r\n    const textInputElement = document.getElementById("text-input");\r\n    const buttonAuth = document.getElementById("auth-button");\r\n    \r\n    const hideForm = document.querySelector(".add-form");\r\n    var oldLoaderDisplay="";\r\n    \r\n    nameInputElement.value=AuthName;\r\n    \r\n    if (AuthName==="") {\r\n       oldLoaderDisplay=hideForm.style.display;\r\n        hideForm.style.display="none";\r\n    };\r\n    if (AuthName.length>=3) {\r\n      nameInputElement.setAttribute("readonly", "true");\r\n      nameInputElement.setAttribute("disabled", "true");\r\n      buttonAuth.style.display="none";\r\n    };\r\n\r\n    buttonAuth.addEventListener("click", () => {\r\n        (0,_renderLogin_js__WEBPACK_IMPORTED_MODULE_2__.renderLogin)();\r\n    });\r\n    buttonElement.addEventListener("click", () => {\r\n      buttonElement.classList.remove("error");\r\n      if (nameInputElement.value === "" || textInputElement.value === "") {\r\n        buttonElement.classList.add("error");\r\n        return;\r\n      }\r\n      const fetchPromisePost = () => {\r\n        (0,_api_js__WEBPACK_IMPORTED_MODULE_1__.commentsPost)(textInputElement, nameInputElement).then((response) => {\r\n            if (response.status === 200) {\r\n              return response.json();\r\n            }\r\n            if (response.status === 500) {\r\n                throw new Error("Ошибка сервера");\r\n              }\r\n            if (response.status === 400) {\r\n                  throw new Error("Неверный запрос");\r\n                }\r\n              })\r\n           .then((responseData) => {\r\n            (0,_main_js__WEBPACK_IMPORTED_MODULE_3__.fetchPromiseGet)(AuthName);\r\n            nameInputElement.value = "";\r\n            textInputElement.value = "";\r\n          })\r\n          .then((data) => {\r\n            // loading.style.display = "none";\r\n            // renderComments(comments, AuthName);\r\n            hideForm.style.display = oldLoaderDisplay;\r\n          })\r\n          .catch((error) => {\r\n            // loading.style.display = "none";\r\n            hideForm.style.display = "flex";\r\n            // forceError: false;\r\n                switch (error.message) {\r\n              case "Ошибка сервера":\r\n                alert("Сервер сломался, попробуйте позже");\r\n                break;\r\n              case "Неверный запрос":\r\n                alert("Имя и комментарий должны быть не короче 3х символов");\r\n                break;\r\n              default:\r\n                alert("Возникла ошибка!");\r\n                   }\r\n          });\r\n        \r\n        };\r\n      fetchPromisePost();\r\n      \r\n}\r\n  );\r\n  };\r\n\r\n\r\n  // /};\r\n  // nameInputElement.value = "";\r\n  // textInputElement.value = "";\r\n// initEventListeners(comments);\n\n//# sourceURL=webpack://webdev-dom-homework/./renderComments.js?',
                )

                /***/
            },

        /***/ './renderLogin.js':
            /*!************************!*\
  !*** ./renderLogin.js ***!
  \************************/
            /***/ (
                __unused_webpack_module,
                __webpack_exports__,
                __webpack_require__,
            ) => {
                eval(
                    '__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   renderLogin: () => (/* binding */ renderLogin)\n/* harmony export */ });\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.js */ "./api.js");\n/* harmony import */ var _main_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./main.js */ "./main.js");\n/* harmony import */ var _renderComments_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./renderComments.js */ "./renderComments.js");\n\r\n\r\n\r\n\r\nconst renderLogin = ()=> {\r\nconst appElement = document.getElementById("app");\r\nconst loginHTML = ` <div class="container">\r\n<h1>Авторизация</h1>\r\n<div class="add-form">\r\n  <h3 class="form-title">Страница входа</h3>\r\n  <div class="add-form-row">\r\n    <input type="text" id="login-input" class="input" placeholder="Логин" />\r\n    <input\r\n      type="text"\r\n      id="password-input"\r\n      class="input"\r\n      placeholder="Пароль"\r\n    />\r\n  </div>\r\n  <br />\r\n  <button class="add-button" id="login-button">Войти</button>\r\n  <a href="index.html" class = "link" id="link-to-comment">Перейти к комментариям</a>\r\n</div>`;\r\n\r\n  appElement.innerHTML = loginHTML;\r\n\r\nconst buttonElement = document.getElementById("login-button"); \r\nconst loginInputElement = document.getElementById("login-input");\r\nconst passwordInputElement = document.getElementById("password-input");\r\n\r\n\r\nbuttonElement.addEventListener(\'click\', () => {\r\n  console.log(loginInputElement.value);\r\n(0,_api_js__WEBPACK_IMPORTED_MODULE_0__.login)({login: loginInputElement.value,\r\n  password: passwordInputElement.value,}    \r\n).then((responseData) => {\r\n  // console.log(token);\r\n  (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.setToken)(responseData.user.token);\r\n  console.log(responseData.user.token)\r\n  return (0,_main_js__WEBPACK_IMPORTED_MODULE_1__.fetchPromiseGet)(loginInputElement.value );\r\n})\r\n\r\n.catch((error) =>{\r\n  console.log(error);\r\n  return alert("Неправильное имя пользователя или пароль")\r\n})\r\n// .then(() =>{\r\n//   ;\r\n// })\r\n});\r\n};\r\n\n\n//# sourceURL=webpack://webdev-dom-homework/./renderLogin.js?',
                )

                /***/
            },

        /******/
    }
    /************************************************************************/
    /******/ // The module cache
    /******/ var __webpack_module_cache__ = {}
    /******/
    /******/ // The require function
    /******/ function __webpack_require__(moduleId) {
        /******/ // Check if module is in cache
        /******/ var cachedModule = __webpack_module_cache__[moduleId]
        /******/ if (cachedModule !== undefined) {
            /******/ return cachedModule.exports
            /******/
        }
        /******/ // Create a new module (and put it into the cache)
        /******/ var module = (__webpack_module_cache__[moduleId] = {
            /******/ // no module.id needed
            /******/ // no module.loaded needed
            /******/ exports: {},
            /******/
        })
        /******/
        /******/ // Execute the module function
        /******/ __webpack_modules__[moduleId](
            module,
            module.exports,
            __webpack_require__,
        )
        /******/
        /******/ // Return the exports of the module
        /******/ return module.exports
        /******/
    }
    /******/
    /************************************************************************/
    /******/ /* webpack/runtime/define property getters */
    /******/ ;(() => {
        /******/ // define getter functions for harmony exports
        /******/ __webpack_require__.d = (exports, definition) => {
            /******/ for (var key in definition) {
                /******/ if (
                    __webpack_require__.o(definition, key) &&
                    !__webpack_require__.o(exports, key)
                ) {
                    /******/ Object.defineProperty(exports, key, {
                        enumerable: true,
                        get: definition[key],
                    })
                    /******/
                }
                /******/
            }
            /******/
        }
        /******/
    })()
    /******/
    /******/ /* webpack/runtime/hasOwnProperty shorthand */
    /******/ ;(() => {
        /******/ __webpack_require__.o = (obj, prop) =>
            Object.prototype.hasOwnProperty.call(obj, prop)
        /******/
    })()
    /******/
    /******/ /* webpack/runtime/make namespace object */
    /******/ ;(() => {
        /******/ // define __esModule on exports
        /******/ __webpack_require__.r = (exports) => {
            /******/ if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
                /******/ Object.defineProperty(exports, Symbol.toStringTag, {
                    value: 'Module',
                })
                /******/
            }
            /******/ Object.defineProperty(exports, '__esModule', {
                value: true,
            })
            /******/
        }
        /******/
    })()
    /******/
    /************************************************************************/
    /******/
    /******/ // startup
    /******/ // Load entry module and return exports
    /******/ // This entry module is referenced by other modules so it can't be inlined
    /******/ var __webpack_exports__ = __webpack_require__('./main.js')
    /******/
    /******/
})()
