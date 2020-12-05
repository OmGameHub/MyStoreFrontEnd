import { BASE_API } from "../../backend";

export const createCategory = (userId, token, category) => {
  return fetch(`${BASE_API}/category/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log("create category error", err);
    });
};
