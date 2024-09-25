import { disableAllFocusable, enableAllFocusable } from "./focus";

function deactivateSliderButton(btn) {
  const button = btn;
  button.classList.remove("slider__button--active");
  button.classList.add("slider__button--inactive");
  button.tabIndex = -1;
}

function activateSliderButton(btn) {
  const button = btn;
  button.classList.remove("slider__button--inactive");
  button.classList.add("slider__button--active");
  button.tabIndex = 0;
}

class Slider {
  constructor(sliderParent, elems) {
    this.node = sliderParent;

    const sliderNode = document.createElement("div");
    sliderNode.className = "slider";

    this.activeIndex = 0;
    this.prevIndex = 0;

    this.buildSlider(sliderNode, elems);

    // Add the slider to the DOM
    sliderParent.appendChild(sliderNode);
  }

  startTouch(e) {
    this.startX = (e.changedTouches ? e.changedTouches[0] : e).clientX;
  }

  endTouch(e) {
    const currX = (e.changedTouches ? e.changedTouches[0] : e).clientX;
    const dif = currX - this.startX;
    const threshold = 200;
    if (dif > threshold) {
      this.goLeft();
    } else if (dif < -threshold) {
      this.goRight();
    }
  }

  buildSlider(sliderNode, elems) {
    let first = true;
    this.tabDots = [];
    this.elements = [];

    // Create slider buttons
    const buttonLeft = document.createElement("button");
    buttonLeft.className =
      "slider__button slider__button--inactive slider__button--left";
    buttonLeft.tabIndex = -1;
    buttonLeft.innerHTML = "&lsaquo;";
    this.buttonLeft = buttonLeft;

    const buttonRight = document.createElement("button");
    buttonRight.className =
      "slider__button slider__button--active slider__button--right";
    buttonRight.innerHTML = "&rsaquo;";
    this.buttonRight = buttonRight;

    // Since the right button should appear after the elements in the DOM
    // order, only the left button is inserted here.
    sliderNode.appendChild(buttonLeft);

    const tabDots = document.createElement("div");
    tabDots.className = "tab-dots";
    elems.forEach((elem) => {
      const sliderElem = document.createElement("div");
      sliderElem.className = `slider__elem${first ? " active" : ""}`;
      sliderElem.appendChild(elem);
      sliderNode.appendChild(sliderElem);

      const tabDot = document.createElement("button");
      tabDot.className = `tab-dot${first ? " tab-dot--active" : ""}`;
      tabDots.appendChild(tabDot);

      // Focusable children of hidden slider elements are disabled.
      if (!first) {
        disableAllFocusable(sliderElem);
      }

      first = false;

      this.elements.push(sliderElem);
      this.tabDots.push(tabDot);
    });

    sliderNode.appendChild(buttonRight);
    sliderNode.appendChild(tabDots);

    // Add event listeners

    // Clicking on the 'right' button moves the slider right by one.
    this.buttonRight.addEventListener("click", () => this.goRight());
    // Clicking on the 'left' button moves the slider left by one.
    this.buttonLeft.addEventListener("click", () => this.goLeft());

    // Make it possible to jump to a specific page by clicking on the
    // corresponding dot.
    for (let i = 0; i < this.tabDots.length; i += 1) {
      this.tabDots[i].addEventListener(
        "click",
        this.jumpToSliderElem.bind(this, i)
      );
    }

    // Swipe controls
    sliderNode.addEventListener("mousedown", this.startTouch.bind(this));
    sliderNode.addEventListener("mouseup", this.endTouch.bind(this));
    sliderNode.addEventListener("touchstart", this.startTouch.bind(this));
    sliderNode.addEventListener("touchend", this.endTouch.bind(this));
  }

  jumpToSliderElem(index) {
    if (index !== this.activeIndex) {
      // Defines whether we move the slider left or right
      const slideLeft = index < this.activeIndex;
      const activeElementClasses = this.elements[this.activeIndex].classList;
      const prevElementClasses = this.elements[this.prevIndex].classList;
      const newElementClasses = this.elements[index].classList;

      // Remove the animation classes from the previous element.
      prevElementClasses.remove("left");
      prevElementClasses.remove("right");

      // Move the active class from the old to the new element...
      activeElementClasses.remove("active");
      activeElementClasses.remove("active--from-left");
      activeElementClasses.remove("active--from-right");
      newElementClasses.add("active");

      // ... and tab indicator.
      this.tabDots[this.activeIndex].classList.remove("tab-dot--active");
      this.tabDots[index].classList.add("tab-dot--active");

      // Enable focus on the new visible element and disable focus on the old
      // one.
      disableAllFocusable(this.elements[this.activeIndex]);
      enableAllFocusable(this.elements[index]);

      // Add the direction-specific animation classes.
      if (slideLeft) {
        newElementClasses.add("active--from-left");
        activeElementClasses.add("right");
      } else {
        newElementClasses.add("active--from-right");
        activeElementClasses.add("left");
      }

      // Activate or deactivate slider buttons as necessary
      if (index === 0) {
        deactivateSliderButton(this.buttonLeft);
      } else if (index === this.elements.length - 1) {
        deactivateSliderButton(this.buttonRight);
      }
      if (this.activeIndex === 0) {
        activateSliderButton(this.buttonLeft);
      } else if (this.activeIndex === this.elements.length - 1) {
        activateSliderButton(this.buttonRight);
      }

      // Update the indices.
      this.prevIndex = this.activeIndex;
      this.activeIndex = index;
    }
  }

  jumpSliderElementBy(offset) {
    const nextIndex = this.activeIndex + offset;
    if (nextIndex >= 0 && nextIndex < this.elements.length) {
      this.jumpToSliderElem(nextIndex);
    }
  }

  goRight() {
    this.jumpSliderElementBy(1);
  }

  goLeft() {
    this.jumpSliderElementBy(-1);
  }
}

// TODO: The slider needs no public methods or properties. I don't need a class
// for it.
export default function createSlider(container, elems) {
  return new Slider(container, elems);
}
