document.addEventListener("DOMContentLoaded", function () {
  var navigation = document.getElementById("navigation");
  var header = document.querySelector("header");
  var logo = document.querySelector(".nav__logo img");
  var links = document.querySelectorAll(".menu-link");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      navigation.classList.remove("nav--transparent");
      navigation.style.backgroundColor = "white";
      header.style.paddingTop = navigation.offsetHeight + "px";
      for (var i = 0; i < links.length; i++) {
        links[i].style.color = "black";
      }
      logo.src = "/Logo.svg";
    } else {
      navigation.classList.add("nav--transparent");
      navigation.style.backgroundColor = "transparent";
      header.style.paddingTop = "0";
      for (var i = 0; i < links.length; i++) {
        links[i].style.color = "white";
      }
      logo.src = "/images/icons/Logo.svg";
    }
  });

  window.addEventListener("resize", function () {
    header.style.paddingTop = navigation.offsetHeight + "px";
  });

  // Initialisierung der Header-Padding-Top
  header.style.paddingTop = navigation.offsetHeight + "px";
});
