export default function tableTime() {
  const timeHtml = document.querySelector("#table-time");

  if (timeHtml) {
    const date = new Date();
    const dateUpdate = new Date(date.setMinutes(date.getMinutes() - 30));
    
    const hours = dateUpdate.getHours();
    const minutes = dateUpdate.getMinutes() <= 9 ? "0" + dateUpdate.getMinutes() : dateUpdate.getMinutes();

    timeHtml.textContent = `Last request ${hours}:${minutes}`
  }
}
