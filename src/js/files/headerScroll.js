export default function headerScroll() {
  const header = document.querySelector(".header");

  if (!header.classList.contains("_black")) {
    const heightHeader = header.clientHeight;

    window.addEventListener("scroll", () => {
      if (window.scrollY > heightHeader) {
        header.classList.add("_black");
      } else {
        header.classList.remove("_black");
      }
    }); 
  }
}