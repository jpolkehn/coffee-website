/* eslint-disable no-param-reassign */
import { generateProductHTML, insertProductHTML } from "../util/product-util";
import { addToCart } from "../util/cart";

function activateVariantButtons(quickAdd, variants) {
  quickAdd.classList.remove("visible");
  variants.classList.add("visible");
  quickAdd.disabled = true;
  Array.from(variants.children).forEach((varButton) => {
    varButton.disabled = false;
  });
  // Focus on the first variant button while preventing automatic scrolling
  const y = window.scrollY;
  variants.children[0].focus();
  window.scrollTo(window.scrollX, y);
}

function deactivateVariantButtons(quickAdd, variants) {
  quickAdd.classList.add("visible");
  variants.classList.remove("visible");
  quickAdd.disabled = false;
  Array.from(variants.children).forEach((varButton) => {
    varButton.disabled = true;
  });
}

function displayProducts() {
  const products = generateProductHTML();

  products.forEach((group) => {
    group.forEach((productObj) => {
      const imgContainer = productObj.html.querySelector(".coffee-img");
      const addButtonContainer = document.createElement("div");
      addButtonContainer.classList = ["add-buttons"];
      imgContainer.appendChild(addButtonContainer);

      const variantButtonContainer = document.createElement("div");
      variantButtonContainer.classList = ["variant-buttons"];

      const quickAddButton = document.createElement("button");
      quickAddButton.innerHTML = "<p>quick add <span class='plus'>+</span></p>";
      quickAddButton.classList = ["quick-add-button"];
      quickAddButton.onclick = (e) => {
        e.preventDefault();
        activateVariantButtons(quickAddButton, variantButtonContainer);
      };
      // When leaving the product, the quick add button is restored
      productObj.html.onmouseleave = () => {
        deactivateVariantButtons(quickAddButton, variantButtonContainer);
      };
      // When the variant buttons lose focus, they are also deactivated.
      // The buttons will also be deactivated if the product is still hovered,
      // which could be improved.
      variantButtonContainer.addEventListener("focusout", () => {
        setTimeout(() => {
          if (!variantButtonContainer.contains(document.activeElement)) {
            deactivateVariantButtons(quickAddButton, variantButtonContainer);
          }
        }, 0);
      });

      addButtonContainer.appendChild(variantButtonContainer);
      addButtonContainer.appendChild(quickAddButton);

      productObj.product.variants.forEach((variant) => {
        // Create an add button for each variant
        const variantAddButton = document.createElement("button");
        variantAddButton.classList = ["product-button--add"];
        const variantButtonText = document.createElement("P");
        variantButtonText.innerHTML = variant.variantName;
        variantAddButton.appendChild(variantButtonText);
        variantAddButton.addEventListener("click", (e) => {
          addToCart(productObj.product.id, variant.variantName);
          e.preventDefault();
        });
        variantButtonContainer.appendChild(variantAddButton);
      });

      // Initially, the variant buttons are disabled and the quick add button is enabled.
      deactivateVariantButtons(quickAddButton, variantButtonContainer);
    });
  });
  // Finally, insert the constructed HTML into the DOM.
  insertProductHTML(products);
}

displayProducts();
