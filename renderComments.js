import { initEventListeners } from './like.js'
import { commentsPost } from './api.js'
import { renderLogin } from './renderLogin.js'
import { fetchPromiseGet } from './main.js'

import { format } from "date-fns";

export const renderComments = (comments, AuthName) => {
    const appElement = document.getElementById('app')
    const commentsHTML = comments.map((comment, index) => {
        let newTime = {
            hour: "numeric",
            minute: "numeric",
          };
          const time = new Date();
          let dateTime =
            comment.date.getDate() +
            "." +
            (comment.date.getMonth() + 1) +
            "." +
            comment.date.getFullYear().toString().substring(2) +
            " " +
            comment.date.toLocaleString("ru", newTime);
     
            return `<li class="comment">
           <div class="comment-header">
             <div class="comment-name">${comment.name}</div>
             <div>${dateTime} </div>
           </div>
           <div class="comment-body">
             <div class="comment-text">${comment.text}
             </div>
           </div>
          <div class="comment-footer">
             <div class="likes">
               <span  class="likes-counter">${comment.likes}</span>
               <button data-index ='${index}' class="${
                   comments[index].isLiked
                       ? 'like-button -active-like'
                       : 'like-button'
               }">
                 <div></div>
                 </button>
             </div>
           </div>
  
         </li>`
        })
        .join('')

    const appHTML = `<div class="container">
      <ul id = "list-input" class="comments">  ${commentsHTML}
  <!-- Список в JS -->
      </ul>
      <div class="add-form">
      <input
        type="text"
        class="add-form-name"
        id = "name-input"
        placeholder="Введите ваше имя"
      />
      <textarea
        type="textarea"
        class="add-form-text"
        id = "text-input"
        placeholder="Введите ваш комментарий"
        rows="4"
      ></textarea>
      <div class="add-form-row">
        <button class="add-form-button" id = "add-button">Написать</button>
        </div>
        </div>
        <br />
        <button class="add-form-button-auth" id = "auth-button"> Чтобы добавить комментарий, необходимо авторизоваться</button>`

    appElement.innerHTML = appHTML

    initEventListeners(comments, AuthName)

    const buttonElement = document.getElementById('add-button')
    const nameInputElement = document.getElementById('name-input')
    const textInputElement = document.getElementById('text-input')
    const buttonAuth = document.getElementById('auth-button')

    const hideForm = document.querySelector('.add-form')
    var oldLoaderDisplay = ''

    nameInputElement.value = AuthName

    if (AuthName === '') {
        oldLoaderDisplay = hideForm.style.display
        hideForm.style.display = 'none'
    }
    if (AuthName.length >= 3) {
        nameInputElement.setAttribute('readonly', 'true')
        nameInputElement.setAttribute('disabled', 'true')
        buttonAuth.style.display = 'none'
    }

    buttonAuth.addEventListener('click', () => {
        renderLogin()
    })
    buttonElement.addEventListener('click', () => {
        buttonElement.classList.remove('error')
        if (nameInputElement.value === '' || textInputElement.value === '') {
            buttonElement.classList.add('error')
            return
        }
        const fetchPromisePost = () => {
            commentsPost(textInputElement, nameInputElement)
                .then((response) => {
                    if (response.status === 200) {
                        return response.json()
                    }
                    if (response.status === 500) {
                        throw new Error('Ошибка сервера')
                    }
                    if (response.status === 400) {
                        throw new Error('Неверный запрос')
                    }
                })
                .then((responseData) => {
                    fetchPromiseGet(AuthName)
                    nameInputElement.value = ''
                    textInputElement.value = ''
                })
                .then((data) => {
                    // loading.style.display = "none";
                    // renderComments(comments, AuthName);
                    hideForm.style.display = oldLoaderDisplay
                })
                .catch((error) => {
                    // loading.style.display = "none";
                    hideForm.style.display = 'flex'
                    // forceError: false;
                    switch (error.message) {
                        case 'Ошибка сервера':
                            alert('Сервер сломался, попробуйте позже')
                            break
                        case 'Неверный запрос':
                            alert(
                                'Имя и комментарий должны быть не короче 3х символов',
                            )
                            break
                        default:
                            alert('Возникла ошибка!')
                    }
                })
        }
        fetchPromisePost()
    })
}

// /};
// nameInputElement.value = "";
// textInputElement.value = "";
// initEventListeners(comments);
