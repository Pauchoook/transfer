import Swiper from "swiper";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function sliders() {
  const heroSlider = document.querySelector(".hero__slider");

  if (window.matchMedia("(max-width: 743px)").matches) {
    const heroBodyHeight = document.querySelector(".hero__body").clientHeight;
    heroSlider.style.height = `${heroBodyHeight - window.innerHeight}px`;
    console.log(`${heroBodyHeight - window.innerHeight}px`)
  }

  if (heroSlider) {
    const swiper = new Swiper(heroSlider, {
      speed: 700,
      modules: [Autoplay],
      autoplay: true,
      autoplay: {
        delay: 3000
      }
    });
  }
}