import { BASE_API } from "../../backend";

export const createOrder = (userId, token, order) => {
  return fetch(`${BASE_API}/order/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ order: order }),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log("create order error", err);
    });
};
