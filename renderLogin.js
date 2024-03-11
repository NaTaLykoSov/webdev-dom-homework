import { login, setToken, token } from "./api.js";
import { renderComments } from "./renderComments.js";
import { initEventListeners } from "./like.js";
import { comments } from "./main.js";

export const renderLogin = () => {
const appElement = document.getElementById("app");
const loginHTML = ` <div class="container">
<h1>Авторизация</h1>
<div class="add-form">
  <h3 class="form-title">Страница входа</h3>
  <div class="add-form-row">
    <input type="text" id="login-input" class="input" placeholder="Логин" />
    <input
      type="text"
      id="password-input"
      class="input"
      placeholder="Пароль"
    />
  </div>
  <br />
  <button class="add-button" id="login-button">Войти</button>
  <a href="index.html" class = "link" id="link-to-comment">Перейти к комментариям</a>
</div>`;

  appElement.innerHTML = loginHTML;

const buttonElement = document.getElementById("login-button"); 
const loginInputElement = document.getElementById("login-input");
const passwordInputElement = document.getElementById("password-input");


buttonElement.addEventListener('click', () => {
  console.log(loginInputElement.value);
login({login: loginInputElement.value,
  password: passwordInputElement.value,}    
).then((responseData) => {
  // console.log(token);
  setToken(responseData.user.token);
  console.log(token);
})
.then(() =>{

renderComments(comments);

})
});
};
