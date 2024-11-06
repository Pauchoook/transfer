export default function more() {
  const moreWrappers = document.querySelectorAll(".more");

  if (moreWrappers.length) {
    moreWrappers.forEach(parent => {
      const showItems = +parent.dataset.moreShow;
      const currentItems = parent.querySelectorAll(".more__item");
      const currentButton = parent.querySelector(".more__btn");
      let startEl = showItems;

      Array.from(currentItems).slice(showItems).forEach(item => item.classList.add('none'));
      
      currentButton.addEventListener("click", () => {
        Array.from(currentItems).slice(startEl, startEl + showItems).forEach(item => item.classList.remove('none'));
        startEl +=  showItems;

        if (startEl >= currentItems.length) currentButton.remove();
      })
    })
  }
}