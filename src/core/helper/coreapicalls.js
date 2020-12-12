import { BASE_API } from "../../backend";

export const getAllProducts = () => {
  return fetch(`${BASE_API}/products`, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log("get all categories error", err);
    });
};
