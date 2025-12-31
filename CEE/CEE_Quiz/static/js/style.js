let totalTime = 2700;
let timerInterval;

const timerDisplay = document.getElementById('timer');
const quizForm = document.getElementById('quiz-form');
const startBtn = document.getElementById('start_btn');
const nameInput = document.querySelector('input[name="name"]');
function afterSubmit() {
    clearInterval(timerInterval);
    quizForm.classList.add("submitted"); 
}
function updateTimer() {
    let minutes = Math.floor(totalTime/60);
    let seconds = totalTime %60;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    timerDisplay.textContent = `Time Left : ${minutes}: ${seconds}`;
    if (totalTime <= 60) {
        timerDisplay.style.color = totalTime % 2 === 0 ? "#fd2109ff" : "#fff";
        timerDisplay.style.backgroundColor = totalTime % 2 === 0 ? "#000" : "#e74c3c";
        timerDisplay.style.padding = "5px 10px";
        timerDisplay.style.borderRadius = "5px";
    }

    if (totalTime <= 0) {
        clearInterval(timerInterval);
        alert("Time is up! Submitting your Answers......");
        afterSubmit();
        setTimeout(() => {
        quizForm.requestSubmit();  
    }, 100);
    }

    totalTime--;
}

function startQuiz(event) {
     event.preventDefault();
    if (!nameInput || nameInput.value.trim() === '') {
         alert('Please enter your name before starting the test!');
        nameInput.focus();
        return;
    }
    const hiddenNameInput = document.getElementById('hidden-name');
    if (hiddenNameInput) {
        hiddenNameInput.value = nameInput.value.trim();
    }
    const nameForm = document.getElementById('name-form');
    if (nameForm) {
        nameForm.style.display = "none";
    }
    startBtn.style.display = "none";
    quizForm.style.display = "block";
    timerDisplay.style.display = "block";

    updateTimer();
    timerInterval = setInterval(updateTimer, 1000);
}
if (startBtn) startBtn.addEventListener("click", startQuiz);
quizForm.addEventListener("submit", function() {
    afterSubmit();
});

