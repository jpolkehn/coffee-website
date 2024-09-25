/* 
  This module includes functions to process product data from
  the database and generate HTML from it.
*/

import * as Database from "./query";
import coffeeImagePath from "../../img/FEND_Coffee_Costa-Rica 2.png";

// Include fs module
const fs = require("fs");

export function getIconsAndProperties(properties) {
  return properties.map((prop) => {
    // Switch statement because filenames must be static
    switch (prop) {
      case "mild":
        return {
          icon: fs.readFileSync("./src/img/icons/Icon Kaffee Schaufel.svg", {
            encoding: "utf8",
            flag: "r",
          }),
          name: "Mild",
        };
      case "filtered":
        return {
          icon: fs.readFileSync("./src/img/icons/Icon French Press.svg", {
            encoding: "utf8",
            flag: "r",
          }),
          name: "Für Filterkaffee",
        };
      case "ground":
        return {
          icon: fs.readFileSync("./src/img/icons/Icon Kaffee Bohnen.svg", {
            encoding: "utf8",
            flag: "r",
          }),
          name: "gemahlen",
        };
      default:
        return {};
    }
  });
}

export function createIcons(properties) {
  return getIconsAndProperties(properties)
    .map((props) => props.icon)
    .join(" ");
}

// Returns the price, given in cents, formatted in euros.
export function formatPrice(priceInCents) {
  const euros = Math.floor(priceInCents / 100);
  const cents = priceInCents % 100;
  const formattedCents = cents < 10 ? `0${cents}` : cents;
  return `${euros},${formattedCents}€`;
}

// Returns the minimum and maximum price of a product.
export function getPriceRange(product) {
  return product.variants.reduce(
    (minmax, variant) => ({
      min: minmax.min ? Math.min(minmax.min, variant.price) : variant.price,
      max: Math.max(minmax.max, variant.price),
    }),
    { min: 0, max: 0 }
  );
}

// A pretty string for a price range.
export function showPriceRange(priceRange) {
  return `${formatPrice(priceRange.min)} - ${formatPrice(priceRange.max)}`;
}

export function generateProductHTML(groupSize = 4, excludedIds = []) {
  const products = Database.getProductData().filter(
    (product) => !excludedIds.includes(product.id)
  );
  const numOfProducts = products.length;
  const productGroups = [];

  for (let i = 0; i < numOfProducts; i += groupSize) {
    const productGroup = [];

    for (let j = i; j < Math.min(i + groupSize, numOfProducts); j += 1) {
      const product = products[j];

      const productElement = document.createElement("A");
      productElement.href = `product.html?id=${product.id}`;
      productElement.classList = ["product"];

      const priceRange = showPriceRange(getPriceRange(product));
      const icons = createIcons(product.properties);
      const productHtml = `
        <div class="coffee-img">
          <img
            src="${coffeeImagePath}"
            alt="${product.productName} Kaffee"
          />
        </div>
        <div class="coffee-text">
          <div class="coffee-text__origins subhead-m">
            ${product.productName}
          </div>
          <div class="coffee-text__price-range">
            ${priceRange}
          </div>
              <div class="coffee-text__icons">
                ${icons}
              </div>
        </div>`;
      productElement.innerHTML = productHtml;
      productGroup.push({ product, html: productElement });
    }

    productGroups.push(productGroup);
  }

  return productGroups;
}

// Combines the groups by adding all of them as children to an HTML element.
// Returns a list of those new HTML elements.
export function combineInnerHTML(htmlList) {
  const groupList = [];
  htmlList.forEach((group) => {
    const productGroupElement = document.createElement("DIV");
    productGroupElement.classList = ["product-group"];
    group.forEach((elem) => {
      productGroupElement.appendChild(elem.html);
    });
    groupList.push(productGroupElement);
  });
  return groupList;
}

// Inserts the product HTML into the DOM as children of a given node.
// Assumed structure of the htmlList: list of lists of objects containing HTML
// elements under the property 'html'.
export function insertProductHTML(
  htmlList,
  productContainer = document.querySelector(".product-display")
) {
  const groupList = combineInnerHTML(htmlList);
  groupList.forEach((group) => {
    productContainer.appendChild(group);
  });
}
