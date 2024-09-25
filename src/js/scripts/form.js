document.querySelectorAll("form").forEach((form) => {
  const submitButton = form.querySelector("input[type=submit]");
  if (submitButton) {
    // On clicking the submit button, invalid form items should receive custom
    // styles, so they are given the "required" class.
    submitButton.addEventListener("click", () =>
      form.querySelectorAll("input[required]").forEach((field) => {
        field.classList.add("required");
      })
    );
  }
});
