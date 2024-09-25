/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
import Overlay from "./overlay";
import { formatPrice } from "./product-util";
import * as Database from "./query";
import coffeeImagePath from "../../img/FEND_Coffee_Costa-Rica 2.png";
import closeButtonIcon from "../../img/icons/Burger Menu close.svg";

const openCartButton = document.querySelector(".open-cart-button");
const closeCartButton = document.querySelector(".close-cart-button");
const billingArea = document.querySelector(".cart__billing");
const cartOverlay = new Overlay(document.querySelector(".cart-overlay"));
// Counts how many items have been added since the last viewing of the cart.
let recentlyAddedCounter = 0;

let openCart;

function closeCart() {
  cartOverlay.closeOverlay();
  closeCartButton.classList.add("u-hidden");
}

function processValidAmountChange(inputNode) {
  inputNode.classList.remove("amount-input--invalid");
  inputNode.size = `${inputNode.value}`.length;
}

// Displays a message notifying the user of recent changes to the cart.
function updateRecentlyAddedMessage() {
  const recentlyAddedMessage = document.querySelector(".cart .add-message");
  if (recentlyAddedCounter) {
    let was;
    let product;
    let fromOrTo;
    let action;

    if (Math.abs(recentlyAddedCounter) === 1) {
      was = "wurde";
      product = "Produkt";
    } else {
      was = "wurden";
      product = "Produkte";
    }

    if (recentlyAddedCounter < 0) {
      fromOrTo = "aus dem";
      action = "entfernt";
    } else {
      fromOrTo = "zum";
      action = "hinzugefügt";
    }

    recentlyAddedMessage.innerHTML = `${Math.abs(
      recentlyAddedCounter
    )} ${product} ${was} erfolgreich ${fromOrTo} Warenkorb ${action}.`;
    recentlyAddedMessage.classList.remove("u-hidden");
  } else {
    recentlyAddedMessage.classList.add("u-hidden");
  }
  recentlyAddedCounter = 0;
}

// Adjusts singular/plural of product labels
function updateProductCountLabel(n) {
  document.querySelectorAll(".cart__product-count-label").forEach((el) => {
    const elem = el;
    elem.innerHTML = n === 1 ? "Produkt" : "Produkte";
  });
}

// Sets a class on the count's parent signaling that the cart is empty.
function emptyCart(cart) {
  cart.parentNode.classList.add("cart__product-count--empty");
  cart.parentNode.classList.remove("cart__product-count--nonempty");
}

// Sets a class on the count's parent signaling that the cart is not empty.
function fillCart(cart) {
  cart.parentNode.classList.add("cart__product-count--nonempty");
  cart.parentNode.classList.remove("cart__product-count--empty");
}

// Adds n to the cart counter.
function modifyCartItemCount(n) {
  const productCountElems = document.querySelectorAll(".cart__product-count");
  const productCount = parseInt(productCountElems[0].innerHTML, 10);
  productCountElems.forEach((el) => {
    const elem = el;
    elem.innerHTML = productCount + n;
    if (productCount + n <= 0) {
      emptyCart(elem);
    } else if (productCount === 0 && n > 0) {
      fillCart(elem);
    }
  });

  recentlyAddedCounter += n;
  if (cartOverlay.isOpen()) {
    updateRecentlyAddedMessage();
    updateProductCountLabel(productCount + n);
  }
}

// Sets the cart count to n.
function setCartItemCount(n) {
  document.querySelectorAll(".cart__product-count").forEach((el) => {
    const elem = el;
    elem.innerHTML = n;
    if (n === 0) {
      emptyCart(elem);
    } else {
      fillCart(elem);
    }
  });

  updateProductCountLabel(n);
}

// Set the cart counter to the number of products currently in the
// cart.
function initCartCounter() {
  setCartItemCount(
    Database.getCartData().reduce((total, item) => item.amount + total, 0)
  );
}

// Modifies the amount by the specified amount. Returns whether an entry was updated.
function modifyAmount(id, variantName, amount) {
  if (
    Database.update(
      (e) => {
        const entry = e;
        entry.amount += amount;
      },
      (e) => e.id === id && e.variantName === variantName
    )
  ) {
    modifyCartItemCount(amount);
    return true;
  }
  return false;
}

