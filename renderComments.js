import { initEventListeners } from "./like.js";


const listElement = document.getElementById("list-input");

export const renderComments = ({comments}) => {
    const commentsHTML = comments
      .map((comment, index) => {
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
             <div class="commeent-name">${comment.name}</div>
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
          comments[index].isLiked ? "like-button -active-like" : "like-button"
        }">
                 <div></div>
                 </button>
             </div>
           </div>
  
         </li>`;
      })
      .join("");
  
    listElement.innerHTML = commentsHTML;
    initEventListeners({comments});
  };