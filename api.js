const host = "https://wedev-api.sky.pro/api/v2/nata_kosovskaya/comments";
const userURL = "https://wedev-api.sky.pro/api/user/login";

export let token;
export const setToken = (newToken) =>{
  token = newToken;
};
export const commentsGet = () => {
return fetch(host,
    {
      method: "GET",
      headers:{
        Authorization: `Bearer ${token}`,
      }
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
    return fetch(host,
        {
          method: "POST",
          headers:{
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            text: text.value,
            name: name.value,
            //forceError: true,
          }),
        })
        .then((response) => {
          return response.json();
        })
}

export const login = ({login, password}) => {
  return fetch(userURL,
      {
        method: "POST",
        body: JSON.stringify({
        login, 
        password,
      }),
      })
      .then((response) => {
          return response.json();
        })
}

