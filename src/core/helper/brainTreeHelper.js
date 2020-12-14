import { BASE_API } from "../../backend";

export const getToken = (userId, token) => {
  return fetch(`${BASE_API}/payment/braintree/gettoken/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log("get brain tree token error", err);
    });
};

export const processPayment = (userId, token, paymentInfo) => {
  return fetch(`${BASE_API}/payment/braintree/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(paymentInfo),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log("brain tree payment error", err);
    });
};
