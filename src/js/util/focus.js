/*  Traps focus between the given elements by listening for Tab or Shift + Tab
 *   and wrapping focus around if necessary.
 *
 *  Parameters:
 *  firstItem: the first focusable item in the modal or overlay
 *  lastItem: the last focusable item in the modal or overlay
 *  e: a keydown event
 */
export function trapFocus(firstItem, lastItem, e) {
  if (e.key === "Tab") {
    if (e.shiftKey && document.activeElement === firstItem) {
      // wrap around backwards
      e.preventDefault();
      lastItem.focus();
    } else if (!e.shiftKey && document.activeElement === lastItem) {
      // wrap around forwards
      e.preventDefault();
      firstItem.focus();
    }
  }
}

// Returns all focusable items in a given container as a list.
export function getFocusableChildren(container) {
  const focusableChildren = Array.prototype.slice.call(
    container.querySelectorAll(
      'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
    ),
    0
  );
  return focusableChildren.filter((el) => !el.hasAttribute("disabled"));
}

export function disableAllFocusable(container) {
  getFocusableChildren(container).forEach(function makeUnfocusable(e) {
    e.tabIndex = -1;
  });
}

export function enableAllFocusable(container) {
  getFocusableChildren(container).forEach(function makeFocusable(e) {
    e.tabIndex = 0;
  });
}
