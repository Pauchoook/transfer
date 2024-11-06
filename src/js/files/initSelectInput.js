export default function initSelectInput() {
  const inputsDate = document.querySelectorAll(".input-date");
  const inputsTime = document.querySelectorAll(".input-time");

  if (inputsDate.length) inputsDate.forEach(i => initDate(i));

  if (inputsTime.length) inputsTime.forEach(i => initTime(i));

  function initDate(input) {
    const currentDate = new Date();
    const dateTitle = input.closest("div").querySelector(".select-input__title");

    const currentDay =
      currentDate.getDate() < 10 ? "0" + currentDate.getDate() : currentDate.getDate();
    const currentMonth =
      currentDate.getMonth() + 1 < 10 ? "0" + currentDate.getMonth() : currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    dateTitle.textContent = `${currentDay}.${currentMonth}.${currentYear}`;
    input.value = `${currentYear}-${currentMonth}-${currentDay}`;
  }

  function initTime(input) {
    const currentDate = new Date();
    const timeTitle = input.closest("div").querySelector(".select-input__title");

    const currentHours =
      currentDate.getHours() < 10 ? "0" + currentDate.getHours() : currentDate.getHours();
    const currentMinutes =
      currentDate.getMinutes() < 10 ? "0" + currentDate.getMinutes() : currentDate.getMinutes();

    timeTitle.textContent = `${currentHours}:${currentMinutes}`;
    input.value = `${currentHours}:${currentMinutes}`;
  }
}
