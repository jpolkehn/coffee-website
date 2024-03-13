document.addEventListener("DOMContentLoaded", function () {
  const navigation = document.getElementById("navigation");
  const header = document.querySelector("header");
  const logo = document.querySelector(".nav__logo img");
  const links = document.querySelectorAll(".menu-link");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      navigation.classList.remove("nav--transparent");
      navigation.style.backgroundColor = "white";
      header.style.paddingTop = navigation.offsetHeight + "px";
      for (vonst i = 0; i < links.length; i++) {
        links[i].style.color = "black";
      }
      logo.src = "/Logo.svg";
    }, else {
      navigation.classList.add("nav--transparent");
      navigation.style.backgroundColor = "transparent";
      header.style.paddingTop = "0";
      for (const i = 0; i < links.length; i++) {
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
