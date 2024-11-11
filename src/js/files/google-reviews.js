export default function gReviews() {
  const reviews = document.querySelector(".g-reviews");

  if (reviews) {
    let scrollY = window.scrollY;

    const debounce = (fn, delay) => {
      let timer;
      return () => {
        clearTimeout(timer);
        if (reviews.classList.contains("active") && scrollY < window.scrollY) {
          reviews.classList.remove("active");
        }
        timer = setTimeout(() => fn.apply(this, arguments), delay);
      };
    };

    // Обработчик: активируется при остановке прокрутки
    const onScrollEnd = () => {
      reviews.classList.add("active");
      scrollY = window.scrollY;
    };

    // Подписка на событие прокрутки с применением debounce
    window.addEventListener("scroll", debounce(onScrollEnd, 1000));
  }
}
