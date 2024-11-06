export function reserveLink() {
  const reserveBtn = document.querySelector("#reserve-btn");

  if (reserveBtn) {
    reserveBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const depature = document.querySelector("#depature").value;
      const destination = document.querySelector("#destination").value;
      const date = document.querySelector("#date").value;
      const time = document.querySelector("#time").value;
      const passengers = document.querySelector("#passengers").value;
      const flightNumber = document.querySelector("#flight-number").value;
      const link = `?depature=${depature}&destination=${destination}&date=${date}$time=${time}&passengers=${passengers}&flightNumber=${flightNumber}`;

      window.location.href = link;
    });
  }
}

export function sides() {
  const btnOneSide = document.querySelector("#one-side");
  const btnTwoSide = document.querySelector("#two-side");
  const parentSide = document.querySelector(".reserv__sidebar");

  if (parentSide) {
    btnOneSide.addEventListener("click", () => parentSide.classList.add("one-route"));
    btnTwoSide.addEventListener("click", () => parentSide.classList.remove("one-route"));
  }
}