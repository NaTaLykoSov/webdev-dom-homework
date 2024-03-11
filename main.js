import { commentsGet} from "./api.js";
import { renderComments } from "./renderComments.js";

import { initEventListeners } from "./like.js";
import { renderLogin } from "./renderLogin.js";

 export let comments = [
  //
];


const fetchPromiseGet = () => {
  commentsGet()
    .then((responseData) => {
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
      renderComments(comments);
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
fetchPromiseGet();
};

renderLogin();

renderComments(comments);
initEventListeners(comments);


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
