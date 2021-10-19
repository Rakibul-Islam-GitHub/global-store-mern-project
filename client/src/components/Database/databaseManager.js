function saveCartData(product) {
  localStorage.setItem("cart", product);
}

function getCart() {
  const cart = localStorage.getItem("cart");
  return cart;
}

export { saveCartData, getCart };
