import { combineInnerHTML, generateProductHTML } from "../util/product-util";
import createSlider from "../util/slider";

// Assumes that we have empty divs with class name product-slider.

const productSliderContainers = document.querySelectorAll(".product-slider");
const productList = combineInnerHTML(generateProductHTML());

productSliderContainers.forEach((cont) => {
  createSlider(cont, productList);
});
