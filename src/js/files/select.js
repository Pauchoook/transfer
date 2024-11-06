export default function select() {
  const buttonsSelect = document.querySelectorAll(".select__btn");
  const selects = document.querySelectorAll(".select");

  if (buttonsSelect.length) {
    buttonsSelect.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const isInput = btn.dataset.isInput;
        e.stopPropagation();
        if (!isInput) {
          const currentSelect = btn.closest(".select");
          const input = currentSelect.querySelector(".select__input");

          if (currentSelect.classList.contains("open")) {
            selectClose();
          } else {
            selects.forEach((s) => s.classList.remove("open"));
            currentSelect.addEventListener("click", (e) => {
              e.stopPropagation();

              if (e.target.classList.contains("select__btn-other")) {
                const currentArrow = currentSelect.querySelector(".select__arrow");
                const currentIcon = currentSelect.querySelector(".select__icon");

                if (currentIcon) currentIcon.remove();
                if (currentArrow) currentArrow.remove();

                input.style.pointerEvents = "all";
                input.focus();
                input.value=""

                selectClose();

                btn.setAttribute("data-is-input", true)

                return;
              }

              if (e.target.classList.contains("select__item-btn")) {
                input.value = e.target.textContent;
                selectClose();
              }
            });

            currentSelect.classList.add("open");
            document.addEventListener("click", selectClose);
          }
        }
      });
    });

    function selectClose() {
      const currentSelect = document.querySelector(".select.open");

      if (!currentSelect) return;

      currentSelect.classList.remove("open");

      return document.removeEventListener("click", selectClose);
    }
  }
}
