import * as Cart from "../util/cart";
import {
  getPriceRange,
  showPriceRange,
  generateProductHTML,
  combineInnerHTML,
  getIconsAndProperties,
} from "../util/product-util";
import * as Database from "../util/query";
import createSlider from "../util/slider";
import { setSVGSize } from "../util/stringUtil";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const product = Database.getProduct(id);

document.getElementById("product-name").innerHTML = product.productName;
document.getElementById("price-range").innerHTML = showPriceRange(
  getPriceRange(product)
);
const blurb = document.getElementById("blurb");
blurb.innerHTML = `${product.productName} ${blurb.innerHTML}`;
document.getElementById("description").innerHTML = product.description;

const coffeeSelect = document.getElementById("coffee-selection");

product.variants.forEach((variant) => {
  const variantOption = document.createElement("option");
  variantOption.value = variant.variantName;
  variantOption.textContent = variant.variantName;
  coffeeSelect.appendChild(variantOption);
});

// Add the selected variant to the cart when the "In den Warenkorb" button is pressed.
document.getElementById("add-to-cart-button").addEventListener("click", () => {
  if (coffeeSelect.value !== coffeeSelect.options[0].value) {
    Cart.addToCart(product.id, coffeeSelect.value);
  }
});

const productIcons = document.getElementById("product-icons");
const iconsAndProperties = getIconsAndProperties(product.properties);
iconsAndProperties.forEach((prop) => {
  const iconContainer = document.createElement("div");
  /* eslint-disable no-param-reassign */
  prop.icon = setSVGSize(prop.icon, 70, 70);
  iconContainer.className = "icon-container";
  iconContainer.innerHTML = `${prop.icon} <p>${prop.name}</p>`;
  productIcons.appendChild(iconContainer);
});

const sliderContainer = document.querySelector(".product-slider");
const products = combineInnerHTML(generateProductHTML(4, `${id}`));
createSlider(sliderContainer, products);
