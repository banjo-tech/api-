// import {log} from './auth';

// const username = document.getElementById("username");
// const error = document.getElementById("error");
// const result = document.getElementById("result");
const form = document.querySelector("#form");
const _name = document.querySelector("#product-name");
// const token = localStorage.getItem("token");
const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjI2MzY1Njk0LCJqdGkiOiI2ZTQ1NTM3NGZiZjc0MjIxYjMxOWUwYmVjMDNmNGY4NiIsInVzZXJfaWQiOjEzfQ.WoA84AtftycAgZJYzKIrmtU5VgIycB2avkwnJHUjnmU";
window.addEventListener("load", async () => {
  console.log("loaded");

  // username.innerHTML = localStorage.getItem("username");
  //   const loginButton = document.getElementById("login");

  const url_postCategory = "https://stocka-zuri-api.herokuapp.com/product/";

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const _name = document.getElementById("product-name").value;
    const category = document.getElementById("category").value;
    const description = document.getElementById("description").value;

    const data = {
      name: _name,
      category: category,
      description: description,
    };

    console.log("working");

    await postProduct(url_postCategory, data); // await repsonse since it takes some time to get data.
  });
  // const login = document.getElementsByTagName('login');
});
async function postProduct(url = "", post_data = {}) {
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(post_data),
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      if (response.status_code === 401) {
        console.log("Unauthorize");
        console.log("Unauthorized: Token may have expired. Login");
        // error.innerHTML = "Unauthorize: Token may have expired. Login";
      } else if (response.status_code === 400) {
        console.log("Bad request");
        // error.innerHTML = "Conflicts: Category already exist. Try another";
      } else {
        // error.style.color = "green";
        // error.innerHTML = "success posting category. Try another :-)";
      }
    })
    .catch((error) => console.log(error));
}
