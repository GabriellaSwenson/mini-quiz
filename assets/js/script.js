const questionsEl = document.querySelector("#questions");
const timerEl = document.querySelector("#time");
const optionsEl = document.querySelector("#options");
const startBtn = document.querySelector("#start");
const keyEl = document.querySelector(".key");

const currentQuestionIndex = 0;
let time = questions.length * 15;
let timerId;

function startQuiz() {
  const startScreenEl = document.getElementById("start-page");
  startScreenEl.setAttribute("class", "hide");

  questionsEl.removeAttribute("class");

  timerId = setInterval(clockTick, 1000);

  const timerEl = document.getElementById("timer-element");
  if (timerEl) {
    timerEl.textContent = time;
  }

  getQuestion();
}

function getQuestion() {
  let currentQuestion = questions[currentQuestionIndex];

  const titleEl = document.getElementById("question-name");
  titleEl.textContent = currentQuestion.title;

  optionsEl.innerHTML = "";

  currentQuestion.options.forEach(function (option, i) {
    const optionNode = document.createElement("button");
    optionNode.setAttribute("class", "options");
    optionNode.setAttribute("value", option);

    optionNode.textContent = i + 1 + ". " + option;

    optionNode.onclick = questionClick;

    optionsEl.appendChild(optionNode);
  });
}

function questionClick() {
  if (this.value !== questions[currentQuestionIndex].answer) {
    time -= 10;

    if (time < 0) {
      time = 0;
    }
    timerEl.textContent = time;
    keyEl.textContent = "Incorrect";
    keyEl.style.color = "gray";
    keyEl.style.fontSize = "400%";
  } else {
    keyEl.textContent = "Correct";
    keyEl.style.color = "gray";
    keyEl.style.fontSize = "400%";
  }

  keyEl.setAttribute("class", "key");
  setTimeout(function () {
    keyEl.setAttribute("class", "key hide");
  }, 1000);

  currentQuestionIndex++;

  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

function quizEnd() {
  clearInterval(timerId);

  const finishedEl = document.getElementById("finished");
  finishedEl.removeAttribute("class");

  const scoreEl = document.getElementById("score");
  scoreEl.textContent = time;

  questionsEl.setAttribute("class", "hide");
}

function clockTick() {
  time--;

  if (timerEl) {
    timerEl.textContent = time;
  }

  if (time <= 0) {
    quizEnd();
  }
}

startBtn.onclick = startQuiz;
