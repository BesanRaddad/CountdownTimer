let timer;
const endSound = document.getElementById('endSound');   

function startCountdown() {
  clearInterval(timer);

  endSound.pause();
  endSound.currentTime = 0;

  const input = document.getElementById("dateInput").value;
  const targetDate = flatpickr.parseDate(input, "d/m/Y  h:i K")?.getTime();

  if (!input || isNaN(targetDate)) {
    document.getElementById("done-msg").innerText = "❌ Please select a valid date.";
    return;
  }

  document.getElementById("countdown-container").style.display = "flex";
  document.getElementById("done-msg").innerText = "";

  function updateCountdown() {
    const now = Date.now();
    const difference = targetDate - now;

    if (difference <= 0) {
      clearInterval(timer);

      endSound.currentTime = 0;   
      endSound.play();

      document.getElementById("done-msg").innerText = "Time is up 🎉!";
      document.getElementById("countdown-container").style.display = "none";
      return;
    }

    const days    = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours   = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    document.querySelector("#days .number").innerText    = days;
    document.querySelector("#hours .number").innerText   = hours;
    document.querySelector("#minutes .number").innerText = minutes;
    document.querySelector("#seconds .number").innerText = seconds;
  }

  timer = setInterval(updateCountdown, 1000);
  updateCountdown();
}


