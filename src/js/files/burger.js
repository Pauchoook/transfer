export default function burger() {
  const burgerBtn = document.querySelector("#btn-burger");
  const burger = document.querySelector("#burger");
  const header = document.querySelector(".header");

  burgerBtn.addEventListener("click", (e) => {
    e.stopPropagation();

    if (burger.classList.contains("open")) {
      handleClose();
    } else {
      burger.classList.add("open");
      burgerBtn.classList.add("active");
      setTimeout(() => header.classList.add("open-burger"), 1000)
      
      document.body.classList.add("body-hidden");
      burger.addEventListener("click", (e) => e.stopPropagation());

      document.body.addEventListener("click", handleClose);
    }
  });

}
export function handleClose() {
  const burger = document.querySelector("#burger");
  const burgerBtn = document.querySelector("#btn-burger");
  const header = document.querySelector(".header");

  burger.classList.remove("open");
  document.body.classList.remove("body-hidden");
  burgerBtn.classList.remove("active");
  header.classList.remove("open-burger");

  document.body.removeEventListener("click", handleClose);
}