export function reserveLink() {
  const reserveBtn = document.querySelector("#reserve-btn");

  if (reserveBtn) {
    reserveBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const depature = document.querySelector("#reserv-depature").value;
      const destination = document.querySelector("#reserv-destination").value;
      const date = document.querySelector("#reserv-date").value;
      const time = document.querySelector("#reserv-time").value;
      const passengers = document.querySelector("#reserv-passengers").value;
      const flightNumber = document.querySelector("#reserv-flight-number").value;
      const link = `/reserv.html?depature=${depature}&destination=${destination}&date=${date}&time=${time}&passengers=${passengers}&flightNumber=${flightNumber}`;

      window.location.href = link;
    });
  }
}

export function initReserve() {
  const formReserv = document.querySelector("#form-reserv");

  if (formReserv) {
    const depatureInput = document.querySelector("#reserv-depature");
    const destinationInput = document.querySelector("#reserv-destination");
    const dateInput = document.querySelector("#reserv-date");
    const timeInput = document.querySelector("#reserv-time");
    const passengersInput = document.querySelector("#reserv-passengers");
    const flightNumberInput = document.querySelector("#reserv-flight-number");

    const dateInputTitle = dateInput.closest(".select-input").querySelector(".select-input__title");
    const timeInputTitle = timeInput.closest(".select-input").querySelector(".select-input__title");

    const [depature, destination, date, time, passengers, flightNumber] = window.location.search
      .replace("?", "")
      .split("&")
      .reduce((acc, value) => (acc = [...acc, value.split("=")[1]]), []);

    initInput(depatureInput, depature.replace(/\W|_/g, '').replace(/[0-9]/g, ''));
    initInput(destinationInput, destination.replace(/\W|_/g, '').replace(/[0-9]/g, ''));

    initInput(dateInput, date);
    if (date) dateInputTitle.textContent = date.split("-").reverse().join(".");

    initInput(timeInput, time);
    if (time) timeInputTitle.textContent = time;
    console.log(timeInput.value);

    initInput(passengersInput, passengers);

    initInput(flightNumberInput, flightNumber);
  }

  function initInput(input, value) {
    if (!value) return;
    input.value = value;
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
