let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const timeDisplay = document.getElementById('time');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('lapsList');

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  const milliseconds = String(Math.floor((ms % 1000) / 10)).padStart(2, '0');
  return `${minutes}:${seconds}:${milliseconds}`;
}

function startPause() {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      timeDisplay.textContent = formatTime(elapsedTime);
    }, 10);
    startPauseBtn.textContent = 'Pause';
    lapBtn.disabled = false;
    isRunning = true;
  } else {
    clearInterval(timerInterval);
    startPauseBtn.textContent = 'Start';
    lapBtn.disabled = true;
    isRunning = false;
  }
}

function resetStopwatch() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  isRunning = false;
  timeDisplay.textContent = '00:00:00';
  startPauseBtn.textContent = 'Start';
  lapBtn.disabled = true;
  lapsList.innerHTML = '';
}

function recordLap() {
  const lapTime = document.createElement('li');
  lapTime.textContent = formatTime(elapsedTime);
  lapsList.appendChild(lapTime);
}

startPauseBtn.addEventListener('click', startPause);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);
