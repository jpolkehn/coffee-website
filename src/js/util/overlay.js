import { getFocusableChildren, trapFocus } from "./focus";

export default class Overlay {
  constructor(overlayElem) {
    this.overlayElem = overlayElem;

    // The overlay is initially hidden from view.
    this.overlayElem.ariaHidden = true;

    this.refresh();
  }

  initFocusableChildren(overlayElem) {
    this.focusableOverlayItems = getFocusableChildren(overlayElem);
    [this.firstOverlayItem] = this.focusableOverlayItems;
    this.lastOverlayItem = this.focusableOverlayItems[
      this.focusableOverlayItems.length - 1
    ];
  }

  // Activates the mobile menu keyboard trap.
  enableOverlayFocus() {
    this.focusableOverlayItems.forEach((e) => {
      e.tabIndex = 0;
    });

    // this.firstOverlayItem.focus();
    // TODO For some reason, this works, but the line above doesn't.
    setTimeout(() => this.firstOverlayItem.focus(), 0);
  }

  // Disables the mobile menu keyboard trap.
  disableOverlayFocus() {
    this.focusableOverlayItems.forEach(function makeUnfocusable(e) {
      e.tabIndex = -1;
    });
  }

  isOpen() {
    return this.overlayElem.classList.contains("overlay-open");
  }

  openOverlay() {
    this.overlayElem.classList.add("overlay-open");
    this.overlayElem.ariaHidden = false;
    this.overlayElem.scrollTop = 0;

    // Disable vertical scrolling
    document.querySelector("html").classList.add("u-disable-scroll");

    // Trap focus in the overlay
    this.enableOverlayFocus();
  }

  closeOverlay() {
    this.overlayElem.classList.remove("overlay-open");
    this.overlayElem.ariaHidden = false;
    document.querySelector("html").classList.remove("u-disable-scroll");
    this.disableOverlayFocus();
  }

  // Call this when focusable elements are added to or removed from the
  // overlay. Also called on construction.
  refresh() {
    this.initFocusableChildren(this.overlayElem);

    // The overlay listens for Tab or Shift + Tab to trap focus.
    this.overlayElem.onkeydown = trapFocus.bind(
      null,
      this.firstOverlayItem,
      this.lastOverlayItem
    );

    const open = this.isOpen();
    if (open) {
      this.firstOverlayItem.focus();
    } else {
      // Initially, the overlay links are not focusable.
      this.disableOverlayFocus();
    }
  }
}
