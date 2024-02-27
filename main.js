import { commentsGet, commentsPost } from "./api.js";
import { renderComments } from "./renderComments.js";
import { initEventListeners } from "./like.js";

const buttonElement = document.getElementById("add-button");
const addFormElement = document.getElementById("addForm");
const nameInputElement = document.getElementById("name-input");
const textInputElement = document.getElementById("text-input");
const formText = document.querySelector(".add-form-text");
const hidePreloader = document.getElementById("preloading");
const hideForm = document.querySelector(".add-form");
const loading = document.getElementById("loading");
var oldLoaderDisplay = hideForm.style.display;

let comments = [
  //
];

const fetchPromiseGet = () => {
  commentsGet().then((responseData) => {
      const appComments = responseData.comments.map((comment) => {
        return {
          name: comment.author.name,
          date: new Date(comment.date),
          text: comment.text,
          likes: comment.likes,
          isLiked: false,
        };
      });
      comments = appComments;
      renderComments({comments});
      hidePreloader.style.display = "none";
    })
    .catch((error) => {
      if (error.message === "Сервер упал") {
        alert("Сервер сломался, попробуй позже");
      } else {
        alert(error);
        alert("Ошибка загрузки данных!");
        return Promise.reject("Сервер упал");
      }
    });
};
fetchPromiseGet();
renderComments({comments});

nameInputElement.value = "";
textInputElement.value = "";



buttonElement.addEventListener("click", () => {
  buttonElement.classList.remove("error");
  if (nameInputElement.value === "" || textInputElement.value === "") {
    buttonElement.classList.add("error");
    return;
  }
  oldLoaderDisplay = hideForm.style.display;
  hideForm.style.display = "none";
  loading.style.display = "block";
 

  const fetchPromisePost = () => {
    commentsPost(textInputElement, nameInputElement).then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        if (response.status === 500) {
            throw new Error("Ошибка сервера");
          }
        if (response.status === 400) {
              throw new Error("Неверный запрос");
            }
          })
       .then((responseData) => {
        fetchPromiseGet();
        renderComments({comments});
        nameInputElement.value = "";
        textInputElement.value = "";
      })
      .then((data) => {
        loading.style.display = "none";
        hideForm.style.display = oldLoaderDisplay;
      })
      .catch((error) => {
        loading.style.display = "none";
        hideForm.style.display = "flex";
     // forceError: false;

        switch (error.message) {
          case "Ошибка сервера":
            alert("Сервер сломался, попробуйте позже");
            break;
          case "Неверный запрос":
            alert("Имя и комментарий должны быть не короче 3х символов");
            break;
          default:
            alert("Возникла ошибка!");
               }
      });
  };
  fetchPromisePost();
});

nameInputElement.value = "";
textInputElement.value = "";
initEventListeners({comments});

//
// answerComment();
// renderComments ();

// function answerComment() {
//   const commentAnswer = document.querySelectorAll('.comment');
//   const formText = document.querySelector('.add-form-text');

//   commentAnswer.forEach((comment, index) =>{
//     comment.addEventListener('click', () => {
//       console.log(index);
//       formText.value = `-${comments[index].name} \n -${comments[index].comment}`;
//     renderComments()
//     });
//   });
// };
// answerComment();
