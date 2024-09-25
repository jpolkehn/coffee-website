import initNavigation, { handleNavigationScrolling } from "../util/navigation";

function handleScrolling() {
  handleNavigationScrolling();
}

// Set up event handlers
window.onscroll = handleScrolling;
// Activate the functionality of the mobile menu button
initNavigation();
