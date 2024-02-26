export const commentsGet = () => {

return fetch(
    "https://wedev-api.sky.pro/api/v1/nata_kosovskaya/comments",
    {
      method: "GET",
    }
  )
    .then((response) => {
      console.log(response);
      if (response.status === 200) {
        return response.json();
      } else {
        return Promise.reject("Сервер упал");
      }
    });
}

export const commentsPost = (text, name) => {
    return fetch(
        "https://wedev-api.sky.pro/api/v1/nata_kosovskaya/comments",
        {
          method: "POST",
          body: JSON.stringify({
            text: text.value,
            name: name.value,
            //forceError: true,
          }),
        }
      )
}