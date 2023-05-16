const questionsEl = document.querySelector("#questions");
const timerEl = document.querySelector("#time");
const optionsEl = document.querySelector("#options");
const startBtn = document.querySelector("#start");
const feedbackEl = document.querySelector("#feedback");

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
  const currentQuestion = questions[currentQuestionIndex];

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
    feedbackEl.textContent = "Incorrect";
    feedbackEl.style.color = "red";
    feedbackEl.style.fontSize = "400%";
  } else {
    feedbackEl.textContent = "Correct";
    feedbackEl.style.color = "green";
    feedbackEl.style.fontSize = "400%";
  }

  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function () {
    feedbackEl.setAttribute("class", "feedback hide");
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

  timerEl.textContent = time;

  if (time <= 0) {
    quizEnd();
  }
}

startBtn.onclick = startQuiz;