// Constructs the HTML including event listeners for one product.
function updateCartProduct(container, product) {
  const currProduct = product;
  const node = document.createElement("div");
  node.className = "cart__item";

  const itemContent = document.createElement("div");
  itemContent.className = "cart__item__content";

  const coffeeImg = document.createElement("img");
  coffeeImg.className = "coffee-img";
  coffeeImg.src = coffeeImagePath;
  coffeeImg.alt = `Kaffee ${product.productName}`;

  const coffeeData = document.createElement("div");
  coffeeData.className = "coffee-data";

  const nameAndPriceRow = document.createElement("div");
  nameAndPriceRow.className = "name-and-price-row";

  const coffeeName = document.createElement("p");
  coffeeName.className = "coffee-name";
  coffeeName.textContent = product.productName;

  const coffeePrice = document.createElement("p");
  coffeePrice.className = "coffee-price";
  coffeePrice.textContent = formatPrice(product.price);

  nameAndPriceRow.appendChild(coffeeName);
  nameAndPriceRow.appendChild(coffeePrice);

  const productLink = document.createElement("a");
  productLink.className = "product-link";
  productLink.href = `product.html?id=${product.id}`;
  productLink.textContent = "zum Produkt";

  const variantName = document.createElement("p");
  variantName.className = "variant-name";
  variantName.textContent = product.variantName;

  const divider = document.createElement("hr");
  divider.className = "divider";

  const amountContainer = document.createElement("div");
  amountContainer.className = "amount-container";

  const amountField = document.createElement("input");
  amountField.type = "text";
  amountField.className = "amount-input";
  amountField.ariaLabel = "Menge";
  amountField.value = product.amount;
  amountField.size = 1;
  amountField.ariaLabel = `Menge von Produkt ${product.productName} ${product.variantName}`;

  const deleteButton = document.createElement("button");
  const decreaseAmountButton = document.createElement("button");
  const increaseAmountButton = document.createElement("button");
  deleteButton.classList.add("product-button--delete");
  deleteButton.classList.add("icon-button");
  increaseAmountButton.classList.add("product-button--increase-amount");
  increaseAmountButton.classList.add("icon-button");
  decreaseAmountButton.classList.add("product-button--decrease-amount");
  decreaseAmountButton.classList.add("icon-button");

  deleteButton.ariaDescription = `Entferne Produkt ${product.productName} ${product.variantName}`;
  increaseAmountButton.ariaDescription = `Erhöhe Menge von Produkt ${product.productName} ${product.variantName} um eins`;
  decreaseAmountButton.ariaDescription = `Verringere Menge von Produkt ${product.productName} ${product.variantName} um eins`;

  const buttonContainer = document.createElement("div");
  buttonContainer.className = "button-container";

  deleteButton.innerHTML = `<img src="${closeButtonIcon}" alt="Icon Produkt entfernen">`;
  increaseAmountButton.innerHTML = "&rsaquo;";
  decreaseAmountButton.innerHTML = "&lsaquo;";

  amountContainer.appendChild(decreaseAmountButton);
  amountContainer.appendChild(amountField);
  amountContainer.appendChild(increaseAmountButton);

  buttonContainer.appendChild(amountContainer);
  buttonContainer.appendChild(deleteButton);

  coffeeData.appendChild(nameAndPriceRow);
  coffeeData.appendChild(productLink);
  coffeeData.appendChild(variantName);
  coffeeData.appendChild(buttonContainer);

  itemContent.appendChild(coffeeImg);
  itemContent.appendChild(coffeeData);

  node.appendChild(itemContent);
  node.appendChild(divider);

  container.appendChild(node);

  // Event listeners

  deleteButton.onclick = removeFromCart.bind(
    null,
    product.id,
    product.variantName
  );

  decreaseAmountButton.addEventListener("click", () => {
    currProduct.amount = Math.max(0, product.amount - 1);

    if (currProduct.amount <= 0) {
      removeFromCart(currProduct.id, currProduct.variantName);
    } else {
      modifyAmount(currProduct.id, currProduct.variantName, -1);

      amountField.value = product.amount;

      updateBilling();
      processValidAmountChange(amountField);
    }
  });

  increaseAmountButton.addEventListener("click", () => {
    currProduct.amount += 1;
    modifyAmount(currProduct.id, currProduct.variantName, 1);

    amountField.value = product.amount;

    updateBilling();
    processValidAmountChange(amountField);
  });

  amountField.addEventListener("change", () => {
    const isNonNegativeInt = /^\d+$/.test(amountField.value);
    if (isNonNegativeInt) {
      const newAmount = parseInt(amountField.value, 10);
      if (newAmount > 0) {
        modifyAmount(
          currProduct.id,
          currProduct.variantName,
          newAmount - product.amount
        );
        currProduct.amount = newAmount;
        updateBilling();
      } else if (newAmount === 0) {
        removeFromCart(currProduct.id, currProduct.variantName);
      }

      processValidAmountChange(amountField);

      // New amount is not a valid amount.
    } else {
      amountField.classList.add("amount-input--invalid");
    }
  });
}

function updateCartProducts() {
  const container = document.querySelector(".cart__product-list");
  // Empty the container
  container.innerHTML = "";
  Database.read().forEach((product) => updateCartProduct(container, product));
  // Since the overlay has changed, it must be refreshed
  cartOverlay.refresh();
}

// Computes and displays the price information at the bottom of the cart.
function updateBilling() {
  // Compute price data (in cents)
  const data = Database.read(["price", "amount"]);
  const priceSum = data.reduce(
    (sum, product) => product.price * product.amount + sum,
    0
  );
  const shippingCost = priceSum > 0 ? 360 : 0;
  const totalCost = priceSum + shippingCost;

  // Display price data
  billingArea.querySelector(".price-sum").innerHTML = formatPrice(priceSum);
  billingArea.querySelector(".shipping").innerHTML = formatPrice(shippingCost);
  billingArea.querySelector(".total").innerHTML = formatPrice(totalCost);
}

function updateCart() {
  // Define the openCart function in the correct context
  openCart = function openShoppingCart() {
    displayCart();
    updateRecentlyAddedMessage();
    cartOverlay.openOverlay();
    closeCartButton.classList.remove("u-hidden");
  };

  openCartButton.onclick = openCart;
}

function displayCart() {
  updateCartProducts();
  updateBilling();
  updateCart();
}

export function addToCart(id, variantName, amount = 1) {
  if (!modifyAmount(id, variantName, 1)) {
    Database.insertEntry({ id, variantName, amount });
    modifyCartItemCount(amount);
  }

  if (cartOverlay.isOpen()) {
    displayCart();
  } else {
    updateCart();
  }
}

export function removeFromCart(id, variantName) {
  const entry = Database.readCart(
    ["amount"],
    (e) => e.id === id && e.variantName === variantName
  );
  if (!entry) return;
  Database.deleteEntry((e) => e.id === id && e.variantName === variantName);
  modifyCartItemCount(-entry[0].amount);
  if (cartOverlay.isOpen()) {
    displayCart();
  } else {
    updateCart();
  }
}

export function initCart() {
  closeCartButton.onclick = closeCart;

  initCartCounter();
  updateCart();
}
