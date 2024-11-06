export default function selectInput() {
  const selectInputs = document.querySelectorAll(".select-input__input");
  if (selectInputs.length) {
    selectInputs.forEach((input) => {
      input.addEventListener("change", (e) => {
        const value = input.type === "date" ? e.target.value.split("-").reverse().join(".") : e.target.value;
        const currentSelect = input.closest(".select-input");
        const title = currentSelect.querySelector(".select-input__title");

        title.textContent = value;
      });
    });
  }
}
