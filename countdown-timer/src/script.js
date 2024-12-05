window.addEventListener('DOMContentLoaded', function () {
  const hourInput = document.querySelector('.hour');
  const minInput = document.querySelector('.minute');
  const secInput = document.querySelector('.sec');
  const startBtn = document.querySelector('.start');
  const stopBtn = document.querySelector('.stop');
  const resetBtn = document.querySelector('.reset');

  let countdownTimer = null;

  // Start the countdown timer
  function startCountdown() {
    if (hourInput.value == 0 && minInput.value == 0 && secInput.value == 0)
      return;

    startBtn.style.display = 'none';
    stopBtn.style.display = 'initial';

    countdownTimer = setInterval(updateTimer, 1000);
  }
  // Stop the countdown timer
  function stopInterval(state) {
    startBtn.textContent = state === 'pause' ? 'Continue' : 'Start';
    stopBtn.style.display = 'none';
    startBtn.style.display = 'initial';
    clearInterval(countdownTimer);
  }

  // Reset inputs and stop the timer
  function resetInputs() {
    hourInput.value = '';
    minInput.value = '';
    secInput.value = '';
    stopInterval();
  }

  // Format time to ensure two-digit display
  function formatTime(value) {
    return value <= 9 ? '0' + value : value;
  }
  // Update the timer display and manage countdown logic
  function updateTimer() {
    // zero fallback since parseInt returns NaN for empty string
    const getNumericValue = (input) => parseInt(input.value) || 0;

    let totalSeconds =
      getNumericValue(hourInput) * 3600 +
      getNumericValue(minInput) * 60 +
      getNumericValue(secInput);

    if (totalSeconds <= 0) {
      resetInputs();
      stopInterval();
      return;
    }

    totalSeconds--;

    const hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    hourInput.value = formatTime(hours);
    minInput.value = formatTime(minutes);
    secInput.value = formatTime(seconds);
  }

  // Event Listeners
  startBtn.addEventListener('click', startCountdown);
  stopBtn.addEventListener('click', () => stopInterval('pause'));
  resetBtn.addEventListener('click', resetInputs);
});
