import { BASE_API } from "../../backend";

export const signUp = (user) => {
  return fetch(`${BASE_API}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log("sign up error", err);
    });
};

export const signIn = (user) => {
  return fetch(`${BASE_API}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log("sign in error", err);
    });
};

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const signOut = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    next();

    return fetch(`${BASE_API}/signout`, {
      method: "GET",
    })
      .then((res) => {
        console.log("sign out response", res);
      })
      .catch((err) => {
        console.log("sign out error", err);
      });
  }
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }

  const token = localStorage.getItem("jwt");
  if (token) {
    return JSON.parse(token);
  } else {
    return false;
  }
};
