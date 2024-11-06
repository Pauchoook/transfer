export default function dropdown() {
  const buttons = document.querySelectorAll(".dropdown__btn");
  const dropdowns = document.querySelectorAll(".dropdown");
  if (buttons.length) {
    buttons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const currentDropdown = btn.closest(".dropdown");

        if (currentDropdown.classList.contains("open")) {
          closeDropdown();
        } else {
          currentDropdown.addEventListener("click", (e) => e.stopPropagation());

          dropdowns.forEach((d) => d.classList.remove("open"));
          currentDropdown.classList.add("open");

          document.body.addEventListener("click", closeDropdown);
        }
      });
    });

    function closeDropdown() {
      const currentDropdown = document.querySelector(".dropdown.open");

      if (!closeDropdown) return;

      currentDropdown.classList.remove("open");
      return document.body.removeEventListener("click", closeDropdown);
    }
  }
}
