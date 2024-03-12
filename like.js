import { renderComments } from "./renderComments.js";

export const initEventListeners = (comments) => {
    const likeButtonElements = document.querySelectorAll(".like-button");
    for (const likeButtonElement of likeButtonElements) {
      likeButtonElement.addEventListener("click", (event) => {
        event.stopPropagation();
        const index = likeButtonElement.dataset.index;
        if (comments[index].isLiked === false) {
          comments[index].likes++;
          comments[index].isLiked = true;
        } else {
          comments[index].likes--;
          comments[index].isLiked = false;
        }
      
      renderComments(comments, "");

      });
    }
  };