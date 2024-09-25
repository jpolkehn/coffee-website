import Overlay from "./overlay";
import { initCart } from "./cart";

const navigation = document.getElementById("navigation");
const menuButton = document.getElementById("mobile-menu-button");
const menuOverlay = document.querySelector(".nav--overlay");
const closeButton = document.getElementById("mobile-menu-close-button");
let overlay;

let navBarTransparent = true;
let transparentNavBarEnabled;

// Clicking on the mobile menu button will open the navigation on the same page.
function openMenu() {
  overlay.openOverlay();
  closeButton.classList.remove("u-hidden");
  menuButton.classList.add("u-hidden");
}

function closeMenu() {
  closeButton.classList.add("u-hidden");
  menuButton.classList.remove("u-hidden");
  overlay.closeOverlay();
}

// When the website is scrolled down at all, the navigation turns solid white.
export function handleNavigationScrolling() {
  if (window.pageYOffset && navBarTransparent) {
    navigation.classList.remove("nav--transparent");
    navigation.classList.add("nav--solid");
    navBarTransparent = false;
  } else if (!window.pageYOffset && transparentNavBarEnabled) {
    navigation.classList.add("nav--transparent");
    navigation.classList.remove("nav--solid");
    navBarTransparent = true;
  }
}

function initNavBarAppearance() {
  // If the header contains a header image, the navigation
  // bar should be transparent if the page is not scrolled down.
  transparentNavBarEnabled = document.querySelector(".header--image") !== null;
  if (transparentNavBarEnabled && !window.pageYOffset) {
    navigation.classList.add("nav--transparent");
  } else {
    navigation.classList.add("nav--solid");
  }
}
function initNavigation() {
  // Adds the mobile menu button's functionality.
  menuButton.onclick = openMenu;
  closeButton.onclick = closeMenu;
  initNavBarAppearance();
  overlay = new Overlay(menuOverlay);
  initCart();
}

export default initNavigation;
