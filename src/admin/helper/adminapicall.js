import { BASE_API } from "../../backend";

// create new category
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

// get all categories
export const getAllCategories = () => {
  return fetch(`${BASE_API}/categories`, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log("get all categories error", err);
    });
};

// create new product
export const createProduct = (userId, token, product) => {
  return fetch(`${BASE_API}/product/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log("create product error", err);
    });
};

// get all products
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

// get product
export const getProduct = (productId) => {
  return fetch(`${BASE_API}/product/${productId}`, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log("get product error", err);
    });
};

// update product
export const updateProduct = (productId, userId, token, product) => {
  return fetch(`${BASE_API}/product/${productId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log("update product error", err);
    });
};

// delete/remove product
export const deleteProduct = (productId, userId, token) => {
  return fetch(`${BASE_API}/product/${productId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log("delete product error", err);
    });
};
